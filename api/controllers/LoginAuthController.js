const db = require('../config/connection');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {

  const { email, password } = req.body

  db.query('SELECT * FROM usuarios WHERE Email = ?', [email], async (error, result) => {

    if (email == result[0].Email || password == result[0].Senha) {
      //auth ok
      const id = result[0].IDUsuario; //esse id viria do banco de dados
      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 1 // expires in 5min
      });

      res.cookie("token", token, {
        httpOnly: true,
        //secure: true, // Descomente esta linha se estiver usando HTTPS
        //maxAge: 3600000, // 1 hora em milissegundos
      });

      return res.render('home');
    }

    res.render('index')


  })
}