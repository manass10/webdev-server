import { v4 as uuidv4 } from "uuid";
export default function AssignmentsDao(db) {
  const findAssignmentsForCourse = (courseId) => db.assignments.filter((a) => a.course === courseId);
  const createAssignment = (assignment) => { const n = { ...assignment, _id: uuidv4() }; db.assignments = [...db.assignments, n]; return n; };
  const updateAssignment = (assignmentId, updates) => { const a = db.assignments.find((a) => a._id === assignmentId); Object.assign(a, updates); return a; };
  const deleteAssignment = (assignmentId) => { db.assignments = db.assignments.filter((a) => a._id !== assignmentId); };
  return { findAssignmentsForCourse, createAssignment, updateAssignment, deleteAssignment };
}
