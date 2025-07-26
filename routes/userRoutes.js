const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken");
const authorizeRole = require("../middlewares/authorizeRole");

router.get("/", verifyToken, userController.getAllUsers);
router.get("/:id", verifyToken, userController.getUserById);
router.post(
  "/",
  verifyToken,
  authorizeRole("admin"),
  userController.createUser
);
router.put(
  "/:id",
  verifyToken,
  authorizeRole("admin"),
  userController.updateUser // new update method
);
router.delete(
  "/:id",
  verifyToken,
  authorizeRole("admin"),
  userController.deleteUser
);

module.exports = router;
