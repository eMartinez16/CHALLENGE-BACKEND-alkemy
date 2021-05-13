const Movie = require('./movie');
const Character = require('./character');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('characterMovie', {
        movieId: {
            type: DataTypes.INTEGER,
            references: {
                model: Movie,
                key: 'id',
            },
        },
        characterId: {
            type: DataTypes.INTEGER,
            references: {
                model: Character,
                key: 'id',
            },
        },
    });
};