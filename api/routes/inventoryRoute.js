const express = require('express');
const router = express.Router();
const getDataInventory = require('../controllers/InventoryController');
const path = require('path');



router.get('/', (req, res, next)=>{
    const filePath = path.join(__dirname, '../views/inventory.hbs');
    res.render(filePath);
});

router.get('/getData', getDataInventory.getDataInventory);






module.exports = router;