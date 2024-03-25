const db = require('../config/connection');
const jwt = require|('jsonwebtoken');
const bcrypt = require('bcryptjs');


exports.register = (req,res) =>{
    console.log(req.body);

    const { name, email, password, passwordConfirm } = req.body;

    db.query('SELECT email FROM usuarios WHERE email = ?', [email], async (error, results) =>{
        if(error){
            console.log(error);
        }

        if(results.length > 0){
            return res.render('register', {
                message: 'That email is already in use'
            })
        }else if(password !== passwordConfirm){
            return res.render('register', {
                message: 'Passwords do not match'
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO usuarios SET ?', {nome: name, email: email, senha: hashedPassword }, (error, results)=>{
            if(error){
                console.log(error);
            }else{
                console.log(results);
                return res.render('register', {
                    message: 'User registred'
                })
            }
        })

    });
}