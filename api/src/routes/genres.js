const { Router } = require("express");
const router = Router();
const { Genre } = require("../db");
const axios = require("axios");

// Controllers
const addAllGenres = async () => {
  const allGenres = []
  const genres = await axios.get('https://api.rawg.io/api/genres?key=4d6c5895e09f4178aa85fee165a997a3')
  genres.data.results.map(genre=>{
    allGenres.push(genre.name);
  })
  return allGenres
}

const getGenres = async () => {
  const genres = await Genre.findAll();
  return genres;
};

router.get("/", async (req, res) => {
  try {
    let genres = await getGenres();
    if(!genres.length){
      const allGenres = await addAllGenres()
      for (let i = 0; i < allGenres.length; i++) {
        await Genre.create({name: allGenres[i]})
      }
    res.status(200).json(genres)
    }
  res.status(200).json(genres)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
