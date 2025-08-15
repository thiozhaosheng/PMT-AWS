const token = localStorage.getItem("token");

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
    }
  }
}

const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("sidebarToggle");
const logoutBtn = document.getElementById("logoutBtn");
const usernameDisplay = document.getElementById("usernameDisplay");
const usernameWelcome = document.getElementById("usernameWelcome");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("hidden");
});

const username = localStorage.getItem("username") || "User";
const role = localStorage.getItem("role") || "";

usernameDisplay.textContent = username;
usernameWelcome.textContent = username;

const usersLink = document.getElementById("usersLink");
if (role !== "admin" && usersLink) {
  usersLink.style.display = "none";
}

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  window.location.href = "login.html";
});

async function fetchDashboardData() {
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const countsRes = await fetch("/api/dashboard/counts", {
    headers,
    credentials: "include",
  });
  if (countsRes.ok) {
    const counts = await countsRes.json();
    document.getElementById("totalClients").textContent = counts.totalClients;
    document.getElementById("totalSystems").textContent = counts.totalSystems;
    document.getElementById("patchesApplied").textContent =
      counts.patchesApplied;
  }

  const patchStatusRes = await fetch("/api/dashboard/patch-status", {
    headers,
    credentials: "include",
  });
  if (patchStatusRes.ok) {
    const patchStatus = await patchStatusRes.json();
    patchStatusChart.data.datasets[0].data = [
      patchStatus.applied,
      patchStatus.pending,
      patchStatus.failed,
    ];
    patchStatusChart.update();
  }

  const patchHistoryRes = await fetch("/api/dashboard/patch-history", {
    headers,
    credentials: "include",
  });
  if (patchHistoryRes.ok) {
    const patchHistory = await patchHistoryRes.json();
    patchHistoryChart.data.labels = patchHistory.months;
    patchHistoryChart.data.datasets[0].data = patchHistory.counts;
    patchHistoryChart.update();
  }

  const recentPatchesRes = await fetch("/api/dashboard/recent-patches", {
    headers,
    credentials: "include",
  });
  if (recentPatchesRes.ok) {
    const recentPatches = await recentPatchesRes.json();
    renderRecentPatches(recentPatches);
  }
}

function renderRecentPatches(patches) {
  const recentPatchesList = document.getElementById("recentPatches");
  recentPatchesList.innerHTML = "";
  patches.forEach(({ systemName, patchName, patchDate, status }) => {
    const li = document.createElement("li");
    li.style.display = "grid";
    li.style.gridTemplateColumns = "1fr auto";
    li.style.alignItems = "center";
    li.style.gap = "10px";
    li.style.padding = "0.5rem 0";
    li.style.borderBottom = "1px solid #e5e7eb";

    const leftDiv = document.createElement("div");
    leftDiv.style.overflow = "hidden";

    const systemNameEl = document.createElement("span");
    systemNameEl.style.fontWeight = "600";
    systemNameEl.style.color = "#111827";
    systemNameEl.style.display = "block";
    systemNameEl.style.whiteSpace = "nowrap";
    systemNameEl.style.textOverflow = "ellipsis";
    systemNameEl.textContent = systemName;

    const patchNameEl = document.createElement("span");
    patchNameEl.style.fontSize = "0.875rem";
    patchNameEl.style.color = "#6b7280";
    patchNameEl.style.display = "block";
    patchNameEl.style.whiteSpace = "nowrap";
    patchNameEl.style.textOverflow = "ellipsis";
    patchNameEl.textContent = `${patchName} (${patchDate})`;

    leftDiv.appendChild(systemNameEl);
    leftDiv.appendChild(patchNameEl);

    const rightDiv = document.createElement("div");
    const statusColors = {
      Applied: "bg-green-500",
      Pending: "bg-yellow-400",
      Failed: "bg-red-500",
    };
    rightDiv.className = `px-4 py-1 rounded-full text-white font-semibold text-xs ${statusColors[status]}`;
    rightDiv.style.minWidth = "70px";
    rightDiv.style.textAlign = "center";
    rightDiv.textContent = status;

    li.appendChild(leftDiv);
    li.appendChild(rightDiv);

    recentPatchesList.appendChild(li);
  });
}

const patchCtx = document.getElementById("patchStatusChart").getContext("2d");
const patchStatusChart = new Chart(patchCtx, {
  type: "doughnut",
  data: {
    labels: ["Applied", "Pending", "Failed"],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ["#4F46E5", "#FBBF24", "#EF4444"],
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "bottom" } },
  },
});

const historyCtx = document
  .getElementById("patchHistoryChart")
  .getContext("2d");
const patchHistoryChart = new Chart(historyCtx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Patches Applied",
        data: [],
        fill: false,
        borderColor: "#4F46E5",
        tension: 0.3,
        pointBackgroundColor: "#4F46E5",
        pointRadius: 4,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true, stepSize: 1 },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "end",
        labels: {
          boxWidth: 12,
          padding: 20,
        },
      },
    },
  },
});

fetchDashboardData().catch(console.error);
