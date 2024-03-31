const { Board, BoardEventsEmitter } = require('./_board')
const inquirer = require('inquirer')

class Game {
    #board = undefined
    constructor() {
        this.#board = new Board()

        // const doMove = setInterval(() => {
        //     const choice = Math.ceil(Math.random() * 4)
        //     switch (choice) {
        //         case 1:
        //             console.debug(`Moving Left`)
        //             this.#board.moveLeft()
        //             break
        //         case 2:
        //             console.debug(`Moving Right`)
        //             this.#board.moveRight()
        //             break
        //         case 3:
        //             console.debug(`Moving Up`)
        //             this.#board.moveUp()
        //             break
        //         case 4:
        //             console.debug(`Moving Down`)
        //             this.#board.moveDown()
        //             break
        //     }
        // }, 100)

        this.askForMove()

        BoardEventsEmitter.on('game-over', () => {
            console.debug('Game Over')
            // if (doMove) {
            //     clearInterval(doMove)
            // }
        })
        BoardEventsEmitter.on('game-won', () => {
            console.debug('Game Won')
            // if (doMove) {
            //     clearInterval(doMove)
            // }
        })
    }

    askForMove() {
        inquirer.prompt([
            {
                name: 'movement',
                type: 'list',
                message: `Which way to slide the tiles?`,
                choices: ['Left', 'Right', 'Up', 'Down']
            }
        ]).then((answers) => {
            switch (answers.movement) {
                case 'Left':
                    this.#board.moveLeft()
                    break
                case 'Right':
                    this.#board.moveRight()
                    break
                case 'Up':
                    this.#board.moveUp()
                    break
                case 'Down':
                    this.#board.moveDown()
                    break
            }

            this.askForMove()
        })
    }
}

module.exports = {
    Game,
}