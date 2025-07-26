const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");
const verifyToken = require("../middlewares/verifyToken");
const authorizeRole = require("../middlewares/authorizeRole");

router.get(
  "/users/csv",
  verifyToken,
  authorizeRole("admin"),
  reportController.downloadCSV
);
router.get(
  "/users/pdf",
  verifyToken,
  authorizeRole("admin"),
  reportController.downloadPDF
);

router.get("/systems/csv", verifyToken, reportController.downloadSystemsCSV);
router.get("/systems/pdf", verifyToken, reportController.downloadSystemsPDF);

router.get("/clients/csv", verifyToken, reportController.downloadClientsCSV);
router.get("/clients/pdf", verifyToken, reportController.downloadClientsPDF);

router.get("/patches/csv", verifyToken, reportController.downloadPatchesCSV);
router.get("/patches/pdf", verifyToken, reportController.downloadPatchesPDF);

module.exports = router;
