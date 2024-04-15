"use strict";

var dbConn = require("../config/db.config");
var bcrypt = require("bcrypt");
var Data = function (data) { };

Data.register = async function (req, result) {


    try {
        let userid;
        const [rows, fields] = await dbConn.query(
            'SELECT * FROM users WHERE email = ?', [req.email]
        );

        if (rows.length > 0) {
            userid = -1
        } else {
            userid=1
            const hashedPassword = await bcrypt.hash(req.password, 10);
            dbConn.query(
                'INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [req.username, req.email, hashedPassword],
            );
            
        }

        result(null, userid);
    } catch (error) {
        console.error('Error:', error);
        result(error, null);
    }

    
};

Data.login = async function (req, result) {

    try {
        let userid;
        const [rows, fields] = await dbConn.query(
            'SELECT * FROM users WHERE email = ?', [req.email]
        );

        if (rows.length === 0) {
            userid = -1
        } else {

            const user = rows[0];
            const passwordMatched = await bcrypt.compare(req.password, user.password);

            if (!passwordMatched) {
                userid = -1
            } else {
                userid = user.Id;
            }
        }

        result(null, userid);
    } catch (error) {
        console.error('Error:', error);
        result(error, null);
    }
};


Data.task = async function (req, result) {

    dbConn.query(
        'INSERT INTO task (projectname, taskname, taskdescription,spendtime,priority,assigned,status,createdby,updateby,createddate,updatedate) VALUES (?,?,?,?,?,?,?,?,?,?,?)', 
        [req.ProjectName, req.TaskName, req.TaskDescription, req.Spendtime, req.Priority, req.Assigned, req.Status, req.Createdby, req.Updateby, req.Createdate, req.Updatedate],
        function (err, res) {
            // console.log(res,"response")
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                var insertID = 1;
                result(null, insertID);
            }
        }
    );
};



Data.listtask = async function (req, result) {

    try {
        let userid;
        const [rows, fields] = await dbConn.query(
            'SELECT * FROM task WHERE createdby = ?', [req.loginuserid]
        );

        result(null, rows);
    } catch (error) {
        console.error('Error:', error);
        result(error, null);
    }
};


Data.searchprojecttext = async function (req, result) {

    try {
        let userid;
        const [rows, fields] = await dbConn.query(
            'SELECT * FROM task WHERE projectname = ? AND createdby = ?', [req.projectname, req.loginuserid]
        );
    
        result(null, rows);
    } catch (error) {
        console.error('Error:', error);
        result(error, null);
    }
};



module.exports = Data;
