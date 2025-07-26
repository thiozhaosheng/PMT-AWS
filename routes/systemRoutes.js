const express = require("express");
const router = express.Router();
const systemController = require("../controllers/systemController");
const verifyToken = require("../middlewares/verifyToken");
const authorizeRole = require("../middlewares/authorizeRole");

router.get("/", verifyToken, systemController.getAllSystems);
router.get("/:id", verifyToken, systemController.getSystemById);
router.post(
  "/",
  verifyToken,
  authorizeRole("admin"),
  systemController.createSystem
);
router.put(
  "/:id",
  verifyToken,
  authorizeRole("admin"),
  systemController.updateSystem
);
router.delete(
  "/:id",
  verifyToken,
  authorizeRole("admin"),
  systemController.deleteSystem
);

module.exports = router;
