import { loginUser } from "../api/authService.js";
import { renderFeed } from "./feed.js";

export function renderLogin() {
    const pageContent = document.querySelector("#page-content");

    pageContent.innerHTML = /*html*/ `
        <div class="mx-auto w-full max-w-sm">
            <h1 class="text-2xl md:text-3xl font-semibold text-primary mb-6 text-center">Login</h1>
            <form id="login-form" class="flex w-full max-w-sm flex-col gap-4 rounded-xl bg-surface p-5 md:p-6 shadow-sm">
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    required
                    class="w-full rounded-lg border border-accent bg-background px-4 py-3 text-text shadow-sm placeholder:text-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    required
                    class="w-full rounded-lg border border-accent bg-background px-4 py-3 text-text shadow-sm placeholder:text-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
                <button type="submit" class="self-center rounded-lg bg-accent px-6 py-3 font-semibold text-text-nav shadow-sm transition hover:bg-primary cursor-pointer">Login</button>
            </form>
        </div>
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

            document.querySelector("#loggedOut").style.display = "none";
            document.querySelector("#loggedIn").style.display = "block";
            
            renderFeed();

        }   catch (error) {
                alert("Login failed.")
        }
    });
}
