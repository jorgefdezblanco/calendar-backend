/*
    Auth Controller 
*/
const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');



const create = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: "el usuario existe",
            });
        }


        user = new User(req.body);

        //encript password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        const token = await generateJWT(user.id, user.name);


        res.status(201).json({
            ok: true,
            uid: user._id,
            name: user.name,
            token
        });

    } catch (error) {
        console.log({ error });
        res.status(500).json({
            ok: false,
            msg: "error del servidor"
        });
    }


}


const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "el usuario o la contraseña son incorrecto",
            });
        }


        const valid = bcrypt.compareSync(password, user.password);

        if (!valid) {
            return res.status(400).json({
                ok: false,
                msg: "Contraseña son incorrecta",
            });
        }

        const token = await generateJWT(user.id, user.name);

        res.json({
            ok: true,
            uid: user._id,
            name: user.name,
            token
        })


    } catch (error) {

        console.log({ error });
        res.status(500).json({
            ok: false,
            msg: "error del servidor"
        });
    }
}


const renew = async (req, res = response) => {

    const {uid, name} = req;

    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        token
    });
}



module.exports = {
    create,
    login,
    renew,
}