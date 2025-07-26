const token = localStorage.getItem("token");
const usernameDisplay = document.getElementById("usernameDisplay");
const logoutBtn = document.getElementById("logoutBtn");
const systemsTableBody = document.getElementById("systemsTableBody");
const noSystemsMsg = document.getElementById("noSystemsMsg");
const addSystemBtn = document.getElementById("addSystemBtn");
const systemModal = document.getElementById("systemModal");
const systemForm = document.getElementById("systemForm");
const modalTitle = document.getElementById("modalTitle");
const systemIdInput = document.getElementById("systemIdInput");
const systemNameInput = document.getElementById("systemNameInput");
const osTypeInput = document.getElementById("osTypeInput");
const ipAddressInput = document.getElementById("ipAddressInput");
const clientIdInput = document.getElementById("clientIdInput");
const cancelBtn = document.getElementById("cancelBtn");
const closeModalBtn = document.getElementById("closeModalBtn");

const usersLink = document.getElementById("usersLink");
const sidebarLinks = document.querySelectorAll("aside#sidebar nav a");
const systemsLink = document.querySelector('a[href="systems.html"]');

let clientsMap = {};
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
        addSystemBtn.style.display = "none";
        if (usersLink) usersLink.style.display = "none";
      }
    }
  }
}

// Clear all sidebar link highlights first
sidebarLinks.forEach((link) => {
  link.classList.remove("bg-indigo-100", "text-indigo-700", "font-semibold");
});

// Highlight only the Systems sidebar link
if (systemsLink) {
  systemsLink.classList.add(
    "bg-indigo-100",
    "text-indigo-700",
    "font-semibold"
  );
}

logoutBtn.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "login.html";
});

addSystemBtn.addEventListener("click", () => openModal());

cancelBtn.addEventListener("click", closeModal);
closeModalBtn.addEventListener("click", closeModal);

async function fetchClients() {
  const headers = { Authorization: `Bearer ${token}` };
  try {
    const res = await fetch("/clients", { headers });
    if (!res.ok) throw new Error("Failed to fetch clients");
    const clients = await res.json();
    clientsMap = {};
    clientIdInput.innerHTML = "";
    clients.forEach(({ client_id, company_name }) => {
      clientsMap[client_id] = company_name;
      const option = document.createElement("option");
      option.value = client_id;
      option.textContent = company_name;
      clientIdInput.appendChild(option);
    });
  } catch (err) {
    console.error("Error fetching clients:", err);
  }
}

function openModal(edit = false, system = null) {
  systemModal.classList.remove("hidden");
  if (edit && system) {
    modalTitle.textContent = "Edit System";
    systemIdInput.value = system.system_id;
    systemNameInput.value = system.system_name;
    osTypeInput.value = system.os_type;
    ipAddressInput.value = system.ip_address;
    clientIdInput.value = system.client_id;
  } else {
    modalTitle.textContent = "Add System";
    systemForm.reset();
    systemIdInput.value = "";
    clientIdInput.selectedIndex = 0;
  }
}

function closeModal() {
  systemModal.classList.add("hidden");
  systemForm.reset();
  systemIdInput.value = "";
}

async function fetchSystems() {
  await fetchClients();

  const headers = { Authorization: `Bearer ${token}` };
  try {
    const res = await fetch("/systems", { headers });
    if (!res.ok) throw new Error("Failed to fetch systems");
    const systems = await res.json();
    renderSystems(systems);
  } catch (err) {
    console.error(err);
    noSystemsMsg.classList.remove("hidden");
  }
}

function renderSystems(systems) {
  systemsTableBody.innerHTML = "";
  if (!systems || systems.length === 0) {
    noSystemsMsg.classList.remove("hidden");
    return;
  }
  noSystemsMsg.classList.add("hidden");

  systems.forEach(
    ({ system_id, system_name, os_type, ip_address, client_id }) => {
      const clientName = clientsMap[client_id] || "Unknown Client";
      const tr = document.createElement("tr");

      tr.innerHTML = `
      <td>${system_name}</td>
      <td>${os_type}</td>
      <td>${ip_address}</td>
      <td>${clientName}</td>
      <td>
        <button class="text-indigo-600 hover:underline mr-2 edit-btn" data-id="${system_id}">Edit</button>
        <button class="text-red-600 hover:underline delete-btn" data-id="${system_id}">Delete</button>
      </td>
    `;

      systemsTableBody.appendChild(tr);
    }
  );

  if (userRole !== "admin") {
    document
      .querySelectorAll(".edit-btn")
      .forEach((btn) => (btn.style.display = "none"));
    document
      .querySelectorAll(".delete-btn")
      .forEach((btn) => (btn.style.display = "none"));
  }

  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const systemId = e.target.dataset.id;
      await openEditSystem(systemId);
    });
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const systemId = e.target.dataset.id;
      if (confirm("Are you sure you want to delete this system?")) {
        deleteSystem(systemId);
      }
    });
  });
}

async function openEditSystem(systemId) {
  const headers = { Authorization: `Bearer ${token}` };
  try {
    const res = await fetch(`/systems/${systemId}`, { headers });
    if (!res.ok) throw new Error("Failed to fetch system data");
    const system = await res.json();
    openModal(true, system);
  } catch (err) {
    console.error(err);
    alert("Failed to load system data for editing.");
  }
}

systemForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const id = systemIdInput.value;
  const systemNameVal = systemNameInput.value.trim();
  const osTypeVal = osTypeInput.value.trim();
  const ipAddressVal = ipAddressInput.value.trim();
  const clientIdVal = clientIdInput.value;

  if (!systemNameVal || !osTypeVal || !ipAddressVal || !clientIdVal) {
    alert("Please fill all required fields.");
    return;
  }

  const body = JSON.stringify({
    system_name: systemNameVal,
    os_type: osTypeVal,
    ip_address: ipAddressVal,
    client_id: parseInt(clientIdVal),
  });

  try {
    let res;
    if (id) {
      res = await fetch(`/systems/${id}`, {
        method: "PUT",
        headers,
        body,
      });
    } else {
      res = await fetch("/systems", {
        method: "POST",
        headers,
        body,
      });
    }

    if (!res.ok) throw new Error("Failed to save system");

    closeModal();
    fetchSystems();
  } catch (err) {
    console.error(err);
    alert("Failed to save system.");
  }
});

async function deleteSystem(systemId) {
  const headers = { Authorization: `Bearer ${token}` };
  try {
    const res = await fetch(`/systems/${systemId}`, {
      method: "DELETE",
      headers,
    });
    if (!res.ok) throw new Error("Failed to delete system");
    fetchSystems();
  } catch (err) {
    console.error(err);
    alert("Failed to delete system.");
  }
}

fetchSystems();
