var express = require('express');
var router = express.Router();
var display_table = require('../models/shopData');
var express = require('express');
const session = require('express-session');
var router = express.Router();
/* GET home page. */
router.get('/', async function(req, res, next) {
  ss= req.session
 if(session.user_id) {let table_string= await display_table(0);
      res.render('admin', { title: 'ADMIN PAGE', name: req.body.username,
                            box: select_box_string, 
                            table: table_string })
  
 }
 else{
  res.render('login', { title: 'LOGIN PAGE',
                        message: "ATN SHOP", 
                        notice:"Please login first!" });
 }
});


module.exports = router;
