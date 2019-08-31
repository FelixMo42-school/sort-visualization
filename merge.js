const data = []
const num = 64
const delay = 100

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
let done = 0

function getIndex() {
    return block * blockSize + Math.floor(pos / 2) + (pos % 2) * blockSize / 2
}

sortLoop = setInterval(() => {
    let start = block * blockSize

    let leftIndex = start + leftPos + sorted
    let rightIndex = start + rightPos + blockSize / 2
    
    if (data[leftIndex] > data[rightIndex]) {
        data.splice(leftIndex, 0, data.splice(rightIndex, 1)[0])

        rightPos++
        sorted++
    } else {
        leftPos++
    }

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

    /*fill("black")
    textSize(20)
    text(`blockSize: ${blockSize}`, 10, innerHeight - 30)
    text(`block: ${block}`, 10, innerHeight - 10)*/
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}