const boardTitle = document.getElementById('board-title');
const boardBody = document.getElementById('board-body');
const underBody = document.getElementById('under-body')
const postId = window.location.pathname.split('/')[2]
const commentWrite = `
<form action="/api/comment/create" method="post">
    <br><br><input type="text" name="description" placeholder="댓글" style="height: 20px;">
    <input type="hidden" name="postId" value=${postId}>
    <input type="submit" value="작성">
</form>`

const writeButton = function(){

}

fetch(`/api/post/${postId}`).then(res=>res.json()).then(data=>{
    const deleteButton = `<br><br><a href="/api/post/delete-process/${postId}">삭제</a>&emsp;`;
    const editButton =`<a href="/post-edit/${postId}">수정</a>`
    boardTitle.innerHTML=data.title;
    boardBody.innerHTML=data.description;
    boardBody.innerHTML+=commentWrite;

    if(data.isAuthor||!data.author_id){
        boardBody.innerHTML += deleteButton;
        boardBody.innerHTML += editButton;
    }
})

fetch(`/api/comment/${[postId]}`).then(res=>res.json()).then(comments=>{
    for(let i=0; i<=comments.length; i++){
        comment = comments[i]
        console.log(comment)
        const deleteButton = `<a href="/api/comment/delete-process/${comment.comment_id}">삭제</a>&emsp;`;
        // const editButton =commentEditButton;
        underBody.innerHTML += `<br>${comment.name??'익명'} : ${comment.description}&emsp;${deleteButton}`
    }
})

