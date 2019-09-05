const params = (new URL(document.location)).searchParams
const num =  10
const delay = 100
const data = []

let start = [0, 0]
let end = [num - 1, num - 1]

Array.prototype.loc = function(x, y) {
    return this[0] === x && this[1] === y
}

Array.prototype.dist = function(target) {
    return Math.sqrt((this[0] - target[0]) ** 2 + (this[1] - target[1]) ** 2)
}

let open = [{
    loc: start,
    cost: 0,
    dist: start.dist(end),
    total: start.dist(end)
}]
let closed = []

sortLoop = setInterval(() => {
        let current = false
        for (let node of open) {
            if (node.total < current.total) {
                current = node
            }
        }
        if (!current) {
            return clearInterval(sortLoop)
        }
        data[current.loc[0]][current.loc[1]] = -1

}, delay)

function setup() {
    createCanvas(innerWidth, innerHeight)

    for (let y = 0; y < num; y++) {
        data.push([])
        for (let x = 0; x < num; x++) {
            data[y].push(0)
        }
    }
}

function draw() {
    let size = Math.min(innerHeight, innerWidth) / num
    clear()

    for (let x = 0; x < num; x++) {
        for (let y = 0; y < num; y++) {
            fill("white")
            if ( data[x][y] == -1 ) {
                fill("red")
            }
            if ( start.loc(x, y) ) {
                fill("yellow")
            }
            if ( end.loc(x, y) ) {
                fill("green")
            }
            rect(x * size, y * size, size, size)
        }
    }
}