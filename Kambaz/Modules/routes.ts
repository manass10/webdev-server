import ModulesDao from "./dao";
export default function ModuleRoutes(app, db) {
  const dao = ModulesDao(db);
  app.get("/api/courses/:courseId/modules", (req, res) => res.json(dao.findModulesForCourse(req.params.courseId)));
  app.post("/api/courses/:courseId/modules", (req, res) => res.json(dao.createModule({ ...req.body, course: req.params.courseId })));
  app.delete("/api/modules/:moduleId", (req, res) => { dao.deleteModule(req.params.moduleId); res.sendStatus(200); });
  app.put("/api/modules/:moduleId", (req, res) => res.json(dao.updateModule(req.params.moduleId, req.body)));
}
