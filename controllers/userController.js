const { User } = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Verificación, login y generación de token
const postLogin = async(req, res) => {
    const emailFromReq = req.body.email;
    const user = await User.findOne({
        where: {
            email: emailFromReq,
        },
    });
    if (!user) {
        return res.json({ error: 'User not found' });
    }
    if (!bcrypt.compare(req.body.password, user.password)) {
        return res.json({ error: 'Invalid credentials' });
    }
    //Uso de libreria jsonwebToken para generar un token que contiene el user.id junto con la variable de entorno secreta
    const token = jwt.sign({ user: user.id }, process.env.SECRET, {
        expiresIn: 1000 * 60 * 60 * 24 * 7,
    });

    res.json({ token, user });
};

// creación de usuario
const postRegister = async(req, res) => {
    const { name, email, password } = req.body;
    try {
        const emailExists = await User.findOne({
            where: {
                email,
            },
        });
        if (emailExists) {
            return res.json({ message: 'Email already exists' });
        }
        //encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        //crea un nuevo usuario
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        return res.json({ newUser });
    } catch (error) {
        console.error(error);
    }
};

module.exports = { postLogin, postRegister };