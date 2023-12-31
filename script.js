const gameBoard = (() => {
    let i = 0,
        j = 0,
        k = 0;
    const board = [];
    
    const x = ['0', '1', '2'];

    const y = ['0', '1', '2'];

    for (let i=0; i < 3; i++) {
        
        for (let j=0; j < 3; j++) {
            
            board.push(x[i]+y[j]);
        }
    }

    const display = document.querySelector('.displayGame');

    while (i < 3) {
        const row = document.createElement('div');

        row.classList.add('row');

        row.setAttribute('data-row', `${i}`);

        while(j < 3){
            const square = document.createElement('div');
    
            square.classList.add('square');
    
            square.setAttribute('data-coordinate', `${board[k]}`);
    
            row.appendChild(square);
    
            j++
            k++
        }

        display.appendChild(row);

        i++
        j = 0;
    }

    i = 0;
    k =0;
    return {board};
})();

const player = (name, piece) => {
    const getName = () => name;

    const getPiece = () => piece;

    const combination = [];

    return {getName, getPiece, combination}
}

const playerOne = player('Player 1', 'x');
const playerTwo = player('Player 2', 'o');

const winCondition = () => {
    let result,
        pOne = playerOne.combination,
        pTwo = playerTwo.combination;

    const displayResult = document.querySelector('.displayResult');

    const rightCombination = [["00", "01", "02"],
                              ["00", "10", "20"],
                              ["00", "11", "22"],
                              ["10", "11", "12"],
                              ["20", "21", "22"],
                              ["01", "11", "21"],
                              ["02", "12", "22"],
                              ["02", "11", "20"]];

    pOne.sort();
    pTwo.sort();
    
    rightCombination.forEach(combination => {
        
        if(pOne.length >= 3 && combination.every(item => pOne.includes(item))){
            result = 'Player 1 Won!';

            displayResult.textContent = result;
        }

        if(pTwo.length >= 3 && combination.every(item => pTwo.includes(item))){
            result = 'Player 2 Won!';

            displayResult.textContent = result;
        }
    })

    if(game.usedPieces.length >= gameBoard.board.length){
        result = "It's a Draw";

        displayResult.textContent = result;
    }

    return {result, rightCombination, pOne, pTwo};
};

const game = (() => {
    function empty(element) {
        playerOne.combination.length = 0;
        playerTwo.combination.length = 0;
        usedPieces.length = 0;
        result = undefined;
        key = false;
        
        element.replaceChildren(); 
    }
    
    let key = false;
    const usedPieces = [];

    const squares = document.querySelectorAll('.square');

    squares.forEach(element => {
        element.addEventListener('click', (e) => {
            if(winCondition().result !== undefined) {
                console.log('Game over');

            } else if(usedPieces.includes(e.target.dataset.coordinate)){
                console.log('already picked')

            } else {
                usedPieces.push(e.target.dataset.coordinate);
            
                if(key === true){
                    e.target.textContent = 'o';
                    
                    playerTwo.combination.push(e.target.dataset.coordinate);
                    
                    key = false;                       
    
                } else if(key === false){
                    e.target.textContent = 'x';
                    
                    playerOne.combination.push(e.target.dataset.coordinate);
                    
                    key = true;
                }

                winCondition();
            }
        })
    })

    const restart = document.querySelector('.restart');

    restart.addEventListener('click', () => {
        const clear = document.querySelectorAll('.square');

        clear.forEach(element => {
            empty(element)
        })

        const displayResult = document.querySelector('.displayResult');

        empty(displayResult);
    })

    return {usedPieces}
})();