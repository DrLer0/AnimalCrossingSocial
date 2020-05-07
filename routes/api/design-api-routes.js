//dependencies
const express = require('express'),
    router = express.Router(),
    db = require("../../models");

//=============
//=============
//submit events and link them to user account
//get all events
//update event
//delete event
    //when user deletes or after a certain expiration

//routes

//post route for saving new Event to db and associating it with a user
router.post("/designs/:userId", function(req,res) {
    console.log(req.body);
    db.Design.create(req.body)
    .then(function(dbDesign){

        return db.User.findOneAndUpdate({_id:req.params.userId}, {$push: {events: dbDesign._id } }, {new: true});

    })
    .then(function(dbUser){
        res.json(dbUser);
    })
    .catch(function(err){
        res.json(err);
    });

});

//route for getting all events from the db
router.delete("/designs/:id", function(req,res){
    db.Design.findOneAndDelete({_id:req.params.id})
    .then(function(dbDesign){
        res.json(dbDesign);
    })
    .catch(function(err){
        res.json(err);
    });
});

//confirm that when event delete, event id is removed from user array.


router.put("/designs/:id", function(req,res){   /// updatint the entryfee
    db.Design.findOneAndUpdate({_id:req.params.id}, {$set:{designCode: req.body.designCode, description: req.body.description, post: req.body.post}})
    .then(function(dbDesign){
        console.log(dbDesign)
        res.json(dbDesign)
    })
})

module.exports = router


//create and authenticate user
//get user
//update user

//create design
//update design
//delete design

//create event
//update event
//delete event




// //GET route for getting all yardSale items
// module.exports= function(app){
//     app.get("/api/design", function (req,res){
//         var query={};
//         if(req.query.user_id){
//             query.UserID = req.query.user_id;
//         }

//     db.Design.findAll({
//         where: query,
//         include: [db.User]
//     }).then(function(dbYardSale){
//         res.json(dbYardSale);
    
//     });    
//     });


// //GET route for retrieving a single yardSale item

// app.post("/api/design/:id", function(req,res){
//     db.YardSale.findOne({
//         where:{
//             id: req.params.id
//         }, 
//         include: [db.User]
//     }).then(function(dbDesign){
//         res.json(dbDesign);
//     });
// });

// //POST route for saving a new yardSale item
// app.post("/api/design", function(req,res){
//     db.YardSale.create(req.body).then(function(dbDesign){
//         res.json(dbDesign);
//     });
// });

// //Delete route for deleting yardSale items
// app.delete("api/design/:id", function(req,res){
//     db.Design.destroy({
//         where:{
//             id: req.params.id
//         }
//     }).then(function(dbYardSale){
//         res.json(dbYardSale)
//     });
// });

// //PUT route for updating yardSale items
// app.put("/api/design", function(req,res){
//     db.YardSale.update(
//         req.body,
//         {
//             where:{
//                 id:req.body.id
//             }
//         }).then(function(dbDesign){
//             res.json(dbDesign);
//         });
// });
// }