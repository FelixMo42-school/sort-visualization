const data = []
const num = 100
const delay = 10

let pos = 0
let unsorted = num

let compare = 0
let swap = 0

Array.prototype.shuffle = function() {
    for (let i = this.length, r; i > 0; i--, r = Math.floor(Math.random() * i)) {
        [this[r], this[i]] = [this[i], this[r]]
    }
}

sortLoop = setInterval(() => {
    compare += 1
    if (data[pos] > data[pos + 1]) {
        [data[pos + 1], data[pos]] = [data[pos], data[pos + 1]]
        swap += 1
    }

    pos++
    if (pos > unsorted) {
        pos = 0
        unsorted--
    }

    if (unsorted === 0) {
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
        if (i >= unsorted) {
            fill("gold")
        } else if (pos === i || pos + 1 === i) {
            if (data[pos] > data[pos + 1]) {
                fill("red")
            } else {
                fill("green")
            }
        } else {
            fill("white")
        }

        rect(i * size, 0, size, data[i])
    }

    fill("white")
    textSize(20)
    text(`compare: ${compare}`, 10, innerHeight - 30)
    text(`swap: ${swap}`, 10, innerHeight - 10)
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}