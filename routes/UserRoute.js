const express = require('express');
const user_route = express();

//body-parser
const bodyParser = require('body-parser');
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended:true}));


//controller
const userController = require('../controller/UserController');


//api
user_route.post('/register',userController.register);
user_route.post('/login',userController.login);
user_route.post('/logout',userController.logout);

module.exports = user_route;