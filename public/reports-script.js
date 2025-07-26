const token = localStorage.getItem("token");
const usernameDisplay = document.getElementById("usernameDisplay");
const logoutBtn = document.getElementById("logoutBtn");
const reportTypeSelect = document.getElementById("reportType");
const downloadCSVBtn = document.getElementById("downloadCSV");
const downloadPDFBtn = document.getElementById("downloadPDF");
const usersLink = document.getElementById("usersLink");

let userRole = null;

if (!token) {
  window.location.href = "login.html";
} else {
  const payloadBase64 = token.split(".")[1];
  if (payloadBase64) {
    const payload = JSON.parse(atob(payloadBase64));
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      localStorage.clear();
      window.location.href = "login.html";
    } else {
      usernameDisplay.textContent = payload.username || "User";
      userRole = payload.role;
      if (userRole !== "admin") {
        for (let i = 0; i < reportTypeSelect.options.length; i++) {
          if (reportTypeSelect.options[i].value === "users") {
            reportTypeSelect.remove(i);
            break;
          }
        }
        if (usersLink) {
          usersLink.style.display = "none";
        }
      }
    }
  }
}

const reportsLink = document.querySelector('a[href="reports.html"]');
if (reportsLink) {
  reportsLink.classList.add(
    "bg-indigo-100",
    "text-indigo-700",
    "font-semibold"
  );
}

logoutBtn.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "login.html";
});

function downloadReport(format) {
  const type = reportTypeSelect.value;
  const token = localStorage.getItem("token");
  fetch(`/reports/${type}/${format}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to download ${format}`);
      return res.blob();
    })
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${type}_report.${format}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    })
    .catch((err) => alert(err.message));
}

downloadCSVBtn.addEventListener("click", () => downloadReport("csv"));
downloadPDFBtn.addEventListener("click", () => downloadReport("pdf"));
