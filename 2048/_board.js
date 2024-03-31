const events = require('node:events')
const eventEmitter = new events.EventEmitter()

class Board {
    #board = []
    constructor() {
        this.#board = [
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null],
        ]

        this.generateTile()
    }

    moveUp() {
        const boardState = JSON.stringify(this.#board)
        for (let colIndex = 0; colIndex < 4; colIndex++) {
            const newTiles = []
            for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
                // Merge any cells that can be merged
                const tileValue = this.#board[rowIndex][colIndex]
                this.#board[rowIndex][colIndex] = null
                if (tileValue !== null) {
                    const newTilesCount = newTiles.length
                    if (
                        newTilesCount > 0 && // We found a previous tile...
                        !newTiles[newTilesCount - 1].hasMerged && // that hasn't been merged yet
                        newTiles[newTilesCount - 1].value === tileValue // and has the same value
                    ) {
                        newTiles[newTilesCount - 1].value *= 2
                        newTiles[newTilesCount - 1].hasMerged = true
                        if (tileValue * 2 === 2048) {
                            eventEmitter.emit('game-won')
                        }
                    } else {
                        newTiles.push({
                            value: tileValue,
                            hasMerged: false,
                        })
                    }
                }
            }

            newTiles.forEach((tile, newRowIndex) => {
                this.#board[newRowIndex][colIndex] = tile.value
            })
        }

        if (boardState !== JSON.stringify(this.#board)) {
            this.generateTile()
        }
    }

    moveDown() {
        const boardState = JSON.stringify(this.#board)
        for (let colIndex = 0; colIndex < 4; colIndex++) {
            const newTiles = []
            for (let rowIndex = 3; rowIndex >= 0; rowIndex--) {
                // Merge any cells that can be merged
                const tileValue = this.#board[rowIndex][colIndex]
                this.#board[rowIndex][colIndex] = null
                if (tileValue !== null) {
                    const newTilesCount = newTiles.length
                    if (
                        newTilesCount > 0 && // We found a previous tile...
                        !newTiles[newTilesCount - 1].hasMerged && // that hasn't been merged yet
                        newTiles[newTilesCount - 1].value === tileValue // and has the same value
                    ) {
                        newTiles[newTilesCount - 1].value *= 2
                        newTiles[newTilesCount - 1].hasMerged = true
                        if (tileValue * 2 === 2048) {
                            eventEmitter.emit('game-won')
                        }
                    } else {
                        newTiles.push({
                            value: tileValue,
                            hasMerged: false,
                        })
                    }
                }
            }

            newTiles.forEach((tile, newRowIndex) => {
                this.#board[3 - newRowIndex][colIndex] = tile.value
            })
        }

        if (boardState !== JSON.stringify(this.#board)) {
            this.generateTile()
        }
    }

    moveLeft() {
        const boardState = JSON.stringify(this.#board)
        for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
            const newTiles = []
            for (let colIndex = 0; colIndex < 4; colIndex++) {
                // Merge any cells that can be merged
                const tileValue = this.#board[rowIndex][colIndex]
                this.#board[rowIndex][colIndex] = null
                if (tileValue !== null) {
                    const newTilesCount = newTiles.length
                    if (
                        newTilesCount > 0 && // We found a previous tile...
                        !newTiles[newTilesCount - 1].hasMerged && // that hasn't been merged yet
                        newTiles[newTilesCount - 1].value === tileValue // and has the same value
                    ) {
                        newTiles[newTilesCount - 1].value *= 2
                        newTiles[newTilesCount - 1].hasMerged = true
                        if (tileValue * 2 === 2048) {
                            eventEmitter.emit('game-won')
                        }
                    } else {
                        newTiles.push({
                            value: tileValue,
                            hasMerged: false,
                        })
                    }
                }
            }

            newTiles.forEach((tile, newColIndex) => {
                this.#board[rowIndex][newColIndex] = tile.value
            })
        }

        if (boardState !== JSON.stringify(this.#board)) {
            this.generateTile()
        }
    }

    moveRight() {
        const boardState = JSON.stringify(this.#board)
        for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
            const newTiles = []
            for (let colIndex = 3; colIndex >= 0; colIndex--) {
                // Merge any cells that can be merged
                const tileValue = this.#board[rowIndex][colIndex]
                this.#board[rowIndex][colIndex] = null
                if (tileValue !== null) {
                    const newTilesCount = newTiles.length
                    if (
                        newTilesCount > 0 && // We found a previous tile...
                        !newTiles[newTilesCount - 1].hasMerged && // that hasn't been merged yet
                        newTiles[newTilesCount - 1].value === tileValue // and has the same value
                    ) {
                        newTiles[newTilesCount - 1].value *= 2
                        newTiles[newTilesCount - 1].hasMerged = true
                        if (tileValue * 2 === 2048) {
                            eventEmitter.emit('game-won')
                        }
                    } else {
                        newTiles.push({
                            value: tileValue,
                            hasMerged: false,
                        })
                    }
                }
            }

            newTiles.forEach((tile, newColIndex) => {
                this.#board[rowIndex][3 - newColIndex] = tile.value
            })
        }

        if (boardState !== JSON.stringify(this.#board)) {
            this.generateTile()
        }
    }

    areMovesAvailable() {
        // If there are any empty cells, there are moves
        // console.table(this.#board.flat())
        if (this.#board.flat().some((cell) => {
            return cell === null
        })) {
            // console.debug('board not empty')
            // process.exit(1)
            return true
        }

        // The board is full.
        // Are any neighboring cells the same value
        // We only check if a cell can be merged with a neighbor above or to the left.
        //  If there is any cell that can be merged to the right, then the cell to the right can also merge left
        //  If there is any cell that can be merged down, then the cell below can also merge up.
        //  The user can decide which direction they want to merge.
        for (let rowIndex = 1; rowIndex < 4; rowIndex++) {
            for (let colIndex = 1; colIndex < 4; colIndex++) {
                if (
                    colIndex - 1 >= 0 &&
                    this.#board[rowIndex][colIndex - 1] === this.#board[rowIndex][colIndex]
                ) {
                    // console.debug('can move horizontally')
                    return true
                }

                if (
                    rowIndex - 1 >= 0 &&
                    this.#board[rowIndex - 1][colIndex] === this.#board[rowIndex][colIndex]
                ) {
                    // Can we merge with the tile above
                    // console.debug('can move vertically')
                    return true
                }
            }
        }

        // console.debug('no moves available')
        return false
    }

    generateTile() {
        const emptyPositions = []
        this.#board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (cell === null) {
                    emptyPositions.push({
                        row: rowIndex,
                        col: colIndex,
                    })
                }
            })
        })

        // Generate a new four tile 10% of the time
        const generateFourTile = Math.ceil(Math.random() * 10) === 10

        const value = generateFourTile
            ? 4
            : 2

        const slotForTile = emptyPositions.length > 1
            ? emptyPositions[Math.floor(Math.random() * emptyPositions.length)]
            : emptyPositions[0]

        this.#board[slotForTile.row][slotForTile.col] = value

        if (!this.areMovesAvailable()) {
            eventEmitter.emit('game-over')
        }
        this.toString()
    }

    toString() {
        console.table(this.#board)
    }
}

module.exports = {
    Board: Board,
    BoardEventsEmitter: eventEmitter
}