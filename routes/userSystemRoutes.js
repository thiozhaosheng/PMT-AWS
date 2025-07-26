const express = require("express");
const router = express.Router();
const userSystemController = require("../controllers/userSystemController");
const verifyToken = require("../middlewares/verifyToken");
const authorizeRole = require("../middlewares/authorizeRole");

router.post(
  "/",
  verifyToken,
  authorizeRole("admin"),
  userSystemController.assignSystemToUser
);
router.get("/me", verifyToken, userSystemController.getSystemsForCurrentUser);
router.get(
  "/all",
  verifyToken,
  authorizeRole("admin"),
  userSystemController.getAllMappings
);

module.exports = router;
