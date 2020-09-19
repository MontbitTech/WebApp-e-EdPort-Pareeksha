// Setting exam parameters

// Proctor Language 'hindi' OR 'english'
var proctorLanguage = 'hindi'

// Full Screen while giving exam
var keepFullScreen = true
var fullScreenExitAttempts = 3

// Multitasking while giving exam
var allowMultitasking = false
var multitaskingAttempts = 3

// Capture and save user image while giving exam
var userImageCapture = true

// Student Video Tracking while giving exam
var userVideoTracking = true
var userNotAloneWarningCount = 2
var userNotVisibleWarningCount = 2

// Student Audio Tracking while giving exam
var userAudioTracking = true
var userAudioWarningCount = 3

// Keyboard usage while giving exam
var allowKeyboard = false

// Right click usage while giving exam
var allowRightClick = false


// Proctor Speech Dictionary
// TODO: Make list of all warnings in 'hindi' and 'english'

// System compatibility test
var systemIncompatible = false
var systemIncompatibleReason = ''

// Exam termination
var examTerminated = false
var examTerminationReason = ''

// Global Variables for Functions
var qc = 0

// Switch to full screen if defined by examiner
function gotoFullScreen() {
    if (!document.fullscreenElement && keepFullScreen) {
        document.querySelector("body").requestFullscreen().catch(err => {
            systemCompatible = false
            systemIncompatibleReason += 'Error attempting to enable full-screen mode: ${err.message} (${err.name})'
        })
    }
}

document.addEventListener('fullscreenchange', (event) => {
    if (!document.fullscreenElement) {
        --fullScreenAttempts
        if (fullScreenExitAttempts <= 0) {
            examTerminated = true
            examTerminationReason += 'Closed full screen'
            // TODO: End Exam
        }
        else {
            // Display Warning
        }
    }
})

$(window).blur(function () {
    --multitaskingAttempts
    if (fullScreenExitAttempts <= 0) {
        examTerminated = true
        examTerminationReason += 'Switched tab/browser'
        // TODO: End Exam
    }
    else {
        // Proctor Warning
        // Display Warning
        // Pause Exam
    }
})

// Disable Keyboard
document.addEventListener("keydown", function (e) {
    proctorLog('keyboard used')
    message = "Don't use keyboard while giving exam!"
    $('#status').text(message)
    e.preventDefault()
})

// Disable Right Click
$(document).bind("contextmenu", function (e) {
    if (!allowRightClick) {
        proctorLog('right click used')
        message = "Don't use right click while giving exam!"
        $('#status').text(message)
        return false
    }
})

// Start the exam upon button click
function startExam() {
    $('#start_exam_button').remove()
    if (userVideoTracking) { connectProctor(); $('#status').text('Connecting with a proctor...') }
    gotoFullScreen()
    data.forEach(displayQuestion)
    startTimer()
}

// Add question for each question in exam
function displayQuestion(q) {
    ++qc
    $('#questions').append('<div id="question' + qc + '" style="padding-top:60px;" class="col-lg-12"><div id="q' + qc + '" class="card"></div></div>')
    $('#q' + qc).append('<div class="card-header"><h5 class="m-0">Question ' + qc + '</h5></div>')
    $('#q' + qc).append('<div id="q' + qc + '_body" class="card-body"><h6 class= "card-title">' + q.question + '</h6><br/><br/></div>')
    q.options.forEach(populateOptions)
    $('#questionList').append('<li class="nav-item"><a href="#question' + qc + '" class="nav-link"><i class="far fa-circle fa-sm nav-icon"></i><p>&nbsp;Question ' + qc + '</p></a></li>')
}

// Add option for each option in question
function populateOptions(o) {
    $('#q' + qc + '_body').append('<div class="form-check"><input class= "form-check-input" type = "checkbox" ><label class="form-check-label">' + o + '</label></div >')
}