import EnrollmentsDao from "./dao";
export default function EnrollmentRoutes(app, db) {
  const dao = EnrollmentsDao(db);
  app.post("/api/users/:userId/courses/:courseId", (req, res) => { dao.enrollUserInCourse(req.params.userId, req.params.courseId); res.sendStatus(200); });
  app.delete("/api/users/:userId/courses/:courseId", (req, res) => { dao.unenrollUserFromCourse(req.params.userId, req.params.courseId); res.sendStatus(200); });
}
