const express = require("express");
const router = express.Router();
const User = require("../models/Users.models.js");

router.get("/sign_up", (req, res) => {
  res.render("signUp", { title: "Sign Up" });
});

router.post("/sign_up", async (req, res) => {
  const { username, email, password, job } = req.body;
  if (email.endsWith("@ves.ac.in")) {
    const existingUser = await User.findOne({ username: "john" });

    if (existingUser) {
      // Handle duplicate username error
      console.log("Username already exists");
      // Add your error handling logic here
      res.redirect("/sign_up");
    } else {
      // Proceed with creating and saving the new user
      const newUser = new User({
        username: username,
        email: email,
        password: password,
        job: job,
      });
      console.log(newUser);
      try {
        await newUser.save();
        res.redirect("/login");
      } catch {
        res.redirect("/error");
      }
    }
  } else {
    res.redirect("/error");
  }
});

router.get("/login", (req, res) => {
  res.render("login", { title: "login page" });
});

router.post("/login", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ username: username, password: password });
    if (user.username == username && user.password == password) {
      if (user.job == "student") {
        res.redirect("/dashboard/student");
      } else if (user.job == "teacher") {
        res.redirect("/dashboard/teacher");
      } else if (user.job == "parent") {
        res.redirect("/dashboard/parent");
      } else {
        res.redirect("/error");
      }
    }
  } catch {
    res.redirect("/error");
  }
});

router.get("/error", (req, res) => {
  res.render("errorMsg", {
    title: "Error occured",
    error_msg:
      "Error: Invalid Credentails Or Username Is Taken Or Invalid Email Id",
  });
});

module.exports = router;
