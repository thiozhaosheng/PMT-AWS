const token = localStorage.getItem("token");
const usernameDisplay = document.getElementById("usernameDisplay");
const logoutBtn = document.getElementById("logoutBtn");
const usersTableBody = document.getElementById("usersTableBody");
const noUsersMsg = document.getElementById("noUsersMsg");
const usersLink = document.getElementById("usersLink");
const userModal = document.getElementById("userModal");
const userForm = document.getElementById("userForm");
const modalTitle = document.getElementById("modalTitle");
const userIdInput = document.getElementById("userIdInput");
const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");
const roleSelect = document.getElementById("roleSelect");
const cancelBtn = document.getElementById("cancelBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const addUserBtn = document.getElementById("addUserBtn");

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
      if (payload.role !== "admin") {
        usersLink.style.display = "none";
        addUserBtn.style.display = "none";
      }
      usernameDisplay.textContent = payload.username || "User";
    }
  }
}

logoutBtn.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "login.html";
});

function openModal(edit = false, user = null) {
  userModal.classList.remove("hidden");
  if (edit && user) {
    modalTitle.textContent = "Edit User";
    userIdInput.value = user.user_id;
    usernameInput.value = user.username;
    passwordInput.value = ""; // blank password; fill only to change
    roleSelect.value = user.role;
  } else {
    modalTitle.textContent = "Add User";
    userForm.reset();
    userIdInput.value = "";
  }
}

function closeModal() {
  userModal.classList.add("hidden");
  userForm.reset();
  userIdInput.value = "";
}

cancelBtn.addEventListener("click", closeModal);
closeModalBtn.addEventListener("click", closeModal);

async function fetchUsers() {
  const headers = { Authorization: `Bearer ${token}` };
  try {
    const res = await fetch("/users", { headers });
    if (!res.ok) throw new Error("Failed to fetch users");
    const users = await res.json();
    renderUsers(users);
  } catch (err) {
    console.error(err);
    noUsersMsg.classList.remove("hidden");
  }
}

function renderUsers(users) {
  usersTableBody.innerHTML = "";
  if (users.length === 0) {
    noUsersMsg.classList.remove("hidden");
    return;
  }
  noUsersMsg.classList.add("hidden");

  users.forEach(({ user_id, username, role }) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${user_id}</td>
      <td>${username}</td>
      <td>${role}</td>
      <td>
        <button class="text-indigo-600 hover:underline mr-2 edit-btn" data-id="${user_id}">Edit</button>
        <button class="text-red-600 hover:underline delete-btn" data-id="${user_id}">Delete</button>
      </td>
    `;

    usersTableBody.appendChild(tr);
  });

  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const userId = e.target.dataset.id;
      await openEditUser(userId);
    });
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const userId = e.target.dataset.id;
      if (confirm("Are you sure you want to delete this user?")) {
        deleteUser(userId);
      }
    });
  });
}

async function openEditUser(userId) {
  const headers = { Authorization: `Bearer ${token}` };
  try {
    const res = await fetch(`/users/${userId}`, { headers });
    if (!res.ok) throw new Error("Failed to fetch user data");
    const user = await res.json();
    openModal(true, user);
  } catch (err) {
    console.error(err);
    alert("Failed to load user data for editing.");
  }
}

userForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const id = userIdInput.value;
  const usernameVal = usernameInput.value.trim();
  const passwordVal = passwordInput.value;
  const roleVal = roleSelect.value;

  if (!usernameVal || !roleVal || (id === "" && !passwordVal)) {
    alert("Please fill all required fields (password required for new user).");
    return;
  }

  const body = JSON.stringify({
    username: usernameVal,
    role: roleVal,
    ...(passwordVal ? { password: passwordVal } : {}),
  });

  try {
    let res;
    if (id) {
      res = await fetch(`/users/${id}`, {
        method: "PUT",
        headers,
        body,
      });
    } else {
      res = await fetch("/users", {
        method: "POST",
        headers,
        body,
      });
    }

    if (!res.ok) throw new Error("Failed to save user");

    closeModal();
    fetchUsers();
  } catch (err) {
    console.error(err);
    alert("Failed to save user.");
  }
});

async function deleteUser(userId) {
  const headers = { Authorization: `Bearer ${token}` };
  try {
    const res = await fetch(`/users/${userId}`, {
      method: "DELETE",
      headers,
    });
    if (!res.ok) throw new Error("Failed to delete user");
    fetchUsers();
  } catch (err) {
    console.error(err);
    alert("Failed to delete user.");
  }
}

addUserBtn.addEventListener("click", () => openModal());

fetchUsers();
