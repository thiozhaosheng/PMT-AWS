const { poolPromise } = require("../dbConfig");

async function getAllSystems() {
  const pool = await poolPromise;
  const result = await pool.request().query(`
    SELECT s.system_id, s.system_name, s.os_type, s.ip_address, s.client_id, c.company_name 
    FROM Systems s
    LEFT JOIN Clients c ON s.client_id = c.client_id
  `);
  return result.recordset;
}

async function getSystemsByUserId(userId) {
  const pool = await poolPromise;
  const result = await pool.request().input("userId", userId).query(`
    SELECT s.system_id, s.system_name, s.os_type, s.ip_address, s.client_id, c.company_name 
    FROM Systems s
    JOIN UserSystemMap usm ON s.system_id = usm.system_id
    LEFT JOIN Clients c ON s.client_id = c.client_id
    WHERE usm.user_id = @userId
  `);
  return result.recordset;
}

async function getSystemById(id) {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("id", id)
    .query("SELECT * FROM Systems WHERE system_id = @id");
  return result.recordset[0];
}

async function createSystem(systemData) {
  const { system_name, os_type, ip_address, client_id } = systemData;
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("system_name", system_name)
    .input("os_type", os_type)
    .input("ip_address", ip_address)
    .input("client_id", client_id)
    .query(
      "INSERT INTO Systems (system_name, os_type, ip_address, client_id) VALUES (@system_name, @os_type, @ip_address, @client_id); SELECT SCOPE_IDENTITY() AS system_id;"
    );
  const newId = result.recordset[0].system_id;
  return getSystemById(newId);
}

async function updateSystemById(id, systemData) {
  const { system_name, os_type, ip_address, client_id } = systemData;
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("id", id)
    .input("system_name", system_name)
    .input("os_type", os_type)
    .input("ip_address", ip_address)
    .input("client_id", client_id).query(`
      UPDATE Systems
      SET system_name = @system_name, os_type = @os_type, ip_address = @ip_address, client_id = @client_id
      WHERE system_id = @id
    `);
  if (result.rowsAffected[0] === 0) return null;
  return getSystemById(id);
}

async function deleteSystem(id) {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("id", id)
    .query("DELETE FROM Systems WHERE system_id = @id");
  return result;
}

module.exports = {
  getAllSystems,
  getSystemsByUserId,
  getSystemById,
  createSystem,
  updateSystemById,
  deleteSystem,
};
