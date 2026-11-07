import { getPosts, updatePost, deletePost } from "../api/api.js";

export async function renderPost(postId) {
    const result = await getPosts ();

    const post = result.data.find((post) => post.id === Number(postId));
    
    const pageContent = document.querySelector("#page-content");

    pageContent.innerHTML = /*html*/ `
        <article class="mx-auto flex w-full max-w-xl flex-col gap-4 rounded-xl bg-surface p-5 md:p-6 shadow-sm">
            <h1 class="text-2xl md:text-3xl font-semibold text-primary">
                ${post.title}
            </h1>

            ${post.media ? `<img src="${post.media.url}" alt="${post.media.alt}" class="w-full h-56 md:h-72 rounded-lg object-cover">` : ""}

            <p class="text-text leading-relaxed wrap-break-word">${post.body}</p>

            <button
                id="edit-post"
                class="self-start rounded-lg bg-accent px-5 py-3 font-semibold text-text-nav shadow-sm transition hover:bg-primary cursor-pointer"
            >
                Edit
            </button>
        </article>
    `;

    const editButton = document.querySelector("#edit-post");

    editButton.addEventListener("click", function () {
        renderEditPost(post);
    });
}

export function renderEditPost(post) {
    const pageContent = document.querySelector("#page-content");

    pageContent.innerHTML = /*html*/ `
        <div class="mx-auto w-full max-w-xl">
            <h1 class="text-2xl md:text-3xl font-semibold text-primary mb-6 text-center">Edit post</h1>

            <form id="edit-post-form" class="flex w-full flex-col gap-4 rounded-xl bg-surface p-5 md:p-6 shadow-sm">
                ${post.media ? `<img src="${post.media.url}" alt="${post.media.alt}" class="w-full h-56 rounded-lg object-cover">` : ""}
                <input
                    type="text"
                    id="title"
                    value="${post.title}"
                    required
                    minlength="3"
                    maxlength="80"
                    class="w-full rounded-lg border border-accent bg-background px-4 py-3 text-text shadow-sm focus:outline-none focus:ring-1 focus:ring-accent"
                />

                <textarea
                    id="body"
                    required
                    minlength="1"
                    maxlength="500"
                    class="w-full min-h-32 resize-y rounded-lg border border-accent bg-background px-4 py-3 text-text shadow-sm focus:outline-none focus:ring-1 focus:ring-accent"
                >${post.body}</textarea>
                <div class="flex flex-wrap gap-3">
                    <button
                        type="submit"
                        class="rounded-lg bg-accent px-5 py-3 font-semibold text-text-nav shadow-sm transition hover:bg-primary cursor-pointer">
                        Save changes
                    </button>
                    <button
                        type="button"
                        id="delete-post"
                        class="rounded-lg border border-accent px-5 py-3 font-semibold text-primary transition hover:bg-primary hover:text-text-nav cursor-pointer">
                        Delete post
                    </button>
            </div>
            </form>
        </div>
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
