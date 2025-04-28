const boardTitle = document.getElementById('board-title');
const boardBody = document.getElementById('board-body');
const underBody = document.getElementById('under-body')

fetch('/signup.html').then(res=>res.text()).then(html=>{
    boardTitle.innerHTML = '회원가입'
    boardBody.innerHTML = html;
})