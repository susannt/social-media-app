import { getPosts } from "../api/api.js";

export async function renderFeed() {
    const result = await getPosts();

    console.log(result);
}