const urlModel = require("../../db/models/url.model")
const myHelper = require("../../app/helper")

class Url{
    static allUrls = async(req,res) => {
        try{
            const urlData = await urlModel.find()
            myHelper.resHandler(res, 200, true, urlData, "urls fetched successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static addUrl = async(req,res) => {
        try{
            const urlData = new urlModel(req.body)
            await urlData.save()
            myHelper.resHandler(res, 200, true, urlData, "url added successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static singleUrl = async(req, res)=>{
        try{
            const urlData = await urlModel.findById(req.params.id)
            if(!urlData) throw new Error("url not found")
            myHelper.resHandler(res, 200, true, urlData,"url fetched successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static editUrl = async(req, res)=>{
        try
        {
            let urlData = await urlModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
            if(!urlData) throw new Error("url not found")
            myHelper.resHandler(res, 200, true, urlData, "url updated")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static deleteUrl = async(req, res)=>{
        try
        {
            let urlData = await urlModel.findByIdAndDelete(req.params.id)
            if(!urlData) throw new Error("url not found")
            myHelper.resHandler(res, 200, true, null, "url deleted")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }

    static allUrlRoles = async(req, res)=>{
        try
        {
            const urlData = await urlModel.findById(req.params.id)
            myHelper.resHandler(res, 200, true, urlData.roles,"URL roles fetched successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static addRoleToUrl = async(req, res)=>{
        try
        {
            const urlData = await urlModel.findById(req.params.id)
            await urlData.roles.push(req.body)
            await urlData.save()
            myHelper.resHandler(res, 200, true, urlData,"role added successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static deleteRoleFromUrl = async(req, res)=>{
        try
        {
            const urlData = await urlModel.findById(req.params.id)
            if(!urlData) throw new Error("url not found")
            const role = await urlData.roles.findIndex(role => role._id == req.params.roleid)
            if (role == -1 ) throw new Error("role not found")
            await urlData.roles.splice(role, 1)
            urlData.save()
            myHelper.resHandler(res, 200, true, urlData, "role deleted successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
}
module.exports = Url