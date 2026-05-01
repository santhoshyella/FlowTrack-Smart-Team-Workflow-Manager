const express = require("express");
const {
  createTask,
  getTaskAnalytics,
  getTasks,
  updateTaskStatus
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.use(protect);

router.get("/analytics/summary", asyncHandler(getTaskAnalytics));
router.route("/").get(asyncHandler(getTasks)).post(authorizeRoles("admin"), asyncHandler(createTask));
router.patch("/:id/status", asyncHandler(updateTaskStatus));

module.exports = router;
