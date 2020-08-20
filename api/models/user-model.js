const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String
});

// userSchema.createIndexes({email: 1});

const User = mongoose.model('user', userSchema);

module.exports = User;
