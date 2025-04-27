const boardTitle = document.getElementById('board-title');
const boardBody = document.getElementById('board-body');

const postId=window.location.pathname.split('/')[2]

fetch(`/api/post/${postId}`).then(res=>res.json()).then(post=>{
    boardTitle.innerHTML='<h2>수정</h2>'
    boardBody.innerHTML = `
    <form action="/api/post/update" method="post">
        <input type="text" name="title" value="${post.title}"><br>
        <input type="text" name="description" value="${post.description}" style="height: 80px;"><br>
        <input type="hidden" name="postId" value=${post.id}>
        <input type="submit" value="수정">
    </form>`
})

