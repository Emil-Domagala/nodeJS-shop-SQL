const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
    });
  });
};

exports.getAllProd = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products',
    });
  });
};
exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProds = [];
      for (let product of products) {
        const cartProductData = cart.products.find((prod) => prod.id === product.id);
        if (cartProductData) {
          cartProds.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render('shop/cart', {
        products: cartProds,
        pageTitle: 'Your Cart',
        path: '/cart',
      });
    });
  });
};
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/');
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    // prods: products,
    pageTitle: 'Your Orders',
    path: '/orders',
  });
};
exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    // prods: products,
    pageTitle: 'Checkout',
    path: '/checkout',
  });
};
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: 'Product Detail',
      path: '/products',
    });
  });
};
