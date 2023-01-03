const express = require("express")
const app = express()

require("../db/connect")

app.use(express.json())


module.exports=app