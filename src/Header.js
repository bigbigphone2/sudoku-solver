import { color } from "./config";
import { Sudoku } from "./util/solver";

function Button({text, gameInfo, setGameInfo}) {
    const handleOnClick = (text) => {
        switch(text){
            case "Solve By Backtracking":
                Sudoku.solve(gameInfo.board, gameInfo, setGameInfo);
                break;
        }
    }
    return (
        <button 
            style={{border: 'none', backgroundColor: 'transparent', fontSize: '20px', width: '100%', height: '50px', cursor: 'pointer'}} 
            onClick={()=>handleOnClick(text)}
        >
            {text}
        </button>
    );
}

function Header({gameInfo, setGameInfo, originalGameInfo}) {
    const handleBack = ()=> {
        setGameInfo(originalGameInfo)
    };
    return (
        <header style={{display: "flex", justifyContent: "center", alignItems: 'center', width: "100%", backgroundColor: color.lightBlue}}>
            {/* Back */}
            <div>
            <button
                style={{border: 'none', backgroundColor: color.blue, fontSize: '20px', width: '50px', height: '50px', cursor: 'pointer', fontWeight: 'bolder'}} 
                onClick={()=>handleBack()}
            >&#8592;</button>
            </div>
            {/* Solve */}
            <Button text={"Solve By Backtracking"} gameInfo={gameInfo} setGameInfo={setGameInfo}/>
        </header>
  );
}

export default Header;