import './style.css';
import { getPosts } from './api/api.js';
import { renderEditPost } from './pages/post.js';

async function start() {
  const result = await getPosts();

  const post = result.data[0];

  renderEditPost(post);

}

start();
