import mongoose, {Schema} from "mongoose";


const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
            min: [3, "First name should contain atleast 3 characters"],
            max: [10, "First name should not be excceed more than 10 characters"]
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            min: [3, "Last name should contain atleast 3 characters"],
            max: [10, "Last name should not be excceed more than 10 characters"]
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowerCase: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        courses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course"
            }
        ]
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User", userSchema)

export default User;