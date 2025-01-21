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
} = require("../controllers/controller");

const { auth } = require("../middlewares/auth");

// Accounts verification
router.get("/account/verify/:verificationToken", verifyEmail);
router.post("/account/verify/", verifyResend);

// Accounts
router.get("/account/current", auth, getCurrentUser);
router.delete("/account/logout", auth, logOutAccount);
router.post("/account/register", createAccount);
router.post("/account/login", loginAccount);
router.patch("/account/:accountId", auth, updateAccount);

// BOARDS
router.get("/tasks/board", auth, getTasks); // TODO Working
router.post("/tasks/board", auth, createBoard);
router.patch("/tasks/board/:boardId", auth, updateBoard);
router.delete("/tasks/board/:boardId", auth, removeBoard);

// COLUMNS
router.get("/tasks/columns", auth, getTasks); // TODO Working
router.post("/tasks/columns", auth, createColumn); // TODO Working
router.patch("/tasks/columns/", auth, updateColumn); // TODO Working
router.delete("/tasks/columns/", auth, removeColumn); // TODO Working

// TASKS
router.get("/tasks/tasks", auth, getTasks); // TODO Working
router.post("/tasks/tasks", auth, createTask); // TODO Working
router.patch("/tasks/tasks/", auth, updateColumn); // TODO Working
router.delete("/tasks/tasks/", auth, removeColumn); // TODO Working

// OTHERS
router.delete("/account/:accountId", auth, removeAccount); // ? NOT IN USE JUST IMPLEMENTED

module.exports = router;
