

import { useState } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null)); // Tablero de 9 casillas
  const [isXNext, setIsXNext] = useState(true); // Para alternar entre X y O
  const [winner, setWinner] = useState(null); // Para mostrar el ganador
  const [gameStarted, setGameStarted] = useState(false); // Para controlar si el juego ha comenzado

  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // X or O
      }
    }
    return null;
  };

  const handleClick = (index) => {
    // Verificar si la celda ya está ocupada o si ya hay un ganador
    if (board[index] || winner) return;

    const newBoard = [...board]; // Copia del tablero
    newBoard[index] = isXNext ? "#" : "!";
    setBoard(newBoard); // Actualizar el tablero
    setIsXNext(!isXNext); // Cambiar turno

    const gameWinner = checkWinner(newBoard); // Verificar si hay ganador
    if (gameWinner) {
      setWinner(gameWinner); // Establecer al ganador
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null)); // Limpiar el tablero
    setWinner(null); // Limpiar el ganador
    setIsXNext(true); // Volver a X al inicio
  };

  const startGame = () => {
    setGameStarted(true); // Iniciar juego
  };

  return (
    <div>
      {!gameStarted ? (
        <div className="menu">
          <h1>Bienvenido a Yate-Ti</h1>
          <button className="start-btn" onClick={startGame}>
            <i className="fas fa-play"></i> Iniciar app
          </button>
        </div>
      ) : (
        <div>
          <div className="game-container">
            <h1>Yate-Ti</h1>
            <div className="game-board">
              {board.map((square, index) => {
                return (
                  <div
                    key={index}
                    className={`square ${square ? "taken" : ""}`}
                    onClick={() => handleClick(index)}
                    style={{
                      cursor: square || winner ? "not-allowed" : "pointer", // Cambiar el cursor si la casilla está ocupada
                    }}
                  >
                    {square}
                  </div>
                );
              })}
            </div>
            {winner && <div className="winner-message">{`Ganador ${winner}`}</div>}
            <button className="reset-btn" onClick={resetGame}>
              <i className="fas fa-undo"></i> Reiniciar app
            </button>
          </div>
        </div>
      )}
      <div className="footer">
        <p>
          <i className="hola"></i>&copy; Implementado por, Gustavo Carrasco.
        </p>
      </div>
    </div>
  );
}

export default App;
