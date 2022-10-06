const gameButtons = document.querySelectorAll('.buttons');
const playerTurn = document.querySelector('.player-turn')
const winMessage = document.querySelector('.win')
const playerWon = document.querySelector('.player-won')
const restart = document.querySelector('.restart')
const reset = document.querySelector('.reset')
const xClass = 'x';
const oclass = 'o';
let playerX

// win combinations
const win = [
    [0, 1, 2],
    [3, 4, 2],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

gameButtons.forEach(game => {
    game.addEventListener('click', clickGame, {once: true})
})

restart.addEventListener('click', () => {
    window.location.reload()
})

reset.addEventListener('click', () => {
    window.location.reload()
})


function clickGame(e) {
    const game = e.target
    const currentPlay = playerX ? oclass : xClass; 
    placeMark(game, currentPlay)

    if (checkWin(currentPlay)) {
        endofGame(false)
    } else if (isDraw()) {
        endofGame(true)
    }

    switchTurns()
}

const placeMark = (game, currentPlay) => {
    game.classList.add(currentPlay)
}

const switchTurns = () => {
    playerX = !playerX

    if (playerX) {
        playerTurn.innerHTML = 'O'
    } else {
        playerTurn.innerHTML = 'X'
    }
}

const checkWin = (currentPlay) => {
    return win.some(combination => {
        return combination.every(index => {
            return gameButtons[index].classList.contains(currentPlay)
        })
    })
}

const endofGame = (draw) => {
    if (draw) {
        playerWon.innerHTML = 'DRAW'
    } else {
        playerWon.innerHTML = `${playerX ? 'O TAKES THE ROUND' : 'X TAKES THE ROUND'}`
    }
    winMessage.style.display = 'flex'
}

const isDraw = () => {
    return [...gameButtons].every(field => {
        return field.classList.contains(xClass) || field.classList.contains(oclass)
    })
}