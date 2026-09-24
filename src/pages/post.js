import { getPosts } from "../api/api.js";

export async function renderPost(postId) {
    const result = await getPosts ();

    const post = result.data.find((post) => post.id === Number(postId));
    
    const app = document.querySelector("#app");

    app.innerHTML = `
        <article>
            <h1>${post.title}</h1>
            <p>${post.title}</p>
        </article>
    `;
}