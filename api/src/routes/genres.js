const { Router } = require("express");
const router = Router();
const { Genre } = require("../db");

// Controllers
const getGenres = async () => {
  const genres = await Genre.findAll();
  return genres;
};

router.get("/", async (req, res) => {
  try {
    let genres = await getGenres();
    res.status(200).json(genres);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
