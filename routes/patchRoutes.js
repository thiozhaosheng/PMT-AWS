const express = require("express");
const router = express.Router();
const patchController = require("../controllers/patchController");
const verifyToken = require("../middlewares/verifyToken");
const authorizeRole = require("../middlewares/authorizeRole");

router.get("/", verifyToken, patchController.getAllPatches);
router.get("/:id", verifyToken, patchController.getPatchById);
router.post(
  "/",
  verifyToken,
  authorizeRole(["engineer", "admin"]),
  patchController.createPatch
);
router.put(
  "/:id",
  verifyToken,
  authorizeRole(["engineer", "admin"]),
  patchController.updatePatch
);
router.delete(
  "/:id",
  verifyToken,
  authorizeRole("admin"),
  patchController.deletePatch
);

module.exports = router;
