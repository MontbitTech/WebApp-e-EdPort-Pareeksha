var peopleCounts = new Array(10);

function proctorSpeak(message) {
    var message = new SpeechSynthesisUtterance(message)
    window.speechSynthesis.speak(message)
}

function proctorLog(message) {
    var dateTime = new Date();
    warning = $('#warning').text() + "<br/>" + dateTime.getHours() + ':' + dateTime.getMinutes() + ':' + dateTime.getSeconds() + ' - ' + message
    $('#warning').html(warning)
}

const isNotAlone = (currentValue) => currentValue > 1
const isNotVisible = (currentValue) => currentValue < 1
const isAloneVisible = (currentValue) => currentValue == 1

function proctorScene(detections) {
    var peopleCount = detections.length
    var studentMood = ''
    var message = ''

    // Update the buffer array
    peopleCounts.unshift(peopleCount)
    peopleCounts.pop()

    // The student must give the exam alone and he must be present in front of the screen
    if (peopleCounts.every(isNotAlone)) {
        message = 'Please be alone while giving exam.'
        proctorLog('not alone: ' + peopleCount)
        $('#status').text(message)
        proctorSpeak(message)
    }
    else if (peopleCounts.every(isNotVisible)) {
        message = 'I can\'t see you. Please remain in front of your screen while giving exam.'
        proctorLog('not visible')
        $('#status').text(message)
        proctorSpeak(message)
    }
    else if (peopleCounts.every(isAloneVisible)) {
        $('#status').text('')
        var studentMood = detections[0]['expressions'];
        $('#status').text(studentMood)
    }
}

document.addEventListener('fullscreenchange', (event) => {
    if (document.fullscreenElement) {
        console.log(`Element: ${document.fullscreenElement.id} entered full-screen mode.`);
    } else {
        alert('Do you want to exit the exam?');
    }
});

$(window).focus(function () {
    //do something
});

$(window).blur(function () {
    alert('You are not allowed to leave this tab while giving examination!')
});

// Disable keyboard
document.onkeydown = keydown;
function keydown(evt) {
    if (evt) {
        proctorLog('keyboard used')
        message = "Don't use keyboard while giving exam!"
        $('#status').text(message)
        proctorSpeak(message)
    }
}