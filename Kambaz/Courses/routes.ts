import CoursesDao from "./dao";
import EnrollmentsDao from "../Enrollments/dao";
export default function CourseRoutes(app, db) {
  const dao = CoursesDao(db);
  const enrollmentsDao = EnrollmentsDao(db);
  app.get("/api/courses", (req, res) => res.json(dao.findAllCourses()));
  app.get("/api/users/:userId/courses", (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const cu = req.session["currentUser"];
      if (!cu) { res.sendStatus(401); return; }
      userId = cu._id;
    }
    res.json(dao.findCoursesForEnrolledUser(userId));
  });
  app.post("/api/users/current/courses", (req, res) => {
    const cu = req.session["currentUser"];
    const newCourse = dao.createCourse(req.body);
    enrollmentsDao.enrollUserInCourse(cu._id, newCourse._id);
    res.json(newCourse);
  });
  app.delete("/api/courses/:courseId", (req, res) => { dao.deleteCourse(req.params.courseId); res.sendStatus(200); });
  app.put("/api/courses/:courseId", (req, res) => { res.json(dao.updateCourse(req.params.courseId, req.body)); });
}
