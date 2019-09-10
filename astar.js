const params = (new URL(document.location)).searchParams
const num =  20
<<<<<<< HEAD:sorting/astar.js
const delay = 1000
const data = []
=======
const delay = 100
>>>>>>> db1d591ff0abba6f6343afc864b19a57e9774815:astar.js

let offset = 3
let start = [offset, offset]
let end = [num - offset - 1, num - offset - 1]

Array.prototype.loc = function(pos) {
    return this[0] == pos[0] && this[1] == pos[1]
}

Array.prototype.dist = function(target) {
    return Math.sqrt((this[0] - target[0]) ** 2 + (this[1] - target[1]) ** 2)
}

class Node {
<<<<<<< HEAD:sorting/astar.js
    constructor({position}) {
        this.position = position
        this.x = position[0]
        this.y = position[1]
        this.walkable = Math.random() > .1
=======
    constructor({position, walkable}) {
        this.position = position
        this.x = position[0]
        this.y = position[1]

        this.walkable = walkable
>>>>>>> db1d591ff0abba6f6343afc864b19a57e9774815:astar.js
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
<<<<<<< HEAD:sorting/astar.js
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
=======
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
>>>>>>> db1d591ff0abba6f6343afc864b19a57e9774815:astar.js

        if (node.open) {
            open.update(node)
        } else {
            node.open = true
            open.add(node)
        }
    }

    map.get(start).cost = 0
<<<<<<< HEAD:sorting/astar.js
    map.get(start).priority = start.dist(end)
=======
    map.get(start).priority = 0
>>>>>>> db1d591ff0abba6f6343afc864b19a57e9774815:astar.js
    open.add( map.get(start) )

    function colorPath(node) {
        while ("previous" in node) {
            node.onPath = true
            node = node.previous
        }
    }

    return () => {
<<<<<<< HEAD:sorting/astar.js
        open.test()
        let current = open.pull()
=======
        let current = open.pop()
>>>>>>> db1d591ff0abba6f6343afc864b19a57e9774815:astar.js

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

<<<<<<< HEAD:sorting/astar.js
sortLoop = setInterval(astarV2(), delay)
=======
sortLoop = setInterval(astar(), delay)
>>>>>>> db1d591ff0abba6f6343afc864b19a57e9774815:astar.js

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
<<<<<<< HEAD:sorting/astar.js
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
=======
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
>>>>>>> db1d591ff0abba6f6343afc864b19a57e9774815:astar.js
            }
        }
    }
}