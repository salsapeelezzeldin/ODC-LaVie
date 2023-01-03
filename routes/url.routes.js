const router = require("express").Router()
const Url = require('../app/controller/url.controller')
const Auth = require("../app/middleware/auth.middleware")

//all Urls
router.get("/", Auth.authentication, Auth.authorization, Url.allUrls)
//add Url
router.post("/addUrl", Auth.authentication, Auth.authorization, Url.addUrl)
//single Url
router.get("/singleUrl/:id", Auth.authentication, Auth.authorization, Url.singleUrl)
//edit Url
router.post("/editUrl/:id", Auth.authentication, Url.editUrl)
//delete Url
router.delete("/deleteUrl/:id", Auth.authentication, Url.deleteUrl)

//all Url Roles
router.get("/allUrlRoles/:id", Auth.authentication, Url.allUrlRoles)
//add Role To Url
router.post("/addRoleToUrl/:id", Auth.authentication, Url.addRoleToUrl)
//delete Role From Url
router.delete("/deleteRoleFromUrl/:id/:roleid", Auth.authentication, Url.deleteRoleFromUrl)

module.exports = router