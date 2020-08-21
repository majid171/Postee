const User = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const foundUser = (await User.find({ email: email }))[0];
        if (!foundUser) {
            return res.status(401).json('Email or password incorrect');
        }

        const valid = await bcrypt.compare(password, foundUser.password);
        if (!valid) {
            return res.status(400).json('Email or password incorrect');
        }

        res.cookie('token', generateJWT(foundUser._id), {
            httpOnly: false,
            secure: false,
            sameSite: "none"
        });
        res.status(200).json(foundUser);
    } catch (error) {
        console.log(error);
    }
}

exports.registerUser = async (req, res) => {
    try {
        const { first, last, email, password1, password2 } = req.body;

        if(password1 !== password2){
            return res.status(401).json("Passwords do not match");
        }

        const existingUser = (await User.find({ email: email }))[0];
        if (existingUser) {
            return res.status(401).json('Email already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password1, salt);

        const newUser = await new User({
            first_name: first,
            last_name: last,
            email: email,
            password: encryptedPassword
        }).save();

        res.cookie('token', generateJWT(newUser._id), {
            httpOnly: false,
            secure: false,
            sameSite: "none"
        });

        res.status(200).json(newUser);
    } catch (error) {
        console.log(error);
    }
}

generateJWT = (ID) => {
    return jwt.sign({ userId: ID }, process.env['secret'], { expiresIn: "0.25hr" });
}