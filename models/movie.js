module.exports = (sequelize, DataTypes) => {
    return sequelize.define('movie', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        creation_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        qualification: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
};