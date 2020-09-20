// Setting exam parameters

// Proctor Language 'hindi' OR 'english'
var proctorLanguage = 'hindi'

// Full Screen while giving exam
var keepFullScreen = true
var fullScreenExitAttempts = 3

// Multitasking while giving exam
var blockMultitasking = true
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
var blockKeyboard = true

// Right click usage while giving exam
var blockRightClick = true

// Time bound exam
var timeBound = true

// Proctor Speech Dictionary
// TODO: Make list of all warnings in 'hindi' and 'english'
var d = [{
    'hindi': [{
        'fullScreenWarning': [{
            1: 'full screen se bahar na jaayein',
            2: 'exam dete waqt full screen zaroori h',
            3: 'kripya exam dete waqt full screen mode me rahein'
        }],
        'multitaskingWarning': [{
            1: 'exam dete waqt multitasking naa karein',
            2: 'kripya tab athwa application naa badlein',
            3: 'sirf exam pe focus karein'
        }],
        'userNotAloneWarning': [{
            1: 'exam dete waqt akele rahein',
            2: 'kripya exam me kisi ki madad na len',
            3: 'exam dete wat kisi aur ke saath na rahein'
        }],
        'userNotVisibleWarning': [{
            1: 'exam dete waqt hamesha camera ke saamne rahein',
            2: 'kripya camera ke saamne rahein aur proper light me rahein',
            3: 'camera ke saamne rahein'
        }],
        'userAudioWarning': [{
            1: 'kripya shanti banaye rahein',
            2: 'exam dete waqt aawaaz na karein',
            3: 'shhhh! shanti banaye rakhein!'
        }],
    }],
    'english': [{
        'fullScreenWarning': [{
            1: 'do not exit the full screen',
            2: 'remain in full screen while giving exam',
            3: 'please do not switch from full screen mode while giving exam'
        }],
        'multitaskingWarning': [{
            1: 'avoid multitasking while giving exam',
            2: 'kindly do not switch tabs or applications',
            3: 'focus only on your exam'
        }],
        'userNotAloneWarning': [{
            1: 'remain alone while giving exam',
            2: 'kindly do not involve others in your exam',
            3: 'stay alone while you are giving exam'
        }],
        'userNotVisibleWarning': [{
            1: 'always stay in front of camera while giving exam',
            2: 'please stay in front of camera and ensure proper lighting',
            3: 'remain in front of the camera'
        }],
        'userAudioWarning': [{
            1: 'please stay quiet',
            2: 'do not make noise while giving exam',
            3: 'shhhh! remain quiet!'
        }],
    }]
}]

// System compatibility test
var systemIncompatible = false
var systemIncompatibleReason = ''

// Exam termination
var examTerminated = false
var examTerminationReason = ''

// Global Variables
var qc = 0

// Switch to full screen if defined by examiner
function gotoFullScreen() {
    if (!document.fullscreenElement) {
        document.querySelector("body").requestFullscreen().catch(err => {
            systemCompatible = false
            systemIncompatibleReason += 'Error attempting to enable full-screen mode: ${err.message} (${err.name})'
        })
        monitorFullScreen()
    }
}

// Track switching of full screen
function monitorFullScreen() {
    document.addEventListener('fullscreenchange', (event) => {
        if (!document.fullscreenElement) {
            if (fullScreenExitAttempts <= 0) {
                examTerminated = true
                examTerminationReason += 'Closed full screen'
                // TODO: End Exam
                window.location.replace("");
            }
            else {
                // Display Warning
                pauseExam()
                --fullScreenExitAttempts
            }
        }
    })
}

//Track switching of tab/application
function trackSwitchTabApplication() {
    $(window).blur(function () {
        --multitaskingAttempts
        if (multitaskingAttempts <= 0) {
            examTerminated = true
            examTerminationReason += 'Switched tab/browser'
            // TODO: End Exam
            window.location.replace("");
        }
        else {
            // Proctor Warning
            // Display Warning
            // Pause Exam
            pauseExam()
        }
    })
}

// Track Keyboard usage
function trackKeyboard() {
    document.addEventListener("keydown", function (e) {
        proctorLog('keyboard used')
        message = "Don't use keyboard while giving exam!"
        $('#status').text(message)
        e.preventDefault()
    })
}

// Track Right Click usage
function trackRightClick() {
    $(document).bind("contextmenu", function (e) {
        proctorLog('right click used')
        message = "Don't use right click while giving exam!"
        $('#status').text(message)
        return false
    })
}

// Add question for each question in exam
function displayQuestion(q) {
    ++qc
    $('#questions').append('<div id="question' + qc + '" style="padding-top:60px;" class="col-lg-12"><div id="q' + qc + '" class="card"></div></div>')
    $('#q' + qc).append('<div class="card-header"><h3 class="card-title">Question ' + qc + '</h3><div class="card-tools"><button id="q' + qc + '_flag" type="button" onclick="toggleFlag(' + qc + ')" class="btn btn-tool"><i class="fas fa-flag"> Flag</i></button><button id="q' + qc + '_checked" type="button" onclick="toggleChecked(' + qc + ')" class="btn btn-tool"><i class="fas fa-check-double"> Checked</i></button></div ></div>')
    $('#q' + qc).append('<div id="q' + qc + '_body" class="card-body"><h6 class= "card-title">' + q.question + '</h6><br/><br/></div>')
    q.options.forEach(populateOptions)
    $('#questionList').append('<li class="nav-item"><a href="#question' + qc + '" class="nav-link"><i id="question' + qc + '_button" class="far fa-circle text-warning fa-sm nav-icon"></i><p>&nbsp;Question ' + qc + '</p></a></li>')
}

// Add option for each option in question
function populateOptions(o) {
    $('#q' + qc + '_body').append('<div class="form-check"><input class= "form-check-input" type = "checkbox" ><label class="form-check-label">' + o + '</label></div >')
}

// Toggle flag for questions
function toggleFlag(qn) {
    if ($('#q' + qn + '_checked').children('.fa-check-double').hasClass('text-success')) { toggleChecked(qn) }
    if ($('#q' + qn + '_flag').children('.fa-flag').hasClass('text-danger')) {
        $('#q' + qn + '_flag').children('.fa-flag').removeClass('text-danger')
        $('#question' + qn + '_button').removeClass('text-danger fa-flag').addClass('text-warning fa-circle')
    }
    else {
        $('#q' + qn + '_flag').children('.fa-flag').addClass('text-danger')
        $('#question' + qn + '_button').removeClass('text-warning fa-circle').addClass('text-danger fa-flag')
    }
}

// Toggle checked for questions
function toggleChecked(qn) {
    if ($('#q' + qn + '_flag').children('.fa-flag').hasClass('text-danger')) { toggleFlag(qn) }
    if ($('#q' + qn + '_checked').children('.fa-check-double').hasClass('text-success')) {
        $('#q' + qn + '_checked').children('.fa-check-double').removeClass('text-success')
        $('#question' + qn + '_button').removeClass('text-danger fa-check-circle').addClass('text-warning fa-circle')
    }
    else {
        $('#q' + qn + '_checked').children('.fa-check-double').addClass('text-success')
        $('#question' + qn + '_button').removeClass('text-warning fa-circle').addClass('text-success fa-check-circle')
    }
}

// Start the exam upon button click
function startExam() {
    // Prepare environment
    $('#start_exam_button').remove()
    $('#guidelines_button').removeClass('fa-circle').addClass('text-info fa-check-circle')
    if (userVideoTracking) { connectProctor(); $('#status').text('Connecting with a proctor...') }
    if (keepFullScreen) { gotoFullScreen() }
    if (blockMultitasking) { trackSwitchTabApplication() }
    if (blockKeyboard) { trackKeyboard() }
    if (blockRightClick) (trackRightClick())

    // Load questions
    data.forEach(displayQuestion)

    // Start timer
    if (timeBound) { startTimer() }
}

function pauseExam() {
    // Prepare environment
    $('#pauseExam').modal({ backdrop: 'static', keyboard: false })
    $("#pauseExam").modal('show');
}

function resumeExam() {
    // Prepare environment
    gotoFullScreen()
    $('#pauseExam').hide()
}

function terminateExam() {
    // Submit the current state
    // Set exam as terminated
    // Close the exam
}