const roleModel = require("../../db/models/role.model")
const myHelper = require("../../app/helper")

class Role{
    static allRoles = async(req,res) => {
        try{
            const roleData = await roleModel.find()
            myHelper.resHandler(res, 200, true, roleData, "roles fetched successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static addRole = async(req,res) => {
        try{
            const roleData = new roleModel(req.body)
            await roleData.save()
            myHelper.resHandler(res, 200, true, roleData, "role added successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static singleRole = async(req, res)=>{
        try{
            const roleData = await roleModel.findById(req.params.id)
            if(!roleData) throw new Error("role not found")
            myHelper.resHandler(res, 200, true, roleData,"role fetched successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static editRole = async(req, res)=>{
        try
        {
            let roleData = await roleModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
            if(!roleData) throw new Error("role not found")
            myHelper.resHandler(res, 200, true, roleData, "role updated")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static deleteRole = async(req, res)=>{
        try
        {
            let roleData = await roleModel.findByIdAndDelete(req.params.id)
            if(!roleData) throw new Error("role not found")
            myHelper.resHandler(res, 200, true, null, "role deleted")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }

    static changeStatus = async(req, res)=>{
        try
        {
            const roleData = await roleModel.findById(req.params.id)
            if(!roleData) throw new Error("role not found")
            roleData.status = !roleData.status
            await roleData.save()
            myHelper.resHandler(res, 200, true, roleData, "status updated")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
}
module.exports = Role