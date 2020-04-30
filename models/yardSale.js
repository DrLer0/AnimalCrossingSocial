module.exports = function (sequelize, DataTypes){
    const YardSale = sequelize.define('YardSale', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull:false
        },
        createdAt: DataTypes.DATE,
        item: {
            type: DataTypes.STRING,
            required: true},
        buyOrSale: {
            type: DataTypes.ENUM,
            values: ['buy','sell']
        },
        price: {
            anount: DataTypes.INTEGER,
            required: true
        },
        dodoCode:DataTypes.STRING, //not required

}, {});
YardSale.associate=function(models){
    YardSale.belongsTo(models.User, {foreignKey:'UserID', as: 'user'})
};
return YardSale;
};
