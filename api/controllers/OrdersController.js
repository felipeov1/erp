const OrdersModel = require('../models/OrdersModel');

exports.getOrders = ((req, res) => {

    const Orders = new OrdersModel();
    const test = Orders.testOrders();

    res.send(`
        <h1>Pedidos<h1>
        <p>${test}<p>
    `)
})

exports.postOrders = ((req, res, next) => {
    const order = {
        name: req.body.name,
        price: req.body.price
    }

    res.status(200).json({
        message: 'POST requests to /produtos',
        createdOrder: order  //analyse how to make this in this model
    });
})

exports.getOrderId = ((req, res, next) => {
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

exports.patchOrder = ((req, res, next) => {
    res.status(200).json({
        message: 'Updated Order'
    })
})

exports.deleteOrder = ((req, res, next) => {
    res.status(200).json({
        message: 'Deleted Order'
    })
})