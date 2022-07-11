import './styles/dist/app.css';
import React from 'react'
import { LinearProgress, TextField } from '@mui/material'

const operators = ['+', '-', '*', '/']
const durationPerQues = 10;


function AnswerInput(props) {
     return (
          <div>
               <TextField id="outlined-basic" label="Answer" variant="outlined" onChange={(event) => props.onChange(event.target.value)} />
          </div>
     );
}


class App extends React.Component {
     constructor() {
          super();
          let initialNumber = Math.floor((Math.random() * 9));
          while (initialNumber === 0) {
               initialNumber = Math.floor((Math.random() * 9));
          }
          this.state = {
               initialNumber: initialNumber,
               question: null,
               quizLength: 15,
               qNo: 1,
               start: true,
               secondsLeft: durationPerQues,
               isGameOver: false
          }

          let timer = setInterval(() => {
               if (this.state.start) {
                    return;
               }
              
               if (this.state.secondsLeft === 0) {
                    if (this.state.qNo > this.state.quizLength) {
                         this.setState({
                              ...this.state,
                              isGameOver: true
                         });
                         clearInterval(timer);
                         return;
                    }
                    this.setState({
                         ...this.state,
                         question: this.generateQuestions(this.state.question.ans),
                         qNo: this.state.qNo + 1,
                         secondsLeft: durationPerQues,
                         isGameOver: false
                    });
                    return;
               }
               this.setState({
                    ...this.state,
                    secondsLeft: this.state.secondsLeft - 1
               })
          }, 1000);

     }

     componentDidMount() {
          setTimeout(() => {
               let question = this.generateQuestions(this.state.initialNumber);
               this.setState({
                    ...this.state,
                    question: question,
                    start: false,
               });
          }, 2000);
     }

     generateQuestions(l) {
          let curr = Math.floor((Math.random() * 9));
          let op = operators[Math.floor(Math.random() * 4)];
          // if op is division then only allow numbers divisible by l
          if (op === '/' || op === '*') {
               curr = Math.floor(Math.random() * 9);
          }
          if (op === '/') {
               // loop while curr is not divisible by l and curr is not 0
               while (curr === 0) {
                    curr = Math.floor((Math.random() * 9));
               }
          }
          let ans = eval(l + op + curr);
          if (typeof ans === 'float') {
               ans = ans.toFixed(1);
          }
          return {
               'curr': curr,
               'op': op,
               'ans': ans
          };
     }

     getOperatorName(op) {
          switch (op) {
               case '+':
                    return 'Add';
               case '-':
                    return 'Subtract';
               case '*':
                    return 'Multiply';
               case '/':
                    return 'Divide';
               default:
                    return null;
          }
     }

     render() {
          let ques = this.state.question;
          let start = this.state.start ? <h1> Take {this.state.initialNumber} </h1> : null;
          let operator = !this.state.start ? <h2 id='operator'>{this.getOperatorName(ques['op'])}</h2> : null
          let answer = this.state.isGameOver ? <div>
               {this.state.userAns != null ? <h1>{this.state.userAns === ques.ans ? 'Right👌' : 'Try again😞'}</h1> : null}
               <AnswerInput onChange={(ans) => {
                    this.setState({
                         ...this.state,
                         userAns: parseFloat(ans)
                    })
               }}></AnswerInput>
          </div> : null;
          let question = !this.state.isGameOver ? <div className="question">
               {operator}
               {!this.state.start ? <h2 id='curr'>{ques['curr']}</h2> : null}
          </div> : null;
          return (
               <div className="App">
                    <h1>Math Cruncher</h1>
                    {start}
                    {answer}
                    {question}
                    <LinearProgress className='progress-bar' variant="determinate" value={this.state.secondsLeft / durationPerQues * 100} valueBuffer={3} />
               </div>
          );
     }
}


export default App;
