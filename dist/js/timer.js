function startTimer(hh = 0, mm = 0, ss = 30) {
    var secondsRemaining = hh * 60 * 60 + mm * 60 + ss;
    var timerInterval = setInterval(function () {
        if (!examPaused) {
            var hh = Math.floor(secondsRemaining / 60 / 60) % 24
            var mm = Math.floor(secondsRemaining / 60) % 60
            var ss = secondsRemaining % 60
            --secondsRemaining;
            ++elapsedTime;

            if (secondsRemaining == -1) {
                clearInterval(timerInterval)
                $('#finishExamTitle').text('Time Over!')
                $('#finishExamBodyText').text('Time is over for the current examination. We are currently saving your response on the server. Kindly do not close the tab/browser until this is done.')
                finishExamConfirmation()
                finishExam('Time Over')
            }
            else {
                if (hh == 0 && mm == 15 && ss == 0) { $('#timer').css('color', 'red'); proctorSpeak('lessTimeRemaining') }
                if (examTerminated) { window.location.replace(displayResultURL) }
            }
            $('#timer').html((hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss))
        }
    }, 1000);
}