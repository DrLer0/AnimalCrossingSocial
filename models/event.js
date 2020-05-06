const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema ({
   event: String,
   transaction: {
       enum: ['turnips', 'hot item', 'celeste (character)', 'sahara (character)'],
   }, 
   salePrice: String,
   entryFee: String,

});

const Event=mongoose.model("Event", EventSchema);

module.exports=Event;


// module.exports = function (sequelize, DataTypes){
//     const Event = sequelize.define('Event', {
//         id: {
//             type: DataTypes.UUID,
//             primaryKey: true,
//             defaultValue: DataTypes.UUIDV4,
//             allowNull:false
//         },
//         createdAt: DataTypes.DATE,
//         event: {
//             type: DataTypes.ENUM,
//             values: ['turnip price', 'hot item', 'celeste (character)', 'sahara (character)'],
//             required:true
//         },
//              //either turnips, hotItem, or special character, required
//         salePrice: DataTypes.INTEGER, //not required
//         entryFee: DataTypes.STRING, //not required
//         userID: DataTypes.INTEGER,
//         dodoCode: DataTypes.STRING, //not required
//     }, 
//     {});

//     Event.associate=function(models){
//         Event.belongsTo(models.User, {foreignKey: 'user_id', as: 'user'})
//     };
//     return Event
// };