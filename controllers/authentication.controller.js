const express = require("express");
const router = express.Router();
const User = require("../models/Users.models.js");
const bcrypt = require('bcrypt');

router.get("/sign_up", (req, res) => {
  res.render("signUp", { title: "Sign Up" });
});

router.post("/sign_up", async (req, res) => {
  const { username, email, password} = req.body;
  if (email.endsWith("@ves.ac.in")) {
    // const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({ username: username, email:email });
    
    if (existingUser) {
      // Handle duplicate username error
      console.log("Username already exists");
      // Add your error handling logic here
      res.redirect("/sign_up");
    } else {
      const user = User({password: hashedPassword});
      // Proceed with creating and saving the new user
      await user.save();
      res.redirect("/login");
    }
  } 
});

router.get("/login", (req, res) => {
  res.render("login", { title: "login page" });
});

router.post("/login", async (req, res) => {
  try {
  const { username, email, password, job} = req.body;
    const user = await User.findOne({username: username, email: email, password: password, job:job});
    // const validPassword = await bcrypt.compare(password, user.password);
    console.log(user.job);
    if (user) {
      if (user.job === "student") {
        console.log("hleo");
        res.redirect(`/dashboard/student/${user.id}`);
      } else if (user.job === "teacher") {
        res.redirect("/dashboard/teacher");
      } else if (user.job === "parent") {
        res.redirect("/dashboard/parent");
      } else {
        console.log("error");
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
