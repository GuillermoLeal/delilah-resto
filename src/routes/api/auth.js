const router = require('express').Router();
const { User } = require('../../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    validateRegister,
    validateLogin,
} = require('../../controllers/auth.controller');

// ? Registro de usuario
router.post('/register', validateRegister, async (req, res) => {
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
        res.status(500).json(error);
    }
});

// ? Login de Usuario
router.post('/login', validateLogin, async (req, res) => {
    try {
        const { user } = req;
        // create token
        const token = jwt.sign(
            {
                username: user.username,
                role: user.roleId,
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
    } catch (error) {
        return res
            .status(500)
            .json({ error: error || 'Error al devolver el usuario logueado' });
    }
});

module.exports = router;
