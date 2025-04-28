const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res)=>{
    if(req.session.is_loggedin){
        return res.json({
          is_loggedin:true,
          userId:req.session.userId,
          name:req.session.name
        })
    }
    else{
         return res.json({is_loggedin:false})
    }
})
router.post('/signup', (req, res)=>{
    data = req.body;
    db.query("select * from user where id=?",[data.id],(err, result)=>{
        if(result.length){return res.status(409).send('중복 ID')}
        if(data.password !==data.passwordCheck){return res.status(400).send('비밀번호 불일치')}
        db.query("INSERT INTO `board`.`user` (`id`, `password`, `name`) VALUES (?,?,?);",[data.id, data.password, data.name],(err, result)=>{
            if(err){return res.status(500).send('아이디 생성 오류')}
            return res.redirect('/')
        })
    })
})

module.exports = router;