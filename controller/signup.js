const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const validCred = require("./validcred");
const signup = require("../models/signup");
router.post("/", async (req, res) => {
  try {
    let { username, password, cpassword, email, squestion, sanswer } = req.body;
    const isValidated = validCred(email, password, cpassword);
    if (!isValidated.status) {
      let message = isValidated.errors[0].message;
      return res.render("signup_signin", { error: message });
    }
    let emailData = await signup.findemail(email);
    console.log("This is the email check count");
    console.log(emailData.rowCount);
    if (emailData.rowCount != 0) {
      return res.render("signup_signin", {
        error: "Email exists",
        errorsign: "Email exists",
      });
    } else {
      salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      let usert = await signup.findusertype(email);
      let Utype = "U";
      console.log(usert[0].role_group);
      if (usert[0].role_group === "Managment") {
        console.log("He is a manager");
        Utype = "M";
      }
      let rowinsert = await signup.insertdata(
        email,
        hash,
        username,
        Utype,
        squestion,
        sanswer
      );
      if (!rowinsert) {
        console.log("Not inserted");
      } else {
        return res.render("signup_signin", {
          error: "Successful Signup, Please login",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
