const data = []
const num = 64
const delay = 100

let compare = 0
let swap = 0

Array.prototype.shuffle = function() {
    for (let i = this.length - 1, r  = Math.floor(Math.random() * i); i > 0; i--, r = Math.floor(Math.random() * i)) {
        [this[r], this[i]] = [this[i], this[r]]
    }
}

let pos = 1
let target = 0

let sortLoop = setInterval(() => {
    compare++
    if (data[target] > data[pos]) {
        data.splice(target, 0, data.splice(pos, 1)[0])
        swap++

        pos += 1
        target = 0
    } else {
        target ++
    }
    
    if (target === pos) {
        pos += 1
        target = 0
    }

    if (pos === num) {
        clearInterval(sortLoop)
    }
}, delay)

function setup() {
    createCanvas(innerWidth, innerHeight)
    
    for (let i = 1; i <= num; i++) {
        data.push(Math.floor(i / num * (innerHeight - 10)))
    }

    data.shuffle()
}

function draw() {
    let size = innerWidth / num

    clear()

    for (let i = 0; i < num; i++) {
        if (i === pos) {
            fill("green")
        } else if (i === target) {
            fill("red")
        } else {
            fill("white")
        }

        rect(i * size, innerHeight, size, -data[i])
    }

    fill("black")
    textSize(20)
    text(`comparison: ${compare}`, 10,  40)
    text(`changes: ${swap}`, 10, 20)
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}