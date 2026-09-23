import { getPosts } from "../api/api.js";

export async function renderFeed() {
    const result = await getPosts();

    const app = document.querySelector("#app");

    app.innerHTML = result.data
        .map(
            (post) => `
                <article>
                    <h2>${post.title}</h2>
                    <p>${post.body}</p>
                </article>
            `,
        )
        .join("");
}