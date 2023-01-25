const { DataTypes } = require("sequelize");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Videogame", {
    id: {
      type: DataTypes.UUID,//UUID es para que genere un número random con letras/números y único, habilitado en sql
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,//no permito que esté vacío
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    released: {
      type: DataTypes.DATEONLY,
    },
    rating: {
      type: DataTypes.FLOAT,
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    }
  },
  {
    timestamps: false,
  })
};


// router.post("/", async (req, res) => {
//   const { name, genre, description, released, rating, platforms, image } =
//     await req.body;
//   try {
//     // Check if the genre already exists
//     const existingGenre = await Genre.findOne({ where: { name: genre } });
//     // If the genre exists, use its id to create the new game
//     let newGame;
//     if (existingGenre) {
//       newGame = await Videogame.create({
//         name,
//         description,
//         released,
//         rating,
//         platforms,
//         image,
//         genreId: existingGenre.id,
//       });
//     }
//     // If the genre does not exist, create a new genre and use its id to create the new game
//     else {
//       const newGenre = await Genre.create({ name: genre });
//       newGame = await Videogame.create({
//         name,
//         description,
//         released,
//         rating,
//         platforms,
//         image,
//         genreId: newGenre.id,
//       });
//     }
//     // Get the existing relationships between games and genres
//     const genreIds = await conn.query(
//       "SELECT gameId FROM Videogame_Genre WHERE genreId = " + genre,
//       { type: conn.QueryTypes.SELECT }
//     );
//     console.log(genreIds);
//     // Add the newly created game to the existing relationships
//     genreIds.push(newGame.id);
//     // Save the updated relationships in a constant
//     const updatedGenreIds = genreIds;
//     console.log(updatedGenreIds);
//     // Send the newly created game as a response
//     res.status(200).send(newGame);
//   } catch (error) {
//     res.status(400).send({ error: error.message });
//   }
// });