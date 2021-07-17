const router = require('express').Router();
const { User } = require('../../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    validateRegister,
    validateLogin,
} = require('../../controllers/auth.controller');

// ? Registro de usuario
router.post('/register', async (req, res) => {
    // validate user
    const { error } = validateRegister(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    // Validar email y usuario unico
    const isEmailExist = await User.findOne({
        where: { email: req.body.email },
    });
    if (isEmailExist) {
        return res.status(400).json({ error: 'Email ya registrado' });
    }

    // hash contraseña
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    try {
        const saveUser = await User.create({
            username: req.body.username,
            fullname: req.body.fullname,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email,
            password,
            roleId: 2,
        });

        const { username, fullname, address, phone, email } = saveUser;

        res.json({
            error: null,
            data: { username, fullname, address, phone, email },
        });
    } catch (error) {
        res.json(error);
    }
});

// ? Login de Usuario
router.post('/login', async (req, res) => {
    // validaciones
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
    );
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

    const { username, fullname, address, phone, email } = user;

    res.json({
        error: null,
        message: 'Usuario logueado correctamente',
        user: { username, fullname, address, phone, email },
        token,
    });
});

module.exports = router;
