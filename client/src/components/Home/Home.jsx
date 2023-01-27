import React, { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import NewGame from "../NewGame/NewGame"
import './home.css'
import { getGames, getGenres, getPlatforms } from "../../redux/actions/actions"
import GamesList from "../GamesList/GamesList"



const Home = () => {
    const originalGames = useSelector(state=>state.originalGames)
    const dispatch = useDispatch()
    const [showGamesList, setShowGamesList] = useState(false)
    const [showNewGame, setShowNewGame] = useState(false)

    function handleClickFind() {
        setShowNewGame(false)
        setShowGamesList(!showGamesList)
    }
    function handleClickNewGame() {
        setShowGamesList(false)
        setShowNewGame(!showNewGame)
    }
    useEffect(() => {
        dispatch(getGames())
        dispatch(getGenres())
        dispatch(getPlatforms())
    }, [originalGames])

    return (
        <div className="home">
            <h1>COUNTER STRIKE</h1>
            <p>Quit</p>
            <p>Options</p>
            <button className="homeButton" onClick={handleClickFind}>Find game</button>
            <button className="homeButton" onClick={handleClickNewGame}>New game</button>
            {showNewGame ? <NewGame className='newGame' /> : null}
            {showGamesList ? <GamesList className='findGames' /> : null}
        </div>
    )

}

export default Home