var game = {
    x: {
        amount: new Decimal(0)
    },
    y: {
        amount: new Decimal(0)
    },
    z: {
        amount: new Decimal(0)
    },
    upgrades: [],
    theme: 0,
    notation: 0,
    version: 4
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

const upgradeInfo = {
    13: ["Raise x to the power of 1.5.", 2e4, "x"],
    14: ["Increase core production of x by 25.", 2500, "x"],
    15: ["Begin production of x.", 0, "x"]
}

function showTab(name) {
	gc("tab", function(e) {
		e.style.display = "none";
	})
	ge(name + "Tab").style.display = "";
    currentTab = name;
    resizeCanvas()
}

// set default notation
var not = new ADNotations.ScientificNotation();

var ata;
var currentTab;

// buy an upgrade

function buybtn(id, cost, costCurr) {
    // reject the purchase of the upgrade if you already have it
    if (game.upgrades.includes(id)) return;
    // reject the purchase of the upgrade if it's too expensive
    if (cost.gt(game[costCurr].amount)) return;
    // reject the purchase of the upgrade if it's parent is not purchased
    if (document.getElementById(id).classList.contains("btn-locked")) return;
    // subtract cost from currency
    game[costCurr].amount = game[costCurr].amount.sub(cost)
    // update classes
    document.getElementById(id).classList.remove("btn-unbought")
    document.getElementById(id).classList.add("btn-bought")
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

function buyCurrency(id, cost, costCurr, curr) {
	if (game.upgrades.includes(id)) return;
    if (cost.gt(game[costCurr].amount)) return;
    if (document.getElementById(id).classList.contains("btn-locked")) return;
    game[costCurr].amount = game[costCurr].amount.sub(cost)
    document.getElementById(id).classList.remove("btn-unbought")
    document.getElementById(id).classList.add("btn-bought")
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
	document.querySelector("#y").innerHTML = not.format(game.y.amount, 2, 0) + "&hairsp;y"
	document.querySelector("#z").innerHTML = not.format(game.z.amount, 2, 0) + "&hairsp;z"
}

// show intial tab so everything isn't on one screen

showTab('upgrades')

// give currencies

window.setInterval(() => {
        // Brute force. Yipee!
        var u = game.upgrades
        if (u.includes(15)) {
            ata = new Decimal(1)

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
		  
			game.x.amount = game.x.amount.add(ata)
		}
		
		if (u.includes(26)) {
			ata = new Decimal(1)

			if (u.includes(27)) ata = ata.times(5)
			if (u.includes(45)) ata = ata.times(2)
            if (u.includes(44)) ata = ata.pow(2)
            if (u.includes(17)) ata = ata.times(game.z.amount.pow(.1))
            if (u.includes(56)) ata = ata.times(7)

			game.y.amount = game.y.amount.add(ata)
		}

        if (u.includes(55)) {
            ata = new Decimal(1)

            if (u.includes(34)) ata = ata.add(3)
            if (u.includes(33)) ata = ata.times(5)
            if (u.includes(43)) ata = ata.pow(2)
            if (u.includes(53)) ata = ata.pow(3)
            if (u.includes(37)) ata = ata.times(5)
            if (u.includes(47)) ata = ata.times(10)
            if (u.includes(57)) ata = ata.times(2)

            game.z.amount = game.z.amount.add(ata)
        }

        update()
}, 1000)

// save loop

window.setInterval(() => {
    save()
}, 10000)