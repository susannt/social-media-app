import { 
    getProfile,
    getUserPosts,
    followUser,
    unfollowUser,
    getFollowing 
} from "../api/api.js";

export async function renderProfile() {
    const app = document.querySelector("#app");

    const profile = JSON.parse(localStorage.getItem("profile"));

    const result = await getUserPosts(profile.name);

    app.innerHTML = `
        <h1>My Profile</h1>
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
}

export async function renderUserProfile(name) {
    const app = document.querySelector("#app");

    const myProfile = JSON.parse(localStorage.getItem("profile"));
    
    const followingResult = await getFollowing(myProfile.name);

    const isFollowing = followingResult.data.following.some(
        (user) => user.name === name,
    );

    const result = await getProfile(name);
    const profile = result.data;

    const postsResult = await getUserPosts(name);

    app.innerHTML = `
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
