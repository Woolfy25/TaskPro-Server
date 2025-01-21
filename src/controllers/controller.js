const services = require("../services/services");
require("dotenv").config();

// * Done
const getCurrentUser = async (req, res, next) => {
  try {
    const { _id, email, name, height, calories, age, bloodType } = req.user;
    res.status(200).json({
      status: "Success",
      code: 200,
      data: { _id, email, name, height, calories, age, bloodType },
    });
  } catch (error) {
    res.status(404).json({
      status: error.message,
      code: 404,
    });
  }
};

// * Done
const logOutAccount = async (req, res, next) => {
  try {
    const userId = req.user._id;
    await services.logOutAccount(userId);
    res.status(204).json({
      status: "Success",
      code: 204,
    });
  } catch (error) {
    res.status(404).json({
      status: error.message,
      code: 404,
    });
  }
};

// * Done
const createAccount = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const result = await services.createAccount({
      email,
      password,
      name,
    });

    res.status(201).json({
      status: "Success",
      code: 201,
      data: {
        user: { name: result.name, email: result.email },
        token: result.token,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: error.message,
      code: 404,
    });
  }
};

// * Done
const loginAccount = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await services.checkUserDB({
      email,
      password,
    });

    res.status(201).json({
      status: "Success",
      code: 201,
      data: {
        user: { name: result.name, email: result.email },
        token: result.token,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: error.message,
      code: 404,
    });
  }
};

// * Done
const updateAccount = async (req, res, next) => {
  try {
    const { accountId } = req.params;
    const updatedData = req.body;
    const result = await services.updateAccount(accountId, updatedData);
    res.status(201).json({
      status: "Success",
      code: 201,

      data: {
        name: result.name,
        email: result.email,
        height: result.height,
        calories: result.calories,
        age: result.age,
        bloodType: result.bloodType,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "Error",
      code: 404,
    });
  }
};

// * Done
const getIngredients = async (req, res, next) => {
  try {
    const result = await services.getIngredients();
    res.json({
      status: "Success",
      code: 201,
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      status: error.message,
      code: 404,
    });
  }
};

// * Done
const removeAccount = async (req, res, next) => {
  try {
    const { accountId } = req.params;
    await services.deleteAccount(accountId);
    res.status(204).json({
      status: "Success",
      code: 204,
    });
  } catch (error) {
    res.status(404).json({
      status: "Error",
      code: 404,
    });
  }
};

// * Done
const getMeals = async (req, res, next) => {
  try {
    const ownerId = req.user._id;
    const result = await services.getAllMeals(ownerId);
    res.json({
      status: "Success",
      code: 201,
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      status: error.message,
      code: 404,
    });
  }
};

// * Done
const createMeals = async (req, res, next) => {
  try {
    const { product, weight, calories, date } = req.body;
    ownerId = req.user._id;
    const result = await services.addMeals({
      product,
      weight,
      calories,
      date,
      ownerId,
    });
    res.json({
      status: "Success",
      code: 201,
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      status: error.message,
      code: 404,
    });
  }
};

// * Done
const removeMeal = async (req, res, next) => {
  try {
    ownerId = req.user._id;
    const { mealId } = req.params;
    await services.deleteMeal(mealId, ownerId);
    res.status(204).json();
  } catch (error) {
    res.status(404).json({
      status: error.message,
      code: 404,
    });
  }
};

// * Done
const verifyEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;

    await services.verifyEmailAddress(verificationToken);
    res.status(200).json({
      message: "Email verified successfully!",
      code: 200,
    });
  } catch (error) {
    res.status(404).json({
      status: error.message,
      code: 404,
    });
  }
};

// * Done
const verifyResend = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!req.body) {
      return res.status(400).json({
        message: "missing required field email",
        status: 400,
      });
    }

    await services.verifyEmailResend(email);
    res.status(200).json({
      message: "Verification email sent!",
      code: 200,
    });
  } catch (error) {
    res.status(404).json({
      status: error.message,
      code: 404,
    });
  }
};

module.exports = {
  createAccount,
  loginAccount,
  logOutAccount,
  removeAccount,
  updateAccount,
  getIngredients,
  getCurrentUser,
  verifyEmail,
  verifyResend,
  getMeals,
  createMeals,
  removeMeal,
};
