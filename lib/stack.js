class Heap {
    constructor() {
        this.heap = []
    }

    push(node) {
        
    }

    pull() {
        let min = this.heap[0]
        this.heap[0] = this.heap.pop()

        

        return min
    }

    update(val) {
        
    }

    test() {
        let min = this.heap[1].priority

        for (let i = 2; i < this.heap.length; i++) {
            if (min > this.heap[i].priority) {
                return console.warn("HEAP IS BROKEN")
            }
        }
        console.log("heap is working well")
    }
}