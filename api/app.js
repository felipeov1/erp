const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const morgan = require('morgan'); //request logs (middleware)
const bodyParser = require('body-parser');
const path = require('path'); //provisorio
require("dotenv-safe").config();




const productsRoute = require('./routes/ProductsRoute');
const orderRoute = require('./routes/OrdersRoute');
const loginRoute = require('./routes/LoginRoute');
const registerRoute = require('./routes/RegisterRoute');
const homeRoute = require('./routes/homeRoute');
const inventoryRoute = require('./routes/inventoryRoute');


app.use(morgan('dev'));

app.use(cookieParser());
const jwt = require('jsonwebtoken');

const publicDirectory = path.join(__dirname,); //provisorio
app.use(express.static(publicDirectory));

app.use(bodyParser.urlencoded({ extended: false })); //obter dados do form
app.use(bodyParser.json())

app.set('view engine', 'hbs'); //provisorio


// Middleware para tratamento de requisições OPTIONS
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    res.status(200).end();
});

// Middleware para adicionar cabeçalhos CORS a todas as requisições
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use('/', loginRoute);
app.use('/LoginAuthRoute', require('./routes/LoginAuthRoute'));

app.use('/register', registerRoute);
app.use('/RegisterAuthRoute', require('./routes/RegisterAuthRoute'));

app.use(productsRoute);
app.use('/pedidos', orderRoute);

app.use('/home', verifyJWT, homeRoute);

app.use('/inventory', verifyJWT, inventoryRoute);


function verifyJWT(req, res, next) {
    const token = req.cookies.token; // Obter o token do cookie
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided. ' });

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' })

        req.userId = decoded.id;

        res.cookie("token", token, {
            httpOnly: true,
        });

        next();
    });
};


app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


module.exports = app;