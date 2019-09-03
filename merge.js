const params = (new URL(document.location)).searchParams;
const num = params.get('length')
const delay = params.get('delay')
const data = []

let compare = 0
let swap = 0

Array.prototype.shuffle = function() {
    for (let i = this.length - 1, r  = Math.floor(Math.random() * i); i > 0; i--, r = Math.floor(Math.random() * i)) {
        [this[r], this[i]] = [this[i], this[r]]
    }
}

let block = 0
let blockSize = 2

let leftPos = 0
let rightPos = 0

let sorted = 0
let done = 0

sortLoop = setInterval(() => {
    let start = block * blockSize

    let leftIndex = start + leftPos + sorted
    let rightIndex = start + rightPos + blockSize / 2
    
    if (data[leftIndex] > data[rightIndex]) {
        data.splice(leftIndex, 0, data.splice(rightIndex, 1)[0])

        rightPos++
        sorted++
        swap += 1
    } else {
        leftPos++
    }

    compare += 1

    if (rightPos >= blockSize / 2 || leftPos >= blockSize / 2) {
        leftPos = 0
        rightPos = 0
        sorted = 0
        block += 1

        if (block >= data.length / blockSize) {
            if (blockSize >= data.length) {
                done = true
                return clearInterval(sortLoop)
            }
            block = 0
            blockSize *= 2
        }
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

    let start = block * blockSize

    let leftIndex = start + leftPos + sorted
    let rightIndex = start + rightPos + blockSize / 2

    for (let i = 0; i < num; i++) {
        fill("white")

        if (i >= blockSize * block && i < blockSize * (block + 1)) {
            fill("grey")
        }
        
        if (i === leftIndex) {
            fill("red")
        }
        if (i === rightIndex) {
            fill("green")
        }

        if (done || (i >= start && i < leftIndex)) {
            fill("yellow")
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