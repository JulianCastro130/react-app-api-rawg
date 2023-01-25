import {
  FILTER_GAME,
  FIND_BY_ID,
  FIND_GAME,
  GET_GAMES,
  SORT_GAMES,
  GET_GENRES
} from "../actions/actions";

const initialState = {
  originGames: [],
  games: [],
  gamesFinded: [],
  gameFindedById: {},
  genres: []
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
        genres: [...action.payload]
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
        if (column === "genre" && a.genres && b.genres) {
          return a.genres[0].name.localeCompare(b.genres[0].name);
        } else {
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
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;