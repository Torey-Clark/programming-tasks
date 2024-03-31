/*
The Problem

    100 prisoners are individually numbered 1 to 100
    A room having a cupboard of 100 opaque drawers numbered 1 to 100, that cannot be seen from outside.
    Cards numbered 1 to 100 are placed randomly, one to a drawer, and the drawers all closed; at the start.
    Prisoners start outside the room
        They can decide some strategy before any enter the room.
        Prisoners enter the room one by one, can open a drawer, inspect the card number in the drawer, then close the drawer.
        A prisoner can open no more than 50 drawers.
        A prisoner tries to find his own number.
        A prisoner finding his own number is then held apart from the others.

    If all 100 prisoners find their own numbers then they will all be pardoned. If any don't then all sentences stand.

The task

    Simulate several thousand instances of the game where the prisoners randomly open drawers
    Simulate several thousand instances of the game where the prisoners use the optimal strategy mentioned in the Wikipedia article, of:
        First opening the drawer whose outside number is his prisoner number.
        If the card within has his number then he succeeds otherwise he opens the drawer with the same number as that of the revealed card. (until he opens his maximum).

Show and compare the computed probabilities of success for the two strategies, here, on this page.
*/

const instances = 100000

const randomProbabilityOfSuccess = simulateRandomSelection(instances, false)

const optimalProbabilityOfSuccess = simulateOptimalSelection(instances)

function simulateRandomSelection(sampleSize, trueRandom = false) {
    let successes = 0

    for (let i = 0; i < sampleSize; i++) {
        const prisoners = Array.from({ length: 100, }, (_value, position) => {
            return position
        })
        shuffle(prisoners)
        // console.table(prisoners)
        const cabinents = Array.from({ length: 100, }, (_value, position) => {
            return position
        })
        shuffle(cabinents)

        let gameLost = false
        const maxPrisonerAttempts = 50
        let prisonerPos = 0
        while (prisonerPos < prisoners.length && !gameLost) {
            const prisonerNumber = prisoners[prisonerPos]

            const choices = Array.from({ length: 100, }, (_value, position) => {
                return position
            })
            shuffle(choices)
            
            let numberFound = false
            let prisonerAttempt = 0
            while (prisonerAttempt < maxPrisonerAttempts && !numberFound) {
                const randomCabinetPosition = (trueRandom)
                    ? Math.floor(Math.random() * 100)
                    : choices[prisonerAttempt]

                if (cabinents[randomCabinetPosition] === prisonerNumber) {
                    // console.debug(`Found number on attempt ${prisonerAttempt + 1}`)
                    numberFound = true
                }

                prisonerAttempt++
            }

            if (!numberFound) {
                gameLost = true
            }

            prisonerPos++
        }

        if (!gameLost) {
            successes++
            // console.debug(`Sample ${i + 1} succeed`)
        } else {
            // console.debug(`Sample ${i + 1} failed because of prisoner: ${prisonerPos + 1}`)
        }
    }

    console.debug(`${successes}/${sampleSize} (${Number(successes / sampleSize * 100).toFixed(2)}%) success rate for random selection.`)
}

function simulateOptimalSelection(sampleSize) {
    let successes = 0

    for (let i = 0; i < sampleSize; i++) {
        const prisoners = Array.from({ length: 100, }, (_value, position) => {
            return position
        })
        shuffle(prisoners)
        // console.table(prisoners)
        const cabinents = Array.from({ length: 100, }, (_value, position) => {
            return position
        })
        shuffle(cabinents)

        let gameLost = false
        const maxPrisonerAttempts = 50
        let prisonerPos = 0
        while (prisonerPos < prisoners.length && !gameLost) {
            const prisonerNumber = prisoners[prisonerPos]
            
            let numberFound = false
            let prisonerAttempt = 0
            let nextPos = prisonerNumber
            while (prisonerAttempt < maxPrisonerAttempts && !numberFound) {
                if ((nextPos = cabinents[nextPos]) === prisonerNumber) {
                    numberFound = true
                }

                prisonerAttempt++
            }

            if (!numberFound) {
                gameLost = true
            }

            prisonerPos++
        }

        if (!gameLost) {
            successes++
            // console.debug(`Sample ${i + 1} succeed`)
        } else {
            // console.debug(`Sample ${i + 1} failed because of prisoner: ${prisonerPos + 1}`)
        }
    }

    console.debug(`${successes}/${sampleSize} (${Number(successes / sampleSize * 100).toFixed(2)}%) success rate for optimal selection.`)
}

function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ]
    }
  }