const services = require("../services/services");
require("dotenv").config();

// * START ACCOUNT ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const getCurrentUser = async (req, res, next) => {
  try {
    const { _id, email, name, theme, picture } = req.user;
    res.status(200).json({
      status: "Success",
      code: 200,
      data: { _id, email, name, theme, picture },
    });
  } catch (error) {
    res.status(404).json({
      status: error.message,
      code: 404,
    });
  }
};

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
        user: {
          name: result.name,
          email: result.email,
          theme: result.theme,
          picture: result.picture,
        },
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
        user: {
          name: result.name,
          email: result.email,
          theme: result.theme,
          picture: result.picture,
        },
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
        theme: result.theme,
        picture: result.picture,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "Error",
      code: 404,
    });
  }
};

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
// * END ACCOUNT ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// * START BOARD ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// TODO Working
const getTasks = async (req, res, next) => {
  try {
    const ownerId = req.user._id;
    const board = await services.getAllTasks(ownerId);
    res.json({
      status: "Success",
      code: 201,
      data: board,
    });
  } catch (error) {
    res.status(404).json({
      status: error.message,
      code: 404,
    });
  }
};

const createBoard = async (req, res, next) => {
  try {
    const { title, icon, background } = req.body;
    const ownerId = req.user._id;
    const board = await services.addBoard({
      title,
      icon,
      background,
      ownerId,
    });
    res.json({
      status: "Success",
      code: 201,
      data: board,
    });
  } catch (error) {
    res.status(404).json({
      status: error.message,
      code: 404,
    });
  }
};

const updateBoard = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const updatedData = req.body;
    const board = await services.updateBoard(boardId, updatedData);
    res.status(201).json({
      status: "Success",
      code: 201,
      data: {
        title: board.title,
        icon: board.icon,
        background: board.background,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "Error",
      code: 404,
    });
  }
};

const removeBoard = async (req, res, next) => {
  try {
    const ownerId = req.user._id;
    const { boardId } = req.params;
    await services.deleteBoard(boardId, ownerId);
    res.status(204).json();
  } catch (error) {
    res.status(404).json({
      status: error.message,
      code: 404,
    });
  }
};
// * END BOARD ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// * START COLUMN ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// TODO Working
const createColumn = async (req, res) => {
  try {
    const { title, boardId } = req.body;

    const column = await services.addColumn({ title, boardId });
    res.status(201).json({
      status: "Success",
      code: 201,
      data: column,
    });
  } catch (error) {
    res.status(400).json({ status: "Error", message: error.message });
  }
};

// TODO Working
const updateColumn = async (req, res, next) => {
  try {
    const { columnId } = req.params;
    const updatedData = req.body;
    const column = await services.updateBoard(columnId, updatedData);
    res.status(201).json({
      status: "Success",
      code: 201,
      data: {
        title: column.title,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "Error",
      code: 404,
    });
  }
};

// TODO Working
const removeColumn = async (req, res, next) => {
  try {
    const ownerId = req.user._id;
    const { columnId } = req.params;
    await services.deleteBoard(columnId, ownerId);
    res.status(204).json();
  } catch (error) {
    res.status(404).json({
      status: error.message,
      code: 404,
    });
  }
};

// * END COLUMN ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// * START TASKS ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// TODO Working
const createTask = async (req, res) => {
  try {
    const { title, description, columnId } = req.body;

    const task = await services.addTask({ title, description, columnId });
    res.status(201).json({
      status: "Success",
      code: 201,
      data: task,
    });
  } catch (error) {
    res.status(400).json({ status: "Error", message: error.message });
  }
};

// * END TASKS ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = {
  createAccount,
  loginAccount,
  logOutAccount,
  removeAccount,
  updateAccount,
  getCurrentUser,
  verifyEmail,
  verifyResend,
  getTasks,
  createBoard,
  updateBoard,
  removeBoard,
  createColumn,
  updateColumn,
  removeColumn,
  createTask,
};
