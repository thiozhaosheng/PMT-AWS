const { Parser } = require("json2csv");
const PDFDocument = require("pdfkit");
const systemModel = require("../models/systemModel");
const clientModel = require("../models/clientModel");
const userModel = require("../models/userModel");
const patchModel = require("../models/patchModel");

function sendCSV(res, data, type) {
  if (!data.length) return res.status(404).json({ error: "No data found" });
  const fields = Object.keys(data[0]);
  const parser = new Parser({ fields });
  const csv = parser.parse(data);
  res.header("Content-Type", "text/csv");
  res.attachment(`${type}_report.csv`);
  res.send(csv);
}

function sendPDF(res, data, type) {
  if (!data.length) return res.status(404).json({ error: "No data found" });

  const doc = new PDFDocument({ margin: 30, size: "A4" });
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${type}_report.pdf`
  );
  doc.pipe(res);

  doc
    .fontSize(18)
    .text(`${type.charAt(0).toUpperCase() + type.slice(1)} Report`, {
      align: "center",
    });
  doc.moveDown();

  const headers = Object.keys(data[0]);
  headers.forEach((header) => {
    doc.font("Helvetica-Bold").fontSize(10).text(header, {
      continued: true,
      width: 100,
      underline: true,
    });
    doc.text("  ", { continued: true });
  });
  doc.moveDown(0.5);

  data.forEach((row) => {
    headers.forEach((header) => {
      let text = row[header] === null ? "" : String(row[header]);
      if (text.length > 15) text = text.slice(0, 15) + "...";
      doc.font("Helvetica").fontSize(9).text(text, {
        continued: true,
        width: 100,
      });
      doc.text("  ", { continued: true });
    });
    doc.moveDown(0.5);
  });

  doc.end();
}

async function downloadUsersCSV(req, res) {
  try {
    const data = await userModel.getAllUsers();
    sendCSV(res, data, "users");
  } catch {
    res.status(500).json({ error: "Server error" });
  }
}

async function downloadUsersPDF(req, res) {
  try {
    const data = await userModel.getAllUsers();
    sendPDF(res, data, "users");
  } catch {
    res.status(500).json({ error: "Server error" });
  }
}

async function downloadSystemsCSV(req, res) {
  try {
    let data;
    if (req.user.role === "admin") {
      data = await systemModel.getAllSystems();
    } else {
      data = await systemModel.getSystemsByUserId(req.user.user_id);
    }
    sendCSV(res, data, "systems");
  } catch {
    res.status(500).json({ error: "Server error" });
  }
}

async function downloadSystemsPDF(req, res) {
  try {
    let data;
    if (req.user.role === "admin") {
      data = await systemModel.getAllSystems();
    } else {
      data = await systemModel.getSystemsByUserId(req.user.user_id);
    }
    sendPDF(res, data, "systems");
  } catch {
    res.status(500).json({ error: "Server error" });
  }
}

async function downloadClientsCSV(req, res) {
  try {
    let data;
    if (req.user.role === "admin") {
      data = await clientModel.getAllClients();
    } else {
      data = await clientModel.getClientsByUserId(req.user.user_id);
    }
    sendCSV(res, data, "clients");
  } catch {
    res.status(500).json({ error: "Server error" });
  }
}

async function downloadClientsPDF(req, res) {
  try {
    let data;
    if (req.user.role === "admin") {
      data = await clientModel.getAllClients();
    } else {
      data = await clientModel.getClientsByUserId(req.user.user_id);
    }
    sendPDF(res, data, "clients");
  } catch {
    res.status(500).json({ error: "Server error" });
  }
}

async function downloadPatchesCSV(req, res) {
  try {
    let data;
    if (req.user.role === "admin") {
      data = await patchModel.getAllPatches();
    } else {
      data = await patchModel.getPatchesByUserId(req.user.user_id);
    }
    sendCSV(res, data, "patches");
  } catch {
    res.status(500).json({ error: "Server error" });
  }
}

async function downloadPatchesPDF(req, res) {
  try {
    let data;
    if (req.user.role === "admin") {
      data = await patchModel.getAllPatches();
    } else {
      data = await patchModel.getPatchesByUserId(req.user.user_id);
    }
    sendPDF(res, data, "patches");
  } catch {
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  downloadCSV: async (req, res) =>
    res.status(400).json({ error: "Use specific routes for each report" }),
  downloadPDF: async (req, res) =>
    res.status(400).json({ error: "Use specific routes for each report" }),
  downloadUsersCSV,
  downloadUsersPDF,
  downloadSystemsCSV,
  downloadSystemsPDF,
  downloadClientsCSV,
  downloadClientsPDF,
  downloadPatchesCSV,
  downloadPatchesPDF,
};
