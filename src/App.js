import React, { useState } from 'react'
import { Button } from '@mui/material';
import Game from './Game';


export default function App() {

    const [startGame, setStartGame] = useState(false);

    if (startGame) {
        return <Game />
    }

    return (
        <div className="App">
            <h1>Math Cruncher</h1>
            <Button onClick={() => {
                setStartGame(true);
            }
            }>Start Game</Button>
        </div>
    )
}