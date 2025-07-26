const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");
const verifyToken = require("../middlewares/verifyToken");
const authorizeRole = require("../middlewares/authorizeRole");

router.get("/assigned", verifyToken, clientController.getAssignedClients);

router.get("/", verifyToken, clientController.getAllClients);
router.get("/:id", verifyToken, clientController.getClientById);

router.post(
  "/",
  verifyToken,
  authorizeRole("admin"),
  clientController.createClient
);

router.put(
  "/:id",
  verifyToken,
  authorizeRole("admin"),
  clientController.updateClient
);

router.delete(
  "/:id",
  verifyToken,
  authorizeRole("admin"),
  clientController.deleteClient
);

module.exports = router;
