const jwt = require("jsonwebtoken");

async function auth(req, res) {
  let token = req.cookies.token;
  console.log("testing token");
  console.log(token);
  let v = 0;
  if (!token) {
    return v;
  }
  try {
    var result = jwt.verify(token, "secret");
    req.body.user_name = result.user_name;
    req.body.login_time = result.login_time;
    req.body.email_ = result.email_;
    req.body.usertype = result.usertype;
    req.body.currentdate = result.currentdate;
    console.log("Here inside auth/auth : user type is  : ");
    console.log();
    let val = 1;
    console.log(val, "Token verification successfull hence returning val");
    console.log(req.body.user_name, "This is the username inside auth");
    console.log(req.body.login_time, "This is the logintime inside auth");
    console.log(req.body.email_, "This is the email inside auth");
    console.log(req.body.usertype, "This is the email inside auth");
    console.log(req.body.currentdate, "This is the currentdate");

    return val;
  } catch (err) {
    console.log("Tokenexpired");
    return v;
  }
}
module.exports = auth;
