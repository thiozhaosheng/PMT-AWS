const clientModel = require("../models/clientModel");

async function getAllClients(req, res) {
  try {
    const clients = await clientModel.getAllClients();
    res.json(clients);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
}

async function getClientById(req, res) {
  try {
    const client = await clientModel.getClientById(parseInt(req.params.id));
    if (!client) return res.status(404).json({ error: "Client not found" });
    res.json(client);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
}

async function createClient(req, res) {
  try {
    const newClient = await clientModel.createClient(req.body);
    res.status(201).json(newClient);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
}

async function updateClient(req, res) {
  try {
    const id = parseInt(req.params.id);
    const updatedClient = await clientModel.updateClientById(id, req.body);
    if (!updatedClient) {
      return res
        .status(404)
        .json({ error: "Client not found or no changes made" });
    }
    res.json(updatedClient);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
}

async function deleteClient(req, res) {
  try {
    const result = await clientModel.deleteClientById(parseInt(req.params.id));
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: "Client not found" });
    }
    res.json({ message: "Client deleted successfully" });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
}

async function getAssignedClients(req, res) {
  try {
    const userId = req.user.user_id;
    const clients = await clientModel.getClientsByUserId(userId);
    res.json(clients);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  getAssignedClients,
};
