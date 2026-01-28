let currentPostId = null;

function loadPosts() {
  fetchPosts().then((posts) => {
    const list = document.getElementById("postList");
    list.innerHTML = "";

    posts.forEach((p) => {
      const div = document.createElement("div");

      if (p.isDeleted) div.classList.add("deleted");

      div.innerHTML = `
                ${p.title} (${p.views})
                <button onclick="softDeletePost('${p.id}')">Delete</button>
                <button onclick="selectPost('${p.id}')">Comments</button>
            `;

      list.appendChild(div);
    });
  });
}

function generatePostId(posts) {
  if (posts.length === 0) return "1";
  const maxId = Math.max(...posts.map((p) => Number(p.id)));
  return String(maxId + 1);
}

function addPost() {
  const title = document.getElementById("title").value;
  const views = document.getElementById("views").value;

  fetchPosts().then((posts) => {
    const post = {
      id: generatePostId(posts),
      title,
      views,
      isDeleted: false,
    };

    createPostAPI(post).then(loadPosts);
  });
}

function softDeletePost(id) {
  updatePostAPI(id, { isDeleted: true }).then(loadPosts);
}

function selectPost(id) {
  currentPostId = id;
  loadComments();
}

loadPosts();
