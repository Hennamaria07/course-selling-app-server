import Course from "../models/course.model.js";
import { cloudinaryInstance } from "../config/cloudinary.js";
import Instructor from "../models/instructor.model.js";

export const createCourse = async (req, res) => {
    try {
        // console.log(req.file)
        if (!req.file) {
            return res.status(400).json(
                {
                    success: false,
                    error: "file is not visible"
                }
            );
        }
        const { title, description, price, instructorEmail } = req.body;
        if([title, description, price, instructorEmail].some(field => !field)) {
            return res.status(400).json({
                success: false,
                error: "All fields are required",
            });
        }
        // console.log('testing', req.file)
        const existingTitle = await Course.findOne({title});
        console.log('existing',existingTitle)
        if (existingTitle) {
            return res.status(400).json(
                {
                    success: false,
                    error: "course with same title is already exists"
                }
            );
        }

        const findInstructor = await Instructor.findOne({ email: instructorEmail });

        if (!findInstructor) {
            return res.status(400).json(
                {
                    success: false,
                    error: "please add a valid instructor first"
                }
            );
        }
        cloudinaryInstance.uploader.upload(req.file.path, {public_id: findInstructor._id}, async (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    error: err.message,
                });
            }
            console.log('url', result?.url)
            const imageUrl = result?.url;

            const createCourse = new Course({
                title,
                description,
                price,
                instructor: findInstructor._id,
                image: {
                    publicId: result.public_id,
                    url: result.url
                },
            });


            const newCourseCreated = await createCourse.save();
            if (!newCourseCreated) {
                return res.status(500).json(
                    {
                        success: false,
                        error: "course is not created"
                    }
                );
            }
            return res.status(201).json(
                {
                    success: true,
                    data: newCourseCreated
                }
            );
        });
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                error: error.message
            }
        )
    }
};

export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find({});
        return res.status(200).json(
            {
                success: true,
                data: courses
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



export const updateCourse = async (req, res) => {
   try {
     const id = req.params.id;
     const { description, price, instructorEmail } = req.body;
     if([description, price, instructorEmail].some(field => !field)) {
        return res.status(400).json({
            success: false,
            error: "All fields are required",
        });
    }
    const findInstructor = await Instructor.findOne({ email: instructorEmail });

    if (!findInstructor) {
        return res.status(400).json(
            {
                success: false,
                error: "please add a valid instructor first"
            }
        );
    }
     const newUpdatedCourse = await Course.findOneAndUpdate(
         { _id: id },
         { description, price, instructor: findInstructor._id },
         {
             new: true,
         }
     );
 
     if (!newUpdatedCourse) {
         return res.status(500).json(
             {
                 success: false,
                 error: "Course is not updated"
             }
         );
     }
     console.log(newUpdatedCourse)

     return res.status(201).json(
         {
             success: true,
             data: newUpdatedCourse,
             message: "Course updated successfully"
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


export const deleteCourse = async (req, res) => {
   try {
     const id = req.params.id;
     const course = await Course.findById({id});
    if(!course) {
        return res.status(400).json(
            {
                success: false,
                error: "uable to fetch course details"
            }
        );
    }
    
    cloudinaryInstance.uploader.destroy(course.instructor, function(error, result) {
        if (error) {
          console.error('Error deleting image:', error);
        } else {
          console.log('Image deleted:', result);
        }
      });
     const deleteId = await Course.deleteOne({ _id: id });
     if (!deleteId) {
         return res.status(500).json(
             {
                 success: false,
                 error: "not deleted"
             }
         );
     }
     return res.status(200).json(
         {
             success: true,
             message: "Course deleted successfully"
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