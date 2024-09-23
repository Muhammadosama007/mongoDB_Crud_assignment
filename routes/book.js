const express = require('express');
const Router = express.Router();
const { createBook, getBook, getByTitle, getByAuthor, getById, updateBook, deleteBook } = require('../controller/book')

Router.post('/create', createBook)
Router.get('/get', getBook)
Router.get('/booksByName', getByTitle)
Router.get('/booksByAuthor', getByAuthor)
Router.get('/booksById/:id', getById)
Router.patch('/Update/:id', updateBook)
Router.delete('/delete/:id', deleteBook)

module.exports = Router;