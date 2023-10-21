import Grid from './Grid';
import { useState } from 'react';
import Header from './Header';
import { color } from './config';
import { questions } from './question';
import { Sudoku } from './util/solver';

const originalGameInfo = {
  isStart: false,
  fail: 0,
  chance: 5,
  focusing: [-1,-1],
  board: null,
  question: null
};

function App() {
  const [gameInfo, setGameInfo] = useState(originalGameInfo);

  const handleOnClickLevel = (board) => {
    const boardCopy = structuredClone(board);
    const questionCopy = structuredClone(board);
    setGameInfo({...gameInfo, board: boardCopy, question: questionCopy, isStart: true});
  };
  const handleRetry = ()=> {
    setGameInfo({...gameInfo, fail: 0, focusing: [-1,-1], board: structuredClone(gameInfo.question)});
  };

  const handleOnClickNumber = (number) => {
    const row = gameInfo.focusing[0];
    const col = gameInfo.focusing[1];
    if (row === -1 || col === -1)
      return;
    const isProvidedNumber = gameInfo.question[row][col] !== 0;
    if (isProvidedNumber)
      return;
    const isValid = Sudoku.valid(gameInfo.board, number, [row,col]);
    if (! isValid){
      setGameInfo({...gameInfo, fail: gameInfo.fail + 1});
      return;
    }
    let newData = [...gameInfo.board];
    newData[row][col] = number;
    setGameInfo({...gameInfo, board: newData});
  }

  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: 'center', width: "100%", height: "97vh"}}>
      {
        gameInfo.isStart
          ?
            <div style={{border: '3px solid black', width: '350px', height: '630px'}}>
              {/* Header */}
              <Header gameInfo={gameInfo} setGameInfo={setGameInfo} originalGameInfo={originalGameInfo}/>
              {
                gameInfo.fail === gameInfo.chance 
                  ?
                  <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <div 
                      style={{display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: color.lightBlue, cursor: 'pointer', borderRadius: '10%', width: '80px', height: '30px', marginTop: '100px'}} 
                      onClick={()=>handleRetry()}
                    >
                      Retry
                    </div>
                  </div>
                  :
                  <div style={{display: "flex", flexDirection: "column", justifyContent: "center", margin: '30px'}}>
                    {/* Chance */}
                    <div style={{display: "flex"}}>
                      {Array.from({ length: gameInfo.fail }, (_, index) => (
                        <div key={index} style={{color: color.red, fontSize: '20px', marginRight: '3px'}}>&#10006;</div>
                      ))}
                      {Array.from({ length: gameInfo.chance - gameInfo.fail}, (_, index) => (
                        <div key={index} style={{color: color.lightBlue, fontSize: '20px', marginRight: '3px'}}>&#10006;</div>
                      ))}
                    </div>
                    {/* Grid */}
                    <Grid gameInfo={gameInfo} setGameInfo={setGameInfo}/>
                    {/* Number Pad */}
                    <div style={{display: "flex", justifyContent: 'space-between', alignItems: 'center', marginTop: '20px'}}>
                      {Array.from({ length: 9 }, (_, index) => (
                          <button 
                            key={index}
                            style={{color: color.darkBlue, fontSize: '20px', fontWeight: 'bolder', border: 'none', backgroundColor: 'transparent'}}
                            onClick={()=> handleOnClickNumber(index+1)}
                          >
                              {index + 1}
                          </button>
                      ))}
                    </div>
                  </div>
              }

            </div>
          :
          <div style={{display: "flex", justifyContent: "center", alignItems: 'center', flexDirection: 'column', width: '100%'}}>
            <h1>Sudoku</h1>
            <div style={{display: "flex", justifyContent: "space-evenly", alignItems: 'center', width: '80%', maxWidth: '300px'}}>
              {questions.map((question, index)=>{
                return(
                  <button
                    key={index}
                    style={{backgroundColor: 'transparent', width: '80px', height: '80px', borderRadius: '10%', cursor: 'pointer'}}
                    onClick={()=> handleOnClickLevel(question.board)}
                  >
                    {question.name}
                  </button>
                )
              })}
            </div>
          </div>
      }
    </div>
  );
}

export default App;
