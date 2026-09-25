import { getUserPosts } from "../api/api.js";

export async function renderProfile() {
    const app = document.querySelector("#app");

    const profile = JSON.parse(localStorage.getItem("profile"));

    const result = await getUserPosts(profile.name);

    app.innerHTML = `
        <h1>My Profile</h1>
        <h2>${profile.name}</h2>
        <p>${profile.email}</p>

        <h2>My posts</h2>

        ${result.data
            .map(
                (post) => `
                    <article>
                        <h3>${post.title}</h3>
                        <p>${post.body}</p>
                    </article>
                `,
            )
            .join("")}
    `;
}
