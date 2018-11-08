const express = require('express'),
  router = express.Router(),
  sql = require('../module/mysql'),
  format = require('../module/format');

router.get('/username',  (req, res, next)=> {
  sql('select * from usertb where username = ?', [req.query.user], (err, data) => {
    if (data && data.length > 0) {
      res.send(false);
    } else {
      res.send(true);
    }
  })
});

router.post('/register', (req, res, next) =>{
  let user = req.body.name,
    nickname = req.body.nickname,
    pass = req.body.password;
  sql('select * from usertb where username = ?', [user], (err, data) => {
    if(err) throw err;
    if(data && data.length===0){
      time = format();
      sql('INSERT INTO `usertb` (`id`, `username`, `password`, `admin`, `photo`, `nickname`, `sex`, `regtime`, `activeness`) VALUES (0, ?, ?, 0, ?, ?, 0, ?, 0)',[user,pass,'/static/icon/default.png',nickname,time],(er,dt)=>{
        if(er){
          res.send({
            msg:'服务器被外星人偷走了....请稍后再试',
            isOk:false
          });
          return;
        }
        res.send({
          msg:'注册成功!',
          isOk:true,
          result: dt
        });
      })
    }else{
      res.send({msg:'用户名已经存在',isOk:false});
    }
  })
});

router.post('/login', (req, res, next) =>{
  let user = req.body.name,
    pass = req.body.password;
  sql('select * from usertb where username = ?',[user], (err,data)=>{
    if(err) throw err;
    if(data && data.length>0){
      if(data[0].password === pass){
        sql('update usertb set activeness = ? where id = ?',[data[0].activeness+1,data[0].id],(err,data)=>{
          if(err) throw err
        })
        res.send({msg:'登录成功',isOk:true,userInfo:data[0]});
      }else{
        res.send({msg:'密码不正确',isOk:false,userInfo:null})
      }
    }else{
      res.send({msg:'用户名不存在',isOk:false,userInfo:null})
    }
  })
});

module.exports = router;
