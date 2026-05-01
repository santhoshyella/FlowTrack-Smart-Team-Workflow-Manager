const express = require("express");
const { getMe, listUsers, login, signup } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.post("/signup", asyncHandler(signup));
router.post("/login", asyncHandler(login));
router.get("/me", protect, getMe);
router.get("/users", protect, authorizeRoles("admin"), asyncHandler(listUsers));

module.exports = router;
