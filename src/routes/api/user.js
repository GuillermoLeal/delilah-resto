const router = require('express').Router();
const { User } = require('../../database');

router.get('/:email', async (req, res) => {
    try {
        // obtener usuario
        const user = await User.findOne({ where: { email: req.params.email } });

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
