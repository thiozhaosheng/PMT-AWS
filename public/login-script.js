const form = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorMsg.classList.add("hidden");

  const username = form.username.value.trim();
  const password = form.password.value;

  try {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("username", data.username);
      window.location.href = "dashboard.html";
    } else {
      errorMsg.textContent = data.message || "Invalid username or password";
      errorMsg.classList.remove("hidden");
    }
  } catch (err) {
    errorMsg.textContent = "Network error, please try again later";
    errorMsg.classList.remove("hidden");
  }
});
