const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const verifyToken = require("../middlewares/verifyToken");

router.get("/counts", verifyToken, dashboardController.getCounts);
router.get("/patch-status", verifyToken, dashboardController.getPatchStatus);
router.get("/patch-history", verifyToken, dashboardController.getPatchHistory);
router.get(
  "/recent-patches",
  verifyToken,
  dashboardController.getRecentPatches
);

module.exports = router;
