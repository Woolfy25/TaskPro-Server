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

// TASKS
router.get("/tasks/tasks", auth, getTasks); // TODO Working

// OTHERS
router.delete("/account/:accountId", auth, removeAccount); // ? NOT IN USE JUST IMPLEMENTED

module.exports = router;
