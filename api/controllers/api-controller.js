const User = require('../models/user-model');

exports.home = async (req, res, next) => {
    return res.status(200).json('OK');
}



