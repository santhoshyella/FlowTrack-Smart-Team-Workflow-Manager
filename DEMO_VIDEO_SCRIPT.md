# FlowTrack Demo Video Script

Use this as a spoken script while recording your project demo. The flow starts from account creation and ends by showing role-based access, workspace management, task creation, task board filtering, and member status updates.

## Recommended Demo Length

Target duration: 5 to 7 minutes.

## Important Demo Order

Create the member account first, then create the admin account. The admin can add members to a workspace by email, so the member must already exist in the system.

## Sample Details To Fill

### Member Account

- Name: Rohan Designer
- Email: rohan.member.demo@example.com
- Password: Demo@123
- Role: Member

### Admin Account

- Name: Asha Project Manager
- Email: asha.admin.demo@example.com
- Password: Demo@123
- Role: Admin

### Workspace

- Workspace title: Client Website Redesign
- Description: Manage design, development, and QA work for the new client website launch.

### Tasks

If you are recording around May 2, 2026, use these dates. If recording later, keep the same idea: one overdue task, one near deadline task, and one normal future task.

1. Task title: Final QA checklist
   - Assigned to: Rohan Designer
   - Priority: High priority
   - Status: Todo
   - Deadline: May 1, 2026, 6:00 PM
   - Description: Verify links, responsiveness, form validation, and final client-ready checks.

2. Task title: Design landing page wireframe
   - Assigned to: Rohan Designer
   - Priority: High priority
   - Status: Todo
   - Deadline: May 3, 2026, 6:00 PM
   - Description: Create a clean wireframe for hero section, services section, and contact flow.

3. Task title: Build responsive homepage UI
   - Assigned to: Asha Project Manager
   - Priority: Medium priority
   - Status: In progress
   - Deadline: May 10, 2026, 5:00 PM
   - Description: Convert the approved layout into a responsive React interface.

## Scene By Scene Script

### 1. Opening Introduction

Action: Show the FlowTrack signup or login page.

Narration:

"Hello, today I am demonstrating FlowTrack, a smart team workflow management application built using the MERN stack. The main purpose of this project is to help small teams manage work in one place. Admins can create workspaces, add members, assign tasks with priorities and deadlines, and members can view their assigned tasks and update progress."

"The project also includes role-based access control, so admins and members get different permissions based on their role."

### 2. Create A Member Account First

Action: Go to the Signup page and fill the member account details.

Fill:

- Name: Rohan Designer
- Email: rohan.member.demo@example.com
- Password: Demo@123
- Role: Member

Narration:

"First, I am creating a normal member account. In FlowTrack, a member represents a team member who receives assigned tasks. Members can view workspaces they are added to, see only their assigned tasks, and update task status."

Action: Click Create account. After reaching the dashboard, show that the role chip says member.

Narration:

"After signup, the user is logged in and redirected to the dashboard. Since this is a member account, workspace creation controls are not shown. This is the first example of role-based access."

Action: Click Logout.

### 3. Create An Admin Account

Action: Go to Signup again and fill the admin account details.

Fill:

- Name: Asha Project Manager
- Email: asha.admin.demo@example.com
- Password: Demo@123
- Role: Admin

Narration:

"Now I am creating an admin account. The admin role is used for project managers or team leads. Admins can create workspaces, add members, create tasks, and monitor the full workflow."

Action: Click Create account.

Narration:

"During signup and login, the backend securely handles authentication. Passwords are hashed before storing them in MongoDB, and after login the app uses a JWT token to access protected routes."

### 4. Show Admin Dashboard

Action: Stay on the Dashboard page.

Narration:

"This is the admin dashboard. At the top, we can see analytics like total tasks, todo tasks, in progress tasks, overdue tasks, near deadline tasks, and high priority tasks. These values are calculated from the database and help the admin quickly understand workload and risk."

"Since this is a new account, the dashboard is mostly empty. Now I will create a workspace."

### 5. Create Workspace

Action: In the Create Workspace section, fill the workspace form.

Fill:

- Workspace title: Client Website Redesign
- Description: Manage design, development, and QA work for the new client website launch.

Action: Click Create.

Narration:

"A workspace is like a project area. It groups related members and tasks together. In this example, I am creating a workspace for a client website redesign project. Only admins can create workspaces, and the creator automatically becomes the workspace owner."

Action: Open the newly created workspace card.

### 6. Add Member To Workspace

Action: In the Members section, enter the member email.

Fill:

- Member email: rohan.member.demo@example.com

Action: Click Add.

Narration:

"Inside the workspace, the admin can manage members. I am adding the member account I created earlier by email. This makes the member part of this workspace, so tasks can now be assigned to that user."

"This also shows owner-based permission. Only the workspace creator can add members or manage tasks inside this workspace."

### 7. Create Tasks As Admin

Action: In the Create Task form, create Task 1.

Fill:

- Task title: Final QA checklist
- Assignee: Rohan Designer
- Priority: High priority
- Status: Todo
- Deadline: May 1, 2026, 6:00 PM
- Description: Verify links, responsiveness, form validation, and final client-ready checks.

Narration:

"Now I will create a high priority task for Rohan. I am setting the deadline in the past to demonstrate overdue highlighting. FlowTrack calculates the deadline state and highlights risky tasks."

Action: Click Create Task.

Action: Create Task 2.

Fill:

- Task title: Design landing page wireframe
- Assignee: Rohan Designer
- Priority: High priority
- Status: Todo
- Deadline: May 3, 2026, 6:00 PM
- Description: Create a clean wireframe for hero section, services section, and contact flow.

Narration:

"This second task is also high priority, but its deadline is near. The system treats tasks due within 48 hours as near deadline, so they can be brought to attention before they become overdue."

Action: Click Create Task.

Action: Create Task 3.

Fill:

- Task title: Build responsive homepage UI
- Assignee: Asha Project Manager
- Priority: Medium priority
- Status: In progress
- Deadline: May 10, 2026, 5:00 PM
- Description: Convert the approved layout into a responsive React interface.

Narration:

"This third task is assigned to the admin and has a normal future deadline. This gives the workspace a mix of overdue, urgent, and normal tasks."

Action: Click Create Task.

### 8. Explain Smart Sorting

Action: Show the Tasks section in the workspace.

Narration:

"The tasks are displayed using smart sorting. Instead of simply sorting by creation time, FlowTrack prioritizes tasks by deadline state first, then priority, and then nearest deadline. This helps the team focus on the most important work first."

"For example, overdue and high priority tasks appear before normal future tasks, making the dashboard useful for daily planning."

### 9. Show Task Board

Action: Click Task Board in the navbar.

Narration:

"Next, I am opening the Task Board. This gives a Kanban-style view of tasks grouped by status: Todo, In progress, and Done."

Action: Show the status filters and priority dropdown.

Narration:

"The board also supports filtering by status and priority. For example, I can filter only high priority tasks to quickly see urgent work."

Action: Select High priority from the priority filter, then switch back to All priorities.

### 10. Update Task Status As Admin

Action: Change one task status from Todo to In progress.

Narration:

"Task status can be updated directly from the task card. When a status changes, the frontend calls the backend API and the task moves to the correct column without needing a page refresh."

Action: Go back to Dashboard.

Narration:

"Back on the dashboard, the analytics update to reflect the task status change. This gives the admin a quick overview of progress across the workspace."

### 11. Demonstrate Member Login And Role-Based Access

Action: Logout from admin account.

Action: Login with the member account.

Fill:

- Email: rohan.member.demo@example.com
- Password: Demo@123

Narration:

"Now I am logging in as the member user. This is important because FlowTrack behaves differently based on role."

Action: Show the member dashboard.

Narration:

"As a member, I can see the dashboard and the workspace I was added to, but I cannot create new workspaces. I also cannot create tasks or add other members. This keeps planning permissions with the admin and lets members focus on execution."

Action: Open the workspace.

Narration:

"Inside the workspace, the member can see the tasks assigned to them. The Create Task and Add Member forms are not available because this user is not the workspace owner and does not have admin permissions."

### 12. Member Updates Assigned Task

Action: Change Rohan's task from Todo or In progress to Done.

Narration:

"The member can update the status of their own assigned tasks. For example, I can mark this task as done. This is the main member workflow: view assigned work, track deadlines, and update progress."

Action: Open Task Board as member.

Narration:

"On the Task Board, the member sees their own task queue. This prevents users from seeing unrelated tasks and supports data privacy inside the team."

### 13. Technical Summary

Action: Return to Dashboard or keep Task Board visible.

Narration:

"Technically, FlowTrack uses React and Vite on the frontend, Node.js and Express on the backend, and MongoDB for storing users, workspaces, and tasks."

"Authentication is handled using JWT. Passwords are secured using bcrypt hashing. The backend uses middleware to protect routes and authorize admin-only actions. MongoDB relationships connect users to workspaces and tasks, and indexes are used on common task fields like assignee, status, workspace, and deadline."

### 14. Closing

Action: Show dashboard or task board as final screen.

Narration:

"To summarize, FlowTrack solves the problem of scattered team task management by giving teams one place to create workspaces, assign work, track progress, and identify urgent deadlines. The strongest part of the project is the clear role-based workflow: admins plan and assign work, while members execute tasks and update status."

"This completes my demo of FlowTrack, the Smart Team Workflow Manager."

## Short Backup Script

Use this if you need a shorter 2 to 3 minute version.

"FlowTrack is a MERN stack smart workflow management application for small teams. It solves the problem of scattered task tracking by providing a central place for workspaces, members, task assignments, deadlines, and progress updates."

"First, I create a member account. Members can view assigned tasks and update status, but they cannot create workspaces or tasks. Next, I create an admin account. The admin can create a workspace, add members by email, and assign tasks with priority, status, and deadline."

"Here I create a workspace called Client Website Redesign and add the member to it. Then I create three tasks: one overdue high priority task, one near deadline high priority task, and one normal future task. FlowTrack uses smart sorting, so overdue and urgent tasks appear first."

"On the Task Board, tasks are grouped into Todo, In progress, and Done. I can also filter tasks by priority. When I update a task status, the UI reflects the change immediately."

"Finally, I log in as the member. The member can see only their relevant workspace and assigned tasks, and they can update their own task status. This demonstrates role-based access control clearly."

"The project uses React with Vite, Express and Node.js, MongoDB, JWT authentication, bcrypt password hashing, and backend middleware for authorization. FlowTrack is simple, practical, and useful for team workflow management."

