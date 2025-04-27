const boardTitle = document.getElementById('board-title');
const boardBody = document.getElementById('board-body');
const underBody = document.getElementById('under-body')
const postId = window.location.pathname.split('/')[2]

fetch(`/api/post/${postId}`).then(res=>res.json()).then(data=>{
    const deleteButton = `<br><br><a href="/api/post/delete-process/${postId}">삭제</a>&emsp;`;
    const editButton =`<a href="/post-edit/${postId}">수정</a>`
    boardTitle.innerHTML=data.title;
    boardBody.innerHTML=data.description;
    if(data.isAuthor||!data.author_id){
        boardBody.innerHTML += deleteButton;
        boardBody.innerHTML += editButton;    
    }
})

fetch(`/api/comment/${[postId]}`).then(res=>res.json()).then(comments=>{
    for(let i=0; i<=comments.length; i++){
        comment = comments[i]
        console.log(comment)
        const deleteButton = `<br><br><a href="/api/comment/delete-process/${comment.comment_id}">삭제</a>&emsp;`;
        // const editButton =commentEditButton;
        underBody.innerHTML = `<br>${comment.name} : ${comment.description}&emsp;${deleteButton}`
    }
})

