const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/delete-process/:comment_id',(req, res)=>{
    const commentId = req.params.comment_id;
    db.query("select * from comment where id=?", [commentId],(err, result)=>{
        if(err){throw err}
        if(result[0].author_id === req.session.userId){
            db.query("DELETE FROM `board`.`comment` WHERE (`id` = ?);",[commentId],(err, result)=>{
                if(err){return res.status(500).send('삭제 중 오류')}
                return res.redirect('/')
            })
        }
        else{
            res.status(403).send('본인만 삭제가능')
        }
    })
})

router.post('/create', (req, res)=>{
    const comment = req.body;
    db.query("INSERT INTO comment (`author_id`, `description`, `post_id`) VALUES (?, ?, ?);",[req.session.userId??null, comment.description, comment.postId],(err, result)=>{
        if(err){
            res.status(500).send('댓글 작성 db오류')}
        res.redirect(`/post/${comment.postId}`)
    })
})

router.get('/:post_id',(req, res)=>{
    const query = `
SELECT
  comment.id AS comment_id,
  comment.description,
  comment.author_id,
  comment.post_id,
  comment.created,
  user.id AS user_id,
  user.name
FROM comment
LEFT JOIN user ON comment.author_id = user.id
WHERE comment.post_id = ?;
`
    const postId = req.params.post_id;
    db.query(query,[postId], (err, result)=>{
        if(err){res.status(500).send("댓글 db 오류")}
        return res.json(result);
    })
})
module.exports=router;


