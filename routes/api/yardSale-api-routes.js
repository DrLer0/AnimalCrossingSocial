var db = require("../../models");

//routes

//GET route for getting all yardSale items
module.exports= function(app){
    app.get("/api/yardSale", function (req,res){
        var query={};
        if(req.query.user_id){
            query.UserID = req.query.user_id;
        }

    db.YardSale.findAll({
        where: query,
        include: [db.User]
    }).then(function(dbYardSale){
        res.json(dbYardSale);
    
    });    
    });


//GET route for retrieving a single yardSale item

app.post("/api/yardSale/:id", function(req,res){
    db.YardSale.findOne({
        where:{
            id: req.params.id
        }, 
        include: [db.User]
    }).then(function(dbYardSale){
        res.json(dbYardSale);
    });
});

//POST route for saving a new yardSale item
app.post("/api/yardSale", function(req,res){
    db.YardSale.create(req.body).then(function(dbYardSale){
        res.json(dbYardSale);
    });
});

//Delete route for deleting yardSale items
app.delete("api/yardSale/:id", function(req,res){
    db.YardSale.destroy({
        where:{
            id: req.params.id
        }
    }).then(function(dbYardSale){
        res.json(dbYardSale)
    });
});

//PUT route for updating yardSale items
app.put("/api/yardSale", function(req,res){
    db.YardSale.update(
        req.body,
        {
            where:{
                id:req.body.id
            }
        }).then(function(dbYardSale){
            res.json(dbYardSale);
        });
});
}