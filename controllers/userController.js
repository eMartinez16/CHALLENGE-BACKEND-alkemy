const { User } = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodeMailer = require('nodemailer');
require('dotenv/config');
const { response } = require('express');

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
    const currentPassword = await bcrypt.compare(req.body.password, user.password);
    if (!currentPassword) {
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
        const transporter = nodeMailer.createTransport({
            //Uso de GMAIL
            host: 'smtp.gmail.com',
            //Puerto para brindar seguridad
            port: 465,
            secure: true,
            auth: {
                user: process.env.mail,
                pass: process.env.pass_Gmail,
            },
        });
        const mailOptions = {
            from: 'Remitente',
            to: newUser.email,
            subject: 'Enviado desde nodemailer',
            text: 'Welcome to the api!',
        };
        //envia el mail a la casilla no deseados
        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).send(error.message);
            } else {
                console.log('Mail send');
            }
        });
        return res.json({ newUser });
    } catch (error) {
        console.error(error);
    }
};

module.exports = { postLogin, postRegister };