const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  validateRegister,
  validateLogin,
} = require('../controllers/auth.controller');

router.post('/register', async (req, res) => {
  // validate user
  const { error } = validateRegister(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Validar email unico
  const isEmailExist = await User.findOne({ email: req.body.email });
  if (isEmailExist) {
    return res.status(400).json({ error: 'Email ya registrado' });
  }

  // hash contraseña
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  try {
    const user = new User({
      username: req.body.username,
      fullname: req.body.fullname,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
      password,
      role: 'ROLE_USER',
    });

    const saveUser = await user.save();

    res.json({
      error: null,
      data: saveUser,
    });
  } catch (error) {
    res.json(error);
  }
});

router.post('/login', async (req, res) => {
  // validaciones
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json({ error: 'contraseña no válida' });

  // create token
  const token = jwt.sign(
    {
      username: user.username,
      id: user._id,
    },
    process.env.TOKEN_SECRET
  );

  res.json({
    error: null,
    message: 'Usuario logueado correctamente',
    token,
  });
});

module.exports = router;
