const express = require('express');
const Router = express.Router();
const {login,register,forgetPassword,resetPassword}=require('../controller/Authentication');


Router.post('/login',login);
Router.post('/signUp',register);
Router.post('/forgetPass',forgetPassword);
Router.post('/resetPass',resetPassword);

module.exports=Router;