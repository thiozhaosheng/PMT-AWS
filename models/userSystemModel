const { poolPromise } = require("../dbConfig");

async function assignSystemToUser(user_id, system_id) {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("user_id", user_id)
    .input("system_id", system_id)
    .query(
      "INSERT INTO UserSystemMap (user_id, system_id) VALUES (@user_id, @system_id)"
    );
  return result;
}

async function getSystemsByUserId(user_id) {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("user_id", user_id)
    .query(
      "SELECT s.* FROM Systems s INNER JOIN UserSystemMap m ON s.system_id = m.system_id WHERE m.user_id = @user_id"
    );
  return result.recordset;
}

async function getAllSystems() {
  const pool = await poolPromise;
  const result = await pool.request().query("SELECT * FROM Systems");
  return result.recordset;
}

async function getUserSystemMappings() {
  const pool = await poolPromise;
  const result = await pool.request().query(`
    SELECT usm.user_id, u.username, s.system_id, s.system_name
    FROM UserSystemMap usm
    JOIN Users u ON usm.user_id = u.user_id
    JOIN Systems s ON usm.system_id = s.system_id
  `);
  return result.recordset;
}

module.exports = {
  assignSystemToUser,
  getSystemsByUserId,
  getAllSystems,
  getUserSystemMappings,
};
