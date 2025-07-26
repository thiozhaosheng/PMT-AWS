const { poolPromise } = require("../dbConfig");

async function getCounts(req, res) {
  try {
    const pool = await poolPromise;
    const { user_id, role } = req.user;

    let clientsResult, systemsResult, patchesResult;

    if (role === "admin") {
      clientsResult = await pool.request().query(`
        SELECT COUNT(*) AS totalClients FROM Clients
      `);

      systemsResult = await pool.request().query(`
        SELECT COUNT(*) AS totalSystems FROM Systems
      `);

      patchesResult = await pool.request().query(`
        SELECT COUNT(*) AS totalPatchesApplied FROM Patches WHERE patched = 1
      `);
    } else {
      clientsResult = await pool.request().input("userId", user_id).query(`
        SELECT COUNT(DISTINCT c.client_id) AS totalClients
        FROM UserSystemMap usm
        JOIN Systems s ON usm.system_id = s.system_id
        JOIN Clients c ON s.client_id = c.client_id
        WHERE usm.user_id = @userId
      `);

      systemsResult = await pool.request().input("userId", user_id).query(`
        SELECT COUNT(DISTINCT s.system_id) AS totalSystems
        FROM UserSystemMap usm
        JOIN Systems s ON usm.system_id = s.system_id
        WHERE usm.user_id = @userId
      `);

      patchesResult = await pool.request().input("userId", user_id).query(`
        SELECT COUNT(*) AS totalPatchesApplied
        FROM Patches p
        JOIN Systems s ON p.system_id = s.system_id
        JOIN UserSystemMap usm ON s.system_id = usm.system_id
        WHERE usm.user_id = @userId AND p.patched = 1
      `);
    }

    res.json({
      totalClients: clientsResult.recordset[0].totalClients,
      totalSystems: systemsResult.recordset[0].totalSystems,
      patchesApplied: patchesResult.recordset[0].totalPatchesApplied,
    });
  } catch (err) {
    console.error("Error getting dashboard counts:", err);
    res.status(500).json({ message: "Server error" });
  }
}

async function getPatchStatus(req, res) {
  try {
    const pool = await poolPromise;
    const { user_id, role } = req.user;

    let result;

    if (role === "admin") {
      result = await pool.request().query(`
        SELECT
          SUM(CASE WHEN patched = 1 THEN 1 ELSE 0 END) AS applied,
          SUM(CASE WHEN patched = 0 AND patch_date IS NULL THEN 1 ELSE 0 END) AS pending,
          SUM(CASE WHEN patched = 0 AND patch_date IS NOT NULL THEN 1 ELSE 0 END) AS failed
        FROM Patches
      `);
    } else {
      result = await pool.request().input("userId", user_id).query(`
        SELECT
          SUM(CASE WHEN p.patched = 1 THEN 1 ELSE 0 END) AS applied,
          SUM(CASE WHEN p.patched = 0 AND p.patch_date IS NULL THEN 1 ELSE 0 END) AS pending,
          SUM(CASE WHEN p.patched = 0 AND p.patch_date IS NOT NULL THEN 1 ELSE 0 END) AS failed
        FROM Patches p
        JOIN Systems s ON p.system_id = s.system_id
        JOIN UserSystemMap usm ON s.system_id = usm.system_id
        WHERE usm.user_id = @userId
      `);
    }

    res.json(result.recordset[0]);
  } catch (err) {
    console.error("Error getting patch status:", err);
    res.status(500).json({ message: "Server error" });
  }
}

async function getPatchHistory(req, res) {
  try {
    const pool = await poolPromise;
    const { user_id, role } = req.user;

    let result;

    if (role === "admin") {
      result = await pool.request().query(`
        SELECT
          FORMAT(patch_date, 'yyyy-MM') AS month,
          COUNT(*) AS count
        FROM Patches
        WHERE patch_date IS NOT NULL
        GROUP BY FORMAT(patch_date, 'yyyy-MM')
        ORDER BY month
      `);
    } else {
      result = await pool.request().input("userId", user_id).query(`
        SELECT
          FORMAT(p.patch_date, 'yyyy-MM') AS month,
          COUNT(*) AS count
        FROM Patches p
        JOIN Systems s ON p.system_id = s.system_id
        JOIN UserSystemMap usm ON s.system_id = usm.system_id
        WHERE p.patch_date IS NOT NULL AND usm.user_id = @userId
        GROUP BY FORMAT(p.patch_date, 'yyyy-MM')
        ORDER BY month
      `);
    }

    const months = [];
    const counts = [];

    result.recordset.forEach((row) => {
      months.push(row.month);
      counts.push(row.count);
    });

    res.json({ months, counts });
  } catch (err) {
    console.error("Error getting patch history:", err);
    res.status(500).json({ message: "Server error" });
  }
}

async function getRecentPatches(req, res) {
  try {
    const pool = await poolPromise;
    const { user_id, role } = req.user;

    let result;

    if (role === "admin") {
      result = await pool.request().query(`
        SELECT TOP 10 s.system_name AS systemName, p.patch_name AS patchName, p.patch_date AS patchDate,
          CASE 
            WHEN p.patched = 1 THEN 'Applied'
            WHEN p.patched = 0 AND p.patch_date IS NULL THEN 'Pending'
            ELSE 'Failed'
          END AS status
        FROM Patches p
        JOIN Systems s ON p.system_id = s.system_id
        ORDER BY p.patch_date DESC
      `);
    } else {
      result = await pool.request().input("userId", user_id).query(`
        SELECT TOP 10 s.system_name AS systemName, p.patch_name AS patchName, p.patch_date AS patchDate,
          CASE 
            WHEN p.patched = 1 THEN 'Applied'
            WHEN p.patched = 0 AND p.patch_date IS NULL THEN 'Pending'
            ELSE 'Failed'
          END AS status
        FROM Patches p
        JOIN Systems s ON p.system_id = s.system_id
        JOIN UserSystemMap usm ON s.system_id = usm.system_id
        WHERE usm.user_id = @userId
        ORDER BY p.patch_date DESC
      `);
    }

    res.json(result.recordset);
  } catch (err) {
    console.error("Error getting recent patches:", err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  getCounts,
  getPatchStatus,
  getPatchHistory,
  getRecentPatches,
};
