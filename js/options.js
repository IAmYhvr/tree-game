// create datasets
var themes = ["Light", "Dark", "Auto", "Strange"]
var notations = ["Scientific", "Engineering", "MixedScientific", "MixedEngineering", "Logarithm", "Letters", "Standard", "Dots", "Clock", "Blind"]
var fancyNotations = [undefined, undefined, "Mixed Scientific", "Mixed Engineering"]
const TABBAR_PREFIX = ["Tree Game | ", "TG | ", ""]
const TABBAR_PREFIX_FANCY = ["Long", "Short", "None"]
const TABBAR_SUFFIX_FANCY = ["x", "y", "z", "RP"]
const fetchTabbarValue = () => {
    let x = new Array(2);
    x[1] = TABBAR_SUFFIX_FANCY[game.tab[1]]
    switch (game.tab[1]) {
        case 0:
            x[0] = game.x.amount;
            break;
        case 1:
            x[0] = game.y.amount;
            break;
        case 2:
            x[0] = game.z.amount;
            break;
        case 3:
            x[0] = game.rp.amount;
            break;
        default:
            x[0] = game.x.amount;
            x[1] = TABBAR_SUFFIX_FANCY[0]
    }
    return x
}

function changeTheme() {
    game.theme++
    if (game.theme == themes.length) game.theme = 0
    document.getElementById("themecss").href = "themes/" + themes[game.theme] + ".css"
    document.getElementById("theme").textContent = themes[game.theme]
}

function changeNotation() {
    game.notation++
    if (game.notation == notations.length) game.notation = 0
    not = new ADNotations[notations[game.notation] + "Notation"]
    document.getElementById("notation").textContent = fancyNotations[game.notation] != null || fancyNotations[game.notation] != undefined ? fancyNotations[game.notation] : notations[game.notation]
    updateUpgrades()
    updateRebirthUpgrades()
    updateTrialTree()
}

function changeTabPrefix() {
    game.tab[0]++
    if (game.tab[0] == TABBAR_PREFIX.length) game.tab[0] = 0
    document.getElementById("tabbarprefix").textContent = TABBAR_PREFIX_FANCY[game.tab[0]]
}

function changeTabSuffix() {
    game.tab[1]++
    if (game.tab[1] == TABBAR_SUFFIX_FANCY.length) game.tab[1] = 0
    document.getElementById("tabbarsuffix").textContent = TABBAR_SUFFIX_FANCY[game.tab[1]]
}

// Recursively convert "Decimal" to string
function decimalToString(obj) {
    let ret = {};
    for (const key in obj) {
        if (obj[key] instanceof D) {
            ret[key] = obj[key].toString()
        } else if (obj[key] instanceof Array) {
            ret[key] = obj[key]
        } else if (obj[key] instanceof Object) {
            ret[key] = decimalToString(obj[key]);
        } else {
            ret[key] = obj[key]
        }
    }
    return ret
}
// Recursively convert string to "Decimal"
function stringToDecimal(obj) {
    let ret = {};
    for (const key in obj) {
        if (typeof obj[key] == "string") {
            ret[key] = new D(obj[key])
        } else if (obj[key] instanceof Array) {
            ret[key] = obj[key]
        } else if (obj[key] instanceof Object) {
            ret[key] = stringToDecimal(obj[key]);
        } else {
            ret[key] = obj[key]
        }
    }
    return ret
}
// save the game
function save() {
    let dec = decimalToString(game);
    let str = JSON.stringify(dec);
    localStorage.setItem("treegamesave", str);
}
// load the game
function load() {
    let str = localStorage.getItem("treegamesave");
    if (str == undefined || str == "undefined" || str == null) return;
    let sav = stringToDecimal(JSON.parse(str));
    // account for old versions
    if (sav.version == 1) {
        sav.version++
        sav.notation = 0
    } if (sav.version == 2) {
        sav.version++
        if (sav.upgrades.indexOf(41) >= 0) {
            sav.upgrades[sav.upgrades.indexOf(41)] = 45
        }
    } if (sav.version == 3) {
        sav.version++
        sav.z = {
            amount: new D(0)
        }
    } if (sav.version == 4) {
        sav.version++
        sav.rupgrades = []
        sav.rp = {
            amount: new D(0)
        }
        sav.rebirthed = false
        sav.lastTick = Date.now()
    } if (sav.version == 5) {
        sav.version++
        sav.choice = {
            depth: 0,
            choices: []
        }
        sav.x.amount = new D(0)
        sav.y.amount = new D(0)
        sav.z.amount = new D(0)
        alert("!!UPDATE NOTICE!!\nAmounts of x, y, and z have been reset due to a re-ordering of the way upgrades are applied in. The numbers will be lower.")
        if (sav.rp.amount.gt(3e12)) {
            // this literally broke the fucking game lmao
            sav.rp.amount = new D(3e12)
            alert("!!UPDATE NOTICE!!\nBecause your amount of RP succeeded 3e12, it will be harcapped at that. You probably would have beaten all the new content there is if you had started with any more!")
        }
    } if (sav.version == 6) {
        sav.trialTreeUnlocked = false
        sav.trials = new Array(8).fill(0)
        sav.inTrial = 0
        sav.version++
    } if (sav.version == 7) {
        sav.tab = [0, 0]
    }
    game = sav;
    not = new ADNotations[notations[game.notation] + "Notation"]
    if (game.upgrades.includes(15)) document.querySelector("#x").style.display = "inline-block"
    if (game.upgrades.includes(26)) document.querySelector("#y").style.display = "inline-block"
    if (game.upgrades.includes(55)) document.querySelector("#z").style.display = "inline-block"
    if (game.rebirthed) document.querySelector("#rp").style.display = "inline-block", document.querySelector("#rebirth").style.display = "inline-block";
    if (game.trialTreeUnlocked) document.querySelector("#trial").style.display = "inline-block";
    document.getElementById("themecss").href = "themes/" + themes[game.theme] + ".css"
    document.getElementById("theme").textContent = themes[game.theme]
    document.getElementById("notation").textContent = fancyNotations[game.notation] != null || fancyNotations[game.notation] != undefined ? fancyNotations[game.notation] : notations[game.notation]
    document.getElementById("tabbarprefix").textContent = TABBAR_PREFIX_FANCY[game.tab[0]]
    document.getElementById("tabbarsuffix").textContent = TABBAR_SUFFIX_FANCY[game.tab[1]]
    game.upgrades.forEach(upg => {
        document.getElementById(upg).classList.remove("btn-unbought")
        document.getElementById(upg).classList.add("btn-bought")

        if (childList[upg]) {
            childList[upg].forEach(el => {
                document.getElementById(el).classList.remove("btn-locked")
                document.getElementById(el).classList.add("btn-unbought")
            })
	    }
    })
    game.rupgrades.forEach(upg => {
        document.getElementById("r"+upg).classList.remove("btn-rebirth-unbought")
        document.getElementById("r"+upg).classList.add("btn-rebirth-bought")

        if (rebirthChildList[upg]) {
            rebirthChildList[upg].forEach(el => {
                if ((el + "").startsWith("c")) return;
                document.getElementById("r"+el).classList.remove("btn-rebirth-locked")
                document.getElementById("r"+el).classList.add("btn-rebirth-unbought")
            })
	    }

        if (game.rupgrades.includes(63)) {
            document.getElementById("c11").classList.remove("btn-cleft-locked")
            document.getElementById("c11").classList.add("btn-cleft-unbought")
            document.getElementById("c12").classList.remove("btn-cmid-locked")
            document.getElementById("c12").classList.add("btn-cmid-unbought")
            document.getElementById("c13").classList.remove("btn-cright-locked")
            document.getElementById("c13").classList.add("btn-cright-unbought")
        }
    })
    //choice stuff
    let sides = [undefined, "left", "mid", "right"]
    for (let i = 1; i < game.choice.depth + 1; i++) {
        if (choiceCosts[i - 1].eq(0)) {
            document.getElementById("c" + i + "2").classList.remove("btn-creg-locked")
            document.getElementById("c" + i + "2").classList.add("btn-creg-bought")
        } else {
            let c = game.choice.choices[Math.floor(i / 2)]
            document.getElementById("c" + i + c).classList.remove(`btn-c${sides[c]}-locked`)
            document.getElementById("c" + i + c).classList.remove(`btn-c${sides[c]}-unbought`)
            document.getElementById("c" + i + c).classList.add(`btn-c${sides[c]}-bought`)
            if (c != 1) document.getElementById("c" + i + 1).classList.remove("btn-cleft-unbought"),  document.getElementById("c" + i + 1).classList.add("btn-cleft-locked")
            if (c != 2) document.getElementById("c" + i + 2).classList.remove("btn-cmid-unbought"),   document.getElementById("c" + i + 2).classList.add("btn-cmid-locked")
            if (c != 3) document.getElementById("c" + i + 3).classList.remove("btn-cright-unbought"), document.getElementById("c" + i + 3).classList.add("btn-cright-locked")
        }
    }
    // still choice stuff
    if (choiceCosts[game.choice.depth].eq(0)) {
        document.getElementById("c" + (game.choice.depth + 1) + 2).classList.remove("btn-creg-locked")
        document.getElementById("c" + (game.choice.depth + 1) + 2).classList.add("btn-creg-unbought")
    } else if (game.choice.depth != 0) {
        document.getElementById("c" + (game.choice.depth + 1) + 1).classList.remove("btn-cleft-locked")
        document.getElementById("c" + (game.choice.depth + 1) + 1).classList.add("btn-cleft-unbought")
        document.getElementById("c" + (game.choice.depth + 1) + 2).classList.remove("btn-cmid-locked")
        document.getElementById("c" + (game.choice.depth + 1) + 2).classList.add("btn-cmid-unbought")
        document.getElementById("c" + (game.choice.depth + 1) + 3).classList.remove("btn-cright-locked")
        document.getElementById("c" + (game.choice.depth + 1) + 3).classList.add("btn-cright-unbought")
    }
    if (game.choice.depth > 0) {
        let fc = game.choice.choices[0]
        if (fc != 1) document.getElementById("c11").classList.remove("btn-cleft-unbought"), document.getElementById("c11").classList.add("btn-cleft-locked")
        if (fc != 2) document.getElementById("c12").classList.remove("btn-cmid-unbought"), document.getElementById("c12").classList.add("btn-cmid-locked")
        if (fc != 3) document.getElementById("c13").classList.remove("btn-cright-unbought"), document.getElementById("c13").classList.add("btn-cright-locked")
    }
    update()
    updateUpgrades()
    updateRebirthUpgrades()
    updateTrialTree()
    recalcProd()
}

function exportGame() {
    save()
    let sav = localStorage.getItem("treegamesave");
    let compSav = LZString.compressToEncodedURIComponent(sav)
    copyTextToClipboard(compSav)    
}

function importGame() {
    let sav = prompt("Please import your save:")
    sav = LZString.decompressFromEncodedURIComponent(sav)
    localStorage.setItem("treegamesave", sav)
    window.location.reload()
}

function resetGame() {
    if (!confirm("Are you sure?")) return;
    if (!confirm("This is a hard reset. There is no reward!")) return;
    if (!confirm("Last warning...")) return;
    localStorage.setItem("treegamesave", undefined)
    window.location.reload()
}

// no clue, ask stackoverflow

function copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = 0;
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        var successful = document.execCommand('copy');
        if (!successful) prompt("Unable to auto-copy.", text)
    } catch (err) {
      prompt("Unable to auto-copy.", text)
    }
    document.body.removeChild(textArea);
}
