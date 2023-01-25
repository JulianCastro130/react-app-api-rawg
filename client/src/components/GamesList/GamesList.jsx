import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Games from '../Games/Games';
import './gamesList.css'
import Modal from '../Modal/Modal';
import { useState } from 'react';
import { findById } from '../../redux/actions/actions';
import Filter from '../Filter/Filter';
import { useEffect } from 'react';
import { getGames } from '../../redux/actions/actions';
import { sortGames } from '../../redux/actions/actions';
import image from './steam.png'
import Pagination from '../Pagination/Pagination'

const GamesList = () => {

  const dispatch = useDispatch()
  const games = useSelector(state => state.games)
  const [showModal, setShowModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [game, setGame] = useState({});
  const [sort, setSort] = useState('asc')
  const [hoverId, setHoverId] = useState(image);
  const [gamesPerPage] = useState(15)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  const handleHover = (id) => {
    setHoverId(id);
  }

  useEffect(() => {
    if (!games.length) {
      dispatch(getGames())
    }
    setTotalPages(Math.ceil(games.length / gamesPerPage))
  }, [hoverId, games])
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }
  const handleClick = (game) => {
    setGame(game)
    setShowModal(true)
    dispatch(findById(game.id))
  }
  const handleFilters = () => {
    setShowFilters(!showFilters)
  }
  const handleSort = (a, b) => {
    dispatch(sortGames(a, b))
    sort === 'asc' ? setSort('desc') : setSort('asc')
  }

  return (
    <div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
      <div className='table-wrapper gamesList'>
        {!showModal &&
          <table key='1' className="tg">
            <thead key='2000' className="tg-head">
              <tr key='3'>
                <th key='4' className="tg-0lax">
                  <button key='5' onClick={() => handleSort('name', sort)}>Name</button>
                </th>
                <th key='6' className="tg-0lax">
                  <button key='7' onClick={() => handleSort('genre', sort)}>Genre</button>
                </th>
                <th key='8' className="tg-0lax">
                  <button key='9' onClick={() => handleSort('rating', sort)}>Rating</button>
                </th>
                <th key='10' className="tg-0lax">
                  <button key='11' onClick={() => handleSort('released', sort)}>Released</button>
                </th>
              </tr>
            </thead>
            <tbody className='gamesList'>
              {
                games.slice((currentPage - 1) * gamesPerPage, currentPage * gamesPerPage).map((game, index) => {
                  if (game.genres === undefined) {
                    game.genre = "No Genre";
                  } else {
                    game.genre = game.genres[0].name;
                  }
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
        <div className='buttonDiv'>
          <button key='4982394820934' onClick={() => handleFilters()}>Change Filters</button>
          {showFilters && <Filter game={game} />}
        </div>
      }
      <div className='img-div'>
        <img className='img-size' src={hoverId} alt="img" />
      </div>
    </div>
  )
};

export default GamesList;