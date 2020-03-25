var canvas = document.getElementById("tree-canvas");
var ctx = canvas.getContext("2d");
var rcanvas = document.getElementById("rebirth-canvas");
var rctx = rcanvas.getContext("2d");

window.addEventListener("resize", resizeCanvas);

function resizeCanvas() {
    canvas.width = 0;
    canvas.height = 0;
    canvas.width = document.body.scrollWidth;
    canvas.height = document.body.scrollHeight;
    drawStudyTree();
}

function drawTreeBranch(num1, num2) {
    var start = document.getElementById(num1).getBoundingClientRect();
    var end = document.getElementById(num2).getBoundingClientRect();
    var x1 = start.left + (start.width / 2) + (document.documentElement.scrollLeft || document.body.scrollLeft);
    var y1 = start.top + (start.height / 2) + (document.documentElement.scrollTop || document.body.scrollTop);
    var x2 = end.left + (end.width / 2) + (document.documentElement.scrollLeft || document.body.scrollLeft);
    var y2 = end.top + (end.height / 2) + (document.documentElement.scrollTop || document.body.scrollTop);
    ctx.lineWidth = 15;
    ctx.beginPath();
    if (game.theme == 0) { ctx.strokeStyle = "#000000"; }
    else if (game.theme == 1) { ctx.strokeStyle = "#ffffff"; }
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function drawStudyTree() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (arr in childList) {
		childList[arr].forEach(child => {
			drawTreeBranch(arr, child)
		})
	}
}

function resizeRebirthCanvas() {
    rcanvas.width = 0;
    rcanvas.height = 0;
    rcanvas.width = document.body.scrollWidth;
    rcanvas.height = document.body.scrollHeight;
    drawRebirthStudyTree();
}

function drawRebirthTreeBranch(num1, num2) {
    var start = document.getElementById("r" + num1).getBoundingClientRect();
    var end = document.getElementById("r" + num2).getBoundingClientRect();
    var x1 = start.left + (start.width / 2) + (document.documentElement.scrollLeft || document.body.scrollLeft);
    var y1 = start.top + (start.height / 2) + (document.documentElement.scrollTop || document.body.scrollTop);
    var x2 = end.left + (end.width / 2) + (document.documentElement.scrollLeft || document.body.scrollLeft);
    var y2 = end.top + (end.height / 2) + (document.documentElement.scrollTop || document.body.scrollTop);
    rctx.lineWidth = 15;
    rctx.beginPath();
    if (game.theme == 0) { rctx.strokeStyle = "#000000"; }
    else if (game.theme == 1) { rctx.strokeStyle = "#ffffff"; }
    rctx.moveTo(x1, y1);
    rctx.lineTo(x2, y2);
    rctx.stroke();
}

function drawRebirthStudyTree() {
    rctx.clearRect(0, 0, rcanvas.width, rcanvas.height);
	for (arr in rebirthChildList) {
		rebirthChildList[arr].forEach(child => {
			drawRebirthTreeBranch(arr, child)
		})
	}
}

const upgradeInfo = {
    13: ["Raise x production to the power of 1.5.", 2e4, "x"],
    14: ["Increase core production of x by 25.", 2500, "x"],
    15: ["Begin production of x.", 0, "x"],
    16: ["Increase core production of x by 10.", 100, "x"],
    17: ["Multiply x & y production by z<sup>1/10</sup>.", 1e3, "z"],

    23: ["Multiply x production by 10.", 1e6, "x"],
    24: ["Square x production.", 250, "x"],
    25: ["Increase x production by 5.", 5, "x"],
    26: ["Enter the era of y.", 1e8, "x"],
    27: ["Multiply y production by 5.", 1e8, "x"],

    33: ["Multiply production of z by 5.", 400, "z"],
    34: ["Increase core production of z by 3.", 15, "z"],
    35: ["y boosts x production at a rate of y<sup>1/6</sup>.", 10, "y"],
    36: ["Multiply x production by 5.", 250, "y"],
    37: ["Multiply z production by 5.", 1e5, "y"],

    43: ["Square z production.", 1e3, "z"],
    44: ["Square y production.", 1e9, "x"],
    45: ["Multiply y production by 2.", 100, "y"],
    46: ["Square x production.", 5e3, "y"],
    47: ["Multiply z production by 10.", 5e17, "x"],

    53: ["Cube z production.", 6.6e6, "z"],
    55: ["Unlock z.", 7.5e15, "x"],
    56: ["Multiply y production by 7.", 5e4, "y"],
    57: ["Multiply z production by 2.", 5e5, "y"]
}

const rebirthUpgradeInfo = {
    11: ["Begin.", 0],
    12: ["Multiply production x, y, and z by 4.", 1],
    13: ["Automatically buy all upgrades that cost x.", 1],
    14: ["Multiply pre-rebirth production by unspent RP.", 3],
    15: ["TBA", 2e222],

    21: ["Start with 1e5x upon each rebirth.", 10],
    22: ["Square all pre-rebirth production.", 15],
    23: ["Automatically buy all upgrades that cost y.", 9],
    24: ["Gain a 100x multiplier to RP gain.", 50],
    25: ["TBA", 2e222],

    31: ["Start with 1e5y upon each rebirth.", 10],
    32: ["Cube production of x, y, and z.", 3.333e3],
    33: ["Automatically buy all upgrades that cost z.", 1e3],
    34: ["Gain another 100x multiplier to RP gain.", 1.5e4],
    35: ["TBA", 2e222],

    41: ["Start with 1e5z upon each rebirth.", 10],
    42: ["Raise the production of x, y, and z to the power of 5.", 2.5e6],
    43: ["Automatically gain 10% of RP you would get on rebirth every second.", 2.5e6],
    44: ["Gain a 1e5x multiplier to RP gain.", 1e7],
    45: ["TBA", 2e222],

    55: ["TBA", 2e222],

    63: ["Coming soon...", 1e13],
    65: ["TBA", 2e222]
}

function updateUpgrades() {
    for (key in upgradeInfo) {
        let dat = upgradeInfo[key]
        document.getElementById(key).innerHTML = dat[0] + "<br>Cost: " + (dat[1] == 0 ? "Free" : not.format(dat[1], 2, 0) + "&hairsp;" + dat[2])
    }
}

function updateRebirthUpgrades() {
    for (key in rebirthUpgradeInfo) {
        let dat = rebirthUpgradeInfo[key]
        document.getElementById("r"+key).innerHTML = dat[0] + "<br>Cost: " + (dat[1] == 0 ? "Free" : not.format(dat[1], 2, 0) + "&hairsp;RP")
    }
}