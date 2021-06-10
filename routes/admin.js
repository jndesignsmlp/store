const { Router, response } = require('express');
var express = require('express');
const productHelpers = require('../helpers/producthelpers');
var router = express.Router();
var productHelper=require('../helpers/producthelpers');

/* GET users listing. */
router.get('/', function(req, res, next) {
 productHelpers.getAllProducts().then((products)=>{
  res.render('admin/viewproducts',{admin:true,products})
 })
 
});
router.get('/addproduct',function(req,res){
  res.render('admin/addproduct')
})
router.post('/addproduct',(req,res)=>{

  productHelpers.addProduct(req.body,(id)=>{
    let image=req.files.Image
    console.log(id);
    image.mv('./public/productimages/'+id+'.jpg',(err)=>{
      if(!err)
      {
        res.render("admin/addproduct")
      }else {
           console.log(err);
      }
    })
  })
})
router.get('/deleteproduct/:id',(req,res)=>{
  let proId=req.params.id
  console.log(proId);
  productHelpers.deleteProduct(proId).then((response)=>{
    res.redirect('/admin')
  })
})
router.get('/editproduct/:id',async (req,res)=>{
  let product=await productHelpers.getProductDetails(req.params.id)
  res.render('admin/editproduct',{product})
})
router.post('/editproduct/:id',(req,res)=>{
  let id=req.params.id
  productHelpers.updateProduct(req.params.id,req.body).then((response)=>{
    res.redirect('/admin')
    if(req.files.Image){
      let image=req.files.Image
      image.mv('./public/productimages/'+id+'.jpg')
    }
  })
})

module.exports = router;
