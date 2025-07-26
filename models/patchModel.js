const { poolPromise } = require("../dbConfig");

async function getAllPatches() {
  const pool = await poolPromise;
  const result = await pool.request().query(`
    SELECT p.*, s.system_name, c.company_name
    FROM Patches p
    LEFT JOIN Systems s ON p.system_id = s.system_id
    LEFT JOIN Clients c ON s.client_id = c.client_id
  `);
  return result.recordset;
}

async function getPatchById(id) {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("id", id)
    .query("SELECT * FROM Patches WHERE patch_id = @id");
  return result.recordset[0];
}

async function checkDuplicatePatch(system_id, patch_date) {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("system_id", system_id)
    .input("patch_date", patch_date).query(`
      SELECT COUNT(*) AS count
      FROM Patches
      WHERE system_id = @system_id AND patch_date = @patch_date
    `);
  return result.recordset[0].count > 0;
}

async function createPatch(patchData) {
  const { patch_name, patched, patch_date, notes, system_id } = patchData;
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("patch_name", patch_name)
    .input("patched", patched)
    .input("patch_date", patch_date)
    .input("notes", notes)
    .input("system_id", system_id).query(`
      INSERT INTO Patches (patch_name, patched, patch_date, notes, system_id)
      VALUES (@patch_name, @patched, @patch_date, @notes, @system_id);
      SELECT SCOPE_IDENTITY() AS patch_id;
    `);
  const newId = result.recordset[0].patch_id;
  return getPatchById(newId);
}

async function updatePatch(id, patchData) {
  const { patch_name, patched, patch_date, notes } = patchData;
  const pool = await poolPromise;
  await pool
    .request()
    .input("id", id)
    .input("patch_name", patch_name)
    .input("patched", patched)
    .input("patch_date", patch_date)
    .input("notes", notes).query(`
      UPDATE Patches SET
        patch_name = @patch_name,
        patched = @patched,
        patch_date = @patch_date,
        notes = @notes
      WHERE patch_id = @id
    `);
  return getPatchById(id);
}

async function deletePatch(id) {
  const pool = await poolPromise;
  await pool
    .request()
    .input("id", id)
    .query("DELETE FROM Patches WHERE patch_id = @id");
}

async function getPatchesByUserId(userId) {
  const pool = await poolPromise;
  const result = await pool.request().input("userId", userId).query(`
      SELECT p.*, s.system_name, c.company_name
      FROM Patches p
      JOIN Systems s ON p.system_id = s.system_id
      JOIN UserSystemMap usm ON s.system_id = usm.system_id
      JOIN Clients c ON s.client_id = c.client_id
      WHERE usm.user_id = @userId
    `);
  return result.recordset;
}

module.exports = {
  getAllPatches,
  getPatchById,
  checkDuplicatePatch,
  createPatch,
  updatePatch,
  deletePatch,
  getPatchesByUserId,
};
