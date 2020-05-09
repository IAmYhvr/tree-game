const defaultGame = {
    x: {
        amount: new D(0)
    },
    y: {
        amount: new D(0)
    },
    z: {
        amount: new D(0)
    },
    rp: {
        amount: new D(0)
    },
    upgrades: [],
    rupgrades: [],
    choice: {
        depth: 0,
        choices: []
    },
    theme: 0,
    notation: 0,
    tab: [0, 0],
    rebirthed: false,
    trialTreeUnlocked: false,
    inTrial: 0,
    trials: new Array(8).fill(0), // __only__ store completions, rest can be done with m a f s
    lastTick: Date.now(),
    version: 8
}

game = defaultGame

var prodInfo = {x: new D(0), y: new D(0), z: new D(0)}

function recalcProd() {
    let u = game.upgrades
    let r = game.rupgrades
    let c = game.choice.choices
    let t = game.inTrial
    let choiceBroken = (t == 1 || t == 3 || t == 7)
    if ((choiceBroken && t != 7) || t == 4) r = []
    if (choiceBroken) c = []
    if (t == 7) r = r.filter(x => x < 40)
    prodInfo = {x: new D(0), y: new D(0), z: new D(0)}

    if (u.includes(15)) {
        let ata = new D(1)

        if (u.includes(14)) ata = ata.add(25)
        if (u.includes(16)) ata = ata.add(10)
        if (c[5] == 1) ata = ata.times(1e25)
        if (u.includes(13)) ata = ata.pow(1.5)
        if (u.includes(23)) ata = ata.times(10)
        if (u.includes(24)) ata = ata.pow(2)
        if (u.includes(25)) ata = ata.add(5)
        if (u.includes(36)) ata = ata.times(5)
        if (u.includes(46)) ata = ata.pow(2)

        if (r.includes(12)) ata = ata.times(4)
        if (r.includes(22)) ata = ata.pow(2)
        if (r.includes(32)) ata = ata.pow(3)
        if (r.includes(42)) ata = ata.pow(5)

        if (t == 1) ata = ata.plus(1).pow(2.2)

        prodInfo.x = ata
    }

    if (u.includes(26)) {
        let ata = new D(1)

        if (u.includes(27)) ata = ata.times(5)
        if (u.includes(44)) ata = ata.pow(2)
	    if (u.includes(45)) ata = ata.times(2)
        if (u.includes(56)) ata = ata.times(7)

        if (r.includes(12)) ata = ata.times(4)
        if (r.includes(22)) ata = ata.pow(2)
        if (r.includes(32)) ata = ata.pow(3)
        if (r.includes(42)) ata = ata.pow(5)

        if (t == 1) ata = ata.pow(2.2)

        prodInfo.y = ata
    }

    if (u.includes(55)) {
        let ata = new D(1)

        if (u.includes(34)) ata = ata.add(3)
        if (c[5] == 3) ata = ata.times(1e10)
        if (u.includes(33)) ata = ata.times(5)
        if (u.includes(37)) ata = ata.times(5)
        if (u.includes(43)) ata = ata.pow(2)
        if (u.includes(47)) ata = ata.times(10)
        if (u.includes(53)) ata = ata.pow(3)
        if (u.includes(57)) ata = ata.times(2)

        if (r.includes(12)) ata = ata.times(4)
        if (r.includes(22)) ata = ata.pow(2)
        if (r.includes(32)) ata = ata.pow(3)
        if (r.includes(42)) ata = ata.pow(5)

        if (c[0] == 3) ata = ata.times(1e308)

        if (t == 1) ata = ata.pow(2.2)

        prodInfo.z = ata
    }
}

// i actually have no clue

function ge(e) {
	return document.getElementById(e) || document.createElement("div");
}

function gc(e, f, o=0) {
	l = document.getElementsByClassName(e);
	for(var i = o; i < l.length + o; i++) {
		f(l[i % l.length], i); // pass the element and the position of the element in the array to function for each element
	}
}

const childList = {
    14: [13],
    15: [25, 26, 16],
	24: [14, 23],
  	25: [24],
    26: [35, 27],
    27: [17],
    33: [43],
    34: [33],
    35: [45, 36],
    36: [46, 37],
    37: [47],
    43: [53],
    44: [34],
    45: [44],
    46: [55],
    53: [54],
    55: [56],
    56: [57]
}

const rebirthChildList = {
    11: [12, 21],
    12: [13, 22],
    13: [14, 23],
    14: [15, 24],
    15: [25],
    21: [31],
    22: [32],
    23: [33],
    24: [34],
    25: [35],
    31: [41],
    32: [42],
    33: [43],
    34: [44],
    35: [45],
    41: [63],
    42: [63],
    43: [63],
    44: [63],
    45: [55],
    55: [65],
    63: ["c11", "c12", "c13"],
    65: [75],
    75: [85],
    85: [95],
    95: [105],
    105: [115],
    115: [125],
    125: [135],
    135: [145],
    145: [155],
    155: [165],
    165: [175],
    175: [185]
}

function showTab(name) {
	gc("tab", function(e) {
		e.style.display = "none";
	})
	ge(name + "Tab").style.display = "";
    currentTab = name;
    resizeCanvas("upg")
    resizeCanvas("reb")
    resizeCanvas("tri")
}

// set default notation

var not = new ADNotations.ScientificNotation();

var ata;
var currentTab;

// buy an upgrade

function buybtn(ele) {
    if (game.inTrial == 6 && game.upgrades.length >= 15) return;
    if (typeof ele == "number") ele = document.getElementById(ele)
    let id = Number(ele.id)
    let cost = new D(upgradeInfo[id][1])
    cost = game.inTrial == 1 ? cost.pow(1.5) : cost
    let costCurr = upgradeInfo[id][2]
    // reject the purchase of the upgrade if you already have it
    if (game.upgrades.includes(id)) return;
    // reject the purchase of the upgrade if it's too expensive
    if (cost.gt(game[costCurr].amount)) return;
    // reject the purchase of the upgrade if it's parent is not purchased
    if (ele.classList.contains("btn-locked")) return;
    // subtract cost from currency
    game[costCurr].amount = game[costCurr].amount.sub(cost)
    // update classes
    ele.classList.remove("btn-unbought")
    ele.classList.add("btn-bought")
    // store the fact that it's purchased
	game.upgrades.push(id)
    // tell it's children that it's been purchased
    // wait no, that sounds wrong
    if (childList[id]) {
        childList[id].forEach(el => {
            document.getElementById(el).classList.remove("btn-locked")
            document.getElementById(el).classList.add("btn-unbought")
        })
    }
    recalcProd()
}

// obtain a new currency, see previous func for some docs

function buyCurrency(ele, curr) {
    if (typeof ele == "number") ele = document.getElementById(ele)
    let id = Number(ele.id)
    let cost = new D(upgradeInfo[id][1])
    let costCurr = upgradeInfo[id][2]
    cost = game.inTrial == 1 ? cost.pow(1.5) : cost
	if (game.upgrades.includes(id)) return;
    if (cost.gt(game[costCurr].amount)) return;
    if (ele.classList.contains("btn-locked")) return;
    game[costCurr].amount = game[costCurr].amount.sub(cost)
    ele.classList.remove("btn-unbought")
    ele.classList.add("btn-bought")
	game.upgrades.push(id)
	document.querySelector("#" + curr).style.display = "inline-block"
    if (childList[id]) {
        childList[id].forEach(el => {
            document.getElementById(el).classList.remove("btn-locked")
            document.getElementById(el).classList.add("btn-unbought")
        })
	}
	resizeCanvas("upg")
    recalcProd()
}

function update() {
    let tri = getTrialGoal(game.inTrial)
    // update currency display
	document.querySelector("#x").innerHTML = not.format(game.x.amount, 2, 0) + "&hairsp;x"
	document.querySelector("#y").innerHTML = ", " + not.format(game.y.amount, 2, 0) + "&hairsp;y"
	document.querySelector("#z").innerHTML = ", " + not.format(game.z.amount, 2, 0) + "&hairsp;z"
    document.querySelector("#rp").innerHTML= ", " + not.format(game.rp.amount,2, 0) + "&hairsp;RP"
    if (game.inTrial == 0) document.getElementById(54).innerHTML = "Rebirth.<br>Cost: " + not.format(1e11,2,0) + "&hairsp;z<br>For " + (calcRP().exponent == 4500000000000000 ? not.format(0,2,0) : not.format(calcRP(),2,0)) + "&hairsp;RP"
    else document.getElementById(54).innerHTML="Complete the trial.<br>Goal: " + (tri == "∞" ? tri : not.format(tri, 2, 0)) + "&hairsp;z"
    document.getElementById("t8").innerHTML= "Complete the trial.<br>Goal: " + (tri == "∞" ? tri : not.format(tri, 2, 0)) + "&hairsp;z"

    let x = fetchTabbarValue()
    document.querySelector("title").textContent = TABBAR_PREFIX[game.tab[0]] + not.format(x[0], 2, 0) + x[1]
}

// show intial tab so everything isn't on one screen

showTab('upgrades')

// give currencies

window.setInterval(() => {
        // Brute force. Yipee!
        let diff = Date.now() - game.lastTick
        game.lastTick = Date.now()
        let u = game.upgrades,
            r = game.rupgrades,
            c = game.choice.choices,
            t = game.inTrial,
            choiceBroken = (t == 1 || t == 3 || t == 7),
            tr= [1,2,3,4,5,6,7,8].map(n => getTrialReward(n))
            tm= new D(1);
        if ((choiceBroken && t != 7) || t == 4) r = []
        if (choiceBroken) c = []
        tr.map(x => tm = tm.mul(x))
        if (u.includes(15)) {
            ata = new D(prodInfo.x)

            if (u.includes(17)) ata = ata.times(game.z.amount.pow(.1))
			if (u.includes(35)) ata = ata.times(game.y.amount.pow(1/6))

            if (r.includes(14)) ata = ata.times(D.max(1, game.rp.amount))

            if (c[2] == 2) ata = ata.times(game.rp.amount.pow(25))

            if (t == 2) ata = ata.pow(0.1)
            if (t == 3) ata = ata.div(5)
            if (t == 5) ata = ata.pow(1 / game.upgrades.length)
            ata = ata.mul(tm)
		  
			game.x.amount = game.x.amount.add(ata.times(diff / 1000))
		}
		
		if (u.includes(26)) {
			ata = new D(prodInfo.y)

            if (u.includes(17)) ata = ata.times(game.z.amount.pow(.1))

            if (r.includes(14)) ata = ata.times(D.max(1, game.rp.amount))

            if (c[2] == 2) ata = ata.times(game.rp.amount.pow(25))

            if (t == 2) ata = ata.pow(0.1)
            if (t == 3) ata = ata.div(5)
            if (t == 5) ata = ata.pow(1 / game.upgrades.length)
            ata = ata.mul(tm)

			game.y.amount = game.y.amount.add(ata.times(diff / 1000))
		}

        if (u.includes(55)) {
            ata = new D(prodInfo.z)

            if (r.includes(14)) ata = ata.times(D.max(1, game.rp.amount))

            if (c[2] == 1) ata = ata.pow(new D(game.x.amount.log10()).log10())
            if (c[2] == 2) ata = ata.times(game.rp.amount.pow(25))
            if (c[2] == 3) ata = ata.pow(new D(game.y.amount.log10()).log(8))

            if (t == 2) ata = ata.pow(0.1)
            if (t == 3) ata = ata.div(5)
            if (t == 5) ata = ata.pow(1 / game.upgrades.length)
            ata = ata.mul(tm)

            game.z.amount = game.z.amount.add(ata.times(diff / 1000))
        }

        if (game.inTrial == 6) {
            update(); return; }

        // autobuy x
        if (game.rupgrades.includes(13)) {
            buyCurrency(15, "x")
            buybtn(16)
            buybtn(25)
            buybtn(24)
            buybtn(14)
            buybtn(13)
            buybtn(23)
            buyCurrency(26, "y")
            buybtn(27)
            buybtn(44)
            buybtn(47)
            buyCurrency(55, "z")
        }

        // autobuy y
        if (game.rupgrades.includes(23)) {
            buybtn(35)
            buybtn(36)
            buybtn(37)
            buybtn(45)
            buybtn(46)
            buybtn(56)
            buybtn(57)
        }

        // autobuy z
        if (game.rupgrades.includes(33)) {
            buybtn(17)
            buybtn(33)
            buybtn(34)
            buybtn(43)
            buybtn(53)
        }

        // 1% gain
        if (r.includes(43)) {
            game.rp.amount = game.rp.amount.add(calcRP().div(100).times(diff / 1000))
        }

        update()
}, 100)

// save loop

window.setInterval(() => {
    save()
}, 10000)

/* Only register a service worker if it's supported */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/tree-game/service-worker.js');
}