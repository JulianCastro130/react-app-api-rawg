import React from 'react';
import GamesList from '../GamesList/GamesList';
import Find from '../Find/Find'
import './findGames.css'

function FindGames() {

    return (
        <div className='findGames'>
            <Find />
            <GamesList />
        </div>
    )
}
export default FindGames;