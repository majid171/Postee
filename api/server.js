require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const CookieParser = require('cookie-parser');
const routes = {
    auth: require('./routes/auth'),
    api: require('./routes/api')
}

mongoose.connect(process.env['MongoDBUrl'], {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

// Middleware
app.use(bodyParser.json());
app.use(CookieParser());
app.use(cors({
    origin: process.env['FrontEndURL'],
    credentials: true
}));

app.listen(5000, () =>{
    console.log("Server is running on port 5000");
});

app.use('/auth', routes.auth);
app.use('/api', routes.api);