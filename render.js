var canvas = document.getElementById("tree-canvas");
var ctx = canvas.getContext("2d");
var rcanvas = document.getElementById("rebirth-canvas");
var rctx = rcanvas.getContext("2d");
var tcanvas = document.getElementById("trial-canvas");
var tctx = rcanvas.getContext("2d");

window.addEventListener("resize", resizeCanvas);

function getStrokeColor () {
    if (game.theme == 0) return "#000000";
    if (game.theme == 1) return "#FFFFFF";
    if (game.theme == 2 && window.matchMedia("(prefers-color-scheme: light)").matches) return "#000000"
    if (game.theme == 2 && window.matchMedia("(prefers-color-scheme: dark)").matches) return "#FFFFFF"
    return "#000000"
}

function resizeCanvas(can) {
    let canv;
    if (can == "upg") canv = canvas
    if (can == "reb") canv = document.getElementById("rebirth-canvas");
    if (can == "tri") canv = tcanvas
    canv.width = 0;
    canv.height = 0;
    canv.width = document.body.scrollWidth;
    canv.height = document.body.scrollHeight;
    drawStudyTree(can);
}

function drawStudyTree(can) {
    let ct, canv, children, ext;
    if (can == "upg") {
        ct = ctx
        canv = canvas
        children = childList
        ext = ""
    } else if (can == "reb") {
        ct = rctx
        canv = rcanvas
        children = rebirthChildList
        ext = "r"
    } else if (can == "tri") {
        ct = tctx
        canv = tcanvas
        children = trialChildList
        ext = "t"
    }
    ct.clearRect(0, 0, canv.width, canv.height);
	for (arr in children) {
		children[arr].forEach(child => {
			drawTreeBranch(arr, child, ext, ct)
		})
	}

    // choice
    if (can == "reb") {
        for (let i = choiceUpgrades.start; i < choiceUpgrades.end + 1; i++) {
            if (choiceCosts[i - 1].eq(0)) {
                for (let j = 1; j < 4; j++) {
                    drawTreeBranch(i + "2", i + 1 + "" + j, "c", rctx)
                }
            } else {
                for (let j = 1; j < 4; j++) {
                    drawTreeBranch(i + "" + j, i + 1 + "2", "c", rctx)
                }
            }
        }
        drawTreeBranch(111, 122, "c", rctx)
        drawTreeBranch(112, 122, "c", rctx)
        drawTreeBranch(113, 122, "c", rctx)
    }
}

function drawTreeBranch(num1, num2, type, ct) {
    let start = document.getElementById(type + num1).getBoundingClientRect();
    let end = document.getElementById((num2 + "").startsWith("c") ? num2 : type + num2).getBoundingClientRect();
    let x1 = start.left + (start.width / 2) + (document.documentElement.scrollLeft || document.body.scrollLeft);
    let y1 = start.top + (start.height / 2) + (document.documentElement.scrollTop || document.body.scrollTop);
    let x2 = end.left + (end.width / 2) + (document.documentElement.scrollLeft || document.body.scrollLeft);
    let y2 = end.top + (end.height / 2) + (document.documentElement.scrollTop || document.body.scrollTop);
    ct.lineWidth = 15;
    ct.beginPath();
    ct.strokeStyle = getStrokeColor()
    ct.moveTo(x1, y1);
    ct.lineTo(x2, y2);
    ct.stroke();
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
    37: ["Multiply z production by 5.", 5e4, "y"],

    43: ["Square z production.", 1e3, "z"],
    44: ["Square y production.", 1e9, "x"],
    45: ["Multiply y production by 2.", 100, "y"],
    46: ["Square x production.", 3.3e3, "y"],
    47: ["Multiply z production by 10.", 7.1e17, "x"],

    53: ["Cube z production.", 1e7, "z"],
    55: ["Unlock z.", 5e16, "x"],
    56: ["Multiply y production by 7.", 1e4, "y"],
    57: ["Multiply z production by 2.", 1e5, "y"]
}

const rebirthUpgradeInfo = {
    11: ["Begin.", 0],
    12: ["Multiply production x, y, and z by 4.", 1],
    13: ["Automatically buy all upgrades that cost x.", 1],
    14: ["Multiply pre-rebirth production by unspent RP.", 3],
    15: ["TBA", 2e222],

    21: ["Start with 1e5x, y, and z upon each rebirth.", 10],
    22: ["Square all pre-rebirth production.", 15],
    23: ["Automatically buy all upgrades that cost y.", 9],
    24: ["Gain a 50x multiplier to RP gain.", 50],
    25: ["TBA", 2e222],

    31: ["x boosts RP gain.", 5e5],
    32: ["Cube production of x, y, and z.", 1e6],
    33: ["Automatically buy all upgrades that cost z.", 1e3],
    34: ["Gain another 100x multiplier to RP gain.", 5e3],
    35: ["TBA", 2e222],

    41: ["y boosts RP gain.", 2.5e6],
    42: ["Raise the production of x, y, and z to the power of 5.", 1e8],
    43: ["Automatically gain 1% of RP you would get on rebirth every second.", 2.5e6],
    44: ["Gain a 1e5x multiplier to RP gain.", 1e7],
    45: ["TBA", 2e222],

    55: ["TBA", 2e222],

    63: ["Unlock Choice Tree.", 1e13],
    65: ["TBA", 2e222],
    75: ["TBA", 2e222],
    85: ["TBA", 2e222],
    95: ["TBA", 2e222],
    105: ["TBA", 2e222],
    115: ["TBA", 2e222],
    125: ["TBA", 2e222],
    135: ["TBA", 2e222],
    145: ["TBA", 2e222],
    155: ["TBA", 2e222],
    165: ["TBA", 2e222],
    175: ["TBA", 2e222],
    185: ["TBA", 2e222],
}

const choiceUpgrades = {
    start: 1,
    end: 11 - 1,
    "11": "RP formula is better.",
    "12": "z has a greater effect on RP gain.",
    "13": "Gain a static multiplier to z production.",
    "22": null,
    "31": "x and y affect RP gain more.",
    "32": "y and z affect RP gain more.",
    "33": "x and z affect RP gain more.",
    "42": null,
    "51": "x boosts z production.",
    "52": "RP affects pre-rebirth production even more.",
    "53": "y boosts z production.",
    "62": null,
    "71": "Gain a multiplier to RP equal to 100<sup>n</sup>, n being the amount of right choice upgrades you have.",
    "72": "Gain a multiplier to RP equal to 100<sup>n</sup>, n being the amount of middle choice upgrades you have.",
    "73": "Gain a multiplier to RP equal to 100<sup>n</sup>, n being the amount of left choice upgrades you have.",
    "82": null,
    "91": "Gain a multiplier to RP based on x.",
    "92": "Gain a multiplier to RP based on y.",
    "93": "Gain a multiplier to RP based on z.",
    "102":null,
    "111":"Multiply core production of x by 1e25.",
    "112":"This upgrade does absolutely nothing.",
    "113":"Multiply core production of z by 1e10.",
    "122":null,
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
    updateChoiceUpgrades()
}

function updateChoiceUpgrades() {
    for (let i = choiceUpgrades.start; i < choiceUpgrades.end + 2; i++) {
        if (choiceUpgrades[i + "1"] != undefined){ for (let j = 1; j < 4; j++) {
            document.getElementById("c" + i + j).innerHTML = choiceUpgrades["" + i + j] + "<br>Cost: " + not.format(choiceCosts[i - 1], 2, 0) + "&hairsp;RP"
        }} else if (choiceUpgrades[i + "2"] == null) {
            document.getElementById("c" + i + "2").innerHTML = "Regroup.<br>Cost: Free"
        }
    }
}