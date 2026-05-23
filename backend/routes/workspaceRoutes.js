const express = require("express");
const {
  addMember,
  createWorkspace,
  getWorkspaceById,
  getWorkspaces
} = require("../controllers/workspaceController");
const { protect } = require("../middleware/authMiddleware");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.use(protect);

router.route("/").get(asyncHandler(getWorkspaces)).post(asyncHandler(createWorkspace));
router.get("/:id", asyncHandler(getWorkspaceById));
router.post("/:id/members", asyncHandler(addMember));

module.exports = router;
