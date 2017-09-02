var timer;
var current_count;
var hh, mm, ss;

function resetTimer() {
    stopTimer();
    current_count = 0;
    hh = mm = ss = 0;
    document.getElementsByClassName("timer")[0].innerText = "00:00:00";
}

function timedCount() {
    if (++current_count == 20) {
        current_count = 0;
        if (++ss == 60) {
            ss = 0;
            if (++mm == 60) mm = 0, hh++;
        }
        console.log(hh, mm, ss);
        document.getElementsByClassName("timer")[0].innerText = (hh < 10 ? "0" + hh : hh) + ":" + (mm < 10 ? "0" + mm : mm) + ":" + (ss < 10 ? "0" + ss : ss);
    }
    timer = setTimeout("timedCount()", 50);
}

function startTimer() {
    timedCount();
}

function stopTimer() {
    clearTimeout(timer);
}