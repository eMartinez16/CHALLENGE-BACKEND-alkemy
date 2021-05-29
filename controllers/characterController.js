const { Character, CharacterMovie, Movie } = require('../db');
require('dotenv/config');
const jwt = require('jsonwebtoken');

const list = async (req, res) => {
  const query = req.query;
  console.log(query);
  try {
    let characters;
    if (Object.keys(query).length) {
      if (query.age || query.movies || query.name) {
        if (query.age) {
          characters = await Character.findAll({
            where: {
              age: query.age,
            },
          });
          if (characters.length === 0) {
            return res.json({ error: "Not results found with 'age' filter" });
          }
        }
        if (query.movies) {
          // Consulta en la tabla personaje y realiza un innerJoin a la tabla Movie a traves de la tabla CharacterMovie
          characters = await Character.findAll({
            include: [
              {
                model: Movie,
                where: {
                  id: query.movies,
                },
                through: {
                  model: CharacterMovie,
                },
              },
            ],
          });
          if (characters.length === 0)
            return res.json({ error: "Not results found with 'movies' filter" });
        }
        if (query.name) {
          characters = await Character.findAll({
            where: {
              name: query.name,
            },
          });
          if (characters.length === 0)
            return res.json({ error: "Not results found with 'name' filter" });
        }
        return res.json(characters);
      } else {
        res.json('query strings must not be empty');
      }
    }
    characters = await Character.findAll({
      attributes: ['image', 'name'],
    });
    res.json(characters);
  } catch (error) {
    console.error(error);
  }
};
const detail = async (req, res) => {
  try {
    const characters = await Character.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Movie,
          through: {
            model: CharacterMovie,
          },
        },
      ],
    });
    if (!characters) {
      res.json({ msg: 'character not exists' });
    }
    res.json(characters);
  } catch (error) {
    console.error(error);
  }
};
const create = async (req, res) => {
  try {
    const currentUser = jwt.verify(req.token, process.env.SECRET);
    const movie = await Movie.findOne({
      where: {
        title: req.body.title,
      },
    });
    if (movie) {
      const character = await Character.create(req.body);
      await CharacterMovie.create({
        movieId: movie.id,
        characterId: character.id,
      });
      res.json(character);
    }
    res.json({ msg: 'Movie title not found' });
  } catch (error) {
    console.error(error);
  }
};
const delCharacter = async (req, res) => {
  const id = req.params.id;
  try {
    const currentUser = jwt.verify(req.token, process.env.SECRET);
    await Character.destroy({
      where: {
        id,
      },
    });
    res.json({ msg: 'file deleted' });
  } catch (error) {
    console.error(error);
  }
};
const update = async (req, res) => {
  try {
    const currentUser = jwt.verify(req.token, process.env.SECRET);
    await Character.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({ msg: 'character updated' });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { list, create, delCharacter, update, detail };
