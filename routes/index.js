var express = require("express");
var router = express.Router();
const user = require("../models/userModel");

router.get("/", (req, res) => {
  console.log("Working fine");
  res.send("Working fine");
});
//*user routes*

//signin
router.post("/user/signin", (req, res) => {
  let userObj = req.body;

  user.findOne({ email: userObj.email }).then((data) => {
    if (data && data.password == userObj.password) {
      res.json({
        success: true,
        user_id: data._id,
      });
    } else {
      res.json({
        success: false,
        message: "Invalid credentials..!!",
      });
    }
  });
});

//signup
router.post("/user/signup", (req, res) => {
  let userObj = req.body;

  user
    .findOne({ email: userObj.email })
    .then((data) => {
      if (data) {
        res.json({
          success: false,
          message: "User with this mail id already exist..!!",
        });
      } else {
        let usr = {
          name: userObj.name,
          email: userObj.email,
          phone: userObj.phone,
          password: userObj.password,
          date_joined: Date.now(),
        };
        user
          .create(usr)
          .then((data_2) => {
            if (data_2) {
              res.json({ success: true, user_id: data_2._id });
            } else {
              res.json({ success: false, message: "Something went wrong..!!" });
            }
          })
          .catch((err) => {
            res.json({ success: false, message: "Something went wrong..!!" });
          });
      }
    })
    .catch((err) => {
      res.json({ success: false, message: "Something went wrong..!!" });
    });
});
//forgot password

//view all apartment/guesthouse/auditorium

//view apartment/guesthouse/auditorium
//book apartment/guesthouse/auditorium
//view my rentals

//*vendor routes*

//add  apartment/guesthouse/auditorium

//edit apartment/guesthouse/auditorium

//delete apartment/guesthouse/auditorium

//*admin routes*

//view all users

//view all vendors

//approve items uploaded by vendor

//view all apartment/guesthouse/auditorium

//view apartment/guesthouse/auditorium

//view all rentals

module.exports = router;
