/*
There are 100 doors in a row that are all initially closed.
You make 100 passes by the doors.

The first time through, visit every door and  toggle  the door  (if the door is closed,  open it;   if it is open,  close it).
The second time, only visit every 2nd door   (door #2, #4, #6, ...),   and toggle it.
The third time, visit every 3rd door   (door #3, #6, #9, ...), etc,   until you only visit the 100th door.

Task
Answer the question: What state are the doors in after the last pass?   Which are open, which are closed? 
*/

// const test = new Door(false)
// Create the doors
const doors = []

const doorCount = 100
for (let i = 0; i < doorCount; i++) {
    doors.push({
        isOpen: false,
    })
}

for (let passNumber = 1; passNumber <= 100; passNumber++) {
    // Do 100 passes
    for (let doorNumber = passNumber; doorNumber <= 100; doorNumber += passNumber) {
        doors[doorNumber - 1].isOpen = !doors[doorNumber - 1].isOpen
    }
}

// const doorStatus = doors.reduce((left, right) => {
//     if (typeof left === 'string') {
//         return left + ` | ${right.isOpen ? 'o' : 'x'}`
//     }

//     return `${left.isOpen ? 'o' : 'x'} | ${right.isOpen ? 'o' : 'x'}`
// })
const statuses = []
doors.forEach((door, index) => {
    statuses.push({
        door: index + 1,
        status: door.isOpen
            ? 'open'
            : 'closed',
    })
})

console.table(statuses)