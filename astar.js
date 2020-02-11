const params = (new URL(document.location)).searchParams
const num =  20
const delay = 100

let offset = 3
let start = [offset, offset]
let end = [num - offset - 1, num - offset - 1]

Array.prototype.loc = function(pos) {
    return this[0] == pos[0] && this[1] == pos[1]
}

Array.prototype.dist = function(target) {
    let dx = abs(this[0] - target[0])
    let dy = abs(this[1] - target[1])
    let D = 1
    let D2 = 1
    return D * (dx + dy) + (D2 - 2 * D) * min(dx, dy)
    // http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html

    // return Math.abs(this[0] - target[0]) + Math.abs(this[1] - target[1])
    // return Math.sqrt((this[0] - target[0]) ** 2 + (this[1] - target[1]) ** 2)
}

class Node {
    constructor({position, walkable}) {
        this.position = position
        this.x = position[0]
        this.y = position[1]

        this.walkable = walkable
    }
}

class Map {
    constructor({width, height}) {
        this.nodes = []

        this.width = width
        this.height = height

        for (let x = 0; x < this.width; x++) {
            this.nodes.push([])
            for (let y = 0; y < this.height; y++) {
                this.nodes[x].push(new Node({
                    position: [x, y],
                    walkable: Math.random() > .3
                }))
            }
        }
    }

    get(position) {
        return this.nodes[position[0]][position[1]]
    }
}

let map = new Map({width: num, height: num})
map.get(start).walkable = true
map.get(start).onPath = true
map.get(end).walkable = true
map.get(end).onPath = true

function astar() {
    let open = new Heap()

    function colorPath(node) {
        while ("previous" in node) {
            node.onPath = true
            node = node.previous
        }
    }

    function add(node, previous) {
        let cost = previous.cost + node.position.dist(previous.position)

        if (node.open && cost > node.cost) {
            return
        }

        node.previous = previous
        node.cost = previous.cost + node.position.dist(previous.position)
        node.dist = node.position.dist(end)
        node.priority = node.cost + node.dist

        if (node.open) {
            open.update(node)
        } else {
            node.open = true
            open.add(node)
        }
    }

    map.get(start).cost = 0
    map.get(start).priority = 0
    open.add( map.get(start) )

    function colorPath(node) {
        while ("previous" in node) {
            node.onPath = true
            node = node.previous
        }
    }

    return () => {
        let current = open.pop()

        if (!current) {
            return clearInterval(sortLoop)
        }

        if (current.position.loc(end)) {
            colorPath(current)
            return clearInterval(sortLoop)
        }

        current.closed = true

        if ( map.get(end).closed ) {
            colorPath(map.get(end))
            return clearInterval(sortLoop)
        }

        for (let x = current.x - 1; x <= current.x + 1; x++) {
            for (let y = current.y - 1; y <= current.y + 1; y++) {
                if (
                    x >= 0 && y >= 0 &&
                    x < map.width && y < map.height &&
                    !map.get([x, y]).closed &&
                    map.get([x, y]).walkable
                ) {
                    add(map.get([x, y]), current)
                }
            }
        }
    }
}

sortLoop = setInterval(astar(), delay)

function setup() {
    createCanvas(innerWidth, innerHeight)
}

function draw() {
    let size = Math.min(innerHeight, innerWidth) / num

    clear()

    for (let x = 0; x < map.width; x++) {
        for (let y = 0; y < map.height; y++) {
            let node = map.get([x, y])
            fill("grey")

            if (node.open) {
                fill("blue")
            }

            if (node.closed) {
                fill("green")
            }

            if (node.onPath) {
                fill("pink")
            }

            if (!node.walkable) {
                fill("black")
            }
            
            rect(x * size, y * size, size, size)

            if ("priority" in node) {
                fill("black")
                textAlign(CENTER, CENTER)
                text( Math.floor(node.priority * 100), x * size + size / 2, y * size + size / 2 )
            }
        }
    }
}