import { apiClient } from "./apiClient.js";

const REGISTER_URL = "https://v2.api.noroff.dev/auth/register";

export async function register(name, email, password) {
    const response = await fetch(REGISTER_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            email,
            password
        })
    });
    
    const result = await response.json();

    return result;
}

export async function getPosts() {
    const result = await apiClient("/social/posts");

    return result;
}

export async function createPost(postData) {
    const result = await apiClient("/social/posts", {
        method: "POST",
        body: JSON.stringify(postData),
    });

    return result;
}

export async function updatePost(postId, postData) {
    const result = await apiClient(`/social/posts/${postId}`, {
        method: "PUT",
        body: JSON.stringify(postData),
    });

    return result;
}
