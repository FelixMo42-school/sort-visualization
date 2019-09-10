const params = (new URL(document.location)).searchParams
const num = params.get('length')
const delay = params.get('delay')
const data = []

let pos = 0
let unsorted = num

let compare = 0
let swap = 0

Array.prototype.shuffle = function() {
    for (let i = this.length - 1, r  = Math.floor(Math.random() * i); i > 0; i--, r = Math.floor(Math.random() * i)) {
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