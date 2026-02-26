import { useState } from 'react'
import './App.css'

function App() {


    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Clasic Tic Tac Toe</h1>
            <div className="bg-white p-8 rounded-xl shadow-lg">
                <Board />
                <ol></ol>
            </div>
        </div>
    )
}

function Square({ squareSymVal, onClick, isWinningSquare }) {
    return (
        <button
            key={squareSymVal === 'X' ? 'x' : squareSymVal === 'O' ? 'o' : 'empty'}
            className={`w-20 h-20 text-3xl font-bold border-2 rounded-lg 
                ${squareSymVal === 'X' ? 'text-red-500' : 'text-blue-500'} 
                ${!isWinningSquare && 'hover:bg-gray-100'} 
                transition-all duration-150
                bg-white ${isWinningSquare ? 'border-green-500 border-4 bg-green-50' : 'border-gray-300 bg-white'}`
            }
            onClick={onClick}>
            {squareSymVal}
        </button>
    )
}

function Board() {
    const [xPlayerTurn, setXplayerTurn] = useState(true);
    const [squareSym, setSquareSym] = useState(Array(9).fill(null));
    const { winner, winSquare } = calculateWinner(squareSym);
    let gameDone = checkGame(squareSym, winner);

    function handleClick(i) {
        const squareSymCopy = squareSym.slice();
        console.log(gameDone);
        console.log(Boolean(winner));
        if (squareSym[i] || winner) return;
        if (xPlayerTurn) {
            squareSymCopy[i] = "X"
            setSquareSym(squareSymCopy);
        } else {
            squareSymCopy[i] = "O"
            setSquareSym(squareSymCopy);;
        }
        setXplayerTurn(!xPlayerTurn);
    }

    return (
        <div>
            {
                gameDone === false && !winner ?
                    <div className="text-xl font-semibold text-blue-600 mb-6">
                        Turn: {xPlayerTurn ? "X" : "O"}
                    </div> :
                    gameDone === true && winner ?
                        <div className="text-xl font-semibold text-green-600 mb-6">
                            Winner: {winner}
                        </div> :
                        <div className="text-xl font-semibold text-yellow-600 mb-6">
                            DRAW
                        </div>
            }
            <div className="grid grid-cols-3 gap-2 mb-4">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => {
                    return <Square
                        key={index}
                        isWinningSquare={winSquare.includes(index)}
                        squareSymVal={squareSym[index]}
                        onClick={() => handleClick(index)} />
                }
                )}
            </div>

            <button onClick={() => {
                setSquareSym(Array(9).fill(null))
                setXplayerTurn(true);
            }}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-semibold">
                RESET GAME
            </button>
        </div>
    )
}

function calculateWinner(squareSym) {
    const winCon = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for (let i = 0; i < winCon.length; i++) {
        let [a, b, c] = winCon[i]
        if (squareSym[a] && squareSym[a] === squareSym[b] && squareSym[a] === squareSym[c]) {
            return { winner: squareSym[a], winSquare: [a, b, c] };
        }
    }
    return { winner: null, winSquare: [] };
}

function checkGame(squareSym, winner) {
    let done = false;
    if (squareSym.includes(null) && !winner) {
        done = false;
    } else {
        done = true;
    }
    return done;
}

export default App
