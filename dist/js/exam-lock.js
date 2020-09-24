// Default exam parameters

// Full Screen while giving exam
var keepFullScreen = true
var fullScreenExitAttempts = 3

// Multitasking while giving exam
var blockMultitasking = true
var multitaskingAttempts = 3

// Capture and save user image while giving exam
var userImageCapture = true

// User Video Tracking while giving exam
var userVideoTracking = true
var userNotAloneWarningCount = 3
var userNotVisibleWarningCount = 3

// User Audio Tracking while giving exam
var userAudioTracking = true
var userAudioWarningCount = 3

// Keyboard usage while giving exam
var blockKeyboard = true

// Right click usage while giving exam
var blockRightClick = true

// Time bound exam
var timeBound = true

// System compatibility test
var systemIncompatible = false
var systemIncompatibleReason = ''

// Exam termination
var examTerminated = false
var examTerminationReason = ''

// Exam pause
var examPaused = true
var examPausedReason = ''

// Exam finish
var examFinished = false

// Examination URLs
var displayResultURL = ''
var errorPageURL = ''

// Global Variables
var qc = 0
var oc = 0
var audioVideoAllowedByUser = false
var audioVideoSupportedByUser = false
var finalResponse = new Array()

// Proctor Speech Dictionary
var d = {
    'lessTimeRemaining': {
        0: 'less time remaining',
        1: 'hurry up exam time is about to finish',
        2: 'hurry up very less time remaining',
        3: 'hurry the exam is about to finish soon',
    },
    'fullScreenWarning': {
        0: 'Fullscreen Exit',
        1: 'do not exit the full screen',
        2: 'remain in full screen while giving exam',
        3: 'please do not switch from full screen mode'
    },
    'multitaskingWarning': {
        0: 'Tab/Browser Switch',
        1: 'avoid multitasking while giving exam',
        2: 'kindly do not switch tabs or applications',
        3: 'focus only on your exam'
    },
    'userNotAloneWarning': {
        0: 'Not Alone',
        1: 'remain alone while giving exam',
        2: 'kindly do not involve others in your exam',
        3: 'stay alone while you are giving exam'
    },
    'userNotVisibleWarning': {
        0: 'Not Visible',
        1: 'always stay in front of camera while giving exam',
        2: 'please stay in front of camera and ensure proper lighting',
        3: 'remain in front of the camera'
    },
    'userAudioWarning': {
        0: 'Too Noisy',
        1: 'please stay quiet',
        2: 'do not make noise while giving exam',
        3: 'don\'t talk! remain quiet'
    },
    'keyboardUsed': {
        0: 'Keyboard Used',
        1: 'please do not use keyboard',
        2: 'do not use keyboard while giving exam',
        3: 'using keyboard is not allowed'
    },
    'rightClickUsed': {
        0: 'Right-Click Used',
        1: 'please do not use right-click',
        2: 'do not use right-click while giving exam',
        3: 'using right-click is not allowed'
    }
}

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
        if (!examPaused) {
            if (!document.fullscreenElement) {
                --fullScreenExitAttempts
                if (fullScreenExitAttempts <= 0) {
                    terminateExam('Closed full screen')
                }
                else {
                    // Proctor Warning
                    proctorLog('fullScreenWarning')
                    proctorSpeak('fullScreenWarning')
                    // Pause Exam
                    pauseExam('You have attempted switching from full screen. This action is not allowed while giving exam: ' + fullScreenExitAttempts + ' attempt(s) remaining.')

                }
            }
        }
    })
}

//Track switching of tab/application
function trackSwitchTabApplication() {
    $(window).blur(function () {
        if (!examPaused) {
            --multitaskingAttempts
            if (multitaskingAttempts <= 0) {
                terminateExam('Switched tab/browser')
            }
            else {
                // Proctor Warning
                proctorLog('multitaskingWarning')
                proctorSpeak('multitaskingWarning')
                // Pause Exam
                pauseExam('You have attempted switching tab/browser. This action is not allowed while giving exam: ' + multitaskingAttempts + ' attempt(s) remaining.')
            }
        }
    })
}

// Track Keyboard usage
function trackKeyboard() {
    document.addEventListener("keydown", function (e) {
        if (!examPaused) {
            e.preventDefault()
            proctorLog('keyboardUsed')
        }
    })
}

// Track Right Click usage
function trackRightClick() {
    $(document).bind("contextmenu", function (e) {
        if (!examPaused) {
            proctorLog('rightClickUsed')
            return false
        }
    })
}

// Add question for each question in exam
function displayQuestion(q) {
    ++qc
    oc = 0
    $('#questions').append('<div id="question' + qc + '" style="padding-top:60px;" class="col-lg-12"><div id="q' + qc + '" class="card"></div></div>')
    $('#q' + qc).append('<div class="card-header"><h3 class="card-title">Question ' + qc + '</h3><div class="card-tools"><button id="q' + qc + '_flag" type="button" onclick="toggleFlag(' + qc + ')" class="btn btn-tool"><i class="fas fa-flag"> Flag</i></button><button id="q' + qc + '_checked" type="button" onclick="toggleChecked(' + qc + ')" class="btn btn-tool"><i class="fas fa-check-double"> Checked</i></button></div ></div>')
    $('#q' + qc).append('<div id="q' + qc + '_body" class="card-body"><h6 class= "card-title">' + q.question + '</h6><br/><br/></div>')
    q.options.forEach(populateOptions)
    $('#questionList').append('<li class="nav-item"><a href="#question' + qc + '" class="nav-link"><i id="question' + qc + '_button" class="far fa-circle text-warning fa-sm nav-icon"></i><p>&nbsp;Question ' + qc + '</p></a></li>')
}

// Add option for each option in question
function populateOptions(o) {
    ++oc
    $('#q' + qc + '_body').append('<div class="form-check"><input class= "form-check-input" type="checkbox" id="' + qc + ':' + oc + '" ><label class="form-check-label">' + o + '</label></div >')
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

// Gather user detail
async function gatherUserDetail() {
    const { value: email } = await Swal.fire({
        icon: 'question',
        title: 'Registered Email ID',
        input: 'email',
        inputPlaceholder: 'Enter your registered email ID',
        inputValue: 'correct@user.com',
        inputAttributes: {
            'aria-label': 'Registered email ID'
        },
        allowOutsideClick: false,
        allowEscapeKey: false
    })
    checkValidUser(email)
}

// Check if user is valid
function checkValidUser(email) {
    // TODO: server side check user
    if (email === 'correct@user.com') {
        // TODO: Update username and examination code
        return acquireUserPermissionHelper()
    }
    else {
        endExam('userDetailsIncorrect')
    }
}

// Start the exam upon button click
async function startExam() {
    // Prepare environment
    $('#start_exam_button').remove()
    $('#guidelines_button').removeClass('fa-circle').addClass('text-info fa-check-circle')
    $('#toggle_sidebar').addClass('text-info')
    if (userVideoTracking) {
        if (audioVideoAllowedByUser && audioVideoAllowedByUser) { proctorVideo() }
        else { if (!audioVideoSupportedByUser) { return endExam('cameraNotFound') } else { return endExam('cameraNotAllowed') } }
    }
    if (userAudioTracking) {
        if (audioVideoAllowedByUser && audioVideoAllowedByUser) { proctorAudio() }
        else { if (!audioVideoSupportedByUser) { return endExam('microphoneNotFound') } else { return endExam('microphoneNotAllowed') } }
    }
    if (keepFullScreen) { gotoFullScreen() }
    if (blockMultitasking) { trackSwitchTabApplication() }
    if (blockKeyboard) { trackKeyboard() }
    if (blockRightClick) (trackRightClick())

    // Load questions
    questions.forEach(displayQuestion)
    $('#submitButton').css('visibility', 'visible')

    // Start timer
    examPaused = false
    if (timeBound) { startTimer() }
    Toast.fire({ icon: 'success', title: 'Proctor joined.' })

    //Auto-save user response
    saveResponse()
}

// End the exam upon encountering system issues
function endExam(reason) {
    if (reason == 'cameraNotAllowed') {
        ErrorBox.fire({
            timer: 10000, allowOutsideClick: false, allowEscapeKey: false, title: 'Cannot Begin Exam!', html: 'You cannot begin the exam without allowing access to camera.'
        }).then((result) => { if (result.dismiss === Swal.DismissReason.timer) { window.location.replace(errorPageURL) } })
    }
    if (reason == 'cameraNotFound') {
        ErrorBox.fire({
            timer: 10000, allowOutsideClick: false, allowEscapeKey: false, title: 'Cannot Begin Exam!', html: 'You cannot give the exam on a device which does not have camera'
        }).then((result) => { if (result.dismiss === Swal.DismissReason.timer) { window.location.replace(errorPageURL) } })
    }
    if (reason == 'microphoneNotAllowed') {
        ErrorBox.fire({
            timer: 10000, allowOutsideClick: false, allowEscapeKey: false, title: 'Cannot Begin Exam!', html: 'You cannot begin the exam without allowing access to microphone.'
        }).then((result) => { if (result.dismiss === Swal.DismissReason.timer) { window.location.replace(errorPageURL) } })
    }
    if (reason == 'microphoneNotFound') {
        ErrorBox.fire({
            timer: 10000, allowOutsideClick: false, allowEscapeKey: false, title: 'Cannot Begin Exam!', html: 'You cannot give the exam on a device which does not have microphone.'
        }).then((result) => { if (result.dismiss === Swal.DismissReason.timer) { window.location.replace(errorPageURL) } })
    }
    if (reason == 'userDetailsIncorrect') {
        ErrorBox.fire({
            timer: 10000, allowOutsideClick: false, allowEscapeKey: false, title: 'Incorrect Details!', html: 'The email ID provided by you is incorrect. Kindly enter your registered email ID.'
        }).then((result) => { if (result.dismiss === Swal.DismissReason.timer) { window.location.replace(errorPageURL) } })
    }
}

// Pause the exam due to user actions
function pauseExam(bodyMessage) {
    // Prepare environment
    examPaused = true
    $('#pauseExamBody').empty().text(bodyMessage)
    $('#pauseExam').modal({ backdrop: 'static', keyboard: false })
    $('#pauseExam').modal('show')
    $('#toggle_sidebar').trigger('click')
}

// Resume the exam upon user confirmation
function resumeExam() {
    // Prepare environment
    gotoFullScreen()
    $('#toggle_sidebar').trigger('click')
    $('#pauseExam').modal('hide')
    examPaused = false
}

// Terminate the exam due to repeated user actions
function terminateExam(examTerminationReason) {
    // Submit the current state
    // Set exam as terminated
    // Close the exam
    examPaused = true
    examTerminated = true
    ErrorBox.fire({
        timer: 10000, allowOutsideClick: false, allowEscapeKey: false, title: 'Examination Terminated!', html: 'You examination was terminated by the proctor. Reason: ' + examTerminationReason
    }).then((result) => { if (result.dismiss === Swal.DismissReason.timer) { window.location.replace(errorPageURL) } })
}

// Finish exam confirmation
function finishExamConfirmation() {
    updateResponseSummary(prepareResponse())
    $('#finishExam').modal({ backdrop: 'static', keyboard: false })
    $('#finishExam').modal('show')
}

// Finish the exam successfully --> exponential back-off
function finishExam(m = '') {

    Swal.fire({
        timer: 3000, allowOutsideClick: false, allowEscapeKey: false, showConfirmButton: false, timerProgressBar: true,
        icon: 'success', title: 'Successfully saved & submitted!', html: m + '<br/> You have completed this examination successfully.'
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) { window.location.replace(displayResultURL) }
    })
}

// Form response JSON
function prepareResponse() {
    finalResponse = []
    userResponse = $('input[type=checkbox]:checked')
    for (i = 0; i < userResponse.length; i++) {
        res = userResponse[i]['id']
        res = res.split(':')
        if (res[0] in finalResponse) { finalResponse[res[0]] += res[1] }
        else { finalResponse[res[0]] = res[1] }
    }
    return finalResponse
}

// Update user response summary
function updateResponseSummary(finalResponse) {
    $('#finishExamBody').empty()
    $('#finishExamBody').append('<p>You are trying to finish the examination before the permitted time. Are you sure you want to finish this examination?</p>')
    $('#totalQuestionCount').text(qc)
    $('#attemptedQuestionCount').text(finalResponse.filter(Boolean).length)
    $('#remainingQuestionCount').text(qc - finalResponse.filter(Boolean).length)
    console.log(finalResponse)
    return finalResponse
}

//Push user response to server
function pushResponseToServer(finalResponse) {
    if (finalResponse) {
        return Math.random() >= 0.5
    }
}

// Save user response every few seconds 
function saveResponse() {
    var autoSaveInterval = setInterval(function () {
        if (!(examPaused)) {
            if (examFinished) { clearInterval(autoSaveInterval); return }
            online = pushResponseToServer(updateResponseSummary(prepareResponse()))
            if (!online) { Toast.fire({ icon: 'error', title: 'Internet Unavailable! Retrying...', timer: 5000 }) }
            else { Toast.fire({ icon: 'success', title: 'Auto-saved on server', timer: 1000 }) }
        }
    }, 5000);
}

// Miscellaneous UI/UX + Code Clean
const ErrorBox = Swal.mixin({
    icon: 'error',
    timerProgressBar: true,
    showConfirmButton: false,
    onBeforeOpen: () => { Swal.showLoading() }
});

const Toast = Swal.mixin({
    toast: true,
    position: 'bottom',
    showConfirmButton: false,
    timer: 3000
});

function acquireUserPermissionHelper() {
    if (!(audioVideoAllowedByUser && audioVideoSupportedByUser)) {
        Swal.queue([{
            icon: 'info',
            title: 'Allow Permissions',
            text: 'Camera and microphone access might be needed for this examination. Kindly allow the access if prompted.',
            confirmButtonText: 'Understood!',
            showLoaderOnConfirm: true,
            preConfirm: () => { return acquireUserPermissions() }
        }])

    }
}

async function acquireUserPermissions() {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    if (navigator.getUserMedia) {
        navigator.getUserMedia({ audio: true, video: true },
            function (stream) {
                audioVideoAllowedByUser = true
                audioVideoSupportedByUser = true
                return acquireUserPermissionResult()
            },
            function (err) {
                audioVideoAllowedByUser = false
                return acquireUserPermissionResult()
            }
        );
    }
    else {
        audioVideoSupportedByUser = false
        return acquireUserPermissionResult()
    }
}

function acquireUserPermissionResult() {
    if (audioVideoAllowedByUser && audioVideoSupportedByUser) {
        $('#start_exam_button').show()
        return Swal.fire({ icon: 'success', title: 'Permissions Granted', text: 'Camera & Microphone Permissions Allowed!' })
    }
    else {
        $('#start_exam_button').show()
        return Swal.fire({ icon: 'warning', title: 'Permissions Dismissed', text: 'Camera & Microphone Permissions NOT Allowed!' })
    }
}

