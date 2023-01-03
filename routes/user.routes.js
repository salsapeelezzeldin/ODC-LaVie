const router = require("express").Router()
const User = require('../app/controller/user.controller')
const Auth = require("../app/middleware/auth.middleware")

//auth
router.post("/register", User.register)
router.post("/login", User.login)

//logout
router.post("/logout",Auth.authentication, User.logOut)
//logout all
router.post("/logoutall",Auth.authentication, User.logOutAll)

//profile
router.get("/me",Auth.authentication, User.profile)
//edit my profile
router.put("/editprofile",Auth.authentication, User.editProfile)
//delete me
router.delete("/deleteProfile",Auth.authentication, User.deleteProfile)
//add level
router.post("/level",Auth.authentication, User.editLevel)
//edit level
router.put("/level",Auth.authentication, User.editLevel)
//get level
router.get("/level",Auth.authentication, User.getLevel)
//get level
router.delete("/level",Auth.authentication, User.deleteLevel)




//all Users
router.get("/",Auth.authentication, User.allUsers)
//get single user
router.get("/single/:id",Auth.authentication, User.singleUser)
//add new user
router.post("/adduser",Auth.authentication, User.adduser)
//edit other users
router.put("/edituser/:id",Auth.authentication, User.edituser)
//delete user
router.delete("/deleteUser/:id",Auth.authentication, User.deleteUser)


//add item to shopping cart
router.post("/cart/addItem/:id",Auth.authentication, User.addItemToCart)
//delete item from shopping cart
router.delete("/cart/deleteItem/:id",Auth.authentication, User.deleteItem)
router.delete("/cart/decreaseItem/:id",Auth.authentication, User.decreaseItemfromCart)
//get shopping cart
router.get("/cart/",Auth.authentication, User.getShoppingCart)



router.post("/bookMark/add",Auth.authentication, User.addBookMark)

module.exports = router