var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Student = require("../models/student");
var Teacher = require("../models/teacher");
var Principal = require("../models/principal");
var Admin = require("../models/admin");
var Leave = require("../models/leave");
var Attendence = require("../models/attendence");
var Assignment = require("../models/assignment");
var fs = require('fs');
var path = require('path');
var TeacherNotice = require("../models/teacherNotice");


// router.get("/leaveapplication/new",function (req,res) {
//
//     res.render("teacher/newLeaveapplication");
// });

// router.get("/leaveapplication",function (req,res) {
//     Leave.find({'username' : req.user.username}, function(err, leaves){
//         res.render("teacher/viewLeaveapplication",{
//             leaves:leaves
//         });
//     });
//
//
// });

// router.get("/leaveapplication/detailview",function (req,res) {
//     res.render("teacher/detailLeaveapplication");
// });



router.get("/assignments/add",function (req,res) {
    res.render("teacher/addAssignment");
});

router.get("/assignments",function (req,res) {
    // res.render("teacher/viewAssignment");
    Assignment.find({}, function (err, assignments) {
        if(err){
            console.log(err)
        }else {
            res.render("teacher/viewAssignment", {assignments:assignments})
        }
    })
});

router.get("/markattendance",function (req,res) {
    Student.find({}, function(err, students){
        console.log(students);
        if(err){
            console.log(err);
        } else {
            res.render('teacher/markattendence', {
                students: students

            });

        }
    });

});

router.post("/markattendence",function (req,res) {
    Student.find({}, function(err, students){
        console.log(students);
        if(err){
            console.log(err);
        } else {
            students.forEach(function (student) {
                let attendence = new Attendence();
                attendence.username = student.name;
                attendence.date = new Date();
                attendence.class = "11A";
                if(req.body.state=='present'){attendence.state = true;}
                else{attendence.state = false}
                attendence.save();
                res.render('teacher/index');
            })

        }
    });


});

// router.post("/leaveapplication",function (req,res) {
//     req.checkBody('startdate','startdate is required').notEmpty();
//     req.checkBody('enddate','enddate is required').notEmpty();
//     req.checkBody('reason','reason is required').notEmpty();
//
//     // Get Errors
//     let errors = req.validationErrors();
//
//     if(errors){
//         // res.render("Error", {
//         //     errors:errors
//         // });
//     }
//     else{
//         let leave = new Leave();
//         leave.startdate = req.body.startdate;
//         leave.enddate = req.body.enddate;
//         leave.reason = req.body.reason;
//         leave.username = req.user.username;
//         leave.status = false;
//
//         leave.save(function(err){
//             if(err){
//                 console.log(err);
//                 return;
//             } else {
//                 res.redirect('/teachers/leaveapplication');
//             }
//         });
//     }
//   });

router.post("/assignment",function (req,res) {

        console.log(req.body);
        var assignment = new Assignment({
            "class":req.body.class,
            "description":req.body.description,
            "module":req.body.module,
            "duedate":req.body.duedate
        });

        Assignment.create(assignment, function (err) {
            if(err){
                console.log(err);
            }else{
                console.log(assignment)
                res.redirect("/dashbord")
            }
        })




});

router.get("/coursematerial",function (req,res) {
    res.render("teacher/courseMaterial")
})

router.get("/notice",function (req,res) {
    res.render("teacher/addNotice")
})

router.post("/notice",function (req,res) {
    // console.log(req.body)
    // var datetime = new Date();
    // console.log(datetime);
    // console.log(req.user);

    Teacher.findOne({"username":req.user.username},function (err,teacher) {
        if(err){
            console.log(err)
        }else {
            var notice = new TeacherNotice({
                topic: req.body.topic,
                notice: req.body.notice,
                grade:teacher.grade
            })
            TeacherNotice.create(notice,function (err,notice) {
                if(err){
                    console.log(err);
                }else {
                    console.log(notice);
                    res.redirect("/dashbord");
                }
            })
        }
    })


})

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

module.exports = router;