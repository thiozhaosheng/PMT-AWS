const BASE_URL = "https://patch.travisthio.com";

const token = localStorage.getItem("token");
const usernameDisplay = document.getElementById("usernameDisplay");
const logoutBtn = document.getElementById("logoutBtn");
const clientsTableBody = document.getElementById("clientsTableBody");
const noClientsMsg = document.getElementById("noClientsMsg");
const addClientBtn = document.getElementById("addClientBtn");
const clientModal = document.getElementById("clientModal");
const clientForm = document.getElementById("clientForm");
const modalTitle = document.getElementById("modalTitle");
const clientIdInput = document.getElementById("clientIdInput");
const companyNameInput = document.getElementById("companyNameInput");
const industryInput = document.getElementById("industryInput");
const contactEmailInput = document.getElementById("contactEmailInput");
const cancelBtn = document.getElementById("cancelBtn");
const closeModalBtn = document.getElementById("closeModalBtn");

const usersLink = document.getElementById("usersLink");
const clientsLink = document.querySelector('a[href="clients.html"]');

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
      if (payload.role !== "admin") {
        addClientBtn.style.display = "none";
        if (usersLink) usersLink.style.display = "none";
      }
      window.userRole = payload.role;
    }
  }
}

document.querySelectorAll("nav a").forEach((link) => {
  link.classList.remove("bg-indigo-100", "text-indigo-700", "font-semibold");
});
if (clientsLink) {
  clientsLink.classList.add(
    "bg-indigo-100",
    "text-indigo-700",
    "font-semibold"
  );
}

logoutBtn.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "login.html";
});

addClientBtn.addEventListener("click", () => openModal());
cancelBtn.addEventListener("click", closeModal);
closeModalBtn.addEventListener("click", closeModal);

function openModal(edit = false, client = null) {
  clientModal.classList.remove("hidden");
  if (edit && client) {
    modalTitle.textContent = "Edit Client";
    clientIdInput.value = client.client_id;
    companyNameInput.value = client.company_name;
    industryInput.value = client.industry;
    contactEmailInput.value = client.contact_email;
  } else {
    modalTitle.textContent = "Add Client";
    clientForm.reset();
    clientIdInput.value = "";
  }
}

function closeModal() {
  clientModal.classList.add("hidden");
  clientForm.reset();
  clientIdInput.value = "";
}

async function fetchClients() {
  const headers = { Authorization: `Bearer ${token}` };
  let url = `${BASE_URL}/clients`;

  if (window.userRole !== "admin") {
    url = `${BASE_URL}/clients/assigned`;
  }

  try {
    const res = await fetch(url, { headers, credentials: "include" });
    if (!res.ok) throw new Error("Failed to fetch clients");
    const clients = await res.json();
    renderClients(clients);
  } catch (err) {
    console.error(err);
    noClientsMsg.classList.remove("hidden");
  }
}

function renderClients(clients) {
  clientsTableBody.innerHTML = "";
  if (clients.length === 0) {
    noClientsMsg.classList.remove("hidden");
    return;
  }
  noClientsMsg.classList.add("hidden");

  clients.forEach(({ client_id, company_name, industry, contact_email }) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${client_id}</td>
      <td>${company_name}</td>
      <td>${industry}</td>
      <td>${contact_email || "-"}</td>
      <td>
        <button class="text-indigo-600 hover:underline mr-2 edit-btn">Edit</button>
        <button class="text-red-600 hover:underline delete-btn">Delete</button>
      </td>
    `;

    clientsTableBody.appendChild(tr);
  });

  if (window.userRole !== "admin") {
    document
      .querySelectorAll(".edit-btn")
      .forEach((btn) => (btn.style.display = "none"));
    document
      .querySelectorAll(".delete-btn")
      .forEach((btn) => (btn.style.display = "none"));
  }

  document.querySelectorAll(".edit-btn").forEach((btn, i) => {
    btn.addEventListener("click", () => openEditClient(clients[i].client_id));
  });

  document.querySelectorAll(".delete-btn").forEach((btn, i) => {
    btn.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete this client?")) {
        deleteClient(clients[i].client_id);
      }
    });
  });
}

async function openEditClient(clientId) {
  const headers = { Authorization: `Bearer ${token}` };
  try {
    const res = await fetch(`${BASE_URL}/clients/${clientId}`, {
      headers,
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch client data");
    const client = await res.json();
    openModal(true, client);
  } catch (err) {
    console.error(err);
    alert("Failed to load client data for editing.");
  }
}

clientForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const id = clientIdInput.value;
  const companyNameVal = companyNameInput.value.trim();
  const industryVal = industryInput.value.trim();
  const contactEmailVal = contactEmailInput.value.trim();

  if (!companyNameVal || !industryVal || !contactEmailVal) {
    alert("Please fill all required fields.");
    return;
  }

  const body = JSON.stringify({
    company_name: companyNameVal,
    industry: industryVal,
    contact_email: contactEmailVal,
  });

  try {
    let res;
    if (id) {
      res = await fetch(`${BASE_URL}/clients/${id}`, {
        method: "PUT",
        headers,
        body,
        credentials: "include",
      });
    } else {
      res = await fetch(`${BASE_URL}/clients`, {
        method: "POST",
        headers,
        body,
        credentials: "include",
      });
    }

    if (!res.ok) throw new Error("Failed to save client");

    closeModal();
    fetchClients();
  } catch (err) {
    console.error(err);
    alert("Failed to save client.");
  }
});

async function deleteClient(clientId) {
  const headers = { Authorization: `Bearer ${token}` };
  try {
    const res = await fetch(`${BASE_URL}/clients/${clientId}`, {
      method: "DELETE",
      headers,
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to delete client");
    fetchClients();
  } catch (err) {
    console.error(err);
    alert("Failed to delete client.");
  }
}

fetchClients();
