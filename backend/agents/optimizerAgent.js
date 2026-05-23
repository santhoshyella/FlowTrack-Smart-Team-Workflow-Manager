const { GoogleGenerativeAI } = require("@google/generative-ai");
const dbTools = require("./dbTools");

/**
 * Executes the Workflow Optimizer Agent pipeline.
 * 1. Fetches pending tasks from MongoDB.
 * 2. Connects to Gemini 2.5 Flash to analyze them.
 * 3. Parses structured JSON updates.
 * 4. Calls database write tools to update MongoDB with the AI analytics.
 * @returns {Promise<Object>} Execution report.
 */
async function runWorkflowOptimizer() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not defined in backend .env.");
  }

  // 1. Fetch pending tasks from MongoDB using the dbTool
  const pendingTasks = await dbTools.fetchPendingTasks();
  if (!pendingTasks || pendingTasks.length === 0) {
    return {
      message: "No pending (todo or in-progress) tasks found in the database. Agent is idle.",
      updatedTasksCount: 0,
      tasks: []
    };
  }

  // 2. Initialize Google Generative AI SDK & Model
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel(
    { model: "gemini-2.5-flash" },
    { apiVersion: "v1beta" }
  );

  // 3. Format the tasks for the prompt to supply clean context
  const currentLocalTime = new Date().toLocaleString();
  const formattedTasks = pendingTasks.map((task) => ({
    id: task._id.toString(),
    title: task.title,
    description: task.description || "No description provided.",
    status: task.status,
    priority: task.priority,
    deadline: task.deadline,
    assignee: task.assignedTo
      ? {
          name: task.assignedTo.name,
          role: task.assignedTo.role,
          email: task.assignedTo.email
        }
      : "Unassigned",
    workspace: task.workspaceId
      ? {
          title: task.workspaceId.title,
          description: task.workspaceId.description
        }
      : "General"
  }));

  const systemPrompt = `
You are the FlowTrack Workflow Optimizer Agent, an autonomous decision engine powered by the Google Antigravity Agent Framework.
Your goal is to optimize the team task queue by identifying task completion risks, dividing tasks into micro-subtasks, and drafting smart summaries.

Analyze the following pending tasks in FlowTrack. The current time is: ${currentLocalTime}.

### Pending Tasks:
${JSON.stringify(formattedTasks, null, 2)}

### Guidelines for your analysis:
For EACH task in the list, generate:
1. "aiSubTasks": Exactly 3 actionable, highly specific micro-subtasks (as an array of 3 strings) that the assignee can perform to make concrete progress on this specific task.
2. "aiRiskScore": An integer from 0 to 100 representing the risk/probability that this task will not be completed before its deadline. Consider:
   - Overdue tasks (deadline in the past) that are not done: Risk Score 90-100.
   - Tasks with less than 24-48 hours remaining: Risk Score 70-90 (depending on priority).
   - Tasks with plenty of time remaining: Risk Score 10-40.
   - Consider the assignee's role alignment to the task's complexity.
3. "aiSummary": A concise 1-2 sentence diagnostic overview. Mention the deadline state, workload, user assignment suitability, and specific recommendations (e.g., "John is assigned to database migrations; this matches his backend role perfectly. High urgency due to deadline tomorrow.").

### Output Format:
Return your response EXACTLY as a valid JSON array of objects, where each object matches this structure:
[
  {
    "taskId": "string (the task id)",
    "aiSubTasks": ["string", "string", "string"],
    "aiRiskScore": number (integer between 0 and 100),
    "aiSummary": "string (brief summary)"
  }
]
`;

  // 4. Generate structured content with application/json mode
  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: systemPrompt }] }],
    generationConfig: {
      responseMimeType: "application/json"
    }
  });

  const responseText = result.response.text();
  let taskUpdates;
  try {
    taskUpdates = JSON.parse(responseText);
  } catch (parseError) {
    console.error("Failed to parse Gemini output as JSON. Raw response text was:", responseText);
    throw new Error("Workflow Optimizer Agent received invalid response structure from Gemini API.");
  }

  if (!Array.isArray(taskUpdates)) {
    throw new Error("Workflow Optimizer Agent expected a JSON Array from Gemini, but received a different type.");
  }

  // 5. Update the database using the second dbTool (Self-Muting mutating operations!)
  const updatedTasks = [];
  for (const update of taskUpdates) {
    const { taskId, aiSubTasks, aiRiskScore, aiSummary } = update;
    if (!taskId) continue;

    // Validate and clean subtasks
    const cleanSubTasks = Array.isArray(aiSubTasks) ? aiSubTasks.slice(0, 3) : [];
    while (cleanSubTasks.length < 3) {
      cleanSubTasks.push(`Milestone step ${cleanSubTasks.length + 1}`);
    }

    const cleanRiskScore =
      typeof aiRiskScore === "number" ? Math.min(100, Math.max(0, Math.round(aiRiskScore))) : 50;

    const cleanSummary = aiSummary || "Analysis completed by Antigravity AI Agent.";

    const updatedTask = await dbTools.updateTaskAIMetadata(taskId, {
      aiSubTasks: cleanSubTasks,
      aiRiskScore: cleanRiskScore,
      aiSummary: cleanSummary
    });

    if (updatedTask) {
      updatedTasks.push(updatedTask);
    }
  }

  return {
    message: "Workflow Optimizer Agent executed successfully.",
    updatedTasksCount: updatedTasks.length,
    tasks: updatedTasks
  };
}

module.exports = {
  runWorkflowOptimizer
};
