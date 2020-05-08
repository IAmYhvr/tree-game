function unlockTrialTree() {
    if ($("#c122").classList.contains("btn-creg-locked")) return;
    if (game.trialTreeUnlocked) return;
    if (game.rp.amount.lt(1e32)) return;
    game.rp.amount = game.rp.amount.sub(1e32)
    game.trialTreeUnlocked = true;
    $("#trial").style.display = "inline-block"
}

function enterTrial(t) {
    if (game.inTrial != 0) return;
    game.inTrial = t;
    game.upgrades = [];
    game.x.amount = new D(0);
    game.y.amount = new D(0);
    game.z.amount = new D(0);
    wipeClass("btn-unbought", "btn-locked")
    wipeClass("btn-bought",   "btn-locked")
    document.getElementById("15").classList.add("btn-unbought")
    document.getElementById("15").classList.remove("btn-locked")
    updateUpgrades()
}

function completeTrial() {
    if (game.inTrial == 0) return;
    if (game.z.amount.lt(getTrialGoal(game.inTrial))) return;
    game.trials[game.inTrial - 1]++
    game.inTrial = 0
    game.upgrades = [];
    game.x.amount = new D(0);
    game.y.amount = new D(0);
    game.z.amount = new D(0);
    wipeClass("btn-unbought", "btn-locked")
    wipeClass("btn-bought",   "btn-locked")
    document.getElementById("15").classList.add("btn-unbought")
    document.getElementById("15").classList.remove("btn-locked")
    updateUpgrades()
    updateTrialTree()
}

function exitTrial() {
    if (game.inTrial == 0) return;
    game.inTrial = 0;
    game.upgrades = [];
    game.x.amount = new D(0);
    game.y.amount = new D(0);
    game.z.amount = new D(0);
    wipeClass("btn-unbought", "btn-locked")
    wipeClass("btn-bought",   "btn-locked")
    document.getElementById("15").classList.add("btn-unbought")
    document.getElementById("15").classList.remove("btn-locked")
    updateUpgrades()
}

function getTrialGoal(trial) {
    if (trial == 1) return new D(5e35).pow((game.trials[0] * 2) + 1)
    if (trial == 2) return new D(1e175).pow(game.trials[1] + 1)
    if (trial == 3) return new D(1e14).pow(((game.trials[2]) + 1) * 5)
    if (trial == 4) return new D("1e900").pow(game.trials[3] + 1)
    if (trial == 5) return new D(1e60).pow((game.trials[4] * 2) + 1)
    if (trial == 6) return new D("1e4500").pow((game.trials[5] / 4) + 1)
    if (trial == 7) return new D("1e515").pow((game.trials[6] / 3) + 1)
    if (trial == 8) return new D("1e8000").pow((game.trials[7] / 8) + 1)
    if (true) return "∞"
}

function getTrialReward(trial) {
    if (trial > 0 && trial < 9 && game.rupgrades.includes(35)) return new D(1e25).pow(game.trials[trial - 1])
    if (trial > 0 && trial < 9 && game.rupgrades.includes(15)) return new D(1e15).pow(game.trials[trial - 1])
    if (trial > 0 && trial < 9) return new D(1e10).pow(game.trials[trial - 1])
    return 1
}