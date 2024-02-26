const express = require('express');
const app = express();
const morgan = require('morgan'); //request logs (middleware)

const productsRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

app.use(morgan('dev'));

app.use('/produtos', productsRoutes)
app.use('/pedidos', orderRoutes)

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


module.exports = app;