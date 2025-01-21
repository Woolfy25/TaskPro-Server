// const mongoose = require("mongoose");
const User = require("./schemas/Users");
const Boards = require("./schemas/Board");
const Columns = require("./schemas/Column");
const Tasks = require("./schemas/Task");
const jwt = require("jsonwebtoken");
const nanoid = require("nanoid");
const nodemailer = require("nodemailer");
require("dotenv").config();

const secret = process.env.SECRET;
const pass = process.env.PASS;

// * START ACCOUNT ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const logOutAccount = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("Not Authorized!");
  }
  user.token = null;
  await user.save();

  return userId;
};

const createAccount = async ({ email, name, password }) => {
  const userExistent = await User.findOne({ email });
  if (userExistent) {
    throw new Error("This email already exists!");
  }

  const uniqueValidationCode = nanoid();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ramonspuci@gmail.com",
      pass: pass,
    },
  });

  const mailOptions = {
    from: "ramonspuci@gmail.com",
    to: `${email}`,
    subject: "Verification email Task Pro account.",
    text: `Your account verification code is: ${uniqueValidationCode}, http://localhost:3000/taskpro/account/verify/${uniqueValidationCode}`, // ! change to website URL
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Email sent: " + info.response);
  });

  const newUser = User({
    email,
    name,
    verificationToken: uniqueValidationCode,
  });
  newUser.setPassword(password);

  const savedUser = await newUser.save();

  const token = jwt.sign(
    {
      _id: savedUser._id,
      email: savedUser.email,
      name: savedUser.name,
      theme: savedUser.theme,
      picture: savedUser.picture,
    },
    secret,
    { expiresIn: "5h" }
  );
  savedUser.token = token;

  return await savedUser.save();
};

const checkUserDB = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !user.validPassword(password)) {
    throw new Error("Email or password is wrong!");
  }

  if (!user.verify) {
    throw new Error("You have to verify your account first!");
  }

  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      name: user.name,
      theme: user.theme,
      picture: user.picture,
    },
    secret,
    {
      expiresIn: "1h",
    }
  );
  user.token = token;

  return await user.save();
};

const updateAccount = async (accountId, updatedData) => {
  return await User.findByIdAndUpdate(
    accountId,
    { $set: updatedData },
    { new: true }
  );
};

const deleteAccount = async (accountId) => {
  return User.deleteOne({ _id: accountId });
};

const verifyEmailAddress = async (verificationToken) => {
  const update = { verify: true, verificationToken: null };

  const result = await User.findOneAndUpdate(
    {
      verificationToken: verificationToken,
    },
    { $set: update },
    { new: true }
  );

  if (!result) throw new Error("User does not exist!");
};

const verifyEmailResend = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User does not exist!");
  if (user.verify === true)
    throw new Error("Verification has already been passed!");

  const uniqueValidationCode = user.verificationToken;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ramonspuci@gmail.com",
      pass: pass,
    },
  });

  const mailOptions = {
    from: "ramonspuci@gmail.com",
    to: `${email}`,
    subject: "Verification email Task Pro account.",
    text: `Your account verification code is: ${uniqueValidationCode}, http://localhost:3000/taskpro/account/verify/${uniqueValidationCode}`, // ! change to website URL
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Email sent: " + info.response);
  });
};
// * END ACCOUNT ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// * START BOARD ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// TODO Working
const getAllTasks = async (ownerId) => {
  return Boards.find({ owner: ownerId });
};

const addBoard = async ({ title, icon, background, ownerId }) => {
  const board = new Boards({
    title,
    icon,
    background,
    owner: ownerId,
  });
  await board.save();

  return board;
};

const updateBoard = async (boardId, updatedData) => {
  return await Boards.findByIdAndUpdate(
    boardId,
    { $set: updatedData },
    { new: true }
  );
};

const deleteBoard = async (boardId, ownerId) => {
  const deletedBoard = await Boards.deleteOne({
    _id: boardId,
    owner: ownerId,
  });

  if (deletedBoard.deletedCount === 0) {
    throw new Error("Contact not found or you don't have permission to delete");
  }

  return deletedBoard;
};
// * END BOARD ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// * START COLUMN ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// TODO Working
const addColumn = async ({ title, boardId }) => {
  const board = await Boards.findById(boardId);

  if (!board) {
    throw new Error("Board not found!");
  }

  const column = new Columns({
    title,
    board: boardId,
  });

  await column.save();

  board.columns.push(column._id);
  await board.save();

  return column;
};

// TODO Working
const updateColumn = async (columnId, updatedData) => {
  return await Boards.findByIdAndUpdate(
    columnId,
    { $set: updatedData },
    { new: true }
  );
};

// TODO Working
const deleteColumn = async (columnId, ownerId) => {
  const deletedColumn = await Boards.deleteOne({
    _id: columnId,
    owner: ownerId,
  });

  if (deletedColumn.deletedCount === 0) {
    throw new Error("Contact not found or you don't have permission to delete");
  }

  return deletedColumn;
};

// * END COLUMN ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// * START TASKS ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// TODO Working
const addTask = async ({ title, description, columnId }) => {
  const column = await Columns.findById(columnId);

  if (!column) {
    throw new Error("Column not found!");
  }

  const task = new Tasks({
    title,
    description,
    column: columnId,
  });

  await task.save();

  column.tasks.push(task._id);
  await column.save();

  return task;
};

// * END TASKS ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = {
  createAccount,
  checkUserDB,
  updateAccount,
  logOutAccount,
  deleteAccount,
  verifyEmailAddress,
  verifyEmailResend,
  getAllTasks,
  addBoard,
  updateBoard,
  deleteBoard,
  addColumn,
  updateColumn,
  deleteColumn,
  addTask,
};
