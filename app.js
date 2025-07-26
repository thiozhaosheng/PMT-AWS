const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const clientRoutes = require("./routes/clientRoutes");
const systemRoutes = require("./routes/systemRoutes");
const userSystemRoutes = require("./routes/userSystemRoutes");
const patchRoutes = require("./routes/patchRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const reportRoutes = require("./routes/reportRoutes");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

console.log("app.js running liao bro");

app.use(
  cors({
    origin: "https://patch.travisthio.com",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.redirect("/login.html");
});

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/clients", clientRoutes);
app.use("/systems", systemRoutes);
app.use("/user-systems", userSystemRoutes);
app.use("/patches", patchRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/reports", reportRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
