import "./styles/dist/app.css";
import React from "react";
import { LinearProgress } from "@mui/material";
import GameOver from "./GameOver";
const operators = ["+", "-", "*", "/"];
const durationPerQues = 7;

function evaluate(operator, a, b) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
    default:
      return 0;
  }
}

function generateNumbersToDivide(left, max = 100) {
  let list = [];
  // find the numbers which is divisible by left
  for (let x = 1; x < max; x++) {
    if (left % x === 0) {
      list.push(x);
    }
  }
  return list;
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getMaxNumberOnDifficulty(difficulty) {
  switch (difficulty) {
    case "easy":
      return randomIntFromInterval(1, 9);
    case "medium":
      return randomIntFromInterval(10, 99);
    case "hard":
      return randomIntFromInterval(100, 999);
    default:
      return Math.floor(Math.random() * 9);
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    console.log("---Game--- props", props);
    let initialNumber = Math.floor(Math.random() * 9);
    while (initialNumber === 0) {
      initialNumber = Math.floor(Math.random() * 9);
    }
    this.state = {
      initialNumber: initialNumber,
      question: null,
      quizLength: props.questionsLength,
      qNo: 1,
      start: true,
      secondsLeft: durationPerQues,
      isGameOver: false,
      difficulty: props.difficulty ?? "easy",
    };

    console.log("---Game--- state", this.state);

    let timer = setInterval(() => {
      if (this.state.start) {
        return;
      }

      if (this.state.secondsLeft === 0) {
        if (this.state.qNo >= this.state.quizLength) {
          this.setState({
            ...this.state,
            isGameOver: true,
          });
          clearInterval(timer);
          return;
        }
        this.setState({
          ...this.state,
          question: this.generateQuestions(this.state.question.ans),
          qNo: this.state.qNo + 1,
          secondsLeft: durationPerQues,
          isGameOver: false,
        });
        return;
      }
      this.setState({
        ...this.state,
        secondsLeft: this.state.secondsLeft - 1,
      });
    }, 1000);
  }

  start() {
    setTimeout(() => {
      let question = this.generateQuestions(this.state.initialNumber);
      this.setState({
        ...this.state,
        question: question,
        start: false,
      });
    }, 2000);
  }

  componentDidMount() {
    this.start();
  }

  generateQuestions(l) {
    let max = getMaxNumberOnDifficulty(this.state.difficulty);
    let curr = Math.floor(Math.random() * max);
    let op = operators[Math.floor(Math.random() * 4)];
    if (op === "/") {
      // if op is division then only allow numbers divisible by l
      let numbers = generateNumbersToDivide(l, max);
      curr = numbers[Math.floor(Math.random() * numbers.length)];
    } else if (op === "*") {
      curr = Math.floor(Math.random() * max);
    }
    let ans = evaluate(op, l, curr);
    return {
      curr: curr,
      op: op,
      ans: ans,
    };
  }

  getOperatorName(op) {
    switch (op) {
      case "+":
        return "Add";
      case "-":
        return "Subtract";
      case "*":
        return "Multiply By";
      case "/":
        return "Divide By";
      default:
        return null;
    }
  }

  render() {
    let ques = this.state.question;
    let start = this.state.start ? (
      <h1> Take {this.state.initialNumber} </h1>
    ) : null;
    let operator = !this.state.start ? (
      <h2 id="operator">{this.getOperatorName(ques["op"])}</h2>
    ) : null;

    let question = !this.state.isGameOver ? (
      <div className="question">
        {operator}
        {!this.state.start ? <h2 id="curr">{ques["curr"]}</h2> : null}
      </div>
    ) : null;

    if (this.state.isGameOver) {
      return (
        <GameOver
          ques={ques}
          onPlayAgain={() => {
            this.setState({
              ...this.state,
              qNo: 1,
              secondsLeft: durationPerQues,
              isGameOver: false,
              start: true,
            });
            this.start();
          }}
        />
      );
    }

    return (
      <div className="App">
        <h1>Math Cruncher</h1>
        {start}
        {question}
        <LinearProgress
          className="progress-bar"
          variant="determinate"
          value={
            ((durationPerQues - this.state.secondsLeft) / durationPerQues) * 100
          }
          valueBuffer={3}
        />
      </div>
    );
  }
}

export default Game;
