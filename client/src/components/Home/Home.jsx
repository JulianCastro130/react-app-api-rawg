import React, { useState } from "react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import NewGame from "../NewGame/NewGame"
import './home.css'
import { getGames, getGenres } from "../../redux/actions/actions"
import FindGames from "../FindGames/FindGames"


const Home = () => {
    const dispatch = useDispatch()
    const [showGamesList, setShowGamesList] = useState(false)
    const [showNewGame, setShowNewGame] = useState(false)

    function handleClickFind() {
        setShowGamesList(!showGamesList)
    }
    function handleClickNewGame() {
        setShowNewGame(!showNewGame)
    }
    useEffect(() => {
        dispatch(getGames())
        dispatch(getGenres())
    }, [])

    return (
        <div className="home">
            <h1>COUNTER STRIKE</h1>
            <p>Quit</p>
            <p>Options</p>
            <button className="homeButton" onClick={handleClickFind}>Find game</button>
            <button className="homeButton" onClick={handleClickNewGame}>New game</button>
            {showNewGame ?  <NewGame className='newGame'/> : null}
            {showGamesList ? <FindGames className='findGames'/> : null}
        </div>
    )

}

export default Home