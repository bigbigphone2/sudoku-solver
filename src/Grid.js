import { useState } from 'react';
import Cube from './Cube';
import { style } from './config';


function Row({row, y, gameInfo, setGameInfo}) {
    return (
        <div style={{display: "flex", height: style.height}}>
            {row.map((num, index) => 
                <Cube key={`${row}-${index}`} num={num} col={index} row={y} gameInfo={gameInfo} setGameInfo={setGameInfo}/>
            )}
        </div>
    );
}

function Grid({gameInfo, setGameInfo}) {
    return (
        <div>
            {gameInfo.board.map((row, index) => 
                <Row key={index} row={row} y={index} gameInfo={gameInfo} setGameInfo={setGameInfo}/>
            )}
        </div>
    );
}

export default Grid;
