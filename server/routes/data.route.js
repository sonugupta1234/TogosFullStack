const express = require("express");

const authJwt = require("../config/auth.middleware");
const router = express.Router();

const Controllerdata = require("../controllers/data.controller");


router.post("/register", Controllerdata.register);


router.post("/login", Controllerdata.login);

router.post("/task", [authJwt.verifyToken], Controllerdata.task);

router.get("/listtask",  Controllerdata.listtask);


module.exports = router; 
