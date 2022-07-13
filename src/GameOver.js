import React, { useState } from 'react'
import { Button, TextField } from '@mui/material';
import './styles/dist/app.css';
function AnswerInput(props) {
    return (
         <div>
              <TextField id="input-box" label="Answer" variant="filled" onChange={(event) => props.onChange(event.target.value)} />
         </div>
    );
}

export default function GameOver(props) {
    const [answer, setAnswer] = useState(null);

    const inputBox = <AnswerInput  onChange={(ans) => {
        setAnswer(parseInt(ans));
    }}></AnswerInput>;

    return (
        <div className='answer'>
            <h1 id='answer-heading'>{answer != null && answer !== '' ? answer === props.ques.ans ? 'Right👌' : 'Try again😞' : 'Enter Your answer'}</h1>
            {inputBox}
            <Button onClick={props.onPlayAgain}>Play Again</Button>
        </div>

    );
}