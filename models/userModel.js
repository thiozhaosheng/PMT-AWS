const { poolPromise } = require("../dbConfig");
const bcrypt = require("bcrypt");

async function getAllUsers() {
  const pool = await poolPromise;
  const result = await pool.request().query("SELECT * FROM Users");
  return result.recordset;
}

async function getUserById(id) {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("id", id)
    .query("SELECT * FROM Users WHERE user_id = @id");
  return result.recordset[0];
}

async function createUser(userData) {
  const { username, password, role } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);

  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("username", username)
    .input("password", hashedPassword)
    .input("role", role)
    .query(
      "INSERT INTO Users (username, password, role) VALUES (@username, @password, @role); SELECT SCOPE_IDENTITY() AS user_id;"
    );

  const newUserId = result.recordset[0].user_id;
  return getUserById(newUserId);
}

async function updateUserById(id, userData) {
  const pool = await poolPromise;
  const { username, password, role } = userData;

  let query;
  let request = pool
    .request()
    .input("id", id)
    .input("username", username)
    .input("role", role);

  if (password && password.trim() !== "") {
    // Hash the new password if provided
    const hashedPassword = await bcrypt.hash(password, 10);
    request = request.input("password", hashedPassword);
    query = `
      UPDATE Users 
      SET username = @username, password = @password, role = @role
      WHERE user_id = @id
    `;
  } else {
    // Update without changing password
    query = `
      UPDATE Users 
      SET username = @username, role = @role
      WHERE user_id = @id
    `;
  }

  const result = await request.query(query);

  // If rowsAffected is 0, no row was updated (maybe wrong ID)
  if (result.rowsAffected[0] === 0) return null;

  // Return the updated user data
  return getUserById(id);
}

async function deleteUserById(id) {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("id", id)
    .query("DELETE FROM Users WHERE user_id = @id");
  return result;
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
