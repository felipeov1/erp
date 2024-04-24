const db = require('../config/connection');



exports.getDataInventory = (req, res) => {

    db.query('SELECT * FROM datas.inventory', (error, result) => {
        if (error) {
            return res.status(500).json({ error: true, message: "Erro ao obter os dados." });
        }

        const dataInventory = result.map(item => ({
            photo: item.photo,
            heritage_property: item.heritage_property,
            local: item.local,
            responser: item.responser,
            value: item.value
        }));

        res.json(dataInventory);
    });
};