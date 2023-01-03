const router = require("express").Router()
const Role = require('../app/controller/role.controller')
const Auth = require("../app/middleware/auth.middleware")

//all Roles
router.get("/", Auth.authentication, Role.allRoles)

//add Role
router.post("/addRole", Auth.authentication, Role.addRole)
//single Role
router.get("/singleRole/:id", Auth.authentication, Role.singleRole)
//edit Role
router.post("/editRole/:id", Auth.authentication, Role.editRole)
//delete Role
router.delete("/deleteRole/:id", Auth.authentication, Role.deleteRole)

//change Status
router.post("/changeStatus/:id", Auth.authentication, Role.changeStatus)

module.exports = router