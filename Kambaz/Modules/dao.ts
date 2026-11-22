import { v4 as uuidv4 } from "uuid";
export default function ModulesDao(db) {
  const findModulesForCourse = (courseId) => db.modules.filter((m) => m.course === courseId);
  const createModule = (module) => { const n = { ...module, _id: uuidv4() }; db.modules = [...db.modules, n]; return n; };
  const deleteModule = (moduleId) => { db.modules = db.modules.filter((m) => m._id !== moduleId); };
  const updateModule = (moduleId, updates) => { const m = db.modules.find((m) => m._id === moduleId); Object.assign(m, updates); return m; };
  return { findModulesForCourse, createModule, deleteModule, updateModule };
}
