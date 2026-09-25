import "./style.css";
import { renderFeed, renderCreatePost } from "./pages/feed.js";
import { renderProfile } from "./pages/profile.js";
import { renderLogin } from "./pages/login.js";
import { renderRegister } from "./pages/register.js";
import { logoutUser } from "./api/authService.js";

const app = document.querySelector("#app");

app.innerHTML =`
  <nav id="loggedOut">
    <a href="#" id="register-nav">Register</a>
    <a href="#" id="login-nav">Login</a>
  </nav>

  <nav id="loggedIn">
    <a href="#" id="feed-nav">Feed</a>
    <a href="#" id="create-nav">Create post</a>
    <a href="#" id="profile-nav">My Profile</a>
    <a href="#" id="logout-nav">Logout</a>
  </nav>

  <div id="page-content"></div> 
`;

const loggedIn = document.querySelector("#loggedIn");
const loggedOut = document.querySelector("#loggedOut");

const accessToken = localStorage.getItem("accessToken");

if (accessToken) {
  loggedOut.style.display = "none";
} else {
  loggedIn.style.display = "none";
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

