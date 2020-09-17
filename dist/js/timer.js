var timerDuration = "00:10:05";
var timerRemaining = timerDuration;
var interval = setInterval(function () {
    var timer = timerRemaining.split(':')
    var hours = parseInt(timer[0], 10)
    var minutes = parseInt(timer[1], 10)
    var seconds = parseInt(timer[2], 10)
    var totalSeconds = hours * 60 * 60 + minutes * 60 + seconds
    // Clock ticking
    --seconds;

    if (hours == 0 && minutes == 0 && seconds == 0) { clearInterval(interval); alert('Time Over') }
    else {
        if (minutes <= 0 && hours > 0) { minutes = 60; --hours; }
        if (seconds <= 0 && minutes > 0) { seconds = 60; --minutes; }
        if (hours < 10) { hours = '0' + hours }
        if (minutes < 10) { minutes = '0' + minutes; $('#timer').css('color', 'red') }
        if (seconds < 10) { seconds = '0' + seconds }
        if (hours == 0 && minutes == 9 && seconds == 60) { proctorSpeak('Only 10 minutes remaining before we finish up this exam!') }
    }

    timerRemaining = hours + ':' + minutes + ':' + seconds;
    $('#timer').html(timerRemaining);
}, 1000);