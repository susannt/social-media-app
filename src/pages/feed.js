import { getPosts, createPost } from "../api/api.js";
import { renderPost } from "./post.js";

export async function renderFeed() {
  const result = await getPosts();

  const pageContent = document.querySelector("#page-content");

  pageContent.innerHTML = /*html*/ `
        <h1 class="text-2xl md:text-3xl font-semibold text-primary mb-6">Feed</h1>
        <input
            type="search"
            id="search-input"
            placeholder="Search posts..."
            class="w-full max-w-xl rounded-lg border border-accent bg-surface text-text shadow-sm px-4 py-1.5 mb-6 focus:outline-none focus:ring-1 focus:ring-accent"
        />

        <div id="posts" class="flex w-full max-w-xl flex-col gap-6">
            ${result.data
              .map(
                (post) => `
                        <article data-id="${post.id}" class="flex w-full max-w-xl flex-col gap-4 md:gap-6 rounded-xl bg-surface p-5 md:p-6 shadow-sm cursor-pointer">
                            <h2 class="text-xl font-semibold text-primary mb-2">${post.title}</h2>
                            ${post.media ? `<img src="${post.media.url}" alt="${post.media.alt}" class="w-full h-56 md:h-72 rounded-lg object-cover">` : ""}
                            <p class="text-text leading-relaxed wrap-break-word">${post.body}</p>
                            <button class="self-start rounded-lg bg-accent px-3 py-2 md:px-4 text-text-nav cursor-pointer hover:bg-primary transition">View post</button>
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
        String(post.title ?? "")
          .toLowerCase()
          .includes(searchTerm) ||
        String(post.body ?? "")
          .toLowerCase()
          .includes(searchTerm)
      );
    });

    const postsContainer = document.querySelector("#posts");

    postsContainer.innerHTML = filteredPosts
      .map(
        (post) => `
                    <article data-id="${post.id}" class="flex w-full max-w-xl flex-col gap-4 md:gap-6 rounded-xl bg-surface p-5 md:p-6 shadow-sm cursor-pointer">
                        <h2 class="text-xl font-semibold text-primary mb-2">${post.title}</h2>
                        ${post.media ? `<img src="${post.media.url}" alt="${post.media.alt}" class="w-full h-56 md:h-72 rounded-lg object-cover">` : ""}
                        <p class="text-text leading-relaxed wrap-break-word">${post.body}</p>
                        <button class="self-start rounded-lg bg-accent px-3 py-2 md:px-4 text-text-nav cursor-pointer hover:bg-primary transition">View post</button>
                    </article>
                `,
      )
      .join("");

    const filteredPostElements = document.querySelectorAll("#posts article");

    filteredPostElements.forEach((post) => {
      post.addEventListener("click", () => {
        renderPost(post.dataset.id, renderFeed);
      });
    });

    console.log(filteredPosts);
  });

  const posts = document.querySelectorAll("article");

  posts.forEach((post) => {
    post.addEventListener("click", () => {
      renderPost(post.dataset.id, renderFeed);
    });
  });
}

export function renderCreatePost(goToFeed) {
  const pageContent = document.querySelector("#page-content");

  pageContent.innerHTML = /*html*/ `
        <h1 class="text-2xl md:text-3xl font-semibold text-primary mb-6">Create post</h1>

        <form id="create-post-form" class="flex w-full max-w-xl flex-col gap-4 rounded-xl bg-surface p-5 md:p-6 shadow-sm">
            <input
                type="text"
                id="title"
                placeholder="Title"
                required
                minlength="3"
                maxlength="80"
                class="w-full rounded-lg border border-accent bg-background px-4 py-3 text-text shadow-sm placeholder:text-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />

            <textarea
                id="body"
                placeholder="What's up?"
                required
                minlength="1"
                maxlength="500"
                class="w-full min-h-32 resize-y rounded-lg border border-accent bg-background px-4 py-3 text-text shadow-sm placeholder:text-accent focus:outline-none focus:ring-1 focus:ring-accent">
            </textarea>
            <button
                type="submit"
                class="self-start rounded-lg bg-accent px-6 py-3 font-semibold text-text-nav shadow-sm transition hover:bg-primary cursor-pointer"
            >
                Post
            </button>
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
        alert("Post created successfully!");
        goToFeed();
      }
    } catch (error) {
      alert("Failed to create post.");
    }
  });
}
