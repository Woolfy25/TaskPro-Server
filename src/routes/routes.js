const express = require("express");
const router = express.Router();
const {
  createAccount,
  loginAccount,
  logOutAccount,
  removeAccount,
  updateAccount,
  getMeals,
  createMeals,
  removeMeal,
  getCurrentUser,
  verifyEmail,
  verifyResend,
  getIngredients,
} = require("../controllers/controller");

const { auth } = require("../middlewares/auth");

router.get("/account/verify/:verificationToken", verifyEmail); // ! To do
router.post("/account/verify/", verifyResend); // ! To do

router.get("/account/current", auth, getCurrentUser); // ! To do
router.delete("/account/logout", auth, logOutAccount); // ! To do
router.post("/account/register", createAccount); // ! To do
router.post("/account/login", loginAccount); // ! To do
router.patch("/account/:accountId", auth, updateAccount); // ! To do

router.get("/ingredients", auth, getIngredients); // ! To do

router.get("/meals", auth, getMeals); // ! To do
router.post("/meals", auth, createMeals); // ! To do
router.delete("/meals/:mealId", auth, removeMeal); // ! To do

router.delete("/account/:accountId", auth, removeAccount); // ! To do

module.exports = router;
