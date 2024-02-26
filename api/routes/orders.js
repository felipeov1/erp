const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) =>{
    res.status(200).json({
        message: 'Orders were fetched'
    });
});

router.post('/', (req, res, next) =>{
    res.status(200).json({
        message: 'Orders was created'
    });
});

router.get('/:pedidosId', (req, res, next) =>{
    res.status(200).json({
        message: 'Order details',
        pedidoId: req.params.pedidosId
    });
});

router.delete('/:pedidosId', (req, res, next) =>{
    res.status(200).json({
        message: 'Order was deleted',
        pedidoId: req.params.pedidosId
    });
});

module.exports = router;