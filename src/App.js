import React, { useState } from "react";
import { Button, TextField, Select, MenuItem } from "@mui/material";
import Game from "./Game";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function App() {
  const [startGame, setStartGame] = useState(false);
  const [question, setQuestion] = useState(15);
  const [difficulty, setDifficulty] = useState("easy");

  if (startGame) {
    return <Game questionsLength={question} difficulty={difficulty} />;
  }

  return (
    <div className="App container mb-5 d-flex flex-column justify-content-center align-items-center min-vh-100">
      <h1>Math Cruncher</h1>
      <div className="d-flex flex-row align-items-center" style={{
        // height: "100px"
      }}>
        <TextField
          onChange={(event) => {
            // convert string to number
            let number = parseInt(event.target.value);
            setQuestion(number);
          }}
          id="outlined-basic"
          type="number"
          className="m-2 vw-75 my-4"
          label="No. of operations"
          value={question}
          variant="outlined"
        />
        <Select
          onChange={(e) => {
            setDifficulty(e.target.value);
          }}
          label="Difficulty"
          value={difficulty}
          className="m-2 vw-75"
        >
          <MenuItem value="easy">Easy</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="hard">Hard</MenuItem>
        </Select>
      </div>

      <Button
        onClick={() => {
          setStartGame(true);
        }}
      >
        Start Game
      </Button>
    </div>
  );
}
