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

    let bulk = 1
    if (game.rupgrades.includes(65)) bulk = 5
    if (game.rupgrades.includes(85)) bulk = 10
    if (game.rupgrades.includes(105)) bulk = 25
    bulk = Math.min(bulk, getTrialBulkAmount(game.inTrial).toNumber())

    game.trials[game.inTrial - 1] += bulk
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

/*
Trial Bulk Info

T1 | Start: 5e35, Increase: 1.25e107 (approx.)
T2 | Start: e175, Increase: e175
T3 | Start: e70, Increase: e105
T4 | Start: e900, Increase: e900
T5 | Start: e60, Increase: e120
T6 | Start: e4500, Increase: e1125
T7 | Start: e515, Increase: 4.641588833612374e171 (approx.)
T8 | Start: e8000, Increase: e1000
 */

function getTrialGoal(trial) {
    if (trial == 1) return new D(5e35).pow((game.trials[0] * 3) + 1)
    if (trial == 2) return new D(1e175).pow(game.trials[1] + 1)
    if (trial == 3) return new D(1e14).pow(((game.trials[2] * 1.5) + 1) * 5)
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

function getTrialBulkAmount(trial) {
    if (trial == 1) return D.affordGeometricSeries(game.z.amount, "5e35"  , "1.25e107"  , game.trials[0])
    if (trial == 2) return D.affordGeometricSeries(game.z.amount, "1e175" , "1e175"     , game.trials[1])
    if (trial == 3) return D.affordGeometricSeries(game.z.amount, "1e70"  , "1e105"     , game.trials[2])
    if (trial == 4) return D.affordGeometricSeries(game.z.amount, "1e900" , "1e900"     , game.trials[3])
    if (trial == 5) return D.affordGeometricSeries(game.z.amount, "1e60"  , "1e120"     , game.trials[4])
    if (trial == 6) return D.affordGeometricSeries(game.z.amount, "1e4500", "1e1125"    , game.trials[5])
    if (trial == 7) return D.affordGeometricSeries(game.z.amount, "1e515" , "4.6415e171", game.trials[6])
    if (trial == 8) return D.affordGeometricSeries(game.z.amount, "1e8000", "1e1000"    , game.trials[7])
    return 0
}