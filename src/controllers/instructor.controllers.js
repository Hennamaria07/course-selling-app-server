import bcrypt from "bcryptjs";
import Instructor from "../models/instructor.model.js";
import { adminToken } from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const { email, password, name } = await req.body
        if ([email, password, name].some((field) => !field)) {
            return res.status(400).json({
                success: false,
                error: "All fields are required"
            })
        }

        const instructorExist = await Instructor.findOne({ email });

        if (instructorExist) {
            return res.status(409).json({
                success: false,
                error: "instructor already exist"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const instructor = new Instructor({
            email,
            name,
            password: hashPassword,
        });

        const instructorCreated = await instructor.save();

        if (!instructorCreated) {
            return res.status(500).json({
                success: false,
                error: "instructor is not created"
            })
        }

        const token = adminToken(instructorCreated);
        res.status(201)
            .cookie("token", token, { httpOnly: true, secure: true })
            .json({
                success: true,
                message: "Signed successfully!",
                data: instructorCreated
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

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const instructor = await Instructor.findOne({ email });

        if (!instructor) {
            return res.status(404).json({
                success: false,
                error: "instructor not found"
            })
        }

        const matchPassword = bcrypt.compare(password, instructor.password);

        if (!matchPassword) {
            return res.status(400).json({
                success: false,
                error: "Invalid credentials"
            })
        }

        const token = adminToken(instructor);
        res.status(200)
            .cookie("token", token, { httpOnly: true, secure: true })
            .json({
                success: true,
                message: "Logged in successfully!",
                data: instructor
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

export const getAllInstructors = async (req, res) => {
    try {
        const instructors = await Instructor.find();
        return res.status(200).json(
            {
                success: true,
                data: instructors
            }
        );
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                error: error.message
            }
        )
    }
}

export const getInstructor = async (req, res) => {
    try {
      const id = req.params.id;
      const instructor = await Instructor.findOne({ _id: id });

      if (!instructor) {
          return res.status(404).json(
              {
                  success: false,
                  error: "instructor not exist"
              }
          );
      }
      return res.status(200).json(
          {
              success: true,
              data: instructor
          }
      );
    } catch (error) {
     res.status(500).json(
         {
             success: false,
             error: error.message
         }
     )
 }
 };

export const removeInstructor = async (req, res) => {
    try {
      const id = req.params.id;
      const instructor = await Instructor.findByIdAndDelete(id);

      if (!instructor) {
          return res.status(404).json(
              {
                  success: false,
                  error: "Unable to delete"
              }
          );
      }
      return res.status(200).json(
          {
              success: true,
              message: "Instuctor deleted successfully"
          }
      );
    } catch (error) {
     res.status(500).json(
         {
             success: false,
             error: error.message
         }
     )
 }
 };