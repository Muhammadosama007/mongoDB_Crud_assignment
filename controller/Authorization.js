const { User } = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');

const login = async (req, res) => {
    const { password } = req.body;
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        res.status(401).json({
            message: 'user not found!!!'
        })
    }
    else {
        const is_Match = await bcrypt.compare(password, user.password);
        if (!is_Match) {
            res.status(401).json({
                message: 'password not match!!'
            })
        }
        else {
            const encrytToken = jwt.sign({ id: user.id, email: user.email }, "secret");

            res.status(200).json({
                message: "successfully login",
                user: user,
                token: encrytToken
            });
        }
    }
}

const forgetPassword = async (req, res) => {
    // console.log("osama");
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        res.status(401).json({
            message: 'user not find!!!'
        })
    }
    else {

        otp = Math.floor(Math.random() * (9999 - 1000) + 1000);
        console.log(otp, 'OTP');

        user.resetOtp = otp;
        user.passExpire = Date.now() + 5 * 60 * 1000;
        user.save()

        res.status(200).json({
            messaage: "otp generated successfully._."
        })


        // Create a transporter object
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'osamaamjad0386@gmail.com',
                pass: 'nxdc bacq zats rmgg',
            }
        });

        // Configure the mailoptions object
        const mailOptions = {
            from: 'osamaamjad0386@email.com',
            to: 'mohsin.riaz338@gmail.com',
            subject: 'Sending OTP',
            text: otp + 'That was an easy task._.'
        };

        // Send the email
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log('Error:', error);
            } else {
                console.log('Email sent: ', info.response);
            }
        });


    }
}
const becrptHashedPass = async (password) => {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword
}

const resetPassword = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        res.status(401).json({
            message: 'user not find!!!'
        })
    }
    else {
        console.log(user.resetOtp, req.body.resetOtp);

        if (user.resetOtp == req.body.resetOtp) {
            // res.status(200).json({
            //     message:'OTP Matched._.'
            // })
            console.log("old Pass: "+user.password);
            const pass = await becrptHashedPass(user.password);
            user.password = pass;
            console.log("new pass: "+pass);
            await user.save();

            res.status(200).json({
                message: 'Password Changed Successfully._.',
                user:user,
                password:pass
            })
        }
        else {
            res.status(401).json({
                messaage: "OTP doesn't matched!!!"
            })
        }
    }
}

const register = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({
            message: 'Email and Password Required!!'
        })
    }
    else {
        // const salt = 10;
        // const hashedPassword = await bcrypt.hash(password, salt);
        const pass = await becrptHashedPass(password);
        const newUser = new User({
            email: email,
            password: pass
        })

        newUser.save();
        res.status(200).json({
            message: 'successfully registered and password encrypted._.',
            email: newUser.email,
            password: pass
        })

    }

}


module.exports = {
    login,
    register,
    forgetPassword,
    resetPassword
}