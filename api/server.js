require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = {
    auth: require('./routes/auth')
}

mongoose.connect(process.env['MongoDBUrl'], {useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.listen(5000, () =>{
    console.log("Server is running on port 5000");
});

app.use('/auth', routes.auth);
// app.use('/auth', authRateLimiter, routes.auth);
// app.use('/u', authCheck, routes.user);
// app.use('/', antiAuthCheck, routes.index);
