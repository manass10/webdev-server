import { v4 as uuidv4 } from "uuid";
export default function CoursesDao(db) {
  const findAllCourses = () => db.courses;
  const findCoursesForEnrolledUser = (userId) => db.courses.filter((c) => db.enrollments.some((e) => e.user === userId && e.course === c._id));
  const createCourse = (course) => { const n = { ...course, _id: uuidv4() }; db.courses = [...db.courses, n]; return n; };
  const deleteCourse = (courseId) => { db.courses = db.courses.filter((c) => c._id !== courseId); db.enrollments = db.enrollments.filter((e) => e.course !== courseId); };
  const updateCourse = (courseId, updates) => { const c = db.courses.find((c) => c._id === courseId); Object.assign(c, updates); return c; };
  return { findAllCourses, findCoursesForEnrolledUser, createCourse, deleteCourse, updateCourse };
}
