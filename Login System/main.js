const msgEl = document.getElementById('message');

function showMessage(text, color = '#e74c3c') {
  if (msgEl) {
    msgEl.textContent = text;
    msgEl.style.color = color;
  }
}

function register(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !email || !password) {
    return showMessage("Please fill in all fields.");
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return showMessage("Invalid email format.");
  }

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  if (users.some(u => u.email === email)) {
    return showMessage("Email already registered. Use another one.");
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));
  showMessage("Registered successfully! Redirecting...", "#2ecc71");

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1500);
}

function login(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return showMessage("Invalid email or password.");
  }

  sessionStorage.setItem("loggedInUser", JSON.stringify(user));
  showMessage("Login successful! Redirecting...", "#2ecc71");

  setTimeout(() => {
    window.location.href = "home.html";
  }, 1000);
}

function checkLogin() {
  const user = JSON.parse(sessionStorage.getItem("loggedInUser"));
  if (!user) {
    window.location.href = "login.html";
    return;
  }
  document.getElementById("userName").textContent = user.name;
}

function logout() {
  sessionStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}
