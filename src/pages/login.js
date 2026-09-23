import { loginUser } from "../api/authService.js";

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

        const credentials = {
            email: loginForm.email.value,
            password: loginForm.password.value,
        };

        try {
            const profile = await loginUser(credentials);

            console.log(profile);
        }   catch (error) {
            console.error("Login failed:", error);
        }
    });
}
