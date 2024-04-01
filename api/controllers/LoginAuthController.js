const db = require('../config/connection');

exports.login = (req, res) => {

    const { email, password } = req.body

    db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (error, result) => {

        if (error) {
            console.log(error);
        }

        // if (email == result) {
        //     return res.render('index', {
        //         message: 'email e senha corretos'
        //     });
        // }
        // if (password == result) {
        //     return res.render('index', {
        //         message: 'email e senha corretos'
        //     });
        // }

        let results = JSON.parse(JSON.stringify(result)) 

        return console.log(results[1])
        // return res.render('index', {
        //     message: 'email e senha corretos'
        // });



    })
}