const params = (new URL(document.location)).searchParams
const num =  20
const delay = 100
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
    constructor({pos, parent=false}) {
        this.pos = pos
        this.x = pos[0]
        this.y = pos[1]

        this.dist = pos.dist(end)
        this.cost = this.dist
        if (parent) {
            this.cost += parent.cost + pos.dist(parent.pos)
        }

        this.parent = parent

        this.priority = this.dist + this.cost
    }
}

class Node2 {
    constructor({position}) {
        this.position = position
        this.x = position[0]
        this.y = position[1]


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

let map = new Map({num, num})

function astarV1() {
    let open = new Heap()

    function close(node) {
        data[node.x][node.y] = -2
    }

    function colorPath(node) {
        clearInterval(sortLoop)

        data[node.x][node.y] = 2
        while (node.parent) {
            node = node.parent
            data[node.x][node.y] = 2
        }
    }

    open.add(new Node({
        pos: start
    }))

    return () => {
        let current = open.pull()

        if (!current) {
            return clearInterval(sortLoop)
        }

        close(current)

        for (let x = current.x - 1; x <= current.x + 1; x++) {
            for (let y = current.y - 1; y <= current.y + 1; y++) {
                if (
                    x >= 0 && y >= 0 &&
                    x < num && y < num &&
                    !(x == 0 && y == 0) &&
                    data[x][y] >= 0
                ) {
                    if (end.loc(x, y)) {
                        return colorPath(current)
                    }

                    if (data[x][y] == 1) {
                        
                    }

                    open.add(new Node({pos: [x, y], parent: current}))
                    data[x][y] = 1
                }
            }
        }
    }
}

function astarV2() {
    let open = new Heap()

    function add(node, previous) {
        node.previous = previous
        node.cost = previous.cost + pos.dist(previous.pos)

        if (node.open) {
            open.update(node)
        } else {
            node.open = true
            node.dist = node.position.dist(end)
            open.add(node)
        }

        node.priority = node.cost + node.dist
    }

    open.add( map.get(start) )

    return () => {
        let current = open.pull()

        if (!current) {
            return clearInterval(sortLoop)
        }

        current.closed = true

        for (let x = current.x - 1; x <= current.x + 1; x++) {
            for (let y = current.y - 1; y <= current.y + 1; y++) {
                if (
                    x >= 0 && y >= 0 &&
                    x < num && y < num &&
                    !(x == 0 && y == 0) &&
                    !map.get([x, y]).closed
                ) {
                    add(map.get([x, y]))
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
            fill("grey")

            switch (data[x][y]) {
                case 2:
                    fill("pink"); break
                case -2:
                    fill("green"); break
                case -1:
                    fill("black"); break
                case 1:
                    fill("blue"); break
                default:
                    fill("grey")
            }
            rect(x * size, y * size, size, size)
        }
    }
}