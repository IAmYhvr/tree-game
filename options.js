// create datasets
var themes = ["light", "dark"]
var notations = ["Scientific", "Engineering", "MixedScientific", "MixedEngineering", "Logarithm", "Letters", "Standard", "Dots", "Clock", "Blind"]
var fancyNotations = [undefined, undefined, "Mixed Scientific", "Mixed Engineering"]

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
}

// Recursively convert "Decimal" to string
function decimalToString(obj) {
    let ret = {};
    for (const key in obj) {
        if (obj[key] instanceof Decimal) {
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
            ret[key] = new Decimal(obj[key])
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
    if (str === undefined || str === null) return;
    let sav = stringToDecimal(JSON.parse(str));
    // account for old versions
    if (sav.version == 1) {
        sav.version++
        sav.notation = 0
    }
    if (sav.version == 2) {
        sav.version++
        if (sav.upgrades.indexOf(41) >= 0) {
            sav.upgrades[sav.upgrades.indexOf(41)] = 45
        }
    }
    if (sav.version == 3) {
        sav.version++
        sav.z = {
            amount: new Decimal(0)
        }
    }
    game = sav;
    not = new ADNotations[notations[game.notation] + "Notation"]
    if (game.upgrades.includes(15)) document.querySelector("#x").style.display = "inline-block"
    if (game.upgrades.includes(26)) document.querySelector("#y").style.display = "inline-block"
    if (game.upgrades.includes(55)) document.querySelector("#z").style.display = "inline-block"
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
    load()
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
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Copying text command was ' + msg);
    } catch (err) {
      console.log('Oops, unable to copy');
    }
    document.body.removeChild(textArea);
}
