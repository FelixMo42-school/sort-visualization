const params = (new URL(document.location)).searchParams;
const num = params.get('length')
const delay = params.get('delay')
const data = []

Array.prototype.shuffle = function() {
    for (let i = this.length - 1, r  = Math.floor(Math.random() * i); i > 0; i--, r = Math.floor(Math.random() * i)) {
        [this[r], this[i]] = [this[i], this[r]]
    }
}

let heap = []
let unsorted = num - 1

let compare = 0
let swap = 0

for (let i = Math.floor(num / 2); i >= 0; i -= 1) {
    heap.unshift(i)
}


sortLoop = setInterval(() => {
    if (heap.length) {
        let base = heap.pop()
        let max = base

        let left = 2 * base + 1
        let right = 2 * base + 2

        compare++

        if (left <= unsorted && data[left] > data[max]) {
            max = left
        }

        if (right <= unsorted && data[right] > data[max]) {
            max = right
        }

        if (base != max) {
            swap++
            [data[base], data[max]] = [data[max], data[base]]
            heap.push(max)
        }
    } else {
        swap++
        [data[0], data[unsorted]] = [data[unsorted], data[0]]
        unsorted--
        if (unsorted == 0) {
            unsorted = -1
            clearInterval(sortLoop)
        } else {
            heap.push(0)
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

    let base = heap.slice(-1).pop()
    let left = 2 * base + 1
    let right = 2 * base + 2

    for (let i = 0; i < num; i++) {
        fill("white")
        if ( i == base ) {
            fill("blue")
        }
        if ( i == right || i == left) {
            fill("green")
        }
        if ( i > unsorted ) {
            fill("gold")
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