const express = require("express");
const {
  addMember,
  createWorkspace,
  getWorkspaceById,
  getWorkspaces
} = require("../controllers/workspaceController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.use(protect);

router.route("/").get(asyncHandler(getWorkspaces)).post(authorizeRoles("admin"), asyncHandler(createWorkspace));
router.get("/:id", asyncHandler(getWorkspaceById));
router.post("/:id/members", authorizeRoles("admin"), asyncHandler(addMember));

module.exports = router;
