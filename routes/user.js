var express = require('express');
var router = express.Router();
const productHelpers = require('../helpers/producthelpers');
/* GET home page. */
router.get('/', function(req, res, next) {
  productHelpers.getAllProducts().then((products)=>{
    res.render('user/index',{admin:true,products})
   })
  
});

module.exports = router;
