const router = require('express').Router();
const { User } = require('../../database');
const { authorizeRoleAdmin } = require('../../controllers/auth.controller');

// ? Obtener informacion de usuario por el email
router.get('/:email', authorizeRoleAdmin, async (req, res) => {
    try {
        // obtener usuario
        const user = await User.findOne({ where: { email: req.params.email } });

        if (user == null) {
            res.status(404).json({
                error: 'Usuario no encontrado',
            });
        }

        const { username, fullname, address, phone, email } = user;

        res.json({
            error: null,
            data: { username, fullname, address, phone, email },
        });
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;
