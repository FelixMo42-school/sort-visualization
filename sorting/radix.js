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

Array.prototype.sum = function() {
    return this.reduce((a, b) => (a + b), 0)
}

function getDigit(n, d) {
    let p = 10 ** d
  	return Math.floor(n / p) % 10
}

let buckets = [0,0,0,0,0,0,0,0,0,0]
let place = 0
let maxPlace = ("" + innerHeight).length

sortLoop = setInterval(() => {
    let digit = getDigit(data[num - 1], place)

    let index = buckets.slice(0, digit).sum()


    data.splice(index, 0, data.splice(num - 1, 1)[0])

    swap++
    buckets[digit]++

    if (buckets.sum() > num - 1) {
        place += 1

        if (place >= maxPlace) {
            return clearInterval(sortLoop)
        }

        buckets = [0,0,0,0,0,0,0,0,0,0]
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
        fill("white")
        let start = 0
        for (let bucket in buckets) {
            let size = buckets[bucket]
            if (i >= start && i < start + size) {
                fill(255 - bucket * 25, 255 - bucket * 25, bucket * 25)
            }
            start += size
        }

        if (place < maxPlace && i == num - 1) {
            fill("green")
        }

        rect(i * size, innerHeight, size, -data[i])
    }

    fill("black")
    textSize(20)
    text(`changes: ${swap}`, 10, 20)
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}