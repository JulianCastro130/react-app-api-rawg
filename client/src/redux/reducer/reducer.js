import {
  FILTER_GAME,
  FIND_BY_ID,
  FIND_GAME,
  GET_GAMES,
  SORT_GAMES,
  GET_GENRES,
  FILTER_GENRE,
  GET_PLATFORMS,
  FILTER_PLATFORMS,
  RENDER_GAME,
} from "../actions/actions";

const initialState = {
  originGames: [],
  games: [],
  gamesFinded: [],
  gameFindedById: {},
  genres: [],
  platforms: [],
  gameRendered: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAMES:
      return {
        ...state,
        originGames: [...action.payload],
        games: [...action.payload],
      };
    case GET_GENRES:
      return {
        ...state,
        genres: [...action.payload],
      };
    case GET_PLATFORMS:
      return {
        ...state,
        platforms: [...action.payload],
      };
    case FIND_GAME:
      return {
        ...state,
        games: action.payload,
      };
    case FIND_BY_ID:
      return {
        ...state,
        gameFindedById: action.payload,
      };
    case FILTER_GAME:
      if (action.payload === "api") {
        return {
          ...state,
          games: [
            ...state.originGames.filter((game) => typeof game.id == "number"),
          ],
        };
      } else if (action.payload === "db") {
        return {
          ...state,
          games: [
            ...state.originGames.filter((game) => typeof game.id != "number"),
          ],
        };
      } else {
        return {
          ...state,
          games: [...state.originGames],
        };
      }
    case SORT_GAMES:
      const { column, order } = action.payload;
      const gamesO = [...state.games];
      const sortedGames = gamesO.sort((a, b) => {
        if (column === "name") {
          return a[column].localeCompare(b[column]);
        }
        if (column === "rating") {
          return a.rating - b.rating;
        }
        if (column === "released") {
          return new Date(a.released) - new Date(b.released);
        }
        if (column === "genre") {
          return a.genres[0].name.localeCompare(b.genres[0].name);
        }
        if (column === "platform") {
          if(!isNaN(a.id)){
            if(!isNaN(b.id)){return a.platforms[0].platform.name.localeCompare(b.platforms[0].platform.name)}
            else {return a.platforms[0].platform.name.localeCompare(b.platforms[0].name)}
          }
          if(isNaN(a.id)){
            if(!isNaN(b.id)){return a.platforms[0].name.localeCompare(b.platforms[0].platform.name)}
            else {return a.platforms[0].name.localeCompare(b.platforms[0].name)}
          }
        } 
        else {
          return a[column] - b[column];
        }
      });
      if (order === "desc") {
        sortedGames.reverse();
      }
      return {
        ...state,
        games: [...sortedGames],
      };
    case FILTER_GENRE:
      let gamesByGenres =
        action.payload === "All"
          ? [...state.originGames]
          : [
              ...state.games.filter((game) => {
                return game.genres.some((obj) => obj.name === action.payload);
              }),
            ];
      return {
        ...state,
        games: gamesByGenres,
      };
    case FILTER_PLATFORMS:
        let gamesByPlatforms =
          action.payload === "All"
            ? [...state.originGames]
            : [
                ...state.games.filter((game) => {
                  return game.platforms.some((obj) => obj.platform.name === action.payload);
                }),
              ];
        return {
          ...state,
          games: gamesByPlatforms,
        };
    case RENDER_GAME:
      return {
       ...state,
        gameRendered: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;