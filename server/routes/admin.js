const express = require('express'),
  router = express.Router(),
  sql = require('../module/mysql');

router.get('/',(req,res) => {
  res.render('admin.html')
});


module.exports = router;
