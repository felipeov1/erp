const db = require('../config/connection');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM usuarios WHERE Email = ?', [email], async (error, result) => {
    if (error) {
      return res.status(500).json({ error: true, message: "Internal server error" });
    }

    if (!result.length || password !== result[0].Senha) {
      return res.render('index');
    }

    const id = result[0].IDUsuario;
    const token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 3000 // expires in 1 hour
    });

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.redirect('/home');
  });
};