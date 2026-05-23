const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const asyncHandler = require("../utils/asyncHandler");
const { runWorkflowOptimizer } = require("../agents/optimizerAgent");

const router = express.Router();

// Apply auth middleware to protect all routes in this router
router.use(protect);

/**
 * POST /api/run-agent
 * Triggers the Antigravity Workflow Optimizer Agent.
 * Only accessible by administrators.
 */
router.post(
  "/run-agent",
  authorizeRoles("admin"),
  asyncHandler(async (req, res) => {
    console.log("Antigravity AI Agent triggered by:", req.user.email);
    const report = await runWorkflowOptimizer();
    res.json(report);
  })
);

module.exports = router;
