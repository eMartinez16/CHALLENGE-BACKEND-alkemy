const { Character, CharacterMovie, Movie } = require('../db');

const list = async(req, res) => {
    const query = req.query;
    try {
        let characters;
        if (query) {
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
                    include: [{
                        model: Movie,
                        where: {
                            id: query.movies,
                        },
                        through: {
                            model: CharacterMovie,
                        },
                    }, ],
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
            characters = await Character.findAll({
                attributes: ['image', 'name'],
            });
            res.json(characters);
        }
    } catch (error) {
        console.error(error);
    }
};
const detail = async(req, res) => {
    try {
        const characters = await Character.findAll({
            where: {
                id: req.params.id,
            },
            include: [{
                model: Movie,
                through: {
                    model: CharacterMovie,
                },
            }, ],
        });
        res.json(characters);
    } catch (error) {
        console.error(error);
    }
};
const create = async(req, res) => {
    try {
        const query = await Character.create(req.body);
        res.json(query);
    } catch (error) {
        console.error(error);
    }
};
const delCharacter = async(req, res) => {
    const id = req.params.id;
    try {
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
const update = async(req, res) => {
    try {
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