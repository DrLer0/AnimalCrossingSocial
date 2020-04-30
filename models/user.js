//to be used for passport; feel free to change name
module.exports = function (sequelize, DataTypes){
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull:false
        },
        createdAt: DataTypes.DATE,
        username: DataTypes.STRING, //required
        password: DataTypes.INTEGER, //required
        photo: DataTypes.STRING, //not required
        islandName:DataTypes.STRING,//required
        localFruit: DataTypes.STRING, //not required
        creatorCode:DataTypes.STRING //not required
    }, {});
    User.associate = function(models){
        User.hasOne(models.event, {as: 'event'})
    };

    User.associate = function (models){
        User.hasMany(models.yardSale, {as:'yardSale'})
    };

    //time permitting, add custom designs

    return User;
};

//ondelete cascade --add to all of them


//user has many yardsales
//user has one turnips/hotiem
//user has many customDesigns (not mvp)
//user has many events (not mvp)
