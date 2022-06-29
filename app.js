const express = require('express');
require("dotenv").config();
require("./db/database").connect();
require("./models/seeds/roleSeeder").seedRoles();
require("./caresplus/models/seeds/categorySeeder").seedRoles();
require("./caresplus/models/seeds/pharmacistSeeder").seedRoles();
<<<<<<< HEAD
=======
//web push module for push notification in nodejs app
// const webpush = require('web-push');
// const path = require('path');
>>>>>>> 220d4ea8353470919678c5527889bc6e4a3cc7d8
const authRoutes = require('./caresplus/routes/auth');
const userRoutes = require("./caresplus/routes/user");
const app = express();

//converts data to json
app.use(express.json());


app.use('/api/pharmacist/auth', authRoutes);
<<<<<<< HEAD
app.use('/api/pharmacist/users', userRoutes);
=======
app.use('/api/pharmacist/user', userRoutes);
>>>>>>> 220d4ea8353470919678c5527889bc6e4a3cc7d8

//setting vapid keys details
// webpush.setVapidDetails('mailto:jothamntekim@gmail.com', process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY);

module.exports = app;