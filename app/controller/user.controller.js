const userModel = require("../../db/models/user.model")
const myHelper = require("../../app/helper")

class User{
    //   @description : Register as a new user
    //   @method : POST /api/user/register
    //   @access : public 
    static register = async(req,res) => {
        try{
            if(req.body.password.length<6) throw new Error("password must be more than 6")
            const userData = new userModel(req.body)
            await userData.save()
            myHelper.resHandler(res, 200, true, userData, "user added successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    //   @description : Auth user & get token 
    //   @method : POST /api/user/login
    //   @access : public 
    static login = async(req,res) => {
        try{
            const userData = await userModel.loginUser(req.body.email, req.body.password)
            const token = await userData.generateToken()
            myHelper.resHandler(res, 200, true, {user:userData, token}, "user logged successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    //   @description : logout current user token 
    //   @method : POST /api/user/logout
    //   @access : private 
    static logOut = async(req,res)=>{
        try{
            req.user.tokens = req.user.tokens.filter(tok => tok.token != req.token )
            await req.user.save()
            myHelper.resHandler(res, 200, true,null,"logged out successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    //   @description : logout current user all tokens 
    //   @method : POST /api/user/logoutall
    //   @access : private 
    static logOutAll = async(req,res)=>{
        try{
            req.user.tokens = []
            await req.user.save()
            myHelper.resHandler(res, 200, true,null,"logged out all successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    //   @description : get current logged in user profile
    //   @method : GET /api/user/me
    //   @access : private 
    static profile = (req,res)=>{        
        try{
            myHelper.resHandler(res, 200, true,{user: req.user},"user profile fetched successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    //   @description : edit current logged in user profile
    //   @method : PUT /api/user/editprofile
    //   @access : private 
    static editProfile = async(req,res)=>{
        try
        {
            await req.user.updateOne({...req.body})
            myHelper.resHandler(res, 200, true, req.user, "profile updated")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    //   @description : delete current logged in user profile
    //   @method : DELETE /api/user/deleteProfile
    //   @access : private 
    static deleteProfile = async(req,res)=>{
        try
        {
            await req.user.deleteOne()
            myHelper.resHandler(res, 200, true, null, "profile deleted")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    //   @description : Add or Edit level for current logged in user
    //   @method : POST/PUT /api/user/level
    //   @access : private 
    static editLevel = async(req,res)=>{
        try
        {
            await req.user.updateOne({level: req.body.level})
            myHelper.resHandler(res, 200, true, req.user.level, "level updated")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    //   @description : get level for current logged in user
    //   @method : GET /api/user/level
    //   @access : private 
    static getLevel = async(req,res)=>{
        try
        {
            myHelper.resHandler(res, 200, true, req.user.level, "level fetched")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    //   @description : Delete level for current logged in user
    //   @method : DELETE /api/user/level
    //   @access : private 
    static deleteLevel = async(req,res)=>{
        try
        {
            await req.user.updateOne({level: ""})
            myHelper.resHandler(res, 200, true, "", "level deleted")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }


    //   Admins
    //   @description : Get all users for Admin
    //   @method : GET /api/user/
    //   @access : private/admin 
    static allUsers = async(req,res) => {
        try{
            const userData = await userModel.find()
            myHelper.resHandler(res, 200, true, userData, "users fetched successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    //   @description : Get a single user based on its _id
    //   @method : GET /api/user/single/:id
    //   @access : private/admin 
    static singleUser = async(req, res)=>{
        try{
            const user = await userModel.findById(req.params.id)
            if(!user) throw new Error("user not found")
            myHelper.resHandler(res, 200, true,user,"user fetched successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    //   @description : Add a new user
    //   @method : POST /api/user/adduser
    //   @access : private/admin 
    static adduser = async(req,res) => {
        try{
            if(req.body.password.length<6) throw new Error("password must be more than 6")
            const userData = new userModel(req.body)
            await userData.save()
            myHelper.resHandler(res, 200, true, userData, "user added successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    //   @description : Edit a single user based on its _id
    //   @method : PUT /api/user/edituser/:id
    //   @access : private/admin 
    static edituser = async(req,res)=>{
        try
        {
            let userData = await userModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
            if(!userData) throw new Error("user not found")
            myHelper.resHandler(res, 200, true, userData, "user updated")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    //   @description : Delete a user based on its _id
    //   @method : DELETE /api/user/deleteUser/:id
    //   @access : private/admin 
    static deleteUser = async(req,res)=>{
        try
        {
            let userData = await userModel.findByIdAndDelete(req.params.id)
            if(!userData) throw new Error("user not found")
            myHelper.resHandler(res, 200, true, null, "user deleted")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }


    //   Shopping Cart
    //   @description : Add an Item to the Shopping Cart
    //   @method : POST /api/user/cart/addItem/:id
    //   @access : private/user
    static addItemToCart = async(req,res)=>{
        try
        {
            if (!req.user.shoppingCart) req.user.shoppingCart = []
            const existedItem = req.user.shoppingCart.find(item => item.product == req.params.id)
            if (existedItem) existedItem.quantity++
            else req.user.shoppingCart.push({product:req.params.id})
            const userData = await req.user.populate("shoppingCart.product")
            userData.CartTotalPrice = 0
            userData.shoppingCart.forEach(i=>{
                userData.CartTotalPrice += i.product.price * i.quantity
            })
            await userData.save()
            myHelper.resHandler(res, 200, true, {Cart:userData.shoppingCart,CartTotalPrice:userData.CartTotalPrice}, "item added")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    //   @description : delete an Item from the Shopping Cart
    //   @method : Delete /api/user/cart/deleteItem/:id
    //   @access : private/user
    static deleteItem = async(req,res)=>{
        try
        {
            const itemIndex = req.user.shoppingCart.findIndex(item => item.product == req.params.id)
            if(itemIndex == -1) throw new Error("item not found")
            await req.user.shoppingCart.splice(itemIndex,1)
            const userData = await req.user.populate("shoppingCart.product")
            userData.CartTotalPrice = 0
            userData.shoppingCart.forEach(i=>{
                userData.CartTotalPrice += i.product.price * i.quantity
            })
            await userData.save()
            myHelper.resHandler(res, 200, true, {Cart:userData.shoppingCart,CartTotalPrice:userData.CartTotalPrice}, "item deleted")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    //   @description : decrease an Item from the Shopping Cart
    //   @method : Delete /api/user/cart/decreaseItem/:id
    //   @access : private/user
    static decreaseItemfromCart = async(req,res)=>{
        try
        {
            let existedItem, itemIndex
            req.user.shoppingCart.forEach((item, index) =>{
                if(item.product == req.params.id){
                    existedItem = item
                    itemIndex = index
                }
            })
            if (!existedItem) throw new Error("item not found")
            if(existedItem.quantity == 1){
                await req.user.shoppingCart.splice(itemIndex,1)
            }
            else existedItem.quantity--
            const userData = await req.user.populate("shoppingCart.product")
            userData.CartTotalPrice = 0
            userData.shoppingCart.forEach(i=>{
                userData.CartTotalPrice += i.product.price * i.quantity
            })
            await userData.save()
            myHelper.resHandler(res, 200, true, {Cart:userData.shoppingCart,CartTotalPrice:userData.CartTotalPrice}, "item removed")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    //   @description : Get all Items from the Shopping Cart
    //   @method : GET /api/user/cart/
    //   @access : private/user
    static getShoppingCart = async(req,res)=>{
        try
        {
            const userData = await req.user.populate("shoppingCart.product")
            if(userData.shoppingCart.length == 0 ) throw new Error("Shopping Cart is empty");
            userData.CartTotalPrice = 0
            userData.shoppingCart.forEach(i=>{
                userData.CartTotalPrice += i.product.price * i.quantity
            })
            await userData.save()
            myHelper.resHandler(res, 200, true, {Cart:userData.shoppingCart,CartTotalPrice:userData.CartTotalPrice}, "shopping Cart fetched")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }


    //   BookMarks
    //   @description : Add an Item to the Shopping Cart
    //   @method : POST /api/user/cart/addItem
    //   @access : private/user
    static addBookMark = async(req,res)=>{
        try
        {
            //if (!req.user.bookMarks) req.user.shoppingCart = []
            //const existedItem = req.user.shoppingCart.find(item => item.product == req.body.product)
            //if (existedItem) existedItem.quantity++
            //else req.user.shoppingCart.push(req.body)
            //await req.user.save()
            //const userData = await req.user.populate("shoppingCart.product")
            //req.user.bookMarks.push(req.body)
            console.log(req.user.bookMarks)
            myHelper.resHandler(res, 200, true, null, "item added")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    //   @description : delete an Item from the Shopping Cart
    //   @method : Delete /api/user/cart/deleteItem/:id
    //   @access : private/user
    // static deleteItem = async(req,res)=>{
    //     try
    //     {
    //         const itemIndex = req.user.shoppingCart.findIndex(item => item.product == req.params.id)
    //         if(itemIndex == -1) throw new Error("item not found")
    //         await req.user.shoppingCart.splice(itemIndex,1)
    //         req.user.save()
    //         myHelper.resHandler(res, 200, true, req.user, "item deleted")
    //     }
    //     catch(e){
    //         myHelper.resHandler(res, 500, false, e, e.message)
    //     }
    // }
    // //   @description : decrease an Item from the Shopping Cart
    // //   @method : Delete /api/user/cart/decreaseItem/:id
    // //   @access : private/user
    // static decreaseItemfromCart = async(req,res)=>{
    //     try
    //     {
    //         let existedItem, itemIndex
    //         req.user.shoppingCart.forEach((item, index) =>{
    //             if(item.product == req.params.id){
    //                 existedItem = item
    //                 itemIndex = index
    //             }
    //         })
    //         if (!existedItem) throw new Error("item not found")
    //         if(existedItem.quantity == 1){
    //             await req.user.shoppingCart.splice(itemIndex,1)
    //         }
    //         else existedItem.quantity--
    //         await req.user.save()
    //         const userData = await req.user.populate("shoppingCart.product")
    //         myHelper.resHandler(res, 200, true, userData.shoppingCart, "item removed")
    //     }
    //     catch(e){
    //         myHelper.resHandler(res, 500, false, e, e.message)
    //     }
    // }
    // //   @description : Get all Items from the Shopping Cart
    // //   @method : GET /api/user/cart/
    // //   @access : private/user
    // static getShoppingCart = async(req,res)=>{
    //     try
    //     {
    //         const userData = await req.user.populate("shoppingCart.product")
    //         myHelper.resHandler(res, 200, true, userData.shoppingCart, "shopping Cart fetched")
    //     }
    //     catch(e){
    //         myHelper.resHandler(res, 500, false, e, e.message)
    //     }
    // }
}
module.exports = User