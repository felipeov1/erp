const express = require('express');
const app = express();
const morgan = require('morgan'); //request logs (middleware)
const bodyParser = require('body-parser');


const productsRoutes = require('./routes/ProductsRoute');
const orderRoutes = require('./routes/orders');
const homeRoutes = require('./routes/home');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) =>{
    res.header('Acess-Control-Allow-Origin', '*');
    res.header('Acess-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if(req.method === 'OPTIONS'){
        res.header('Acess-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }else{
        next(); //entender ** 
    }
});


app.use(productsRoutes);
app.use('/pedidos', orderRoutes);
app.use('/', homeRoutes);

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