const { poolPromise } = require("../dbConfig");

async function getAllClients() {
  const pool = await poolPromise;
  const result = await pool.request().query("SELECT * FROM Clients");
  return result.recordset;
}

async function getClientById(id) {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("id", id)
    .query("SELECT * FROM Clients WHERE client_id = @id");
  return result.recordset[0];
}

async function createClient(data) {
  const { company_name, industry, contact_email } = data;
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("company_name", company_name)
    .input("industry", industry)
    .input("contact_email", contact_email)
    .query(
      "INSERT INTO Clients (company_name, industry, contact_email) VALUES (@company_name, @industry, @contact_email); SELECT SCOPE_IDENTITY() AS client_id;"
    );
  const newClientId = result.recordset[0].client_id;
  return getClientById(newClientId);
}

async function updateClientById(id, data) {
  const { company_name, industry, contact_email } = data;
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("id", id)
    .input("company_name", company_name)
    .input("industry", industry)
    .input("contact_email", contact_email).query(`
      UPDATE Clients 
      SET company_name = @company_name, industry = @industry, contact_email = @contact_email
      WHERE client_id = @id
    `);

  if (result.rowsAffected[0] === 0) return null;
  return getClientById(id);
}

async function deleteClientById(id) {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("id", id)
    .query("DELETE FROM Clients WHERE client_id = @id");
  return result;
}

async function getClientsByUserId(userId) {
  const pool = await poolPromise;
  const result = await pool.request().input("userId", userId).query(`
      SELECT DISTINCT c.*
      FROM Clients c
      JOIN Systems s ON c.client_id = s.client_id
      JOIN UserSystemMap usm ON s.system_id = usm.system_id
      WHERE usm.user_id = @userId
    `);
  return result.recordset;
}

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClientById,
  deleteClientById,
  getClientsByUserId,
};
