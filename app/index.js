import Winner from './winner';
import ScoreBoard from './score-board';

(function(window) {
    const _init = ({container = '',cellHeight = 50, cellWidth = 50}) => {
        let gameBody = document.getElementById(container);
        if (gameBody === undefined) {
            gameBody = document.getElementsByTagName('body')[0]
        }

        let W = new Winner();

        let gameState = 0;
        let cellIndex = 0;
        let inputArray = [];

        const tbl = document.createElement('table');
        const tblBody = document.createElement('tbody');
        for (let i = 0; i < 3; i++) {
            let row = document.createElement('tr');
            for (let j = 0; j < 3; j++) {
                let cell = document.createElement('td');
                cell.setAttribute('width', cellWidth + 'px');
                cell.setAttribute('height', cellHeight + 'px');

                cell.setAttribute('index', (cellIndex++));
                cell.addEventListener("click", () => {
                    let index = cell.getAttribute('index');
                    if (inputArray[index] !== undefined || W.name) return;
                    let inputState = gameState % 2 ? 0 : 1;
                    let cellText = inputState == 1 ? 'X' : 'O';
                    cell.innerHTML = cellText;
                    inputArray[index] = inputState;
                    gameState++;
                    let winner = W.findWinner(inputArray);
                    if (winner.state == 0 || winner.state == 1) {
                        ScoreBoard.declareWinner(W);
                        ScoreBoard.drawScore(tbl, inputArray, winner);
                    }
                })

                // setting styles for table cells
                cell.style.textAlign = 'center';
                cell.style.cursor = 'pointer';
                cell.style.fontSize = (cellHeight * 0.4) + 'px';

                row.appendChild(cell);
            }
            tblBody.appendChild(row);
        }
        tbl.appendChild(tblBody);
        gameBody.appendChild(tbl);
        tbl.setAttribute('border', '1');

        // setting styles for table
        tbl.style.borderCollapse = 'collapse';
        tbl.style.border = '2px solid #000';
        tbl.style.height = 'auto';
        tbl.style.width = 'auto';
        tbl.style.margin = '20px auto';
    };
    window.Game = {
        init:_init
    }
})(window)