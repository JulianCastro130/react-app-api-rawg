import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Games from '../Games/Games';
import style from './gamesList.module.css'
import Modal from '../Modal/Modal';
import { useState } from 'react';
import { findById } from '../../redux/actions/actions';
import Filter from '../Filter/Filter';
import { useEffect } from 'react';
import { getGames } from '../../redux/actions/actions';
import { sortGames } from '../../redux/actions/actions';
import image from './csMenu2.png'
import Pagination from '../Pagination/Pagination'


const GamesList = () => {

  const dispatch = useDispatch()
  const games = useSelector(state => state.games)
  const [showModal, setShowModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [game, setGame] = useState({});
  const [sort, setSort] = useState('asc')
  const [hoverBg, setHoverBg] = useState(image);
  const [hoverName, setHoverName] = useState();
  const [gamesPerPage] = useState(15)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleHover = (background_image, name) => {
    setHoverBg(background_image);
    setHoverName(name)
  }
  useEffect(() => {
    if (!games.length) {
      dispatch(getGames())
    }
    setTotalPages(Math.ceil(games.length / gamesPerPage))
  }, [hoverBg, games, dispatch])
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }
  const handleClick = (game) => {
    setGame(game)
    dispatch(findById(game.id))
    setTimeout(() => {
      setShowModal(true)
    }, 1500)
  }
  const handleFilters = () => {
    setShowFilters(!showFilters)
  }
  const handleSort = (a, b) => {
    dispatch(sortGames(a, b))
    sort === 'asc' ? setSort('desc') : setSort('asc')
  }
  return (
    <div className={style.parentGameList}>
      {!showModal &&
        <div className={style.imgDiv}>
          <img src={hoverBg} alt="img" />
          <h1>{hoverName}</h1>
        </div>
      }
      {!showModal &&
        <Pagination
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      }
      <div className={style.gamesList}>
        {!showModal &&
          <table>
            <thead>
              <tr>
                <th>
                  <button onClick={() => handleSort('name', sort)}>Name</button>
                </th>
                <th>
                  <button onClick={() => handleSort('genre', sort)}>Genre</button>
                </th>
                <th>
                  <button onClick={() => handleSort('platform', sort)}>Platform</button>
                </th>
                <th>
                  <button onClick={() => handleSort('released', sort)}>Released</button>
                </th>
                <th>
                  <button onClick={() => handleSort('rating', sort)}>Rating</button>
                </th>
              </tr>
            </thead>
            <tbody>
              {
                games.slice((currentPage - 1) * gamesPerPage, currentPage * gamesPerPage).map((game, index) => {
                  if (!game.platforms || !game.genres) {
                    game.genre = "No Genre"
                    game.platforms = "No Platforms"
                  }
                  let allGenres = []
                  game.genres.forEach(g => { allGenres.push(g.name) })
                  game.genre = allGenres.join(', ')
                  game.platform = !isNaN(game.id)
                    ? game.platforms.map(p => p.platform.name).join(', ')
                    : game.platforms.map(p => p.name).join(', ')

                  return (
                    <tr key={game.id} onClick={() => handleClick(game)}>
                      <Games
                        background_image={game.background_image}
                        handleHover={handleHover}
                        id={game.id}
                        key={`${game.id}-${index}`}
                        name={game.name}
                        rating={game.rating}
                        genre={game.genre}
                        released={game.released}
                        platform={game.platform}
                      />
                    </tr>
                  );
                })
              }
            </tbody>
          </table>}
        {showModal && <Modal
          game={game}
          closeModal={() => setShowModal(false)} />
        }
      </div>
      {!showModal &&
        <div className={style.buttonDiv}>
          <button onClick={() => handleFilters()}>Change Filters</button>
          {showFilters && <Filter
            className={style.filter}
            setCurrentPage={setCurrentPage}
            game={game} />}
        </div>
      }
    </div>
  )
};

export default GamesList;