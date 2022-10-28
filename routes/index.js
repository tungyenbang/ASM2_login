var express = require('express');
var authen = require('../models/authenticator');
var select_box=require('../models/displaySelect_Box');
var display_table = require('../models/shopData');

var router = express.Router();
//declare a variable
// var ss;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ATN SHOP' , notice:""})
});

/* POST home page. */
router.post('/', function(req, res, next) {
  res.render('login', { title: 'Login page',
                        message: 'ATN Shop',
                        notice: '' });
});

router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.redirect('/');
});

router.post('/login', async function(req, res, next) {
  // console.log("username: " +req.body.username);
  // console.log("password: " +req.body.password);
  const username =req.body.username
  const password =req.body.password
  var ss;
  ss = req.session;
  let [authenticated,shop_id,role] =await authen(username,password); //authen la ham` bat dong bo
  var  select_box_string = await select_box();
  if (authenticated == true && role == "NV") {
    ss.user_id = username;
    console.log(ss.user_id)
    ss.shop_id = shop_id;
    res.redirect('/users')
  }
  else if (authenticated == true && role == "admin"){ 
    ss.role=role;    
    let table_string= await display_table(0);
    res.render('admin', { title: 'ADMIN PAGE', name: req.body.username,
                          box: select_box_string, 
                          table: table_string })
  }
  else{
    res.render('login', { title: 'LOGIN PAGE', 
                          message: "ATN SHOP", 
                          notice:"Wrong username or password! Try again" });
  }
});
router.get('/back',async function(req, res, next) {
  res.redirect('back')
});

router.get('/shop',async function(req, res, next) {
  let table_string= await display_shop(0);
  res.render('shop', {   title: 'ADMIN PAGE',
                          name: 'Admin',
                          table: table_string })
});

router.post('/select_shop', async function(req, res, next) {
  let shop_id= req.body.shop; 
  var  select_box_string = await select_box();
  let table_string= await display_table(shop_id);
  res.render('admin', {   title: 'ADMIN PAGE',
                          name: "director",
                          box: select_box_string, 
                          table: table_string })
});
module.exports = router;
