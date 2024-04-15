("use strict");
const { json } = require("body-parser");
const Data = require("../models/data.model");
const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");


exports.register = function (req, res) {
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Data.register(req.body, function (err, result) {
      if (err)
        res.json({
          ResponseID: 0,
          ResponseCode: "ERROR",
          ResponseData: [],
          ResponseMessage: err,
          ResponseJSON: "",
          OtherData: "",
        });

      if (result > 0)
        res.json({
          ResponseID: result,
          ResponseCode: "SUCCESS",
          ResponseData: [],
          ResponseMessage: "User registration successfully!",
          ResponseJSON: "",
          OtherData: "",
        });else if (result == -1) {
          res.json({
            ResponseID: result,
            ResponseCode: "ERROR",
            ResponseData: [],
            ResponseMessage: "User Already Exists Please Login!",
            ResponseJSON: "",
            OtherData: "",
          });
        }
      else
        res.json({
          ResponseID: result,
          ResponseCode: "ERROR",
          ResponseData: [],
          ResponseMessage: "Something went wrong!",
          ResponseJSON: "",
          OtherData: "",
        });
    });
  }
};

exports.login = function (req, res) {
  
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Data.login(req.body, function (err, result) {
      // return
      console.log(result,"result")
      if (err)
        res.json({
          ResponseID: 0,
          ResponseCode: "ERROR",
          ResponseData: [],
          ResponseMessage: err,
          ResponseJSON: "",
          OtherData: "",
        });

      if (result > 0) {
        let token = jwt.sign({ id: result }, config.secret, {
        });

        let obj={
            Token: token,
            loginuserid: result
        }


        res.json({
          ResponseID: result,
          ResponseCode: "SUCCESS",
          ResponseData: obj,
          ResponseMessage: "Login successfully Done!",
          ResponseJSON: "",
          OtherData: "",
        });
      } else if (result == -1) {
        res.json({
          ResponseID: result,
          ResponseCode: "ERROR",
          ResponseData: [],
          ResponseMessage: "Invalid email or password",
          ResponseJSON: "",
          OtherData: "",
        });
      } else
        res.json({
          ResponseID: result,
          ResponseCode: "ERROR",
          ResponseData: [],
          ResponseMessage: "Something went wrong!",
          ResponseJSON: "",
          OtherData: "",
        });
    });
  }
};


exports.task = function (req, res) {
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res
        .status(400)
        .send({ error: true, message: "Please provide all required field" });
    } else {
      Data.task(req.body, function (err, result) {
        if (err)
         return res.json({
            ResponseID: 0,
            ResponseCode: "ERROR",
            ResponseData: [],
            ResponseMessage: err,
            ResponseJSON: "",
            OtherData: "",
          });
  
        if (result > 0)
          return res.json({
            ResponseID: result,
            ResponseCode: "SUCCESS",
            ResponseData: [],
            ResponseMessage: "Task Inserted successfully!",
            ResponseJSON: "",
            OtherData: "",
          });
        else
         return res.json({
            ResponseID: result,
            ResponseCode: "ERROR",
            ResponseData: [],
            ResponseMessage: "Something went wrong!",
            ResponseJSON: "",
            OtherData: "",
          });
      });
    }
  };


  exports.listtask = function (req, res) {
    //handles null error
  
      Data.listtask(req.query, function (err, result) {
        if (err)
          res.json({
            ResponseID: 0,
            ResponseCode: "ERROR",
            ResponseData: [],
            ResponseMessage: err,
            ResponseJSON: "",
            OtherData: "",
          });
  
        if (result)
           res.json({
            ResponseID: 0,
            ResponseCode: "SUCCESS",
            ResponseData: result,
            ResponseMessage: "Task Listed successfully!",
            ResponseJSON: "",
            OtherData: "",
          });
        else
          res.json({
            ResponseID: result,
            ResponseCode: "ERROR",
            ResponseData: [],
            ResponseMessage: "Something went wrong!",
            ResponseJSON: "",
            OtherData: "",
          });
      });
    
  };


  exports.searchprojecttext = function (req, res) {
    //handles null error
  
      Data.searchprojecttext(req.query, function (err, result) {
        if (err)
          res.json({
            ResponseID: 0,
            ResponseCode: "ERROR",
            ResponseData: [],
            ResponseMessage: err,
            ResponseJSON: "",
            OtherData: "",
          });
  
        if (result)
           res.json({
            ResponseID: 0,
            ResponseCode: "SUCCESS",
            ResponseData: result,
            ResponseMessage: "Task Listed successfully!",
            ResponseJSON: "",
            OtherData: "",
          });
        else
          res.json({
            ResponseID: result,
            ResponseCode: "ERROR",
            ResponseData: [],
            ResponseMessage: "Something went wrong!",
            ResponseJSON: "",
            OtherData: "",
          });
      });
    
  };


