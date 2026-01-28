function loadComments() {
  if (!currentPostId) return;

  fetchComments(currentPostId).then((comments) => {
    const list = document.getElementById("commentList");
    list.innerHTML = "";

    comments.forEach((c) => {
      const li = document.createElement("li");

      if (c.isDeleted) li.classList.add("deleted");

      li.innerHTML = `
                ${c.text}
                <button onclick="softDeleteComment('${c.id}')">Delete</button>
            `;

      list.appendChild(li);
    });
  });
}

function generateCommentId(comments) {
  if (comments.length === 0) return "1";
  const maxId = Math.max(...comments.map((c) => Number(c.id)));
  return String(maxId + 1);
}

function addComment() {
  const text = document.getElementById("commentText").value;

  fetch(`${API}/comments`)
    .then((res) => res.json())
    .then((allComments) => {
      const comment = {
        id: generateCommentId(allComments),
        postId: currentPostId,
        text,
        isDeleted: false,
      };

      createCommentAPI(comment).then(loadComments);
    });
}

function softDeleteComment(id) {
  updateCommentAPI(id, { isDeleted: true }).then(loadComments);
}
