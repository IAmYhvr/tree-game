function rebirth() {
    // wooow
    if (calcRP().lt(1) || game.z.amount.lt(1) || document.getElementById(54).classList.contains("btn-locked")) return;
    game.rp.amount = game.rp.amount.add(calcRP())
    game.x.amount = (game.rupgrades.includes(21) ? new D(1e5) : new D(0))
    game.y.amount = (game.rupgrades.includes(31) ? new D(1e5) : new D(0))
    game.z.amount = (game.rupgrades.includes(41) ? new D(1e5) : new D(0))
    game.upgrades = [];
    ([13, 14, 16, 17,
    23, 24, 25, 26, 27,
    33, 34, 35, 36, 37,
    43, 44, 45, 46, 47,
    53, 54, 55, 56, 57]).forEach(u => {
        document.getElementById(u).classList.remove("btn-bought")
        document.getElementById(u).classList.add("btn-locked")
    })
    document.getElementById(15).classList.remove("btn-bought")
    document.getElementById(15).classList.add("btn-unbought")
    if (!game.rebirthed) {
        game.rebirthed = true
        document.querySelector("#rp").style.display = "inline-block"
        document.querySelector("#rebirth").style.display = "inline-block"
        updateRebirthUpgrades()
    }
}

function calcRP() {
    return new Decimal(game.z.amount.div(1e10).log10()).pow(1/2).floor().times(game.rupgrades.includes(24) ? 100 : 1).times(game.rupgrades.includes(34) ? 100 : 1).times(game.rupgrades.includes(44) ? 1e5 : 1)
}

// documentation somewhere around game.js:101
function buyreb(id) {
    let ele = document.getElementById("r" + id)
    let cost = new D(rebirthUpgradeInfo[id][1])
    if (game.rupgrades.includes(id)) return;
    if (cost.gt(game.rp.amount)) return;
    if (ele.classList.contains("btn-rebirth-locked")) return;
    game.rp.amount = game.rp.amount.sub(cost)
    ele.classList.remove("btn-rebirth-unbought")
    ele.classList.add("btn-rebirth-bought")
	game.rupgrades.push(id)
    if (rebirthChildList[id]) {
        rebirthChildList[id].forEach(id2 => {
            let ele2 = document.getElementById("r" + id2)
            ele2.classList.remove("btn-rebirth-locked")
            ele2.classList.add("btn-rebirth-unbought")
        })
    }
}