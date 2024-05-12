import express from "express";
import authenticateUser from "../middlewares/instructor.middleware.js";
import { getAllInstructors, getInstructor, removeInstructor, signin, signup } from "../controllers/instructor.controllers.js";
import authenticateAdmin from "../middlewares/admin.Middleware.js";

const router = express.Router();

router.route('/sign-up').post(signup);
router.route('/sign-in').post(signin);
router.route('/get-instructors').get(getAllInstructors);
router.route('/:id').get(authenticateUser, getInstructor).delete((authenticateUser || authenticateAdmin), removeInstructor)

export default router;