var express = require('express');
var router = express.Router();
const session = require('express-session');
var deleteFunc =require('../models/delete');
var display_table = require('../models/product_display');
var insertFunc = require('../models/insert');
var updateProduct = require('../models/updateProduct');

var ssion;
/* GET users listing. */
router.get('/', async function(req, res, next) {
  ssion=req.session;
  console.log(ssion);
  if (ssion.user_id){
    let username= ssion.user_id;
    let shop_id = ssion.shop_id;
    let table_string = await display_table(shop_id)
        res.render('users', { title: 'USER PAGE', 
                              name: username, 
                              table_string: table_string })
  }
 else{
  res.render('login', { title: 'LOGIN PAGE',
                        message: "ATN SHOP", 
                        notice:"Please login first!" });
 }
});

router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.redirect('/');
});

router.post('/functions', async function(req, res, next) {
  // res.send('respond with a resource');
  ssion=req.session;
  let product_id = req.body.id;
  console.log(product_id);
  if(req.body.btt=="delete")deleteFunc(product_id)
  else if(req.body.btt=="update")await updateProduct(req.body.id,req.body.name,req.body.price,req.body.quantity,req.body.shop_id);
  let username = ssion.user_id;
  let shop_id = req.body.shop_id
  let table_string = await display_table(shop_id)
  
  res.render('users', { title: 'USER PAGE', 
              name: username, 
             table_string: table_string })
});



router.post('/insert', async function(req, res, next) {
  // res.send('respond with a resource');
  ssion=req.session;
  let id = req.body.id;
  // console.log(product_id);
  
  let name =req.body.name;
  let price= req.body.price;
  let quantity = req.body.quantity;
  let shop_id = req.body.shop_id;

  insertFunc(id, name, price, quantity, shop_id);
  let username = ssion.user_id; 
  let table_string = await display_table(shop_id)
  res.render('users', { title: 'USER PAGE', 
               name: username, 
             table_string: table_string })
  //res.redirect('/users')
});

module.exports = router;
