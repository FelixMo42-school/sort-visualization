class Heap {
    constructor(array=[]) {
        this.heap = [null]
    }

    add(node) {
        this.heap.push(node)

        let currentNodeIdx = this.heap.length - 1
        let currentNodeParentIdx = Math.floor(currentNodeIdx / 2)

        while (
            this.heap[currentNodeParentIdx] &&
            node.priority < this.heap[currentNodeParentIdx].priority
        ) {
            const parent = this.heap[currentNodeParentIdx]
            this.heap[currentNodeParentIdx] = node
            this.heap[currentNodeIdx] = parent
            currentNodeIdx = currentNodeParentIdx
            currentNodeParentIdx = Math.floor(currentNodeIdx / 2)
        }
    }

    pull() {
        if (this.heap.length < 3) {
            const toReturn = this.heap.pop()
            this.heap[0] = null
            return toReturn
        }

        const toRemove = this.heap[1]
        this.heap[1] = this.heap.pop()
        let currentIdx = 1
        let [left, right] = [2 * currentIdx, 2 * currentIdx + 1]
        let currentChildIdx = this.heap[right] && this.heap[right].priority <= this.heap[left].priority ? right : left
        while (this.heap[currentChildIdx] && this.heap[currentIdx].priority > this.heap[currentChildIdx].priority) {
          let currentNode = this.heap[currentIdx]
          let currentChildNode = this.heap[currentChildIdx]
          this.heap[currentChildIdx] = currentNode
          this.heap[currentIdx] = currentChildNode
        }
        return toRemove
    }

    test() {
        let min = this.heap[1].priority

        for (let i = 2; i < i.length; i++) {
            if (min > this.heap[i]) {
                console.warn("HEAP IS BROKEN")
            }
        }
    }
}