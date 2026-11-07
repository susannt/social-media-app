import { register } from "../api/api.js";
import { renderLogin } from "./login.js";

export function renderRegister() {
    const pageContent = document.querySelector("#page-content");

    pageContent.innerHTML = /*html*/ `
        <div class="mx-auto w-full max-w-sm">
            <h1 class="text-2xl md:text-3xl font-semibold text-primary mb-6 text-center">
                Register
            </h1>

            <form id="register-form" class="flex w-full flex-col gap-4 rounded-xl bg-surface p-5 md:p-6 shadow-sm">
                <input
                    type="text"
                    id="name"
                    placeholder="Name"
                    required
                    class="w-full rounded-lg border border-accent bg-background px-4 py-3 text-text shadow-sm placeholder:text-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
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
                <button
                    type="submit"
                    class="self-center rounded-lg bg-accent px-6 py-3 font-semibold text-text-nav shadow-sm transition hover:bg-primary cursor-pointer"
                >
                    Register
                </button>
            </form>
        </div>
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
