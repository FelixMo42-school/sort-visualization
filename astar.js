const params = (new URL(document.location)).searchParams
const num =  20
const delay = 1000
const data = []

let offset = 3
let start = [offset, offset]
let end = [num - offset - 1, num - offset - 1]

Array.prototype.loc = function(x, y) {
    return this[0] == x && this[1] == y
}

Array.prototype.dist = function(target) {
    return Math.sqrt((this[0] - target[0]) ** 2 + (this[1] - target[1]) ** 2)
}

class Node {
    constructor({position}) {
        this.position = position
        this.x = position[0]
        this.y = position[1]
        this.walkable = Math.random() > .1
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
                    position: [x, y]
                }))
            }
        }
    }

    get(position) {
        return this.nodes[position[0]][position[1]]
    }
}

let map = new Map({width: num, height: num})
map.get(start).onPath = true
map.get(end).onPath = true

function astarV2() {
    let open = new Heap()

    function add(node, previous) {
        if (node.open && node.previous.cost < previous.cost) {
            return
        }

        node.previous = previous
        node.cost = previous.cost + previous.position.dist(node.position)

        if (node.open) {
            open.update(node)
        } else {
            node.open = true
            node.dist = node.position.dist(end)
            open.add(node)
        }

        node.priority = node.cost + node.dist
    }

    map.get(start).cost = 0
    map.get(start).priority = start.dist(end)
    open.add( map.get(start) )

    function colorPath(node) {
        while ("previous" in node) {
            node.onPath = true
            node = node.previous
        }
    }

    return () => {
        open.test()
        let current = open.pull()

        if (!current) {
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

sortLoop = setInterval(astarV2(), delay)

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

            fill("black")
            textAlign(CENTER, CENTER)

            if ("priority" in node) {
                text(
                    Math.floor(node.priority * 100),
                    x * size + size / 2,
                    y * size + size / 2
                )
            }
        }
    }
}