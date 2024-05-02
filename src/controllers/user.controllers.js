const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const generateToken = require("../utils/generateToken")

const signUp = async (req, res) => {
    const { username, password, email, firstName, lastName } = req.body
    console.log(email)
    try {
        if([username, password, email, firstName, lastName].some((field) => !field)) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(409).json({
                success: false,
                message: "User already exist"
            })
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            hashPassword,
            username
        })
        const token = generateToken(email)
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            token
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        // console.log(email, password)
        if([email, password].some((field) => !field || field?.trim() === "")) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        };
        const user = await User.findOne({email})
        // console.log(user);
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        };
        const passwordCorrect = bcrypt.compare(password, user.hashPassword)
        if(!passwordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid credential"
            });
        }
        const loggedUser = await User.findById(user._id).select('-hashPassword')
        // const accessToken = await generateToken(loggedUser._id);
        // console.log(accessToken);
        const token = generateToken(email);
        return res.status(200)
        .json({
            success: true,
            message: "Loggedin successfully",
            user: loggedUser,
            isAuthenticated: true,
            token
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    signUp,
    login
}