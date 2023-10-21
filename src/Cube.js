import { color, style } from './config';
import { Sudoku } from './util/solver';

function Cube({num, row, col, gameInfo, setGameInfo}) {
    const {focusing, board, question} = gameInfo;

    const handleOnFocus = (e) => {
        setGameInfo({...gameInfo, focusing: [row, col]});
    }

    const handleOnBlur = (e) => {
        setGameInfo({...gameInfo, focusing: [-1, -1]});
    }



    const isProvidedNumber = question[row][col] === board[row][col];
    const isFocusing = focusing[0] === row && focusing[1] === col;
    const isFocusingValue = focusing[0] !== -1 && focusing[1] !== -1 && board[row][col] !== 0 && board[row][col] === board[focusing[0]][focusing[1]];

    const isVaildNumber = isProvidedNumber || Sudoku.valid(board, num, [row, col]);
    // const isNumberRelatedToInvalidNumber = Sudoku.isNumberRelatedToInvalidNumber(board, num, [row, col]);

    const isHighlightTop = [0, 3, 6].includes(row);
    const isHighlightBottom = [2, 5, 8].includes(row);
    const isHighlightLeft = [0, 3, 6].includes(col);
    const isHighlightRight = [8].includes(col);
    const cubeStyle = {
        width: style.width, 
        height: style.height, 
        display: 'flex', 
        justifyContent: "center", 
        alignItems: "center", 
        border: 'solid black',
        color: !isVaildNumber ? color.red : color.black,
        fontWeight: isProvidedNumber ? 'bold' : 'normal',
        borderWidth: `${isHighlightTop ? '2px' : '0.5px'} ${isHighlightRight ? '2px' : '0.5px'} ${isHighlightBottom ? '2px' : '0px'} ${isHighlightLeft ? '2px' : '0.5px'}`,
        backgroundColor: isFocusing 
                            ? color.blue
                            : isFocusingValue 
                                ? color.blue
                                : focusing[0] === row || focusing[1] === col ? color.lightBlue : 'transparent'
    }

    return (
        <div style={cubeStyle} onClick={handleOnFocus} onBlur={handleOnBlur}>
            {
                // num === 0 
                //     ?
                //     <input 
                //         style={{width: '60%', height: '60%', border: 'none'}}
                //         type="text"
                //         min="1" 
                //         max="9"
                //         title="Please enter a number from 1 to 9"
                //         value={inputValue}
                //         onChange={handleInputChange}
                //         // onFocus={handleOnFocus}
                //         onBlur={handleOnBlur}
                //         onKeyPress={handleEnterKey}
                //     />
                //     :
                    <div> {num === 0 ? '' : num} </div>
            }
        </div>
    );
}

export default Cube;
