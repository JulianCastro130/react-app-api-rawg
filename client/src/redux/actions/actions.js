import axios from "axios";

export const GET_GAMES = "GET_GAMES";
export const FIND_GAME = "FIND_GAME";
export const FIND_BY_ID = "FIND_BY_ID";
export const FILTER_GAME = "FILTER_GAME";
export const SORT_GAMES = 'SORT_GAMES'
export const GET_GENRES = "GET_GENRES"
export const GET_IMAGE = "GET_IMAGE"


export const getGames = () => {
  return async function (dispatch) {
    const res = await axios(`http://localhost:3001/videogames`);
    dispatch({ type: GET_GAMES, payload: res.data });
  };
};

export const findGames = (name) => {
  return async function (dispatch) {
    const res = await axios(`http://localhost:3001/videogames?name=${name}`);
    dispatch({ type: FIND_GAME, payload: res.data });
  };
};

export const findById = (id) => {
  return async function (dispatch) {
    const res = await axios(`http://localhost:3001/videogames/${id}`);
    dispatch({ type: FIND_BY_ID, payload: res.data });
  };
};

export const filterGames = (id) => {
  return {
    type: FILTER_GAME,
    payload: id,
  };
};

export const sortGames = (column, order) => {
  return { type: SORT_GAMES, payload: {column, order} }
}

export const getGenres = () => {
  return async function (dispatch) {
    const res = await axios(`http://localhost:3001/genres`);
    dispatch({ type: GET_GENRES, payload: res.data });
  };
};
