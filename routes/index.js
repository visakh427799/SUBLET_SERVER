var express = require("express");
var router = express.Router();
const user = require("../models/userModel");
const vendor =require("../models/vendorModel")
const appartment=require("../models/appartmentModel")
const cart =require("../models/cartModel")
const mongoose =require("mongoose")
router.get("/", (req, res) => {
  console.log("Working fine");
  res.send("Working fine");
});
//*user routes*

//user signin
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

//vendor signin
router.post("/vendor/signin", (req, res) => {
  let vendorObj = req.body;

  vendor.findOne({ email: vendorObj.email }).then((data) => {
    if (data && data.password == vendorObj.password) {
      res.json({
        success: true,
        vendor_id: data._id,
      });
    } else {
      res.json({
        success: false,
        message: "Invalid credentials..!!",
      });
    }
  });
});
//user signup
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
//vendor signup
router.post("/vendor/signup", (req, res) => {
  let vendorObj = req.body;

  vendor
    .findOne({ email: vendorObj.email })
    .then((data) => {
      if (data) {
        res.json({
          success: false,
          message: "Vendor with this mail id already exist..!!",
        });
      } else {
        let usr = {
          name: vendorObj.name,
          email: vendorObj.email,
          phone: vendorObj.phone,
          password: vendorObj.password,
          date_joined: Date.now(),
          is_approved:false,
        };
        vendor
          .create(usr)
          .then((data_2) => {
            if (data_2) {
              res.json({ success: true, vendor_id: data_2._id });
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

//get user details

router.post('/user/getUser',(req,res)=>{
  console.log(req.body);
  user.findOne({_id:req.body.user_id}).then((data)=>{
    
    if(data){
      res.json({success:true,user:data})
    }
    else{
      res.json({success:false})
    }

  })
})

router.post('/vendor/getVendor',(req,res)=>{
  console.log(req.body);
  vendor.findOne({_id:req.body.vendor_id}).then((data)=>{
    
    if(data){
      res.json({success:true,vendor:data})
    }
    else{
      res.json({success:false})
    }

  })
})
//add appartment
router.post('/vendor/add-appartment',(req,res)=>{
   console.log(req.body);
   let ap=req.body.appartment;
   let obj={
    vendor_id:req.body.vendor_id,
    name:ap.name,
    photo:ap.photo,
    address:ap.address,
    phone:ap.phone,
    no_rooms:ap.no_rooms,
    city:ap.city,
    pincode:ap.pincode,
    street:ap.street,
    price:ap.rate,
    google_map_url:ap.google_map_url,
    is_booked:false,

   }
   appartment.create(obj).then((data)=>{
     if(data){
      res.json({success:true})
     }
     else{
      res.json({success:false})      
     }
   }).catch((err)=>{
      res.json({success:false})
   })
  
})
//view all users

router.get('/admin/getAllusers',(req,res)=>{
  user.find({}).then((data)=>{
    if(data){
      res.json({success:true,users:data})
    }
    else{
      res.json({success:false})
    }
  }).catch((err)=>{
      res.json({success:false})
       
  })
})

router.get('/admin/getAllvendors',(req,res)=>{
  vendor.find({}).then((data)=>{
    if(data){
      res.json({success:true,vendors:data})
    }
    else{
      res.json({success:false})
    }
  }).catch((err)=>{
      res.json({success:false})
       
  })
})
//get rentals

router.post('/vendor/getRentals',(req,res)=>{
  console.log(req.body.v_id);

  appartment.find({vendor_id:req.body.v_id}).then((data)=>{
    if(data){
      console.log(data);
      res.json({success:true,rentals:data})
    }
    else{
      res.json({success:false})
    }
  }).catch((err)=>{
      res.json({success:false})
       
  })
})

//view all apartment/guesthouse/auditorium
router.get('/user/getallAppartments',(req,res)=>{
  appartment.find({}).then((data)=>{
    if(data){
      res.json({success:true,data:data})
    }
    else{
      res.json({success:false})
    }
  })
})
//approve vendor

router.post('/admin/approve',(req,res)=>{
  vendor.findOneAndUpdate({_id:req.body.v_id},{is_approved:true},{useFindAndModify:false }).then((data)=>{
    if(data){
      res.json({success:true})
    }
    else{
      res.json({success:false})
    }
  }).catch((err)=>{
      res.json({success:false})
       
  })
})
//cancel vendor
router.post('/admin/cancel',(req,res)=>{
  vendor.findOneAndUpdate({_id:req.body.v_id},{is_approved:false},{useFindAndModify:false }).then((data)=>{
    if(data){
      res.json({success:true})
    }
    else{
      res.json({success:false})
    }
  }).catch((err)=>{
      res.json({success:false})
       
  })
})
//serach by loaction 
router.post('/user/searchByloc',(req,res)=>{
  console.log(req.body.input);
  appartment.find({city:{$regex:req.body.input}}).then((data)=>{
    if(data){
      res.json({success:true,data:data})
    }
    else{
      res.json({success:false})
    }
  })
})
//add to cart
router.post('/user/addTocart',(req,res)=>{
  console.log(req.body);
  cart.findOne({user_id:req.body.u_id}).then((data)=>{
    if(data){
        let arr=data.items
        appartment.findOne({_id:req.body.a_id}).then((ap)=>{
          if(ap){
           
            arr.push(ap)
           
            cart.findOneAndUpdate({user_id:req.body.u_id},{items:arr},{useFindAndModify:false}).then((dat)=>{
              if(dat){
                res.json({success:true})
              }
              else{
                res.json({success:false})
  
              }
            }).catch((err)=>{
              res.json({success:false})
  
            })
          }
          else{
            res.json({success:false})

          }
        }).catch((err)=>{
          res.json({success:false})

        })
        
    }
    else{
      appartment.findOne({_id:req.body.a_id}).then((ap)=>{
        if(ap){
          let arr=[]
          arr.push(ap)
          let obj={
            user_id:req.body.u_id,
            items:arr
          }
          cart.create(obj).then((dat)=>{
            if(dat){
              res.json({success:true})
            }
            else{
              res.json({success:false})

            }
          }).catch((err)=>{
            res.json({success:false})

          })
        }
        else{
          res.json({success:false})

        }
      }).catch((err)=>{
        res.json({success:false})

      })
     
    }
  }).catch((err)=>{
    res.json({success:false})

  })
})
//get cart items
router.post('/user/getCartItems',(req,res)=>{
  console.log(req.body.u_id);
  cart.findOne({user_id:req.body.u_id}).then((data)=>{
    if(data){
      res.json({success:true,items:data.items})
    }
    else{
      res.json({success:false})
    }
  }).catch((err)=>{
    res.json({success:false})

  })

})
//remove cart item
router.post('/user/removeFromCart',(req,res)=>{
  console.log(req.body);
  let cart_id=mongoose.Types.ObjectId(req.body.c_id)
  console.log(cart_id);
  cart.updateOne({user_id:req.body.u_id},{$pull:{items:{_id:cart_id}}}).then((data)=>{
    
    if(data.modifiedCount===1){
      res.json({success:true})
     
    }

  })
})
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
