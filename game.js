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
    theme: 0,
    notation: 0,
    rebirthed: false,
    lastTick: Date.now(),
    version: 5
}

game = defaultGame

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
    55: [65]
}

function showTab(name) {
	gc("tab", function(e) {
		e.style.display = "none";
	})
	ge(name + "Tab").style.display = "";
    currentTab = name;
    resizeCanvas()
    resizeRebirthCanvas()
}

// set default notation

var not = new ADNotations.ScientificNotation();

var ata;
var currentTab;

// buy an upgrade

function buybtn(ele) {
    if (typeof ele == "number") ele = document.getElementById(ele)
    let id = Number(ele.id)
    let cost = new D(upgradeInfo[id][1])
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
}

// obtain a new currency, see previous func for some docs

function buyCurrency(ele, curr) {
    if (typeof ele == "number") ele = document.getElementById(ele)
    let id = Number(ele.id)
    let cost = new D(upgradeInfo[id][1])
    let costCurr = upgradeInfo[id][2]
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
	resizeCanvas()
}

function update() {
    // update currency display
	document.querySelector("#x").innerHTML = not.format(game.x.amount, 2, 0) + "&hairsp;x"
	document.querySelector("#y").innerHTML = ", " + not.format(game.y.amount, 2, 0) + "&hairsp;y"
	document.querySelector("#z").innerHTML = ", " + not.format(game.z.amount, 2, 0) + "&hairsp;z"
    document.querySelector("#rp").innerHTML= ", " + not.format(game.rp.amount,2, 0) + "&hairsp;RP"
    document.getElementById(54).innerHTML  ="Rebirth.<br>Cost: "+not.format(1e11,2,0)+"&hairsp;z<br>For "+(calcRP().exponent == 4500000000000000 ? not.format(0,2,0) : not.format(calcRP(),2,0))+"&hairsp;RP"
}

// show intial tab so everything isn't on one screen

showTab('upgrades')

// give currencies

window.setInterval(() => {
        // Brute force. Yipee!
        let diff = Date.now() - game.lastTick
        game.lastTick = Date.now()
        let u = game.upgrades
        let r = game.rupgrades
        if (u.includes(15)) {
            ata = new D(1)

            if (u.includes(25)) ata = ata.add(5)
            if (u.includes(16)) ata = ata.add(10)
            if (u.includes(14)) ata = ata.add(25)
            if (u.includes(24)) ata = ata.pow(2)
            if (u.includes(13)) ata = ata.pow(1.5)
			if (u.includes(35)) ata = ata.times(game.y.amount.pow(1/6))
            if (u.includes(23)) ata = ata.times(10)
            if (u.includes(36)) ata = ata.times(5)
            if (u.includes(46)) ata = ata.pow(2)
            if (u.includes(17)) ata = ata.times(game.z.amount.pow(.1))

            if (r.includes(12)) ata = ata.times(4)
            if (r.includes(14)) ata = ata.times(D.max(1, game.rp.amount))
            if (r.includes(22)) ata = ata.pow(2)
            if (r.includes(32)) ata = ata.pow(3)
            if (r.includes(42)) ata = ata.pow(5)
		  
			game.x.amount = game.x.amount.add(ata.times(diff / 1000))
		}
		
		if (u.includes(26)) {
			ata = new D(1)

			if (u.includes(27)) ata = ata.times(5)
			if (u.includes(45)) ata = ata.times(2)
            if (u.includes(44)) ata = ata.pow(2)
            if (u.includes(17)) ata = ata.times(game.z.amount.pow(.1))
            if (u.includes(56)) ata = ata.times(7)

            if (r.includes(12)) ata = ata.times(4)
            if (r.includes(14)) ata = ata.times(D.max(1, game.rp.amount))
            if (r.includes(22)) ata = ata.pow(2)
            if (r.includes(32)) ata = ata.pow(3)
            if (r.includes(42)) ata = ata.pow(5)

			game.y.amount = game.y.amount.add(ata.times(diff / 1000))
		}

        if (u.includes(55)) {
            ata = new D(1)

            if (u.includes(34)) ata = ata.add(3)
            if (u.includes(33)) ata = ata.times(5)
            if (u.includes(43)) ata = ata.pow(2)
            if (u.includes(53)) ata = ata.pow(3)
            if (u.includes(37)) ata = ata.times(5)
            if (u.includes(47)) ata = ata.times(10)
            if (u.includes(57)) ata = ata.times(2)

            if (r.includes(12)) ata = ata.times(4)
            if (r.includes(14)) ata = ata.times(D.max(1, game.rp.amount))
            if (r.includes(22)) ata = ata.pow(2)
            if (r.includes(32)) ata = ata.pow(3)
            if (r.includes(42)) ata = ata.pow(5)

            game.z.amount = game.z.amount.add(ata.times(diff / 1000))
        }

        // autobuy x
        if (r.includes(13)) {
            buybtn(13)
            buybtn(14)
            buybtn(15)
            buybtn(16)
            buybtn(23)
            buybtn(24)
            buybtn(25)
            buyCurrency(26, 'y')
            buybtn(27)
            buybtn(44)
            buybtn(47)
            buyCurrency(55, 'z')
        }

        // autobuy y
        if (r.includes(23)) {
            buybtn(35)
            buybtn(36)
            buybtn(37)
            buybtn(45)
            buybtn(46)
            buybtn(56)
            buybtn(57)
        }

        // autobuy z
        if (r.includes(33)) {
            buybtn(17)
            buybtn(33)
            buybtn(34)
            buybtn(43)
            buybtn(53)
        }

        // 10% gain
        if (r.includes(43)) {
            game.rp.amount = game.rp.amount.add(calcRP().div(10).times(diff / 1000))
        }

        update()
}, 100)

// save loop

window.setInterval(() => {
    save()
}, 10000)