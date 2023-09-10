const game = (() => {
    //tabuleiro
    //turnos
        //quem começa
        //quando acaba
    //coordenada p/turno
})();

const gameBoard = (() => {
    let i = 0;
    const board = [];
    
    const x = ['0', '1', '2'];

    const y = ['0', '1', '2'];

    for (let i=0; i < 3; i++) {
        
        for (let j=0; j < 3; j++) {
            
            board.push(x[i]+y[j]);
        }
    }

    const display = document.querySelector('.container');

    while(i < board.length){
        const square = document.createElement('div');

        square.classList.add('square');

        square.setAttribute('data-coordinate', `${board[i]}`);

        square.setAttribute('style', `border: 1px solid blue;
                                      padding: 20px;`);

        square.textContent = `${board[i]}`;

        display.appendChild(square);

        i++
    }

    i = 0;

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

    const enemy = {
        name : 'Player 2',
        piece : 'o'
    }

    return {getName, getPiece, enemy}
}

const playerOne = player('Player 1', 'x');

