function startTimer(hh = 3, mm = 0, ss = 0) {
    var secondsRemaining = hh * 60 * 60 + mm * 60 + ss;
    var interval = setInterval(function () {
        var hh = Math.floor(secondsRemaining / 60 / 60) % 24
        var mm = Math.floor(secondsRemaining / 60) % 60
        var ss = secondsRemaining % 60
        --secondsRemaining;
        ++elapsedTime;

        if (secondsRemaining == 0) {
            clearInterval(interval)
            alert('Time Over')
        }
        else {
            if (hh == 1 && mm < 30) { $('#timer').css('color', 'red'); }
        }
        $('#timer').html((hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss))
    }, 1000);
}