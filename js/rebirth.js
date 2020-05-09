function rebirth() {
    // wooow
    if (game.inTrial != 0) return;
    if (calcRP().lt(1) || game.z.amount.lt(1) || document.getElementById(54).classList.contains("btn-locked")) return;
    game.rp.amount = game.rp.amount.add(calcRP())
    game.x.amount = (game.rupgrades.includes(21) ? new D(1e5) : new D(0))
    game.y.amount = (game.rupgrades.includes(21) ? new D(1e5) : new D(0))
    game.z.amount = (game.rupgrades.includes(21) ? new D(1e5) : new D(0))
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
    if (game.z.amount.lt(1e11)) return new D(0)
    let mult1 = game.rupgrades.includes(24) ? 50 : 1,
        mult2 = game.rupgrades.includes(34) ? 100 : 1,
        mult3 = game.rupgrades.includes(44) ? 1e5 : 1,
        xmult = D.max(1, new D(game.x.amount.div(1e20).log10()).pow(1/(game.choice.choices[1] == 1 || game.choice.choices[1] == 3 ? 2 : 4) /* 4th root */).floor()),
        ymult = D.max(1, new D(game.y.amount.div(1e15).log10()).pow(1/(game.choice.choices[1] == 1 || game.choice.choices[1] == 2 ? 2 : 3)).floor()),
        zmult = D.max(1, game.choice.choices[1] == 2 || game.choice.choices[1] == 3 ? game.z.amount.log10() : 1),
        _4mult= 1,
        x2mult= game.choice.choices[4] == 1 ? new D(game.x.amount.log10()) : 1,
        y2mult= game.choice.choices[4] == 2 ? new D(game.y.amount.log10()) : 1,
        z2mult= game.choice.choices[4] == 3 ? new D(game.z.amount.log2()) : 1,
        tr    = [0,1,2,3,4,5,6,7].map(n => Math.max(1, game.trials[n] * 10)),
        tm    = new D(1);
    tr.map(x => tm = tm.mul(x))
    if (game.choice.choices[3] == 1) _4mult = 100 ** game.choice.choices.filter(x => x == 3).length
    if (game.choice.choices[3] == 2) _4mult = 100 ** game.choice.choices.filter(x => x == 2).length
    if (game.choice.choices[3] == 3) _4mult = 100 ** game.choice.choices.filter(x => x == 1).length
    return new D(game.z.amount.div(game.choice.choices[0] == 1 ? 1 : 1e10).log10())
        .pow((game.choice.choices[0] == 2 ? 3/4 : 1/2)).floor()
        .times(mult1).times(mult2).times(mult3)
        .times(game.rupgrades.includes(31) ? xmult : 1)
        .times(game.rupgrades.includes(41) ? ymult : 1)
        .times(zmult).times(_4mult)
        .times(x2mult).times(y2mult).times(z2mult)
        .times(tm)
        .pow(game.rupgrades.includes(45) ? 2 : 1)
        .times(game.rupgrades.includes(55) ? D.max(new D(game.rp.amount.log10()), 1) : 1)
        .times(game.rupgrades.includes(75) ? D.max(new D(game.rp.amount.log2()), 1) : 1)
        .times(game.rupgrades.includes(95) ? D.max(new D(game.rp.amount.pow(.1)), 1) : 1)
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
    if (rebirthChildList[id] && id != 63) {
        rebirthChildList[id].forEach(id2 => {
            let ele2 = document.getElementById("r" + id2)
            ele2.classList.remove("btn-rebirth-locked")
            ele2.classList.add("btn-rebirth-unbought")
        })
    }
    if (id == 63) {
        document.getElementById("c11").classList.remove("btn-cleft-locked")
        document.getElementById("c11").classList.add("btn-cleft-unbought")
        document.getElementById("c12").classList.remove("btn-cmid-locked")
        document.getElementById("c12").classList.add("btn-cmid-unbought")
        document.getElementById("c13").classList.remove("btn-cright-locked")
        document.getElementById("c13").classList.add("btn-cright-unbought")
    }
    recalcProd()
}