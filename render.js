var canvas = document.getElementById("tree-canvas");
var ctx = canvas.getContext("2d");

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
    ctx.strokeStyle = "#000000";
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function drawStudyTree() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTreeBranch("15", "24")
    drawTreeBranch("15", "25")
    drawTreeBranch("24", "23")
    drawTreeBranch("23", "14")
}

function init() {
    resizeCanvas()
}