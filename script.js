const game = (() => {
 
})();

const gameBoard = (() => {
    const board = [];
    
    const x = ['0', '1', '2'];

    const y = ['0', '1', '2'];

    for (let i=0; i < 3; i++) {
        
        for (let j=0; j < 3; j++) {
            
            board.push(x[i]+y[j]);
        }
    }

    return {board};
})();

const player = {
    
}
