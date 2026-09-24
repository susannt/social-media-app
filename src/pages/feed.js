import { getPosts,createPost } from "../api/api.js";
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

export function renderCreatePost() {
    const app = document.querySelector("#app");

    app.innerHTML = `
        <h1>Create post</h1>

        <form id="create-post-form">
            <input type="text" id="title" placeholder="Title" required>
            <textarea id="body" placeholder="What's up?" required></textarea>
            <button type="submit">Post</button>
        </form>
    `;

    const form = document.querySelector("#create-post-form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

    const postData = {
        title: form.title.value,
        body: form.body.value,
    };

    const result = await createPost(postData);

        if (result.data) {
            alert("Post created successfully!")
        }

    console.log(result);
    });
}