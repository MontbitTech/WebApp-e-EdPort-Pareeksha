// Dummy Data (Replace by API)
var examProperties = {
    keepFullScreen: true,
    fullScreenExitAttempts: 3,
    blockMultitasking: true,
    multitaskingAttempts: 3,
    userImageCapture: true,
    userVideoTracking: true,
    userNotAloneWarningCount: 3,
    userNotVisibleWarningCount: 3,
    userAudioTracking: true,
    userAudioWarningCount: 3,
    blockKeyboard: true,
    blockRightClick: true,
    timeBound: true,
}

var questions = [
    {
        question: "_______ is the practice and precautions taken to protect valuable information from unauthorized access, recording, disclosure or destruction.",
        options: ["Network Security", "Database Security", "Information Security", "Physical Security"]
    },
    {
        question: "From the options below, which of them is not a threat to information security?",
        options: ["Disaster", "Eavesdropping", "Information leakage", "Unchanged default password"]
    },
    {
        question: "From the options below, which of them is not a vulnerability to information security?",
        options: ["flood", "without deleting data, disposal of storage media", "unchanged default password", "latest patches and updates not done"]
    },
    {
        question: "_______ platforms are used for safety and protection of information in the cloud.",
        options: ["Cloud workload protection platforms", "Cloud security protocols", "AWS", "One Drive"]
    },
    {
        question: "Which of the following information security technology is used for avoiding browser-based hacking?",
        options: ["Anti-malware in browsers", "Remote browser access", "Adware remover in browsers", "Incognito mode in a browser"]
    },
    {
        question: "The full form of EDR is _______",
        options: ["Endpoint Detection and recovery", "Early detection and response", "Endpoint Detection and response", "Endless Detection and Recovery"]
    },
    {
        question: "_______ technology is used for analyzing and monitoring traffic in network and information flow.",
        options: ["Cloud access security brokers (CASBs)", "Managed detection and response (MDR)", "Network Security Firewall", "Network traffic analysis (NTA)"]
    },
    {
        question: "Compromising confidential information comes under _______",
        options: ["Bug", "Threat", "Vulnerability", "Attack"]
    },
    {
        question: "Lack of access control policy is a _______",
        options: ["Bug", "Threat", "Vulnerability", "Attack"]
    },
    {
        question: "Possible threat to any information cannot be _______",
        options: ["reduced", "transferred", "protected", "ignored"]
    },
]

var userPreviousResponse = [
    {
        question: 1,
        response: [1, 3]
    },
    {
        question: 2,
        response: [4]
    },
    {
        question: 3,
        response: [1]
    },
    {
        question: 4,
        response: [1]
    },
    {
        question: 5,
        response: [2]
    },
    {
        question: 6,
        response: [3]
    },
    {
        question: 7,
        response: [4]
    },
    {
        question: 8,
        response: [2]
    },
    {
        question: 9,
        response: [3]
    },
    {
        question: 10,
        response: [4]
    },
]

var userPreviousLog = [

]


const urlParams = new URLSearchParams(window.location.search);
const entries = urlParams.entries()
var student = ''
var examID = ''

// Defining default exam parameters, irrespective of properties

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
var timeOver = false

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


// ENVIRONMENT SETUP

// Setting user environment based on exam properties
function setEnvironment() {
    keepFullScreen = examProperties.keepFullScreen
    fullScreenExitAttempts = examProperties.fullScreenExitAttempts
    blockMultitasking = examProperties.blockMultitasking
    multitaskingAttempts = examProperties.multitaskingAttempts
    userImageCapture = examProperties.userImageCapture
    userVideoTracking = examProperties.userVideoTracking
    userNotAloneWarningCount = examProperties.userNotAloneWarningCount
    userNotVisibleWarningCount = examProperties.userNotVisibleWarningCount
    userAudioTracking = examProperties.userAudioTracking
    userAudioWarningCount = examProperties.userAudioWarningCount
    blockKeyboard = examProperties.blockKeyboard
    blockRightClick = examProperties.blockRightClick
    timeBound = examProperties.timeBound
}

// Switch to full screen if defined by examiner
function gotoFullScreen() {
    if (!document.fullscreenElement) {
        document.querySelector("body").requestFullscreen().catch(err => {
            systemCompatible = false
            systemIncompatibleReason += 'Error attempting to enable full-screen mode: ${err.message} (${err.name})'
        })
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

// Track Time
function startTimer(hh = 3, mm = 0, ss = 0) {
    let secondsRemaining = hh * 60 * 60 + mm * 60 + ss;
    var timerInterval = setInterval(function () {
        if (!examPaused) {
            var hh = Math.floor(secondsRemaining / 60 / 60) % 24
            var mm = Math.floor(secondsRemaining / 60) % 60
            var ss = secondsRemaining % 60
            --secondsRemaining;
            ++elapsedTime;

            if (secondsRemaining < 0) {
                timeOver = true
                clearInterval(timerInterval)
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


// CORE EXAMINATION SETUP

// Gather user detail
async function gatherUserDetail() {
    const { value: email } = await Swal.fire({
        icon: 'question',
        title: 'Registered Email ID',
        input: 'email',
        inputPlaceholder: 'Enter your registered email ID',
        inputValue: student,
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
        // TODO: Pull exam properties
        setEnvironment()
        // TODO: Pull questions
        // TODO: Pull userPreviousResponse
        // TODO: Pull userPreviousLog
        // Take User Permissions
        return acquireUserPermissionHelper()
    }
    else {
        endExam('userDetailsIncorrect')
    }
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
    $('#q' + qc + '_body').append('<div class="form-check"><input class= "form-check-input" type="checkbox" id="o_' + qc + '_' + oc + '" ><label class="form-check-label">' + o + '</label></div >')
}

// Add user response if present
function displayUserResponse(r) {
    for (var i = 0; i < r.response.length; i++) {
        populateUserResponse(r.question, r.response[i]);
    }
}

// Check mark the option if selected previously
function populateUserResponse(q, c) {
    document.getElementById('o_' + q + '_' + c).checked = true
}


// EXAMINATION START, END, PAUSE, RESUME, TERMINATE, FINISH

// Start the exam upon button click
async function startExam() {
    // Prepare environment
    $('#start_exam_button').remove()
    if (userVideoTracking) {
        if (audioVideoAllowedByUser && audioVideoAllowedByUser) { proctorVideo() }
        else { if (!audioVideoSupportedByUser) { return endExam('cameraNotFound') } else { return endExam('cameraNotAllowed') } }
    }
    if (userAudioTracking) {
        if (audioVideoAllowedByUser && audioVideoAllowedByUser) { proctorAudio() }
        else { if (!audioVideoSupportedByUser) { return endExam('microphoneNotFound') } else { return endExam('microphoneNotAllowed') } }
    }
    if (keepFullScreen) { gotoFullScreen(); monitorFullScreen(); }
    if (blockMultitasking) { trackSwitchTabApplication() }
    if (blockKeyboard) { trackKeyboard() }
    if (blockRightClick) (trackRightClick())

    // Load questions and previous responses
    questions.forEach(displayQuestion)
    userPreviousResponse.forEach(displayUserResponse)
    $('#submitButton').show()

    // Start timer
    examPaused = false
    if (timeBound) { startTimer() }

    //Auto-save user response
    saveResponse()

    // UI feedback
    Toast.fire({ icon: 'success', title: 'Proctor joined' })
    $('#toggle_sidebar').addClass('text-info')
    $('#guidelines_button').removeClass('fa-circle').addClass('text-info fa-check-circle')
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
    gotoFullScreen()
    $('#toggle_sidebar').trigger('click')
    $('#pauseExam').modal('hide')
    examPaused = false
}

// Terminate the exam due to repeated user actions
function terminateExam(examTerminationReason) {
    examPaused = true
    examTerminated = true
    finishExamConfirmation()
    finishExam()
}

// Finish exam with exponential back-off communication
function finishExam(max = 10, delay = 1000) {
    examPaused = true
    examFinished = true
    $('#questions').hide()
    $('#finishExamBodyFooter').html('<marquee>SAVING YOUR RESPONSE ON THE SERVER . . .</marquee>')
    var result = pushResponseToServer(updateResponseSummary(prepareResponse()))
    if (result) {
        if (examTerminated) {
            Toast.fire({
                timer: 10000, allowEscapeKey: false, showConfirmButton: false, timerProgressBar: true,
                icon: 'error', title: 'Examination Terminated!', html: '<b>' + examTerminationReason + '</b>'
            }).then((result) => { if (result.dismiss === Swal.DismissReason.timer) { window.location.replace(displayResultURL) } })
        }
        else {
            Toast.fire({
                timer: 10000, allowEscapeKey: false, showConfirmButton: false, timerProgressBar: true,
                icon: 'success', title: 'Saved & submitted!'
            }).then((result) => { if (result.dismiss === Swal.DismissReason.timer) { window.location.replace(displayResultURL) } })
        }
    }
    else {
        Toast.fire({ icon: 'error', title: 'Internet Unavailable! Retrying...', timer: delay })
        if (max > 0) { setTimeout(function () { finishExam(--max, delay * 2); }, delay + Math.random() * 100); }
        else {
            Toast.fire({ icon: 'error', title: 'Retrying Submission...', timer: delay })
            finishExam(max * 10, delay = 1000)
        }
    }
}

// Finish exam confirmation
function finishExamConfirmation() {
    updateResponseSummary(prepareResponse())
    $('#finishExam').modal({ backdrop: 'static', keyboard: false })
    $('#finishExam').modal('show')
}


// SAVE USER RESPONSE

// Form response JSON for saving
function prepareResponse() {
    finalResponse = []
    userResponse = $('input[type=checkbox]:checked')
    for (i = 0; i < userResponse.length; i++) {
        res = userResponse[i]['id']
        res = res.split('_')
        if (res[1] in finalResponse) { finalResponse[res[1]] += res[2] }
        else { finalResponse[res[1]] = res[2] }
    }
    return finalResponse
}

// Update user response summary
function updateResponseSummary(finalResponse) {
    if (examTerminated) {
        $('#finishExamTitle').text('Examination Terminated!')
        $('#finishExamBodyText').html('You examination was terminated by the proctor.Reason: <b>' + examTerminationReason + '</b>')
    }
    else if (timeOver) {
        $('#finishExamTitle').text('Time Over!')
        $('#finishExamBodyText').text('Time is over for the current examination. We are currently saving your response on the server. Kindly do not close the tab/browser until this is done.')
    }
    else {
        $('#finishExamTitle').text('Finish Early?')
        $('#finishExamBody').html('<p>You are trying to finish the examination before the permitted time. Are you sure you want to finish this examination?</p>')
    }
    $('#totalQuestionCount').text(qc)
    $('#attemptedQuestionCount').text(finalResponse.filter(Boolean).length)
    $('#remainingQuestionCount').text(qc - finalResponse.filter(Boolean).length)
    return finalResponse
}

//Push user response to server
function pushResponseToServer(finalResponse) {
    if (finalResponse) {
        return Math.random() >= 0.01
    }
}

// Save user response every few seconds 
function saveResponse() {
    var autoSaveInterval = setInterval(function () {
        if (examFinished) { clearInterval(autoSaveInterval); return }
        online = pushResponseToServer(updateResponseSummary(prepareResponse()))
        if (!online) {
            Toast.fire({ icon: 'error', title: 'Internet Unavailable! Retrying...', timer: 15000 })
        }
    }, 30000);
}

// ADDITIONAL FUNCTIONALITIES

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

// MISCELLANEOUS UI/UX + CLEAN CODE

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

function fillData() {
    for (const entry of entries) {
        if (entry[0] == 'student') { student = entry[1] }
        if (entry[0] == 'examID') { examID = entry[1] }
    }
    document.title = `परीक्षा | ${examID}`
    $('.examID').html(examID)
}

// Document on Ready
$(document).ready(function () {
    fillData()
    gatherUserDetail()
})