const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res, next)=>{
    const filePath = path.join(__dirname, '../views/home.hbs');
    res.render(filePath);
});

module.exports = router;