const User = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    const foundUser = (await User.find({ email: email }))[0];
    if (!foundUser) {
        return res.status(400).json('Email or password incorrect');
    }

    const valid = await bcrypt.compare(password, foundUser.password);
    if (!valid) {
        return res.status(400).json('Email or password incorrect');
    }

    res.cookie('token', generateJWT(foundUser._id), {
        httpOnly: true,
        secure: false,
        sameSite: "none"
    });

    res.sendStatus(200);
}

exports.registerUser = async (req, res) => {

    const { first_name, last_name, email, password } = req.body;

    const existingUser = (await User.find({ email: email }))[0];
    if (existingUser) {
        return res.status(400).json('Email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const newUser = await new User({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: encryptedPassword
    }).save();

    res.cookie('token', generateJWT(newUser._id), {
        httpOnly: true,
        secure: false,
        sameSite: "none"
    });

    console.log(newUser._id);

    res.sendStatus(200);
}

generateJWT = (ID) =>{
    const payload = {
        userId: ID
    };

    return jwt.sign(payload, process.env['secret'], {expiresIn: "0.25hr"});
}