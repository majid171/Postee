const User = require('../models/user-model');
const bcrypt = require('bcrypt');

exports.loginUser = async (req, res) => {
    const {email, password} = req.body;
    

    // const user = await new User({
    //     first_name: "majid",
    //     last_name: "joseph",
    //     email: email
    // }).save();

    res.sendStatus(200);
}

exports.registerUser = async (req, res) => {

    const {first_name, last_name, email, password} = req.body;
    
    const existingUser = await User.find({email: email});
    if(existingUser.length !== 0){
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

    res.sendStatus(200);
}