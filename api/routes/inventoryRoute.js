const express = require('express');
const router = express.Router();
const path = require('path');

const InventoryController = require('../controllers/InventoryController');

router.get('/', (req, res, next)=>{
    const filePath = path.join(__dirname, '../views/inventory.hbs');
    res.render(filePath);
});

app.get('/getInventory', (req, res) =>{
    
})



module.exports = router;