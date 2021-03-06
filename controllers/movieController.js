const { Movie, Character, CharacterMovie, Genre } = require('../db');
const verifyToken = require('../verifyToken');
require('dotenv/config');
const jwt = require('jsonwebtoken');
const list = async (req, res) => {
  try {
    let movies;
    const query = req.query;
    console.log(query);
    if (Object.keys(query).length) {
      if (query.title || query.genre || query.order) {
        if (query.title) {
          movies = await Movie.findAll({
            where: {
              title: query.title,
            },
          });
          if (movies.length === 0) {
            return res.json({ error: "Not results found with 'title' filter" });
          }
        }
        if (query.genre) {
          movies = await Movie.findAll({
            include: [
              {
                model: Genre,
                where: {
                  id: query.genre,
                },
              },
            ],
          });
          if (movies.length === 0) {
            return res.json({ error: "Not results found with 'genre' filter" });
          }
        }
        if (query.order) {
          if (
            query.order === 'asc' ||
            query.order === 'desc' ||
            query.order === 'DESC' ||
            query.order === 'ASC'
          ) {
            movies = await Movie.findAll({
              order: [['title', query.order]],
            });
          } else {
            res.json('Wrong way to order');
          }
          if (movies.length === 0) {
            return res.json({ error: "Not results found with 'order' filter" });
          }
        }
        res.json(movies);
      } else {
        res.json('query strings must not be empty');
      }
    }
    movies = await Movie.findAll({
      attributes: ['image', 'title', 'creation_date'],
    });
    res.json(movies);
  } catch (error) {
    console.error(error);
  }
};
const detail = async (req, res) => {
  try {
    const movies = await Movie.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Character,
          through: {
            model: CharacterMovie,
          },
        },
      ],
    });
    if (!movies) {
      res.json({ msg: 'movie not exists' });
    }
    res.json(movies);
  } catch (error) {
    console.error(error);
  }
};
const create = async (req, res) => {
  try {
    const currentUser = jwt.verify(req.token, process.env.SECRET);
    const query = await Movie.create(req.body);
    res.json(query);
  } catch (error) {
    console.error(error);
  }
};
const delMovie = async (req, res) => {
  const id = req.params.id;
  try {
    const currentUser = jwt.verify(req.token, process.env.SECRET);
    await Movie.destroy({
      where: {
        id,
      },
    });
    res.json({ msg: 'movie deleted' });
  } catch (error) {
    console.error(error);
  }
};

const modify = async (req, res) => {
  try {
    const currentUser = jwt.verify(req.token, process.env.SECRET);
    await Movie.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({ msg: 'movie updated' });
  } catch (error) {
    console.error(error);
  }
};
module.exports = { list, detail, create, delMovie, modify };
