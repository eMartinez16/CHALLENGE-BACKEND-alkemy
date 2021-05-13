require('dotenv/config');
const { Sequelize, DataTypes } = require('sequelize');
const characterModel = require('./models/character');
const userModel = require('./models/user');
const movieModel = require('./models/movie');
const genreModel = require('./models/genre');
const character_movie = require('./models/character_movie');

//establece conexión con la db utilizando variables de entorno
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS, {
        host: process.env.DB_HOST,
        dialect: 'mysql',
    },
);

//uso de modelos
const Character = characterModel(sequelize, DataTypes);
const User = userModel(sequelize, DataTypes);
const Genre = genreModel(sequelize, DataTypes);
const Movie = movieModel(sequelize, DataTypes);
const CharacterMovie = character_movie(sequelize, DataTypes);

//relaciones de la base de datos
Movie.hasMany(Genre);
Genre.belongsTo(Movie);

//relación muchos a muchos
Character.belongsToMany(Movie, { through: CharacterMovie });
Movie.belongsToMany(Character, { through: CharacterMovie });

//verifica la conexión con la db
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

//sincroniza las tablas
sequelize.sync();

module.exports = { Character, User, Genre, Movie, CharacterMovie };