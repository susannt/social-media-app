import "./style.css";
import { renderFeed, renderCreatePost } from "./pages/feed.js";
import { renderProfile } from "./pages/profile.js";
import { renderLogin } from "./pages/login.js";
import { renderRegister } from "./pages/register.js";
import { logoutUser } from "./api/authService.js";

const app = document.querySelector("#app");

app.innerHTML = /*html*/ `
  <nav id="loggedOut" class="bg-primary p-4">
    <div class="flex flex-wrap items-center justify-between">
      <span class="font-semibold text-text-nav">Social Media App</span>
      <button id="logged-out-menu-toggle" class="text-text-nav md:hidden">☰</button>

      <div id="logged-out-links" class="hidden w-full flex-col gap-2 pt-4 md:flex md:w-auto md:flex-row md:items-center md:gap-4 md:pt-0">
        <a href="#" id="register-nav" class="rounded-lg px-3 py-2 text-text-nav hover:text-accent">Register</a>
        <a href="#" id="login-nav" class="rounded-lg px-3 py-2 text-text-nav hover:text-accent">Login</a>
      </div>
    </div> 
  </nav>

  <nav id="loggedIn" class="bg-primary p-4">
    <div class="flex flex-wrap items-center justify-between">
      <span class="font-semibold text-text-nav">Social Media App</span>
      <button id="menu-toggle" class="text-text-nav md:hidden">☰</button>

      <div id="logged-in-links" class="hidden w-full flex-col gap-2 pt-4 md:flex md:w-auto md:flex-row md:items-center md:gap-4 md:pt-0">
        <a href="#" id="feed-nav" class="rounded-lg px-3 py-2 text-text-nav hover:text-accent">Feed</a>
        <a href="#" id="create-nav" class="rounded-lg px-3 py-2 text-text-nav hover:text-accent">Create post</a>
        <a href="#" id="profile-nav" class="rounded-lg px-3 py-2 text-text-nav hover:text-accent">My Profile</a>
        <a href="#" id="logout-nav" class="rounded-lg px-3 py-2 text-text-nav hover:text-accent">Logout</a>
      </div>
    </div>
  </nav>

  <div id="page-content" class="mx-auto max-w-3xl p-6"></div>
`;

const menuToggle = document.querySelector("#menu-toggle");
const menuLinks = document.querySelector("#logged-in-links");

menuToggle.addEventListener("click", function () {
  menuLinks.classList.toggle("hidden");
});

const loggedOutMenuToggle = document.querySelector("#logged-out-menu-toggle");
const loggedOutMenuLinks = document.querySelector("#logged-out-links");

loggedOutMenuToggle.addEventListener("click", function () {
  loggedOutMenuLinks.classList.toggle("hidden");
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
  renderCreatePost();
});

const profileNav = document.querySelector("#profile-nav");

profileNav.addEventListener("click", function (event) {
  event.preventDefault();
  renderProfile();
});
