const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DesignSchema = new Schema ({
   name: String,
   designCode: String,
   image: String 
});

const Design = mongoose.model("Design", DesignSchema);

module.exports=Design;


// module.exports = function (sequelize, DataTypes){
//     const YardSale = sequelize.define('YardSale', {
//         id: {
//             type: DataTypes.UUID,
//             primaryKey: true,
//             defaultValue: DataTypes.UUIDV4,
//             allowNull:false
//         },
//         createdAt: DataTypes.DATE,
//         item: {
//             type: DataTypes.STRING,
//             required: true},
//         buyOrSale: {
//             type: DataTypes.ENUM,
//             values: ['buy','sell']
//         },
//         price: {
//             type: DataTypes.INTEGER,
//             required: true
//         },
//         dodoCode:DataTypes.STRING, //not required

// }, {});
// YardSale.associate=function(models){
//     YardSale.belongsTo(models.User, {foreignKey:'user_id', as: 'user'})
// };
// return YardSale;
// };
