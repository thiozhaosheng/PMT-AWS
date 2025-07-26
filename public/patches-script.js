const token = localStorage.getItem("token");
const usernameDisplay = document.getElementById("usernameDisplay");
const logoutBtn = document.getElementById("logoutBtn");
const patchesTableBody = document.getElementById("patchesTableBody");
const noPatchesMsg = document.getElementById("noPatchesMsg");
const addPatchBtn = document.getElementById("addPatchBtn");
const patchModal = document.getElementById("patchModal");
const patchForm = document.getElementById("patchForm");
const modalTitle = document.getElementById("modalTitle");
const patchIdInput = document.getElementById("patchIdInput");
const patchNameInput = document.getElementById("patchNameInput");
const patchedInput = document.getElementById("patchedSelect");
const patchDateInput = document.getElementById("patchDateInput");
const notesInput = document.getElementById("notesInput");
const systemIdInput = document.getElementById("systemIdInput");
const usersLink = document.getElementById("usersLink");
const patchesLink = document.querySelector('a[href="patches.html"]');

let userRole = null;
let systemsMap = {};

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
        if (usersLink) usersLink.style.display = "none";
      }
    }
  }
}

if (patchesLink) {
  patchesLink.classList.add(
    "bg-indigo-100",
    "text-indigo-700",
    "font-semibold"
  );
}

if (userRole === "admin" || userRole === "engineer") {
  addPatchBtn.style.display = "inline-block";
} else {
  addPatchBtn.style.display = "none";
}

logoutBtn.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "login.html";
});

addPatchBtn.addEventListener("click", () => openModal());

const cancelBtn = document.getElementById("cancelBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
cancelBtn.addEventListener("click", closeModal);
closeModalBtn.addEventListener("click", closeModal);

async function fetchSystems() {
  const headers = { Authorization: `Bearer ${token}` };
  try {
    const res = await fetch("/systems", { headers });
    if (!res.ok) throw new Error("Failed to fetch systems");
    const systems = await res.json();
    systemsMap = {};
    systemIdInput.innerHTML = "";
    systems.forEach(({ system_id, system_name }) => {
      systemsMap[system_id] = system_name;
      const option = document.createElement("option");
      option.value = system_id;
      option.textContent = system_name;
      systemIdInput.appendChild(option);
    });
  } catch (err) {
    console.error("Error fetching systems:", err);
  }
}

function openModal(edit = false, patch = null) {
  patchModal.classList.remove("hidden");
  if (edit && patch) {
    modalTitle.textContent = "Edit Patch";
    patchIdInput.value = patch.patch_id;
    patchNameInput.value = patch.patch_name;
    patchedInput.value = patch.patched ? "true" : "false";
    patchDateInput.value = patch.patch_date
      ? patch.patch_date.slice(0, 10)
      : "";
    notesInput.value = patch.notes || "";
    systemIdInput.value = patch.system_id || "";
  } else {
    modalTitle.textContent = "Add Patch";
    patchForm.reset();
    patchIdInput.value = "";
    systemIdInput.selectedIndex = 0;
  }
}

function closeModal() {
  patchModal.classList.add("hidden");
  patchForm.reset();
  patchIdInput.value = "";
  systemIdInput.selectedIndex = 0;
}

async function fetchPatches() {
  await fetchSystems();
  const headers = { Authorization: `Bearer ${token}` };
  try {
    const res = await fetch("/patches", { headers });
    if (!res.ok) throw new Error("Failed to fetch patches");
    const patches = await res.json();
    renderPatches(patches);
  } catch (err) {
    console.error(err);
    noPatchesMsg.classList.remove("hidden");
  }
}

function renderPatches(patches) {
  patchesTableBody.innerHTML = "";
  if (!patches || patches.length === 0) {
    noPatchesMsg.classList.remove("hidden");
    return;
  }
  noPatchesMsg.classList.add("hidden");

  patches.forEach(
    ({
      patch_id,
      patch_name,
      patched,
      patch_date,
      notes,
      system_name,
      company_name,
    }) => {
      const tr = document.createElement("tr");

      let actionsHtml = "";
      if (userRole === "admin") {
        actionsHtml = `
          <button class="text-indigo-600 hover:underline mr-2 edit-btn" data-id="${patch_id}">Edit</button>
          <button class="text-red-600 hover:underline delete-btn" data-id="${patch_id}">Delete</button>
        `;
      } else if (userRole === "engineer") {
        actionsHtml = `<button class="text-indigo-600 hover:underline mr-2 edit-btn" data-id="${patch_id}">Edit</button>`;
      }

      tr.innerHTML = `
        <td>${patch_name}</td>
        <td>${patched}</td>
        <td>${patch_date ? patch_date.slice(0, 10) : ""}</td>
        <td>${notes || "-"}</td>
        <td>${system_name}</td>
        <td>${company_name}</td>
        <td>${actionsHtml}</td>
      `;

      patchesTableBody.appendChild(tr);
    }
  );

  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const patchId = e.target.dataset.id;
      await openEditPatch(patchId);
    });
  });

  if (userRole === "admin") {
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const patchId = e.target.dataset.id;
        if (confirm("Are you sure you want to delete this patch?")) {
          deletePatch(patchId);
        }
      });
    });
  }
}

async function openEditPatch(patchId) {
  const headers = { Authorization: `Bearer ${token}` };
  try {
    const res = await fetch(`/patches/${patchId}`, { headers });
    if (!res.ok) throw new Error("Failed to fetch patch data");
    const patch = await res.json();
    openModal(true, patch);
  } catch (err) {
    console.error(err);
    alert("Failed to load patch data for editing.");
  }
}

patchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const id = patchIdInput.value;
  const patchNameVal = patchNameInput.value.trim();
  const patchedVal = patchedInput.value === "true";
  const patchDateVal = patchDateInput.value;
  const notesVal = notesInput.value.trim();
  const systemIdVal = systemIdInput.value;

  if (!patchNameVal || !systemIdVal) {
    alert("Please fill all required fields.");
    return;
  }

  const body = JSON.stringify({
    patch_name: patchNameVal,
    patched: patchedVal,
    patch_date: patchDateVal,
    notes: notesVal,
    system_id: parseInt(systemIdVal),
  });

  try {
    let res;
    if (id) {
      if (userRole !== "admin" && userRole !== "engineer") {
        alert("You do not have permission to edit patches.");
        return;
      }
      res = await fetch(`/patches/${id}`, {
        method: "PUT",
        headers,
        body,
      });
    } else {
      if (userRole !== "admin" && userRole !== "engineer") {
        alert("You do not have permission to add patches.");
        return;
      }
      res = await fetch("/patches", {
        method: "POST",
        headers,
        body,
      });
    }

    if (!res.ok) throw new Error("Failed to save patch");

    closeModal();
    fetchPatches();
  } catch (err) {
    console.error(err);
    alert("Failed to save patch.");
  }
});

async function deletePatch(patchId) {
  if (userRole !== "admin") {
    alert("You do not have permission to delete patches.");
    return;
  }
  const headers = { Authorization: `Bearer ${token}` };
  try {
    const res = await fetch(`/patches/${patchId}`, {
      method: "DELETE",
      headers,
    });
    if (!res.ok) throw new Error("Failed to delete patch");
    fetchPatches();
  } catch (err) {
    console.error(err);
    alert("Failed to delete patch.");
  }
}

fetchPatches();
