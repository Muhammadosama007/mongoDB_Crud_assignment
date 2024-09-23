const { Book } = require('../models/bookModel');
const { User } = require('../models/UserModel');


const createUser = (req, res) => {
    const user = new User(req.body);
    if (!user) {
        res.status(404).json({
            message: "User Not Created!!"
        })
    }
    else {
        user.save();
        res.send(user);
    }
}

const getUser = async (req, res) => {
    const getUser = await User.find().populate('bookId');
    if (!getUser) {
        res.status(404).json({
            message: 'Cannot get users!!!'
        })
    }
    else {
        res.send(getUser);
    }
}

const getById = async (req, res) => {
    const userById = await User.findById(req.params.id);
    if (!userById) {
        res.status(404).json({
            message: 'user not found by Id'
        })
    }
    else {
        res.send(userById);
    }
}

const getByFname = async (req, res) => {
    const userByFname = await User.findOne({ firstName: req.query.firstName });
    if (!userByFname) {
        res.status(404).json({
            message: 'cant find by First Name!!!'
        })
    }
    else {
        res.send(userByFname);
    }
}

const getByAge = async (req, res) => {
    const userByFname = await User.findOne({ Age: req.query.Age });
    if (!userByFname) {
        res.status(404).json({
            message: 'user not find by age!!!'
        })
    }
    else {
        res.send(userByFname);
    }
}

// const borrowBook = async (req, res) => {
// const user=await User.findById(req.params.id).populate('bookId');
// const book=await Book.findById(req.params.id);

// if(!user){
//     res.status(401).json({
//         message:'user not find!!!'
//     })
// }
// if(!book){
//     res.status(401).json({
//         message:'book not find!!!'
//     })
// }

// }



const updateUser = async (req, res) => {
    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updateUser) {
        res.status(404).json({
            message: 'cannot update User'
        })
    }
    else {
        res.send(updateUser);
    }
}

const deleteUser = async (req, res) => {
    const delUser = await User.findByIdAndDelete(req.params.id);
    if (!delUser) {
        res.status(404).json({
            message: 'cannot delete user!!!'
        })
    }
    else {
        res.send(delUser);
    }
}



module.exports = {
    createUser,
    getUser,
    getById,
    getByAge,
    getByFname,
    updateUser,
    deleteUser,
}