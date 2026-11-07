import "./style.css";
import { renderFeed, renderCreatePost } from "./pages/feed.js";
import { renderProfile } from "./pages/profile.js";
import { renderLogin } from "./pages/login.js";
import { renderRegister } from "./pages/register.js";
import { logoutUser } from "./api/authService.js";

const app = document.querySelector("#app");

app.innerHTML = /*html*/ `
  <nav id="loggedOut" class="bg-primary p-4">
    <div class="relative flex flex-col md:flex-row md:items-center md:justify-between">
      <div class="flex items-center justify-between">
        <span class="font-semibold text-text-nav">Social Media App</span>
        <button id="logged-out-menu-toggle" class="text-text-nav md:hidden cursor-pointer">☰</button>
      </div>

      <div id="logged-out-links" class="absolute right-0 top-full z-10 hidden w-48 flex-col gap-1 rounded-lg bg-primary p-3 shadow-lg md:static md:flex md:w-auto md:flex-row md:items-center md:gap-4 md:bg-transparent md:p-0 md:shadow-none">
        <a href="#" id="register-nav" class="w-full rounded-lg px-4 py-2 text-left text-text-nav hover:bg-accent md:w-auto md:px-3 md:text-center md:hover:bg-transparent md:hover:text-accent">Register</a>
        <a href="#" id="login-nav"class="w-full rounded-lg px-4 py-2 text-left text-text-nav hover:bg-accent md:w-auto md:px-3 md:text-center md:hover:bg-transparent md:hover:text-accent">Login</a>
      </div>
    </div> 
  </nav>

  <nav id="loggedIn" class="bg-primary p-4">
    <div class="relative flex flex-col md:flex-row md:items-center md:justify-between">
      <div class="flex items-center justify-between">
        <span class="font-semibold text-text-nav">Social Media App</span>
        <button id="menu-toggle" class="text-text-nav md:hidden cursor-pointer">☰</button>
      </div>

      <div id="logged-in-links" class="absolute right-0 top-full z-10 hidden w-48 flex-col gap-1 rounded-lg bg-primary p-3 shadow-lg md:static md:flex md:w-auto md:flex-row md:items-center md:gap-4 md:bg-transparent md:p-0 md:shadow-none">
        <a href="#" id="feed-nav" class="w-full rounded-lg px-4 py-2 text-left text-text-nav hover:bg-accent md:w-auto md:px-3 md:text-center md:hover:bg-transparent md:hover:text-accent">Feed</a>
        <a href="#" id="create-nav" class="w-full rounded-lg px-4 py-2 text-left text-text-nav hover:bg-accent md:w-auto md:px-3 md:text-center md:hover:bg-transparent md:hover:text-accent">Create post</a>
        <a href="#" id="profile-nav" class="w-full rounded-lg px-4 py-2 text-left text-text-nav hover:bg-accent md:w-auto md:px-3 md:text-center md:hover:bg-transparent md:hover:text-accent">My Profile</a>
        <a href="#" id="logout-nav" class="w-full rounded-lg px-4 py-2 text-left text-text-nav hover:bg-accent md:w-auto md:px-3 md:text-center md:hover:bg-transparent md:hover:text-accent">Logout</a>
      </div>
    </div>
  </nav>

  <div id="page-content" class="mx-auto max-w-3xl p-6"></div>
`;

const menuToggle = document.querySelector("#menu-toggle");
const menuLinks = document.querySelector("#logged-in-links");

menuToggle.addEventListener("click", function () {
  menuLinks.classList.toggle("hidden");
  menuLinks.classList.toggle("flex");
});

const loggedOutMenuToggle = document.querySelector("#logged-out-menu-toggle");
const loggedOutMenuLinks = document.querySelector("#logged-out-links");

loggedOutMenuToggle.addEventListener("click", function () {
  loggedOutMenuLinks.classList.toggle("hidden");
  loggedOutMenuLinks.classList.toggle("flex");
});

const loggedIn = document.querySelector("#loggedIn");
const loggedOut = document.querySelector("#loggedOut");

const accessToken = localStorage.getItem("accessToken");

if (accessToken) {
  loggedOut.style.display = "none";
  renderFeed();
} else {
  loggedIn.style.display = "none";
  renderLogin();
}

const logoutNav = document.querySelector("#logout-nav");

logoutNav.addEventListener("click", function (event) {
  event.preventDefault();

  logoutUser();

  document.querySelector("#loggedIn").style.display = "none";
  document.querySelector("#loggedOut").style.display = "block";

  renderLogin();
});

const loginNav = document.querySelector("#login-nav");

loginNav.addEventListener("click", function (event) {
  event.preventDefault();
  renderLogin();
});

const registerNav = document.querySelector("#register-nav");

registerNav.addEventListener("click", function (event) {
  event.preventDefault();
  renderRegister();
});

const feedNav = document.querySelector("#feed-nav");

feedNav.addEventListener("click", function (event) {
  event.preventDefault();
  renderFeed();
});

const createNav = document.querySelector("#create-nav");

createNav.addEventListener("click", function (event) {
  event.preventDefault();
  renderCreatePost(renderFeed);
});

const profileNav = document.querySelector("#profile-nav");

profileNav.addEventListener("click", function (event) {
  event.preventDefault();
  renderProfile();
});
