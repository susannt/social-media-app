import { getPosts, updatePost, deletePost } from "../api/api.js";

export async function renderPost(postId) {
    const result = await getPosts ();

    const post = result.data.find((post) => post.id === Number(postId));
    
    const pageContent = document.querySelector("#page-content");

    pageContent.innerHTML = `
        <article>
            <h1>${post.title}</h1>
            ${post.media ? `<img src="${post.media.url}" alt="${post.media.alt}">` : ""}
            <p>${post.body}</p>
            <button id="edit-post">Edit</button>
        </article>
    `;

    const editButton = document.querySelector("#edit-post");

    editButton.addEventListener("click", function () {
        renderEditPost(post);
    });
}

export function renderEditPost(post) {
    const pageContent = document.querySelector("#page-content");

    pageContent.innerHTML = `
        <h1>Edit post</h1>
        ${post.media ? `<img src="${post.media.url}" alt="${post.media.alt}">` : ""}

        <form id="edit-post-form">
            <input type="text" id="title" value="${post.title}" required>
            <textarea id="body" required>${post.body}</textarea>
            <div class="edit-buttons">
                <button type="submit">Save changes</button>
                <button type="button" id="delete-post">Delete post</button>
            </div>
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
