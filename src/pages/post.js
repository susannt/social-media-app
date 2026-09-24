import { getPosts, updatePost, deletePost } from "../api/api.js";

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

export function renderEditPost(post) {
    const app = document.querySelector("#app");

    app.innerHTML = `
        <h1>Edit post</h1>

        <form id="edit-post-form">
            <input type="text" id="title" value="${post.title}" required>
            <textarea id="body" required>${post.body}</textarea>
            <button type="submit">Save changes</button>
            <button type="button" id="delete-post">Delete post</button>
        </form>
  `;

    const form = document.querySelector("#edit-post-form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const postData = {
            title: form.title.value,
            body: form.body.value,
        };

        const result = await updatePost(post.id, postData);

        console.log(result);
    });

    const deleteButton = document.querySelector("#delete-post");

    deleteButton.addEventListener("click", async function () {
        const result = await deletePost(post.id);
        console.log(result);
    });
}
