import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

const signup = async (req, res) => {
    try {
        const { email, password, firstName, lastName } = await req.body;
        if ([email, password, firstName, lastName].some((field) => !field)) {
            return res.status(400).json({
                success: false,
                error: "All fields are required"
            })
        }

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(409).json({
                success: false,
                error: "User already exist"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = new User({
            email,
            firstName,
            lastName,
            password: hashPassword,
        });

        const userCreated = await user.save();

        if (!userCreated) {
            return res.status(500).json({
                success: false,
                error: "user is not created"
            })
        }

        const token = await generateToken(email);
        res.status(201)
            .cookie("token", token, { httpOnly: true, secure: true })
            .json({
                success: true,
                message: "Signed successfully!",
                data: userCreated
            })
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                error: error.message
            }
        )
    }
};


const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "user not found"
            })
        }

        const matchPassword = await bcrypt.compare(password, user.password);

        if (!matchPassword) {
            return res.status(400).json({
                success: false,
                error: "Invalid credentials"
            })
        }

        const token = generateToken(email);
        res.status(200)
            .cookie("token", token, { httpOnly: true, secure: true })
            .json({
                success: true,
                message: "Logged in successfully!",
                data: user
            })
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                error: error.message
            }
        )
    }
};

export {signin, signup}