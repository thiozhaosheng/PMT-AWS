const patchModel = require("../models/patchModel");

async function getAllPatches(req, res) {
  try {
    const patches = await patchModel.getAllPatches();
    res.json(patches);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

async function getPatchById(req, res) {
  try {
    const patch = await patchModel.getPatchById(parseInt(req.params.id));
    if (!patch) return res.status(404).json({ message: "Patch not found" });
    res.json(patch);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

async function createPatch(req, res) {
  try {
    const patchData = req.body;

    const exists = await patchModel.checkDuplicatePatch(
      patchData.system_id,
      patchData.patch_date
    );
    if (exists) {
      return res
        .status(409)
        .json({ message: "Duplicate patch for this system and date" });
    }

    const newPatch = await patchModel.createPatch(patchData);
    res.status(201).json(newPatch);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

async function updatePatch(req, res) {
  try {
    const updatedPatch = await patchModel.updatePatch(
      parseInt(req.params.id),
      req.body
    );
    if (!updatedPatch)
      return res.status(404).json({ message: "Patch not found" });
    res.json(updatedPatch);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

async function deletePatch(req, res) {
  try {
    await patchModel.deletePatch(parseInt(req.params.id));
    res.json({ message: "Patch deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  getAllPatches,
  getPatchById,
  createPatch,
  updatePatch,
  deletePatch,
};
