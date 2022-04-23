import { useState } from "react";
import "./App.css";
const App = () => {
  const [turn, setTurn] = useState("X");
  const [cells, setCells] = useState(() =>Array(9).fill(""));
  const [winner, setWinner] = useState("");
  const checkWinner = (squares) => {
    const combos = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      bottom: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagonal: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };
    for (let combo in combos) {
      combos[combo].forEach((pattern) => {
        if (
          squares[pattern[0]] === squares[pattern[1]] &&
          squares[pattern[1]] === squares[pattern[2]]
        ) {
          setWinner(squares[pattern[0]]);
        }
      });
    }
  };
  const handleClick = (num) => {
    if (cells[num] !== "") {
      alert("already clicked");
      return;
    }
    const squares = [...cells];
    if (turn === "X") {
      squares[num] = "X";
      setTurn("O");
    } else {
      squares[num] = "O";
      setTurn("X");
    }
    checkWinner(squares);
    setCells(squares);
  };

  const restartGame = () => {
    setWinner(null);
    setCells(Array(9).fill(""));
  };
  return (
    <div className="container">
      Next Turn:{turn}
      <div className="grid-box">
        {cells.map((x,i)=>(
            <div key={i} onClick={() => handleClick(i)}>{cells[i]}</div>
        ))}
      </div>
      {winner && (
        <>
          {winner} is the winner
          <button onClick={() => restartGame()}>Play Again</button>
        </>
      )}
    </div>
  );
};

export default App;
