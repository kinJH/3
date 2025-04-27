const express = require('express');
const router = express.Router();
const db = require('../db');


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
JOIN user ON comment.author_id = user.id
WHERE comment.post_id = ?;`
    const postId = req.params.post_id;
    db.query(query,[postId], (err, result)=>{
        if(err){res.status(500).send("댓글 db 오류")}
        return res.json(result);
    })
})
module.exports=router;


