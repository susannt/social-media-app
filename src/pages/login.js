import { login } from "../api/api.js";

export function renderLogin() {
    const app = document.querySelector("#app");

    app.innerHTML =`
        <h1>Login</h1>

        <form id="login-form">
            <input type="email" id="email" placeholder="Email" required>
            <input type="password" id="password" placeholder="Password" required>
            <button type="submit">Login</button>
        </form>
    `;

    const loginForm = document.querySelector("#login-form");

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;

        const result = await login(email, password);

        console.log(result);

    });
}
