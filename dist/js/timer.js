function startTimer(hh = 0, mm = 15, ss = 30) {
    var secondsRemaining = hh * 60 * 60 + mm * 60 + ss;
    var interval = setInterval(function () {
        if (!timerPaused) {
            var hh = Math.floor(secondsRemaining / 60 / 60) % 24
            var mm = Math.floor(secondsRemaining / 60) % 60
            var ss = secondsRemaining % 60
            --secondsRemaining;
            ++elapsedTime;

            if (secondsRemaining == 0) {
                clearInterval(interval)
                finishExam('Time Over')
            }
            else {
                if (hh == 0 && mm == 15 && ss == 0) { $('#timer').css('color', 'red'); }
            }
            $('#timer').html((hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss))
        }
    }, 1000);
}