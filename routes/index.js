var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = mongoose.model('Product');

/* GET home page. */
router.get('/products', function(req, res, next) {
  console.log("in get route");
  Product.find(function(err, products) {
      if (err) { console.log("Error in get"); return next(err); }
      res.json(products);
  });
});

router.post('/products', function(req, res, next) { // creates object
    console.log("In post route");
    console.log(req.body);
    var product = new Product(req.body);
    product.save(function(err, product) {
        if (err) { console.log("error in post"); return next(err); }
        console.log("After database" + product);
        res.json(product);
    });
});

router.param('product', function(req, res, next, id) {
    Product.findById(id, function(err, product) {
        if (err) { return next(err); }
        if (!product) { return next(new Error("can't find product")); }
        req.product = product;
        return next();
    });
});

router.get('/products/:product', function(req, res) { // :comment calls param helper function
    res.json(req.product);
});

router.put('/products/:product/order', function(req, res, next) { // adds elements to object
    req.product.order(function(err, productInfo) {
        if (err) { return next(err); }
        res.json(productInfo);
    });
});


router.delete('/products/:product', function(req, res) {
    console.log("in Delete");
    req.product.remove();
    res.sendStatus(200);
});

module.exports = router;
