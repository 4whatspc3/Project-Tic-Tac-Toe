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
    
            square.textContent = `${board[k]}`;
    
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
    return {board, display};
})();

const player = (name, piece) => {
    const getName = () => name;

    const btn = document.querySelectorAll('button');

    btn.forEach(button => {
        button.addEventListener('click', (e) => {
            if(e.target.matches('.x')){
                piece = 'x';
                Object.assign(enemy, {piece : 'o'});
            }

            if(e.target.matches('.o')){
                piece = 'o';
                Object.assign(enemy, {piece : 'x'});
            }
        })
    });

    const getPiece = () => piece;

    const combination = [];

    const enemy = {
        name : 'Player 2',
        piece : 'o',
        combination : []
    }

    return {getName, getPiece, combination, enemy}
}

const playerOne = player('Player 1', 'x');

const game = (() => {
    let key = false;
    const usedPieces = [];

    const squares = document.querySelectorAll('.square');

    squares.forEach(element => {
        element.addEventListener('click', (e) => {
            if(usedPieces.includes(e.target.dataset.coordinate)){
                    console.log('already picked')
            } else {
                usedPieces.push(e.target.dataset.coordinate);
            
                if(key === true){
                    e.target.textContent = 'o';
                    
                    playerOne.enemy.combination.push(e.target.dataset.coordinate);
                    
                    key = false;
    
                } else if(key === false){
                    e.target.textContent = 'x';
                    
                    playerOne.combination.push(e.target.dataset.coordinate);
                    
                    key = true;
                }
            }
        })
    })

    return {squares, playerOne, usedPieces}
})();