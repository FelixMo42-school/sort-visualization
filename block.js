const data = []
const num = 8
const delay = 1000

let compare = 0
let swap = 0

Array.prototype.shuffle = function() {
    print(this)
    for (let i = this.length - 1, r  = Math.floor(Math.random() * i); i > 0; i--, r = Math.floor(Math.random() * i)) {
        [this[r], this[i]] = [this[i], this[r]]
    }
}

let block = 0
let blockSize = 2
let pos = 0

let leftPos = 0
let rightPos = 0
let sorted = 0
let leftSorted = blockSize / 2
let rightSorted = blockSize / 2

function getIndex() {
    return block * blockSize + Math.floor(pos / 2) + (pos % 2) * blockSize / 2
}

function next() {
    pos += 1

    if (pos >= blockSize) {
        pos = 0
        sorted = 0
        block += 1
        if (block > data.length / blockSize) {
            block = 0
            blockSize *= 2
        }
        leftSorted = blockSize / 2
        lrightSorted = blockSize / 2
    }
}

sortLoop = setInterval(() => {
    if (blockSize > data.length) { return clearInterval(sortLoop) }

    let start = block * blockSize

    let leftIndex = start + leftPos
    let rightIndex = start + rightPos + blockSize / 2
    
    if (data[leftIndex] > data[rightIndex]) {
        data.splice(leftIndex, 0, data.splice(rightIndex, 1)[0])

        sorted++
        rightPos++
        leftSorted--
    } else {
        //data.splice(leftRight, 0, data.splice(start + sorted, 1)[0])

        sorted++
        leftPos++
    }

    if (leftPos >= blockSize / 2 || rightPos >= blockSize / 2) {
        console.log("hi")
        leftPos = 0
        rightPos = 0
        sorted = 0
        block += 1  

        if (block > data.length / blockSize) {
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

    let leftIndex = start + leftPos
    let rightIndex = start + rightPos + blockSize / 2

    for (let i = 0; i < num; i++) {
        fill("white")

        if (i >= blockSize * block && i < blockSize * (block + 1)) {
            fill("grey")
        }
        
        if (i === leftIndex || i === rightIndex) {
            fill("green")
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