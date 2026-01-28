let posts = JSON.parse(localStorage.getItem("posts")) || [];
let comments = JSON.parse(localStorage.getItem("comments")) || [];
let selectedPostId = null;

// 👉 ID tự tăng (chuỗi)
function generateId(list) {
    if (list.length === 0) return "1";
    const maxId = Math.max(...list.map(i => Number(i.id)));
    return String(maxId + 1);
}

// 👉 CREATE POST
function addPost() {
    const title = document.getElementById("title").value;
    if (!title) return;

    const post = {
        id: generateId(posts),
        title,
        isDeleted: false
    };

    posts.push(post);
    localStorage.setItem("posts", JSON.stringify(posts));
    renderPosts();
}

// 👉 READ POSTS (HIỂN THỊ POST ĐÃ XÓA MỀM)
function renderPosts() {
    const body = document.getElementById("postBody");
    body.innerHTML = "";

    posts.forEach(p => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${p.id}</td>
            <td class="${p.isDeleted ? 'deleted' : ''}">
                ${p.title}
            </td>
            <td>
                <button onclick="selectPost('${p.id}')">Comments</button>
                <button onclick="softDelete('${p.id}')">Delete</button>
            </td>
        `;
        body.appendChild(tr);
    });
}

// 👉 UPDATE POST (XÓA MỀM)
function softDelete(id) {
    const post = posts.find(p => p.id === id);
    post.isDeleted = true;

    localStorage.setItem("posts", JSON.stringify(posts));
    renderPosts();
}

// ================= COMMENTS CRUD =================

// 👉 CREATE COMMENT
function addComment() {
    const content = document.getElementById("commentContent").value;
    if (!content || !selectedPostId) return;

    const comment = {
        id: generateId(comments),
        postId: selectedPostId,
        content
    };

    comments.push(comment);
    localStorage.setItem("comments", JSON.stringify(comments));
    renderComments();
}

// 👉 READ COMMENTS
function renderComments() {
    const ul = document.getElementById("commentList");
    ul.innerHTML = "";

    comments
        .filter(c => c.postId === selectedPostId)
        .forEach(c => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${c.content}
                <button onclick="deleteComment('${c.id}')">X</button>
            `;
            ul.appendChild(li);
        });
}

// 👉 DELETE COMMENT
function deleteComment(id) {
    comments = comments.filter(c => c.id !== id);
    localStorage.setItem("comments", JSON.stringify(comments));
    renderComments();
}

function selectPost(id) {
    selectedPostId = id;
    renderComments();
}

renderPosts();
