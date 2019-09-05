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

function astarV1() {
    let open = new Heap()

    function add(pos, prev) {
        let dist = pos.dist(end)
        let cost = prev.cost + 1

        open.add({
            prev: prev,
            cost: cost,
            priority: cost + dist
        })
    }

    function close(pos) {
        data[pos[0]][pos[1]] = -1
    }

    open.add({
        pos: start,
        cost: 0,
        priority: start.dist(end)
    })

    return () => {
        let current = open.pull()

        if (!current) {
            return clearInterval(sortLoop)
        }

        close(current.pos)

        for (let x = current.pos[0] - 1; x <= current.pos[0] + 1; x++) {
            for (let y = current.pos[1] - 1; y <= current.pos[1] + 1; y++) {
                if ( x > 0 && y > 0 && data[x][y] !== -1 ) {
                    add([x, y], current)
                }
            }
        }
    }
}

sortLoop = setInterval(astarV1(), delay)

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
            /*if ( start.loc(x, y) ) {
                fill("yellow")
            }
            if ( end.loc(x, y) ) {
                fill("green")
            }*/
            rect(x * size, y * size, size, size)
        }
    }
}