export class Sudoku{
    static valid(board, num, position){
        // check row
        for (let i=0; i<board[0].length; i++){
            if ((board[position[0]][i] === num) && (position[1] != i)){
                return false;
            }
        }
        // check column
        for (let i=0; i<board.length; i++){
            if ((board[i][position[1]] === num) && (position[0] != i)){
                return false;
            }
        }
        // check box
        const box_x = Math.floor(position[1]/3);
        const box_y = Math.floor(position[0]/3);
        for (let i=box_y*3; i<box_y*3+3; i++){
            for (let j=box_x * 3; j<box_x*3 + 3; j++){
                if ((board[i][j] == num) && (position[0] != i && position[j] != j)){
                    return false;
                }
            }
        }
        return true;
    };

    static async solve(board, gameInfo, setGameInfo){
        await sleep();
        const boardCopy = [...board];
        const {isSolved, cube} = this.findEmptySpace(boardCopy);
        if (isSolved)
            return boardCopy;
        const row = cube[0];
        const col = cube[1];
        for (let i=1; i<=9; i++){
            if (this.valid(boardCopy, i, cube)){
                boardCopy[row][col] = i;
                setGameInfo({...gameInfo, board: boardCopy});
                if (await this.solve(boardCopy, gameInfo, setGameInfo)){
                    return true;
                }
                boardCopy[row][col] = 0;
                setGameInfo({...gameInfo, board: boardCopy});
            }
        }
        return false;
    }

    static findEmptySpace(board){
        for (let i=0; i<board.length; i++){
            for (let j=0; j<board[0].length; j++){
                if (board[i][j] === 0){
                    return {isSolved: false, cube: [i, j]};
                }
            }
        }
        return {isSolved: true, cube: null};
    }
}

function sleep() {
    return new Promise((resolve) => setTimeout(resolve, 2));
}