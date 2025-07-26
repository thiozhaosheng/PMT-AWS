const systemModel = require("../models/systemModel");

async function getAllSystems(req, res) {
  try {
    const userId = req.user.user_id;
    const userRole = req.user.role;

    let systems;
    if (userRole === "admin") {
      systems = await systemModel.getAllSystems();
    } else {
      systems = await systemModel.getSystemsByUserId(userId);
    }

    res.json(systems);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

async function getSystemById(req, res) {
  try {
    const id = parseInt(req.params.id);
    const system = await systemModel.getSystemById(id);
    if (!system) return res.status(404).json({ message: "System not found" });
    res.json(system);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

async function createSystem(req, res) {
  try {
    const systemData = req.body;
    const newSystem = await systemModel.createSystem(systemData);
    res.status(201).json(newSystem);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

async function updateSystem(req, res) {
  try {
    const id = parseInt(req.params.id);
    const systemData = req.body;
    const updatedSystem = await systemModel.updateSystemById(id, systemData);
    if (!updatedSystem)
      return res
        .status(404)
        .json({ message: "System not found or no changes" });
    res.json(updatedSystem);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

async function deleteSystem(req, res) {
  try {
    const id = parseInt(req.params.id);
    await systemModel.deleteSystem(id);
    res.json({ message: "System deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  getAllSystems,
  getSystemById,
  createSystem,
  updateSystem,
  deleteSystem,
};
