const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true
    }, 
    password: String,
    photo: String,
    islandName: String,
    localFruit: String,
    // creatorCode: String,

    events: [//create event first, get id of event, update user
        {
        type: Schema.Types.ObjectId,
        ref: "Event"
        }
    ], 

    designs: [
        {
            type: Schema.Types.ObjectId,
            ref: "Design"
        }
    ]

}); 

const User = mongoose.model("User", UserSchema);

module.exports = User; 


//to be used for passport; feel free to change name
// module.exports = function (sequelize, DataTypes){
//     const User = sequelize.define('User', {
//         user_id: {
//             type: DataTypes.UUID,
//             primaryKey: true,
//             defaultValue: DataTypes.UUIDV4,
//             allowNull:false
//         },
//         createdAt: DataTypes.DATE,
//         username: DataTypes.STRING, //required
//         password: DataTypes.INTEGER, //required
//         photo: DataTypes.STRING, //not required
//         islandName:DataTypes.STRING,//required
//         localFruit: DataTypes.STRING, //not required
//         creatorCode:DataTypes.STRING //not required

//         //add dodo code
//     }, {});
//     User.associate = function(models){
//         User.hasOne(models.Event, {as: 'event'})
//     };

//     User.associate = function (models){
//         User.hasMany(models.YardSale, {as:'yardSale'})
//     };

//     //time permitting, add custom designs

//     return User;
// };

// //ondelete cascade --add to all of them


// //user has many yardsales
// //user has one turnips/hotiem
// //user has many customDesigns (not mvp)
// //user has many events (not mvp)
