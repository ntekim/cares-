const express = require('express');
require("dotenv").config();
require("./db/database").connect();
require("./models/seeds/roleSeeder").seedRoles();
require("./caresplus/models/seeds/categorySeeder").seedRoles();
require("./caresplus/models/seeds/pharmacistSeeder").seedRoles();
const authRoutes = require('./caresplus/routes/auth');
const userRoutes = require("./caresplus/routes/user");
const roleRoutes = require("./caresplus/routes/role");
const app = express();

//converts data to json
app.use(express.json());


app.use('/api/pharmacist/auth', authRoutes);
app.use('/api/pharmacist/users', userRoutes);
app.use('/api/roles', roleRoutes);

//setting vapid keys details
// webpush.setVapidDetails('mailto:jothamntekim@gmail.com', process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY);

module.exports = app;