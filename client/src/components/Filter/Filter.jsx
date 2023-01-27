import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterGames, filterGenres, filterPlatforms } from "../../redux/actions/actions";
import './filter.css'



function Filter(props) {

  const dispatch = useDispatch()

  const genres = useSelector(state=>state.genres)
  const platforms = useSelector(state=>state.platforms)

  const [selectedGenres, setSelectedGenres] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState('');
  
  const handleGenresChange = (e) => {
    setSelectedGenres(e.target.value)
    dispatch(filterGenres(e.target.value))
    props.setCurrentPage(1)
  }

  const handlePlatformsChange = (e) => {
    setSelectedPlatforms(e.target.value)
    dispatch(filterPlatforms(e.target.value))
    props.setCurrentPage(1)
  }

  function handleClick(id) {
    dispatch(filterGames(id))
    props.setCurrentPage(1)
  }

  return (
    <div key='43627846287346287346'>
      <button key='436278462873462873' onClick={() => handleClick("db")}>Own Created Games</button>
      <button key='4367346287346' onClick={() => handleClick('api')}>World Wide Games</button>
      <select value={selectedGenres} onChange={handleGenresChange}>
        <option value="All">All</option>
        {genres.map(genre => <option key={genre.id} value={genre.name}>{genre.name}</option>)}
      </select>
      <select value={selectedPlatforms} onChange={handlePlatformsChange}>
        <option value="All">All</option>
        {platforms.map(platform => <option key={platform.id} value={platform.name}>{platform.name}</option>)}
      </select>
      <button key='22312312312' onClick={() => handleClick('refresh')}>Refresh</button>
    </div>

  )
}
export default Filter;