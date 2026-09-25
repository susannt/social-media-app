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

    pageContent.innerHTML = `
        <h1>My Profile</h1>

        <input type="search" id="user-search" placeholder="Search users...">
        <div id="user-results"></div>

        <h2>${profile.name}</h2>
        <p>${profile.email}</p>

        <h2>My posts</h2>

        ${result.data
            .map(
                (post) => `
                    <article>
                        <h3>${post.title}</h3>
                        <p>${post.body}</p>
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
                   <button type="button" class="user-result" data-name="${user.name}">
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

    pageContent.innerHTML = `
        <h1>${profile.name}</h1>
        <p>${profile.email}</p>

        <button id="follow-button">  
            ${isFollowing ? "Unfollow" : "Follow"}
        </button>

        <h2>Posts</h2>

        ${postsResult.data
            .map(
                (post) => `
                    <article>
                        <h3>${post.title}</h3>
                        <p>${post.body}</p>
                    </article>
                `,
            )
            .join("")}
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
