const express = require("express");
const router = express.Router();
const {
  createAccount,
  loginAccount,
  logOutAccount,
  removeAccount,
  updateAccount,
  getTasks,
  createBoard,
  updateBoard,
  removeBoard,
  getCurrentUser,
  verifyEmail,
  verifyResend,
  createColumn,
  updateColumn,
  removeColumn,
  createTask,
  updateTask,
  removeTask,
} = require("../controllers/controller");

const { auth } = require("../middlewares/auth");

// Accounts verification
router.get("/account/verify/:verificationToken", verifyEmail);
router.post("/account/verify", verifyResend);

// Accounts
router.get("/account/current", auth, getCurrentUser);
router.delete("/account/logout", auth, logOutAccount);
router.post("/account/register", createAccount);
router.post("/account/login", loginAccount);
router.patch("/account/:accountId", auth, updateAccount);

// GET ALL TASKS COLUMNS AND BOARDS
router.get("/tasks", auth, getTasks);

// BOARDS
router.post("/tasks/board", auth, createBoard);
router.patch("/tasks/board/:boardId", auth, updateBoard);
router.delete("/tasks/board/:boardId", auth, removeBoard);

// COLUMNS
router.post("/tasks/columns", auth, createColumn);
router.patch("/tasks/columns", auth, updateColumn);
router.delete("/tasks/columns/:columnId", auth, removeColumn);

// TASKS
router.post("/tasks/tasks", auth, createTask);
router.patch("/tasks/tasks", auth, updateTask);
router.delete("/tasks/tasks/:taskId", auth, removeTask);

// OTHERS
router.delete("/account/:accountId", auth, removeAccount); // ? NOT IN USE JUST IMPLEMENTED

module.exports = router;
