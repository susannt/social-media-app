import { 
    getProfile,
    getUserPosts,
    followUser,
    unfollowUser,
    getFollowing,
    searchProfiles 
} from "../api/api.js";

export async function renderProfile() {
    const pageContent = document.querySelector("#page-content");

    const profile = JSON.parse(localStorage.getItem("profile"));

    const result = await getUserPosts(profile.name);

    pageContent.innerHTML = /*html*/ `
        <h1 class="text-2xl md:text-3xl font-semibold text-primary mb-6">My Profile</h1>

        <div class="max-w-xl rounded-xl bg-surface p-5 md:p-6 shadow-sm mb-6">
            <h2 class="text-xl font-semibold text-primary mb-2">${profile.name}</h2>
            <p class="text-text">${profile.email}</p>
        </div>

        <input 
            type="search" 
            id="user-search" 
            placeholder="Search for users to follow..."
            class="w-full max-w-xl rounded-lg border border-accent bg-surface text-text shadow-sm px-4 py-1.5 mb-4"
        />

        <div id="user-results" class="mb-6 flex max-w-xl flex-col rounded-lg bg-surface shadow-sm"></div>

        <h2 class="text-xl md:text-2xl font-semibold text-primary mb-4">My posts</h2>

        ${result.data
            .map(
                (post) => `
                    <article class="flex w-full max-w-xl flex-col gap-4 rounded-xl bg-surface p-5 shadow-sm">
                        <h3 class="text-xl font-semibold text-primary">${post.title}</h3>
                        <p class="text-text leading-relaxed wrap-break-word">${post.body}</p>
                    </article>
                `,
            )
            .join("")}
    `;

    const userSearch = document.querySelector("#user-search");
    const userResults = document.querySelector("#user-results");

    userSearch.addEventListener("input", async function () {
        const searchTerm = userSearch.value;

        if (!searchTerm) {
            userResults.innerHTML = "";
            return;
        }

        const result = await searchProfiles(searchTerm);

        userResults.innerHTML = result.data
            .map(
                (user) => `
                   <button
                        type="button"
                        class="user-result w-full border-b border-accent px-4 py-3 text-left text-primary last:border-b-0 hover:bg-background cursor-pointer"
                        data-name="${user.name}"
                    >
                        ${user.name}
                    </button>
                `,
            )
            .join("");
        
        const userResultButtons = document.querySelectorAll(".user-result");

        userResultButtons.forEach((button) => {
            button.addEventListener("click", function () {
                renderUserProfile(button.dataset.name);
            });
        });
    });
}

export async function renderUserProfile(name) {
    const pageContent = document.querySelector("#page-content");

    const myProfile = JSON.parse(localStorage.getItem("profile"));
    
    const followingResult = await getFollowing(myProfile.name);

    const isFollowing = followingResult.data.following.some(
        (user) => user.name === name,
    );

    const result = await getProfile(name);
    const profile = result.data;

    const postsResult = await getUserPosts(name);

    pageContent.innerHTML = /*html*/ `
        <div class="max-w-xl rounded-xl bg-surface p-5 md:p-6 shadow-sm mb-6">
            <h1 class="text-2xl md:text-3xl font-semibold text-primary mb-2">${profile.name}</h1>
            <p class="text-text">${profile.email}</p>
        </div>

        <button
            id="follow-button"
            class="rounded-lg bg-primary px-5 py-2 mb-6 text-text-nav shadow-sm transition hover:bg-accent cursor-pointer"
>
            ${isFollowing ? "Unfollow" : "Follow"}
        </button>

        <h2 class="text-xl md:text-2xl font-semibold text-primary mb-4">Posts</h2>

        <div class="flex flex-col gap-6">
            ${postsResult.data
                .map(
                    (post) => `
                        <article class="flex w-full max-w-xl flex-col gap-4 rounded-xl bg-surface p-5 shadow-sm">
                            <h3 class="text-xl font-semibold text-primary">${post.title}</h3>
                            <p class="text-text leading-relaxed wrap-break-word">${post.body}</p>
                        </article>
                    `,
                )
                .join("")}
        </div>
    `;

    const followButton = document.querySelector("#follow-button");

    followButton.addEventListener("click", async function () {
        if (followButton.textContent.trim() === "Follow") {
            const result = await followUser(name);

            if (!result.errors) {
                followButton.textContent = "Unfollow";
            }
        } else {
            const result = await unfollowUser(name);

            if (!result.errors) {
                followButton.textContent = "Follow";
            }
        }
    });
}
