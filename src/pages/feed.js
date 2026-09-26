import { getPosts,createPost } from "../api/api.js";
import { renderPost } from "./post.js";

export async function renderFeed() {
    const result = await getPosts();

    const pageContent = document.querySelector("#page-content");

    pageContent.innerHTML = `
        <h1>Feed</h1>
            <input type="search" id="search-input" placeholder="Search posts...">

        <div id="posts">
            ${result.data
                .map(
                    (post) => `
                        <article data-id="${post.id}">
                            <h2>${post.title}</h2>
                            ${post.media ? `<img src="${post.media.url}" alt="${post.media.alt}">` : ""}
                            <p>${post.body}</p>
                            <button>View post</button>
                        </article>
                    `,
                )
                .join("")}
        </div>            
    `;

    const searchInput = document.querySelector("#search-input");

    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.toLowerCase();

        const filteredPosts = result.data.filter((post) => {
            return (
                String(post.title ?? "").toLowerCase().includes(searchTerm) ||
                String(post.body ?? "").toLowerCase().includes(searchTerm)
            );
        });

        const postsContainer = document.querySelector("#posts");

        postsContainer.innerHTML = filteredPosts
            .map(
                (post) => `
                    <article data-id="${post.id}">
                        <h2>${post.title}</h2>
                        <p>${post.body}</p>
                    </article>
                `,
            )
            .join("");
    
        const filteredPostElements = document.querySelectorAll("#posts article");

        filteredPostElements.forEach((post) => {
            post.addEventListener("click", () => {
                renderPost(post.dataset.id);
            });
        });

    console.log(filteredPosts);
});

    const posts = document.querySelectorAll("article");
    
    posts.forEach((post) => {
        post.addEventListener("click", () => {
            renderPost(post.dataset.id);
        });
    });    
}

export function renderCreatePost() {
    const pageContent = document.querySelector("#page-content");

    pageContent.innerHTML = `
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

        try {
            const result = await createPost(postData);

            if (result.data) {
                alert("Post created successfully!")
            }
        } catch (error) {
            alert("Failed to create post.");
        }    
    });
}