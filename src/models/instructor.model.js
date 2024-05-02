const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            enum: ["instructor", "admin"],
        },
        courses: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Course"
            }
        ],
    },
    {
        timestamps: true
    }
);

const Instructor = mongoose.model("Instructor", instructorSchema);
module.exports = Instructor;