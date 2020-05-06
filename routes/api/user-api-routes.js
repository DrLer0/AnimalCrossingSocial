//Dependencies

const express = require('express'),
    router = express.Router(),
    db = require("../../models");

//get route for all users

//get all users
//get specific user, populated

app.get("/users", function(req,res){
    db.User.find({})
    .then(function(dbUser){
        res.json(dbUser);
    });
});

//get route for specific user
app.get("/users/:id", function(req,res){
    db.User.findOne({

    })
})

app.get("/populated", function(req,res){
    db.User.find({})
    .populate("events")
    .populate("designs")
    .then(function(dbUswer))
})
.catch(function(err){
    res.json(err);
});


module.exports = router;










//======================================
// //database
// var db = require("../../models");

// //Routes

// //routes

// //GET route for getting all yardSale items
// module.exports= function(app){
//     app.get("/api/user", function (req,res){

//     db.User.findAll({
//         where: query,
//         include: [db.User]
//     }).then(function(dbUser){
//         res.json(dbUser);
    
//     });    
//     });

// //GET route for retrieving a single yardSale item

// app.post("/api/user/:id", function(req,res){
//     db.User.findOne({
//         where:{
//             id: req.params.id
//         }, 
//         include: [db.User]
//     }).then(function(dbUser){
//         res.json(dbUser);
//     });
// });

// //POST route for saving a new yardSale item
// app.post("/api/user", function(req,res){
//     db.User.create(req.body).then(function(dbUser){
//         res.json(dbUser);
//     });
// });

// //Delete route for deleting yardSale items
// app.delete("api/user/:id", function(req,res){
//     db.User.destroy({
//         where:{
//             id: req.params.id
//         }
//     }).then(function(dbUser){
//         res.json(dbUser)
//     });
// });

// //PUT route for updating yardSale items
// app.put("/api/user", function(req,res){
//     db.User.update(
//         req.body,
//         {
//             where:{
//                 id:req.body.id
//             }
//         }).then(function(dbUser){
//             res.json(dbUser);
//         });
// });
// }
