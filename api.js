const API = "http://localhost:3000";

// POSTS
function fetchPosts() {
  return fetch(`${API}/posts`).then((res) => res.json());
}

function createPostAPI(post) {
  return fetch(`${API}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
}

function updatePostAPI(id, data) {
  return fetch(`${API}/posts/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

// COMMENTS
function fetchComments(postId) {
  return fetch(`${API}/comments?postId=${postId}`).then((res) => res.json());
}

function createCommentAPI(comment) {
  return fetch(`${API}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  });
}

function updateCommentAPI(id, data) {
  return fetch(`${API}/comments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}
