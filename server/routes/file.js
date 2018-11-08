const express = require('express'),
  router = express.Router(),
  fs = require('fs');

router.get('/articleImg',(req,res) => {
  fs.readdir('../../dist/image/articleLogo',(err,files)=>{
    if(err) throw err;
    if(files && files.length>0){
      res.send({
        isOk: true,
        result: files
      })
    }else{
      res.send({
        isOk: false,
      })
    }
  })
})

module.exports = router;
