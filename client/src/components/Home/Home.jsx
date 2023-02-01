import React, { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import NewGame from "../NewGame/NewGame"
import style from './home.module.css'
import { getGames, getGenres, getPlatforms } from "../../redux/actions/actions"
import GamesList from "../GamesList/GamesList"
import { Link } from "react-router-dom"



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
        <div className={style.home}>
            <h1>COUNTER STRIKE</h1>
            <Link className={style.link} to='/'><button>Quit</button></Link>
            <Link className={style.link} to='/about'><button>Options</button></Link>
            <button onClick={handleClickFind}>Find game</button>
            <button onClick={handleClickNewGame}>New game</button>
            {showNewGame ? <NewGame /> : null}
            {showGamesList ? <GamesList /> : null}
        </div>
    )

}

export default Home