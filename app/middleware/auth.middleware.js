const userModel = require("../../db/models/user.model")
const urlModel = require("../../db/models/url.model")
const myHelper = require("../../app/helper")
const jwt = require("jsonwebtoken")

class Auth{
    static authentication = async (req, res, next) => {
        try{
            const token = req.header("Authorization").replace("Bearer ", "")
            const decodedToken = jwt.verify(token, process.env.tokenPassword)
            const userData = await userModel.findOne({
                _id: decodedToken._id,
                "tokens.token": token
            })
            if(!userData) throw new Error("invalid token")
            req.user = userData
            req.token = token
            next()
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e.message, "not authenticated")
        }
    }
    static authorization = async (req, res, next) => {
        try{
            let Url
            Object.values(req.params).forEach((parm,index) => {
                // console.log(parm)
                // console.log(index)
                // console.log(Object.keys(req.params)[index])
                Url = req.originalUrl.replace(parm,`:${Object.keys(req.params)[index]}`)
            })
            console.log(Url)
            const URL = await urlModel.findOne({
                url: Url,
                method: req.method,
                //query: Object.values(req.params),
                //params: Object.values(req.query),
                "roles.roleName": req.user.roleName
            })
            console.log(URL)
            if(!URL) throw new Error("un authorized")
            next()
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e.message, "un authorized")
        }
    }
}

module.exports = Auth