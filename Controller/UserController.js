const User = require("../models/UserSchema");
const sendData = require("../config/mail");
const crypto = require('crypto');
const bcrypt =require("bcryptjs")
const jwt=require("jsonwebtoken");
const { FogetFormat } = require("../utils/ForgetPass");
exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;

        const Emaildata = await User.findOne({ email: email });
        if (Emaildata) {
            return res.json("Email Already Register🤣🤣");
        }

        const data = await User.create({ email, password });
        if (data) {
            return res.json("Registration Completed❤️👍👍");
        } else {
            return res.json("Something Went Wrong😫😫😫");
        }
    } catch (error) {
        console.log(error);
        return res.json("An error occurred during registration.");
    }
};

exports.sendmail = async (req, res) => {
    try {
        function generateOtp(length = 6) {
            const otp = crypto.randomInt(0, Math.pow(10, length)).toString();
            return otp.padStart(length, "0");
        }

        const { email } = req.body;
        const ExitUser = await User.findOne({ email: email });

        if (!ExitUser) {
            return res.json("Invalid details😫😫😫");
        }

        const otp = generateOtp();
        console.log(`Generated OTP: ${otp}`); // Debugging line

        const updatedata = await User.findByIdAndUpdate(
            ExitUser._id,
            { otp: otp },
            { new: true } // Ensure the updated document is returned
        );

        if (updatedata) {
            console.log(`Sending OTP to email: ${ExitUser.email}`); // Debugging line
            sendData(ExitUser.email, "foget your password" ,FogetFormat(ExitUser.email,otp)); // Ensure sendData function works properly
            return res.json("OTP sent Successfully👍👍🙋‍♂️");
        } else {
            return res.json("Something went wrong😫😫");
        }
    } catch (error) {
        console.log(error);
        return res.json("An error occurred while sending OTP.");
    }
};



exports.signin = async (req, res) => {
    try {
        const { email, otp } = req.body;
        console.log(req.body);

        const ExitUser = await User.findOne({ email: email });

        if (!ExitUser) {
            return res.json("Invalid Details....😫😫");
        }
        if (ExitUser.otp !== otp) {
            return res.json("Invalid OTP...😫😫😫");
        }

      
        ExitUser.otp = "";  // Clear the OTP after successful login

        const updatedUser = await ExitUser.save();

        if (updatedUser) {
           const token =jwt.sign({
                userid:ExitUser._id,
                userrole:ExitUser.role_id,
           },
           "harshkey",  
           {expiresIn:"1h"}
        )
        res.header("token",token).json({
            success:true,
            message:"loging successfully❤️❤️😍"
        })
        } else {
            return res.json("Something went wrong during login...😫😫");
        }
    } catch (error) {
        console.log(error);
        return res.json("An error occurred during login.");
    }
};

