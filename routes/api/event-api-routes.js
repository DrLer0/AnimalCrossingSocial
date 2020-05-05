var db = require("../../models");

//routes

//GET route for getting all yardSale items
module.exports= function(app){
    app.get("/api/event", function (req,res){
        var query={};
        if(req.query.user_id){
            query.UserID = req.query.user_id;
        }

    db.Event.findAll({
        where: query,
        include: [db.User]
    }).then(function(dbEvent){
        res.json(dbEvent);
    
    });    
    });

//GET route for retrieving a single yardSale item

app.post("/api/event/:id", function(req,res){
    db.Event.findOne({
        where:{
            id: req.params.id
        }, 
        include: [db.User]
    }).then(function(dbEvent){
        res.json(dbEvent);
    });
});

//POST route for saving a new yardSale item
app.post("/api/event", function(req,res){
    db.Event.create(req.body).then(function(dbEvent){
        res.json(dbEvent);
    });
});

//Delete route for deleting yardSale items
app.delete("api/event/:id", function(req,res){
    db.Event.destroy({
        where:{
            id: req.params.id
        }
    }).then(function(dbEvent){
        res.json(dbEvent)
    });
});

//PUT route for updating yardSale items
app.put("/api/event", function(req,res){
    db.Event.update(
        req.body,
        {
            where:{
                id:req.body.id
            }
        }).then(function(dbEvent){
            res.json(dbEvent);
        });
});
}