const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user
    .createProduct({
      title,
      imageUrl,
      price,
      description,
    })
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.productId;
  const editMode = req.query.edit;
  if (!editMode) {
    res.redirect('/');
    return;
  }
  req.user
    .getProducts({ where: { id: prodId } })
    // Product.findByPk(prodId)
    .then((products) => {
      if (!products) {
        res.redirect('/');
        return;
      }
      res.render('admin/edit-product', {
        product: products[0],
        pageTitle: 'Edit Detail',
        path: '/admin/edit-product',
        editing: editMode,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const id = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.findByPk(id)
    .then((product) => {
      (product.title = title),
        (product.imageUrl = imageUrl),
        (product.price = price),
        (product.description = description);
      return product.save();
    })
    .then((result) => {
      res.redirect('/admin/products');
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  // Product.findAll()
  req.user
    .getProducts()
    .then((products) => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'admin Products',
        path: '/admin/products',
      });
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const id = req.body.productId;

  Product.findByPk(id)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      res.redirect('/admin/products');
    })
    .catch((err) => console.log(err));
};
