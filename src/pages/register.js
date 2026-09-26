import { register } from "../api/api.js";
import { renderLogin } from "./login.js";

export function renderRegister() {
    const pageContent = document.querySelector("#page-content");

    pageContent.innerHTML = `
        <h1>Register</h1>

        <form id="register-form">
            <input type="text" id="name" placeholder="Name" required>
            <input type="email" id="email" placeholder="Email" required>
            <input type="password" id="password" placeholder="Password" required>
            <button type="submit">Register</button>
        </form>
    `;

    const registerForm = document.querySelector("#register-form");

    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = document.querySelector("#name").value;
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;

        
        try {
            await register(name, email, password);
            renderLogin();
        } catch (error) {
            alert("Registration failed. Use janedoe@stud.noroff.no");
        }
    });
}
