import express from "express";
import { createCourse, deleteCourse, getCourses, updateCourse } from "../controllers/course.controllers.js";
import upload from "../middlewares/multer.middleware.js"
import authenticateUser from "../middlewares/instructor.middleware.js";
import authenticateAdmin from "../middlewares/admin.middleware.js";

const router = express.Router();

router.route('/get-courses').get(getCourses);
router.route('/').post(authenticateUser , upload.single('image'), createCourse);
router.route('/update-course/:id').patch((authenticateUser || authenticateAdmin), updateCourse);
router.route('/:id').delete((authenticateUser || authenticateAdmin), deleteCourse);

export default router;