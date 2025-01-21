const mongoose = require("mongoose");
const User = require("./schemas/Users");
const Meals = require("./schemas/Meals");
const jwt = require("jsonwebtoken");
const nanoid = require("nanoid");
const nodemailer = require("nodemailer");
require("dotenv").config();

const secret = process.env.SECRET;
const pass = process.env.PASS;

// * Done
const logOutAccount = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Not Authorized!");
    }
    user.token = null;
    await user.save();

    return userId;
  } catch (error) {
    throw error;
  }
};

// * Done
const createAccount = async ({ email, name, password }) => {
  try {
    const userExistent = await User.findOne({ email });
    if (userExistent) {
      throw new Error("This email already exists!");
    }

    const uniqueValidationCode = nanoid(); // uniqueValidationCode

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
      subject: "Verification email Slim Mom account.",
      text: `Your account verification code is: ${uniqueValidationCode}, http://localhost:3000/health/account/verify/${uniqueValidationCode}`,
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
      },
      secret,
      { expiresIn: "1h" }
    );
    savedUser.token = token;

    return await savedUser.save();
  } catch (error) {
    throw error;
  }
};

// * Done
const checkUserDB = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!user || !user.validPassword(password)) {
      throw new Error("Email or password is wrong!");
    }

    if (!user.verify) {
      throw new Error("You have to verify your account first!");
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email, name: user.name },
      secret,
      {
        expiresIn: "1h",
      }
    );
    user.token = token;

    return await user.save();
  } catch (error) {
    throw error;
  }
};

// * Done
const updateAccount = async (accountId, updatedData) => {
  try {
    return await User.findByIdAndUpdate(
      accountId,
      { $set: updatedData },
      { new: true }
    );
  } catch (error) {
    throw error;
  }
};

// * Done
const getIngredients = async () => {
  try {
    const db = mongoose.connection.db;
    const collection = db.collection("ingredients");
    return await collection.find().toArray();
  } catch (error) {
    throw error;
  }
};

// * Done
const deleteAccount = async (accountId) => {
  try {
    return User.deleteOne({ _id: accountId });
  } catch (error) {
    throw error;
  }
};

// * Done
const getAllMeals = async (ownerId) => {
  try {
    return Meals.find({ owner: ownerId });
  } catch (error) {
    throw error;
  }
};

// * Done
const addMeals = async ({ product, weight, calories, date, ownerId }) => {
  try {
    const meals = new Meals({
      product,
      weight,
      calories,
      date,
      owner: ownerId,
    });
    await meals.save();

    return meals;
  } catch (error) {
    throw error;
  }
};

// * Done
const deleteMeal = async (mealId, ownerId) => {
  try {
    const deletedContact = await Meals.deleteOne({
      _id: mealId,
      owner: ownerId,
    });

    if (deletedContact.deletedCount === 0) {
      throw new Error(
        "Contact not found or you don't have permission to delete"
      );
    }

    return deletedContact;
  } catch (error) {
    throw error;
  }
};

// * Done
const verifyEmailAddress = async (verificationToken) => {
  try {
    const update = { verify: true, verificationToken: null };

    const result = await User.findOneAndUpdate(
      {
        verificationToken: verificationToken,
      },
      { $set: update },
      { new: true }
    );

    if (!result) throw new Error("User does not exist!");
  } catch (error) {
    throw error;
  }
};

// * Done
const verifyEmailResend = async (email) => {
  try {
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
      subject: "Verification email Slim Mom account",
      text: `Your account verification code is ${uniqueValidationCode}, http://localhost:3000/health/account/verify/${uniqueValidationCode}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Email sent: " + info.response);
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createAccount,
  checkUserDB,
  updateAccount,
  logOutAccount,
  deleteAccount,
  verifyEmailAddress,
  verifyEmailResend,
  getIngredients,
  getAllMeals,
  addMeals,
  deleteMeal,
};
