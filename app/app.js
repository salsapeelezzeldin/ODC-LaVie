const express = require("express")
const app = express()

require("../db/connect")

app.use(express.json())

const urlRoutes = require("../routes/url.routes")
const roleRoutes = require("../routes/role.routes")
const userRoutes = require("../routes/user.routes")
const productRoutes = require("../routes/product.routes")
const orderRoutes = require("../routes/order.routes")

app.use("/api/url/", urlRoutes)
app.use("/api/role/", roleRoutes)
app.use("/api/user/",  userRoutes)
app.use("/api/product/",  productRoutes)
app.use("/api/order/",  orderRoutes)


app.all("*", (req, res)=> {
    res.status(404).send({
        apisStatus:false,
        message:"Invalid URL",
        data: {}
    })
})

module.exports=app