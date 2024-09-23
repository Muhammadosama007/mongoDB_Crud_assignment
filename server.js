const express = require('express');
const mongoose = require('mongoose');
const bookRouter=require("../mongoDB_Crud_assignment/routes/book")
const userRouter=require('../mongoDB_Crud_assignment/routes/user')
const userAuth=require('../mongoDB_Crud_assignment/routes/Authorization');


const app = express();

app.use(express.json());

// mongoose.connect('mongodb://localhost:27017/books');  
mongoose.connect('mongodb://localhost:27017/LMS')  

app.use('/books',bookRouter);
app.use('/users',userRouter);
app.use('/auth',userAuth);



const port = 3000;
app.listen(port, () => {
    console.log("server listening on port: ", port);
})