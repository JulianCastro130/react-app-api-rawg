const { Router } = require("express");
const router = Router();
const { Platform } = require("../db");
const axios = require("axios");
const {API_KEY} = process.env

// Controllers
const addAllPlatforms = async () => {
  const allPlatforms = []
  const platforms = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`)
  platforms.data.results.map(platform=>{
    allPlatforms.push(platform.name);
  })
  return allPlatforms
}

const getPlatforms = async () => {
  const platforms = await Platform.findAll();
  return platforms;
};

router.get("/", async (req, res) => {
  try {
    let platforms = await getPlatforms();
    if(!platforms.length){
      const allPlatforms = await addAllPlatforms()
      for (let i = 0; i < allPlatforms.length; i++) {
        await Platform.create({name: allPlatforms[i]})
      }
    res.status(200).json(platforms)
    }
  res.status(200).json(platforms)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
