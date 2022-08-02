import React, {useState} from 'react'
import {Button, TextField} from '@mui/material';
import Game from './Game';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function App() {

    const [startGame, setStartGame] = useState(false);
    const [question, setQuestion] = useState(15);

    if (startGame) {
        return <Game questionsLength={question}/>
    }

    return (
        <div className="App container mt-5 d-flex flex-column justify-content-start align-items-center vh-100">
            <h1>Math Cruncher</h1>
            <div>
                <TextField onChange={(event) => {
                    // convert string to number
                    let number = parseInt(event.target.value);
                    setQuestion(number)
                }} id="outlined-basic" type='number' className='m-2 vw-75' label="No. of questions" value={question} variant="outlined"/>
            </div>
            <Button onClick={() => {
                setStartGame(true);
            }
            }>Start Game</Button>
        </div>
    )
}