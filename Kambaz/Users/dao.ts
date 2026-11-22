import { v4 as uuidv4 } from "uuid";
export default function UsersDao(db) {
  let { users } = db;
  const findUserByCredentials = (username, password) => users.find((u) => u.username === username && u.password === password);
  const findUserByUsername = (username) => users.find((u) => u.username === username);
  const findUserById = (userId) => users.find((u) => u._id === userId);
  const createUser = (user) => { const n = { ...user, _id: uuidv4() }; users = [...users, n]; db.users = users; return n; };
  const updateUser = (userId, user) => { users = users.map((u) => (u._id === userId ? { ...u, ...user } : u)); db.users = users; return findUserById(userId); };
  return { findUserByCredentials, findUserByUsername, findUserById, createUser, updateUser };
}
