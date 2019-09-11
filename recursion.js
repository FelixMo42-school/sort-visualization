const delay = 100

const recs = {
    factorial: async (n) => {
        if (n == 1) { return 1 }
        return n * await rec(n - 1)
    },
    triangle: async (n) => {
        if (n == 0) { return 0 }
        return n + await rec(n - 1)
    },
    countHi: async (n) => {
        if (n.length == 1) { return 0 }
        if (n.substring(0,2) == "hi") {
            return 1 + await rec(n.substring(2))
        } else {
            return await rec(n.substring(1))
        }
    },
    sumDigits: async (n) => {
        if (n == 0) { return 0 }
        return n % 10 + await rec(Math.floor(n / 10))
    },
    count7: async (n) => {
        if (n == 0) { return 0 }
        return (n % 10 == 7 ? 1 : 0) + await rec(Math.floor(n / 10))
    },
    count11: async (n) => {
        if (n.length == 1) { return 0 }
        if (n.substring(0,2) == "11") {
            return 1 + await rec(n.substring(2))
        } else {
            return await rec(n.substring(1))
        }
    },
    stringClean: async (n) => {
        if (n.length <= 1) { return n }
        if (n[0] == n[1]) {
            return await rec( n.substring(1) )
        }
        return n[0] + await rec( n.substring(1) )
    }
}

function logRec(rec) {
    let i = 0

    return (...args) => {
        console.log("in", args)
        let column = document.getElementById("table").insertRow()
        column.insertCell().innerHTML = args[0]

        i += 1

        return new Promise((resolve) => {
            setTimeout(async () => {
                let out = await rec(...args)
                console.log("in", args, "out", out)
                setTimeout(async () => {
                    column.insertCell().innerHTML = out
                    resolve(out)
                }, delay)
            }, delay)
        })
    }
}

function go() {
    let func = document.getElementById("function").value
    let value = document.getElementById("value").value

    rec = logRec(recs[func])
    rec(value)
}