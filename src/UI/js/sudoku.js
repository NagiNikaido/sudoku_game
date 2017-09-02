var selected_x = -1, selected_y = -1;
var operation_list = [];
var recover_list = [];
var initial_board = [
    [5, 8, 4, 1, 2, 3, 6, 7, 9],
    [2, 7, 6, 9, 5, 8, 4, 1, 3],
    [9, 1, 3, 6, 4, 7, 2, 8, 5],
    [4, 6, 7, 8, 3, 9, 5, 2, 1],
    [3, 9, 2, 5, 7, 1, 8, 4, 6],
    [8, 5, 1, 4, 6, 2, 3, 9, 7],
    [1, 4, 5, 7, 8, 6, 9, 3, 2],
    [6, 3, 9, 2, 1, 4, 7, 5, 8],
    [7, 2, 8, 3, 9, 0, 1, 6, 4]
];
var current_state = [];
var marked = [];
var mutable = [];
var initial_state = [];
var is_pausing = false;
var marked_x = -1, marked_y = -1;
var has_won = false;

window.onload = function () {
    new QWebChannel(qt.webChannelTransport, function (channel) {
        window.dialog = channel.objects.dialog;

        dialog.sendBoard.connect(function (board) {
            initial_board = JSON.parse(board);
            spin_lock = false;
        });

        dialog.generateBoard(parseInt(document.getElementById("level").value));
    });
};

function applyClass(e, newClass) {
    e.setAttribute("class", e.getAttribute("class") + " " + newClass);
}

function newGame() {
    dialog.generateBoard(parseInt(document.getElementById("level").value));
    setTimeout("gameInitialize()", 100);
}

function gameInitialize() {
    unselectCell(selected_x, selected_y);
    selected_x = selected_y = -1;
    operation_list = [];
    recover_list = [];
    current_state = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    initial_state = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    marked = [
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false]
    ];
    mutable = [
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false]
    ];
    has_won = false;
    resetTimer();
    for (var i = 0; i < 9; i++)
        for (var j = 0; j < 9; j++) {
            document.getElementById("game-board").rows[i].cells[j].
                   setAttribute("class", "game-board-grid x" + i + " y" + j)
        }
    $(".game-board-grid").css("font-size","");
    for (var i = 0; i < 9; i++)
        for (var j = 0; j < 9; j++) {
            initial_state[i][j] = initial_board[i][j] ? 1 << initial_board[i][j] - 1 : 0;
            mutable[i][j] = !initial_board[i][j];
            if (!mutable[i][j]) applyClass(document.getElementById("game-board").rows[i].cells[j], "immutable");
        }
    current_state = initial_state;
    for (var i = 0; i < 9; i++)
        for (var j = 0; j < 9; j++)
            document.getElementById("game-board").rows[i].cells[j].innerText = convert(current_state[i][j]);
    startTimer();
}

function convert(bits) {
    if (!bits) return "";
    else if (popcount(bits) == 1) {
        for (var i = 0; i < 9; i++)
            if (bits & (1 << i)) return (i + 1) + "";
    }
    else {
        var res = "";
        for (var j = 0; j < 9; j += 3)
            for (var i = 0; i < 3; i++)
                res += ((bits & (1 << i + j)) ? (i + j + 1) : " ") + (i == 2 ? "\n" : " ");
        return res;
    }
}

function onCellClicked(pos_class) {
    p_x = parseInt(pos_class[0][1]);
    p_y = parseInt(pos_class[1][1]);
    if (p_x == selected_x && p_y == selected_y) return false;
    unselectCell();
    selectCell(p_x, p_y);
    return true;
}

function unselectCell() {
    if (selected_x == -1 || selected_y == -1) return false;
    $(".x" + selected_x).css({ "border-color": "" ,"border-width": ""});
    $(".y" + selected_y).css({ "border-color": "", "border-width": "" });
    if (selected_x) $(".x" + (selected_x - 1)).css({ "border-color": "", "border-width": "" });
    if (selected_y) $(".y" + (selected_y - 1)).css({ "border-color": "", "border-width": "" });
    if (selected_x < 8) $(".x" + (selected_x + 1)).css({ "border-color": "", "border-top-width": "" });
    if (selected_y < 8) $(".y" + (selected_y + 1)).css({ "border-color": "", "border-left-width": "" });
    return true;
}

function selectCell(x, y) {
    selected_x = x, selected_y = y;
    $(".x" + selected_x).css({ "border-top-color": "black", "border-bottom-color": "black", "border-top-width": "2px", "border-bottom-width": "2px" });
    $(".y" + selected_y).css({ "border-left-color": "black", "border-right-color": "black", "border-left-width": "2px", "border-right-width": "2px" });
    if (selected_x) $(".x" + (selected_x - 1)).css({"border-bottom-color": "black", "border-bottom-width": "2px"});
    if (selected_y) $(".y" + (selected_y - 1)).css({ "border-right-color": "black", "border-right-width": "2px" });
    if (selected_x < 8) $(".x" + (selected_x + 1)).css({ "border-top-color": "black", "border-top-width": "2px" });
    if (selected_y < 8) $(".y" + (selected_y + 1)).css({ "border-left-color": "black", "border-left-width": "2px" });
    $(".x" + selected_x + ".y0").css({ "border-left-color": "black", "border-left-width": "2px" });
    $(".x" + selected_x + ".y8").css({ "border-right-color": "black", "border-right-width": "2px" });
    $(".x0.y" + selected_y).css({ "border-top-color": "black", "border-top-width": "2px"});
    $(".x8.y" + selected_y).css({ "border-bottom-color": "black", "border-bottom-width": "2px" });
    highlightSelectedNumber();
    console.log(x, y);
    return true;
}

function cellReplot(x, y) {
    document.getElementById("game-board").rows[x].cells[y].innerText = convert(current_state[x][y]);
    if (popcount(current_state[x][y]) == 1) {
        $(".x" + x + ".y" + y).css("font-size", "xx-large");
    }
    else {
        $(".x" + x + ".y" + y).css("font-size", "inherit");
    }
    highlightSelectedNumber();
}

function numberChange(c) {
    if (selected_x == -1 || selected_y == -1 || !mutable[selected_x][selected_y]) return false;
    recover_list = [];
    operation_list.push({
        x: selected_x,
        y: selected_y,
        last_state: current_state[selected_x][selected_y],
        now_state: (current_state[selected_x][selected_y] ^ (1 << c - 1))
    });
    current_state[selected_x][selected_y] ^= 1 << c - 1;
    cellReplot(selected_x, selected_y);
    highlightSelectedNumber();
    if (checkWin()) {
        alert("you win!");
        has_won = true;
        stopTimer();
    }
    return true;
}

function remove() {
    if (selected_x == -1 || selected_y == -1 || !mutable[selected_x][selected_y] || !current_state[selected_x][selected_y]) return false;
    recover_list = [];
    operation_list.push({
        x: selected_x,
        y: selected_y,
        last_state: current_state[selected_x][selected_y],
        now_state: 0
    });
    current_state[selected_x][selected_y] = 0;
    cellReplot(selected_x, selected_y);
    highlightSelectedNumber();
    return false;
}

function undo() {
    if (!operation_list.length) return;
    console.log(operation_list);
    t = operation_list.pop();
    current_state[t.x][t.y] = t.last_state;
    cellReplot(t.x, t.y);
    highlightSelectedNumber();
    recover_list.push(t);
}

function redo() {
    if (!recover_list.length) return;
    t = recover_list.pop();
    current_state[t.x][t.y] = t.now_state;
    cellReplot(t.x, t.y);
    highlightSelectedNumber();
    operation_list.push(t);
}

function mark() {
    var x = selected_x, y = selected_y;
    if (marked[x][y]) {
        marked[x][y] = false;
        current = document.getElementById("game-board").rows[x].cells[y].getAttribute("class");
        document.getElementById("game-board").rows[x].cells[y].setAttribute("class", current.split(" ").filter(function (x) { return x != "marked"; }).join(" "));
    }
    else {
        marked[x][y] = true;
        applyClass(document.getElementById("game-board").rows[x].cells[y], "marked");
    }
}

function highlightSelectedNumber() {
    if (selected_x == -1 || selected_y == -1) return false;
    for (var i = 0 ; i < 9; i++)
        for (var j = 0; j < 9; j++)
            $(".x" + i + ".y" + j).css("background-color", "");
    if (popcount(current_state[selected_x][selected_y]) != 1) return false;
    for(var i =0; i < 9 ;i++)
        for(var j =0 ;j<9;j++) if(current_state[i][j] == current_state[selected_x][selected_y])
            $(".x" + i + ".y" + j).css("background-color", "#fcf8e3");
    return true;
}

function forEachBit(a,callback){
    for (var i = 0; i < 9; i++) if (a & (1 << i))
        callback(i);
}

function popcount(a){
    var cnt = 0;
    for (var i = 0; i < 9; i++) if (a & (1 << i))
        cnt++;
    return cnt;
}

function checkWin() {
    var row = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    var col = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    var grid = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    for (var i = 0; i < 9; i++)
        for (var j = 0; j < 9; j++) {
            if (popcount(current_state[i][j]) != 1)
                return false;
            row[i] |= current_state[i][j];
            col[j] |= current_state[i][j];
            grid[parseInt(i / 3)][parseInt(j / 3)] |= current_state[i][j];
        }
    for (var i = 0; i < 9; i++) if (row[i] != (1 << 9) - 1) return false;
    for (var i = 0; i < 9; i++) if (col[i] != (1 << 9) - 1) return false;
    for (var i = 0; i < 3; i++)
        for (var j = 0; j < 3; j++)
            if (grid[i][j] != (1 << 9) - 1) return false;
    return true;
}
