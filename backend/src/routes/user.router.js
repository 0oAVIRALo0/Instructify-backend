import { Router } from "express";
import { registerUser, loginUser, logoutUser, refreshAccessToken, changeCurrentPassword, getCurrentUser, updateAccountDetails, uploadVideo, addCourse, getCourses,getAllCourses, enrollInCourse, getEnrolledCourses, unenrollInCourse, applyRole, verifyUser, getAllStudents, getAllInstructors, assignCourseToInstructor, getAssignedCourses, getVideo } from "../controllers/user.controller.js";
import { verifyJWT, upload, verifyRole  } from "../middlewares/index.js";
import { registerLimiter, loginLimiter } from "../middlewares/rate_limiter/auth.js";

const router = Router();

router.route('/register').post(registerLimiter, registerUser);
router.route('/login').post(loginLimiter, loginUser);

// Secured routes
router.route('/apply-role').put(verifyJWT, applyRole);
router.route('/logout').post(verifyJWT, logoutUser);
router.route('/current-user').get(verifyJWT, getCurrentUser);
router.route('/verify').post(verifyJWT, verifyUser);
router.route('/get-all-courses').get(verifyJWT, getAllCourses);

// secured route + admin role
router.route('/add-course').post(verifyJWT, verifyRole("admin"), addCourse);
router.route('/get-all-students').get(verifyJWT, verifyRole("admin"), getAllStudents);
router.route('/get-all-instructors').get(verifyJWT, verifyRole("admin"), getAllInstructors);
router.route('/assign-course-to-instructor').post(verifyJWT, verifyRole("admin"), assignCourseToInstructor);
router.route('/get-assigned-courses').get(verifyJWT, verifyRole("admin"), getAssignedCourses);

// secured route + instructor role
router.route('/upload-video').post(verifyJWT, verifyRole("instructor"), upload.fields([
  { name: 'video', maxCount: 1 },
]), uploadVideo);
router.route('/get-courses').get(verifyJWT, verifyRole("instructor"), getCourses);

// secured route + student role
router.route('/enroll/:courseId').post(verifyJWT, verifyRole("student"), enrollInCourse);
router.route('/unenroll/:courseId').delete(verifyJWT, verifyRole("student"), unenrollInCourse);
router.route('/get-enrolled-courses').get(verifyJWT, verifyRole("student"), getEnrolledCourses);
router.route('/get-video/:videoId').get(verifyJWT, verifyRole("student"), getVideo);

export default router;

// router.route('/refresh-token').post(verifyJWT, refreshAccessToken);
// router.route('/change-password').post(verifyJWT, changeCurrentPassword);
// router.route('/update-account').put(verifyJWT, updateAccountDetails);