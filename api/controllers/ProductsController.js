const ProductsModel = require('../models/ProductsModel');

exports.getProducts = ((req, res) => {

    const products = new ProductsModel();
    const test = products.testProducts();

    res.send(`
        <h1>Produtos<h1>
        <p>${test}<p>
    `)
})

exports.postProducts = ((req, res, next) => {

    const product = {
        name: req.body.name,
        price: req.body.price
    }

    res.status(200).json({
        message: 'POST requests to /produtos',
        createdProduct: product  //analyse how to make this in this model
    });
})

exports.getProductId = ((req, res, next) => {
    const id = req.params.produtoId;
    if (id === '123') {
        res.status(200).json({
            message: 'Special ID',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'Passed an ID'
        });
    };  // ---->Move this to model<----

})

exports.patchProduct = ((req, res, next) => {
    res.status(200).json({
        message: 'Updated product'
    })
})

exports.deleteProduct = ((req, res, next) => {
    res.status(200).json({
        message: 'Deleted product'
    })
})