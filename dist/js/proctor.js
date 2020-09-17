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
        $('#log').val(message)
        proctorSpeak(message)
    }
    else if (peopleCounts.every(isNotVisible)) {
        message = 'I can\'t see you. Please remain in front of your screen while giving exam.'
        proctorLog('not visible')
        $('#log').val(message)
        proctorSpeak(message)
    }
    else if (peopleCounts.every(isAloneVisible)) {
        $('#log').val('')
        var studentMood = detections[0]['expressions'];
        $('#log').val(studentMood)
    }


}