const choiceCosts = [
    new D(1e12),
    new D(0),
    new D(1e13),
    new D(0),
    new D(1e16),
    new D(0),
    new D(5e17),
    new D(0),
    new D(5e25),
    new D(0),
    new D(1e29),
    new D(0)
]

function buyC(depth, choice) {
    if (game.choice.depth != depth - 1) return;
    if (choiceCosts[depth - 1].gt(game.rp.amount)) return;
    game.rp.amount = game.rp.amount.sub(choiceCosts[depth - 1])
    // regroup
    if (!choice) {
        game.choice.depth++;
        document.getElementById("c" + depth + "2").classList.remove("btn-creg-unbought")
        document.getElementById("c" + depth + "2").classList.add("btn-creg-bought")
        document.getElementById("c" + (depth + 1) + "1").classList.remove(`btn-cleft-locked`)
        document.getElementById("c" + (depth + 1) + "1").classList.add(`btn-cleft-unbought`)
        document.getElementById("c" + (depth + 1) + "2").classList.remove(`btn-cmid-locked`)
        document.getElementById("c" + (depth + 1) + "2").classList.add(`btn-cmid-unbought`)
        document.getElementById("c" + (depth + 1) + "3").classList.remove(`btn-cright-locked`)
        document.getElementById("c" + (depth + 1) + "3").classList.add(`btn-cright-unbought`)
    } else {
    // 1/3
        game.choice.depth++;
        game.choice.choices.push(choice)
        let sides = [null, "left", "mid", "right"]
        document.getElementById("c" + depth + choice).classList.remove(`btn-c${sides[choice]}-unbought`)
        document.getElementById("c" + depth + choice).classList.add(`btn-c${sides[choice]}-bought`)
        document.getElementById("c" + (depth + 1) + 2).classList.remove(`btn-creg-locked`)
        document.getElementById("c" + (depth + 1) + 2).classList.add(`btn-creg-unbought`)
        if (choice != 1) document.getElementById("c" + depth + 1).classList.remove("btn-cleft-unbought"),  document.getElementById("c" + depth + 1).classList.add("btn-cleft-locked")
        if (choice != 2) document.getElementById("c" + depth + 2).classList.remove("btn-cmid-unbought"),   document.getElementById("c" + depth + 2).classList.add("btn-cmid-locked")
        if (choice != 3) document.getElementById("c" + depth + 3).classList.remove("btn-cright-unbought"), document.getElementById("c" + depth + 3).classList.add("btn-cright-locked")
    }
    recalcProd()
}

function respec() {
    if (!game.rupgrades.includes(63)) return;
    if (game.inTrial != 0) {
        if (!confirm("Respeccing while in a trial will exit the trial. Are you sure you want to do this?")) {
            return;
        }
        exitTrial()
    }
    let refundAmt = new D(0)
    game.choice.choices.map((x, y) => refundAmt = refundAmt.add(choiceCosts[y*2]))
    game.rp.amount = game.rp.amount.add(refundAmt)
    game.choice.depth = 0
    game.choice.choices = []
    recalcProd()
    rebirth()
    wipeClass("btn-cleft-unbought", "btn-cleft-locked")
    wipeClass("btn-cmid-unbought", "btn-cmid-locked")
    wipeClass("btn-cright-unbought", "btn-cright-locked")
    wipeClass("btn-creg-unbought", "btn-creg-locked")
    wipeClass("btn-cleft-bought", "btn-cleft-locked")
    wipeClass("btn-cmid-bought", "btn-cmid-locked")
    wipeClass("btn-cright-bought", "btn-cright-locked")
    wipeClass("btn-creg-bought", "btn-creg-locked")
    let cleft = document.getElementById("c11")
    let cmid = document.getElementById("c12")
    let cright = document.getElementById("c13")
    cleft.classList.remove("btn-cleft-locked")
    cleft.classList.add("btn-cleft-unbought")
    cmid.classList.remove("btn-cmid-locked")
    cmid.classList.add("btn-cmid-unbought")
    cright.classList.remove("btn-cright-locked")
    cright.classList.add("btn-cright-unbought")
}

function wipeClass(rem, add) {
    let x = document.querySelectorAll("." + rem)
    x.forEach(y => {
        y.classList.remove(rem)
        y.classList.add(add)
    })
}