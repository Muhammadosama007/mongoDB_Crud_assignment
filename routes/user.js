const express = require('express');
const Router = express.Router();
const { createUser, getUser, getById, getByFname, getByAge, updateUser, deleteUser } = require('../controller/user')

Router.post('/create', createUser);
Router.get('/get', getUser);
Router.get('/userById/:id', getById);
Router.get('/userByFname', getByFname);
Router.get('/userByAge', getByAge);
Router.patch('/updateUser/:id', updateUser);
Router.delete('/deleteUser/:id', deleteUser)

module.exports = Router;