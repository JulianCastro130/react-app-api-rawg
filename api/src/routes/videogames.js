const { Router } = require("express");
const axios = require("axios");
const { Videogame, Genre, Platform } = require("../db");
const { isUUID } = require("validator");

const router = Router();

// Controllers
const getGames = async () => {
  const games = await Videogame.findAll({
    attributes: ["name","background_image","id","rating","released","description"],
    include: [
      {
        model: Genre,
        attributes: ["name"],
        required: true
      },
      {
        model: Platform,
        attributes: ["name"],
        required: true
      }
    ],
  })
  return games
};

let urlsArray = [];
for (let i = 1; i <= 5; i++) {
  urlsArray.push(
    axios.get(`https://api.rawg.io/api/games?key=4d6c5895e09f4178aa85fee165a997a3&page=${i}`)
  );
}
const getApiVideogames = async () => {
  let gamesApiResponse = [];
  const results = await Promise.all(urlsArray);
  results.forEach(
    (result) => (gamesApiResponse = [...gamesApiResponse, ...result.data.results])
  );
  return gamesApiResponse;
};

const getGameById = async (id) => {
  const game = await Videogame.findByPk(id)
  return game
};

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", async (req, res) => {
  let games = []
  const { name } = req.query

  try {
    let gamesDb = name
      ? await getGames({ where: { name: req.query.name } })
      : await getGames()

    let gamesApi
    let gamesApiSearch
    let gamesApiResponse

    if (name) {
      gamesApiSearch = await axios.get(
        `https://api.rawg.io/api/games?search=${name}&key=4d6c5895e09f4178aa85fee165a997a3`
      )
    } else
     {gamesApiResponse = await getApiVideogames()}

    if (gamesApiSearch) {
      gamesApi = gamesApiSearch.data.results;
    } else {
      gamesApi = gamesApiResponse;
    }

    const filteredGames = gamesApi.filter(game => game.genres.length).filter(game => game.platforms.length)

    games =
      gamesDb && filteredGames
        ? [...gamesDb, ...filteredGames]
        : gamesDb
        ? gamesDb
        : filteredGames;
    res.status(200).json(games);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
})

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    if(isUUID(id)){
      let games = await getGameById(id)
      res.status(200).json(games);
    }else{
      let games = await axios.get(`https://api.rawg.io/api/games/${id}?key=4d6c5895e09f4178aa85fee165a997a3`)
      res.status(200).json(games.data);
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const {
    name,
    genre,
    description,
    released,
    rating,
    platforms,
    background_image
  } = await req.body;

  try {
    let newGame = await Videogame.create({
      name,
      description,
      released,
      rating,
      background_image
    });
    
    let newGenre = await Genre.findAll({where:{name: genre}});
    let newPlatform = await Platform.findAll({where:{name: platforms}});
    newGame.addGenre(newGenre);
    newGame.addPlatform(newPlatform);
    res.status(200).send(newGame);

  } catch (error) {

    res.status(400).send({ error: error.message });

  }
});
//

module.exports = router;
