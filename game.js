var game = {
    x: {
        amount: new OmegaNum(0)
    },
    upgrades: []
}

const childList = {
    15: [24, 25],
    24: [23]
}

function buybtn(id, cost, costCurr) {
    if (game.upgrades.includes(id)) return;
    if (cost.gt(game[costCurr].amount)) return;
    if (document.getElementById(id).classList.contains("btn-locked")) return;
    game[costCurr].amount = game[costCurr].amount.sub(cost)
    document.getElementById(id).classList.remove("btn-unbought")
    game.upgrades.push(id)
    if (childList[id]) {
        childList[id].forEach(el => {
            document.getElementById(el).classList.remove("btn-locked")
            document.getElementById(el).classList.add("btn-unbought")
        })
    }
}

function format(num) {
    if (num.lt(1e3)) return num.toString()
    exponent = num.log10().floor()
    mantissa = num.div(exponent.pow(10))
    return mantissa.toString() + "e" + exponent.toString()
}

function update() {
    document.querySelector("#x").textContent = "You have " + format(game.x.amount) + " x."
}

window.setInterval(() => {
        // Brute force. Yipee!
        var u = game.upgrades
        if (u.includes(15)) {
            let aTA = new OmegaNum(0);
            aTA = aTA.add(1)
            if (u.includes(24)) {
                aTA = aTA.add(4)
            }
            if (u.includes(14)) {
                aTa = aTA.add(20)
            }
            if (u.includes(23)) {
                aTA = aTA.pow(2)
            }
            game.x.amount = game.x.amount.add(aTA)
        }

        update()
}, 1000)