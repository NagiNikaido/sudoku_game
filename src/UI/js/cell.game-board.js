$(document).ready(function(){
    $("#game-board-col").css("height", $("#game-board-col").width().toString());
	$("#control-pad").css("height",$("#game-board-col").width().toString());
	$(".game-board-grid").css("height", ($("#game-board-col").width() / 9).toString());
	$(".game-board-grid").css("width", ($("#game-board-col").width() / 9).toString());
	for (var i = 0; i < 9; i++)
	    for (var j = 0; j < 9; j++) {
	        document.getElementById("game-board").rows[i].cells[j].
                   setAttribute("class", "game-board-grid x" + i.toString() + " y" + j.toString());
	    }
});
$(window).resize(function(){
    $("#game-board-col").css("height", $("#game-board-col").width().toString());
	$("#control-pad").css("height",$("#game-board-col").width().toString());
	$(".game-board-grid").css("height", ($("#game-board-col").width() / 9).toString());
	$(".game-board-grid").css("width", ($("#game-board-col").width() / 9).toString());
});

$(".game-board-grid").on("click", function (e) {
    if (has_won || is_pausing) return false;
    onCellClicked(e.target.getAttribute("class").split(" ").slice(1, 3));
    return true;
});

$("#pause-button").on("click", function (e) {
    if (has_won) return false;
    if (e.target.innerHTML == "暂停") {
        e.target.innerHTML = "继续";
        is_pausing = true;
        stopTimer();
    }
    else {
        e.target.innerHTML = "暂停";
        is_pausing = false;
        startTimer();
    }
});

$("#new-game-button").on("click", function (e) {
    $("#pause-button")[0].disabled = false;
    $("#reset-button")[0].disabled = false;
    newGame();
});

$("#reset-button").on("click", function (e) {
    gameInitialize();
});

$("#level-decrease-button").on("click", function (e) {
    if ($("#level")[0].value > 1)
        $("#level")[0].value--;
});

$("#level-increase-button").on("click", function (e) {
    if ($("#level")[0].value < 10)
        $("#level")[0].value++;
})

$(".number-button").on("click", function (e) {
    if (has_won || is_pausing) return false;
    numberChange(parseInt(e.target.innerText));
    return true;
});

$("#delete-button").on("click", function (e) {
    if (has_won || is_pausing) return false;
    remove();
    return true;
});

$("#undo-button").on("click", function (e) {
    if (has_won || is_pausing) return false;
    undo();
    return true;
});

$("#mark-button").on("click", function (e) {
    if (has_won || is_pausing) return false;
    mark();
    return true;
});

$("#redo-button").on("click", function (e) {
    if (has_won || is_pausing) return false;
    redo();
    return true;
});