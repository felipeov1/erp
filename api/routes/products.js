const express= require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'GET requests to /produtos'
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'POST requests to /produtos'
    });
});

router.get('/:produtoId', (req, res, next) => {
    const id = req.params.produtoId;
    if(id === '123') {
        res.status(200).json({
            message: 'Special ID',
            id: id
        });
    }else{
        res.status(200).json({
            message: 'Passed an ID'
        });
    };
});

router.patch('/:produtoId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated product'
    })
});

router.delete('/:produtoId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted product'
    })
});

module.exports = router;