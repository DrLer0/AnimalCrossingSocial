var db = require("../../models");

//routes

//GET route for getting all yardSale items
module.exports= function(app){
    app.get("/api/design", function (req,res){
        var query={};
        if(req.query.user_id){
            query.UserID = req.query.user_id;
        }

    db.Design.findAll({
        where: query,
        include: [db.User]
    }).then(function(dbYardSale){
        res.json(dbYardSale);
    
    });    
    });


//GET route for retrieving a single yardSale item

app.post("/api/design/:id", function(req,res){
    db.YardSale.findOne({
        where:{
            id: req.params.id
        }, 
        include: [db.User]
    }).then(function(dbDesign){
        res.json(dbDesign);
    });
});

//POST route for saving a new yardSale item
app.post("/api/design", function(req,res){
    db.YardSale.create(req.body).then(function(dbDesign){
        res.json(dbDesign);
    });
});

//Delete route for deleting yardSale items
app.delete("api/design/:id", function(req,res){
    db.Design.destroy({
        where:{
            id: req.params.id
        }
    }).then(function(dbYardSale){
        res.json(dbYardSale)
    });
});

//PUT route for updating yardSale items
app.put("/api/design", function(req,res){
    db.YardSale.update(
        req.body,
        {
            where:{
                id:req.body.id
            }
        }).then(function(dbDesign){
            res.json(dbDesign);
        });
});
}