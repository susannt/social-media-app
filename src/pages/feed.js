import { getPosts } from "../api/api.js";
import { renderPost } from "./post.js";

export async function renderFeed() {
    const result = await getPosts();

    const app = document.querySelector("#app");

    app.innerHTML = result.data
        .map(
            (post) => `
                <article data-id="${post.id}">
                    <h2>${post.title}</h2>
                    <p>${post.body}</p>
                </article>
            `,
        )
        .join("");

    const posts = document.querySelectorAll("article");
    
    posts.forEach((post) => {
        post.addEventListener("click", () => {
            renderPost(post.dataset.id);
        });
    });    
}