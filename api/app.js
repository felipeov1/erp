const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const morgan = require('morgan'); //request logs (middleware)
const bodyParser = require('body-parser');
const path = require('path'); //provisorio
require("dotenv-safe").config();




const productsRoutes = require('./routes/ProductsRoute');
const orderRoutes = require('./routes/OrdersRoute');
const loginRoutes = require('./routes/LoginRoute');
const registerRoutes = require('./routes/RegisterRoute');
const homeRoutes = require('./routes/homeRoute');

app.use(morgan('dev'));

app.use(cookieParser());
const jwt = require('jsonwebtoken');

const publicDirectory = path.join(__dirname,); //provisorio
app.use(express.static(publicDirectory));

app.use(bodyParser.urlencoded({ extended: false })); //obter dados do form
app.use(bodyParser.json())

app.set('view engine', 'hbs'); //provisorio


// app.use((req, res, next) =>{
//     res.header('Acess-Control-Allow-Origin', '*');
//     res.header('Acess-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
//     if(req.method === 'OPTIONS'){
//         res.header('Acess-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//         return res.status(200).json({});
//     }else{
//         next(); //entender ** 
//     }
// });

app.use('/',  loginRoutes);
app.use('/LoginAuthRoute', require('./routes/LoginAuthRoute'));

app.use('/register', registerRoutes);
app.use('/RegisterAuthRoute', require('./routes/RegisterAuthRoute'));

app.use(productsRoutes);
app.use('/pedidos', orderRoutes);

app.use('/home', verifyJWT,  homeRoutes)


function verifyJWT(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided. ' });

    jwt.verify(token, process.env.SECRET, function (err, decoded){
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' })

        req.userId = decoded.id;
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