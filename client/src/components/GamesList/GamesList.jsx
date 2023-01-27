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

  const handleHover = (background_image,name) => {
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
    <div className='parentGameList'>
      {/* style={{backgroundImage: `url(${hoverBg})`, backgroundRepeat: 'no-repeat',backgroundPosition: '50% 35%'}} */}
      {!showModal &&
        <div className='img-div'>
          <img className='img-size' src={hoverBg} alt="img" />
          <h1 style={{color: 'white'}} className='img-h1'>{hoverName}</h1>
        </div>
      }
      {!showModal &&
        <Pagination
        className='pagination'
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      }

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
                <th key='12' className="tg-0lax">
                  <button key='13' onClick={() => handleSort('platform', sort)}>Platform</button>
                </th>
                <th key='10' className="tg-0lax">
                  <button key='11' onClick={() => handleSort('released', sort)}>Released</button>
                </th>
                <th key='8' className="tg-0lax">
                  <button key='9' onClick={() => handleSort('rating', sort)}>Rating</button>
                </th>
              </tr>
            </thead>
            <tbody className='gamesList'>
              {
                games.slice((currentPage - 1) * gamesPerPage, currentPage * gamesPerPage).map((game, index) => {
                  if (!game.platforms || !game.genres) {
                    game.genre = "No Genre"
                    game.platforms = "No Platforms"
                  }
                  let allGenres = []
                  let allPlatforms = []
                  game.genres.forEach(g => {
                    allGenres.push(g.name)
                  })
                  game.genre = allGenres.join(', ')
                  if (!isNaN(game.id)) {
                    game.platforms.forEach(p => {
                      allPlatforms.push(p.platform.name)
                    })
                    game.platform = allPlatforms.join(', ')
                  } else {
                    game.platforms.forEach(p => {
                      allPlatforms.push(p.name)
                    })
                    game.platform = allPlatforms.join(', ')
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
        <div className='buttonDiv'>
          <button key='4982394820934' onClick={() => handleFilters()}>Change Filters</button>
          {showFilters && <Filter
            setCurrentPage={setCurrentPage}
            game={game} />}
        </div>
      }
    </div>
  )
};

export default GamesList;