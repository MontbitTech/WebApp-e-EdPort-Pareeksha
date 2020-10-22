const urlParams = new URLSearchParams(window.location.search);
const entries = urlParams.entries()
var datasets = []
var student = ''
var examID = ''
var myPerTopicSummary = []
var classPerTopicSummary = []
var myMarks = 0
var maxMarks = 0

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
    timeDuration: 3600,
}

var questions = [
    {
        id: 4,
        question: '_______ is the practice and precautions taken to protect valuable information from unauthorized access, recording, disclosure or destruction.',
        options: ['Network Security', 'Database Security', 'Information Security', 'Physical Security'],
        type_of_question: "single_choice",
        topic: 'Introduction to Cyber Security',
        marks: 2
    },
    {
        id: 6,
        question: 'From the options below, which of them is not a threat to information security?',
        options: ['Disaster', 'Eavesdropping', 'Information leakage', 'Unchanged default password'],
        type_of_question: "single_choice",
        topic: 'Introduction to Cyber Security',
        marks: 2
    },
    {
        id: 8,
        question: 'From the options below, which of them is not a vulnerability to information security?',
        options: ['flood', 'without deleting data, disposal of storage media', 'unchanged default password', 'latest patches and updates not done'],
        type_of_question: "single_choice",
        topic: 'Introduction to Cyber Security',
        marks: 2
    },
    {
        id: 10,
        question: '_______ platforms are used for safety and protection of information in the cloud.',
        options: ['Cloud workload protection platforms', 'Cloud security protocols', 'AWS', 'One Drive'],
        type_of_question: "single_choice",
        topic: 'Deep Dive into Cyber Security',
        marks: 2
    },
    {
        id: 12,
        question: 'Which of the following information security technology is used for avoiding browser-based hacking?',
        options: ['Anti-malware in browsers', 'Remote browser access', 'Adware remover in browsers', 'Incognito mode in a browser'],
        type_of_question: "single_choice",
        topic: 'Deep Dive into Cyber Security',
        marks: 2
    },
    {
        id: 14,
        question: 'The full form of EDR is _______',
        options: ['Endpoint Detection and recovery', 'Early detection and response', 'Endpoint Detection and response', 'Endless Detection and Recovery'],
        type_of_question: "single_choice",
        topic: 'Deep Dive into Cyber Security',
        marks: 2
    },
    {
        id: 16,
        question: '_______ technology is used for analyzing and monitoring traffic in network and information flow.',
        options: ['Cloud access security brokers (CASBs)', 'Managed detection and response (MDR)', 'Network Security Firewall', 'Network traffic analysis (NTA)'],
        type_of_question: "single_choice",
        topic: 'Deep Dive into Cyber Security',
        marks: 2
    },
    {
        id: 18,
        question: 'Compromising confidential information comes under _______',
        options: ['Bug', 'Threat', 'Vulnerability', 'Attack'],
        type_of_question: "single_choice",
        topic: 'Threats of Digital World',
        marks: 2
    },
    {
        id: 20,
        question: 'Lack of access control policy is a _______',
        options: ['Bug', 'Threat', 'Vulnerability', 'Attack'],
        type_of_question: "single_choice",
        topic: 'Threats of Digital World',
        marks: 2
    },
    {
        id: 22,
        question: 'Possible threat to any information cannot be _______',
        options: ['reduced', 'transferred', 'protected', 'ignored'],
        type_of_question: "single_choice",
        topic: 'Threats of Digital World',
        marks: 2
    },
]

var myResponse = [
    { id: 4, response: 1 },
    { id: 6, response: 2 },
    { id: 8, response: 3 },
    { id: 10, response: 4 },
    { id: 12, response: 12 },
    { id: 14, response: 1 },
    { id: 16, response: 4 },
    { id: 18, response: 13 },
    { id: 20, response: 123 },
    { id: 22, response: 1234 }
]

var myLog = [

]

var otherResponse = [
    {
        user: 'aman.rai@gmail.com',
        response: [
            { id: 4, response: 1 },
            { id: 6, response: 2 },
            { id: 8, response: 3 },
            { id: 10, response: 4 },
            { id: 12, response: 12 },
            { id: 14, response: 13 },
            { id: 16, response: 14 },
            { id: 18, response: 123 },
            { id: 20, response: 124 },
            { id: 22, response: 1234 }
        ]
    },
    {
        user: 'anshuman.shrivastava@gmail.com',
        response: [
            { id: 4, response: 1 },
            { id: 6, response: 2 },
            { id: 8, response: 3 },
            { id: 10, response: 4 },
            { id: 12, response: 12 },
            { id: 14, response: 13 },
            { id: 16, response: 14 },
            { id: 18, response: 123 },
            { id: 20, response: 124 },
            { id: 22, response: 1234 }
        ]
    },
    {
        user: 'kritarth.billore@gmail.com',
        response: [
            { id: 4, response: 1 },
            { id: 6, response: 2 },
            { id: 8, response: 3 },
            { id: 10, response: 4 },
            { id: 12, response: 12 },
            { id: 14, response: 13 },
            { id: 16, response: 14 },
            { id: 18, response: 123 },
            { id: 20, response: 124 },
            { id: 22, response: 1234 }
        ]
    },
    {
        user: 'paras.rawat@gmail.com',
        response: [
            { id: 4, response: 1 },
            { id: 6, response: 2 },
            { id: 8, response: 3 },
            { id: 10, response: 4 },
            { id: 12, response: 12 },
            { id: 14, response: 13 },
            { id: 16, response: 14 },
            { id: 18, response: 123 },
            { id: 20, response: 124 },
            { id: 22, response: 1234 }
        ]
    },
]

var correctResponse = [
    { id: 4, response: 1, reason: 'This is the reason behind the correctness of this option' },
    { id: 6, response: 2, reason: '' },
    { id: 8, response: 3, reason: 'This is the reason behind the correctness of this option' },
    { id: 10, response: 4, reason: '' },
    { id: 12, response: 12, reason: 'This is the reason behind the correctness of this option' },
    { id: 14, response: 13, reason: '' },
    { id: 16, response: 14, reason: 'This is the reason behind the correctness of this option' },
    { id: 18, response: 123, reason: '' },
    { id: 20, response: 124, reason: 'This is the reason behind the correctness of this option' },
    { id: 22, response: 234, reason: '' }
]

// CORE RESULT SETUP

// Fetch data from URL
function fillData() {
    for (const entry of entries) {
        if (entry[0] == 'student') { student = entry[1] }
        if (entry[0] == 'examID') { examID = entry[1] }
    }
    document.title = `परीक्षा | ${examID} | Result`
    $('.examID').html(examID)
}

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
        // TODO: Pull questions
        // TODO: Pull userPreviousResponse
        // TODO: Pull userPreviousLog
        // Take User Permissions
    }
    else {
        //endExam('userDetailsIncorrect')
    }
}

// Add question for each question in exam
function displayQuestion(q, i) {
    oc = 0
    maxMarks += q.marks
    $('#questions').append('<div id="question' + q.id + '" class="col-lg-12"><div id="q' + q.id + '" class="card collapsed-card"></div></div>')
    $('#q' + q.id).append('<div class="card-header"><h3 class="card-title">Question ' + (i + 1) + '</h3><div class="card-tools"><button type="button" class="btn btn-tool" data-card-widget="collapse"><i class= "fas fa-plus" ></i ></button ></div></div>')
    $('#q' + q.id).append('<div id="q' + q.id + '_body" class="card-body"><h6 class= "card-title">' + q.question + '</h6><br/><br/></div>')
    for (const o of q.options) {
        ++oc
        $('#q' + q.id + '_body').append('<div class="form-check"><input class= "form-check-input" type="checkbox" id="o_' + q.id + '_' + oc + '" ><label class="form-check-label">' + o + '</label></div >')
    }
    $('#questionList').append('<li class="nav-item"><a href="#question' + q.id + '" class="nav-link"><i id="question' + q.id + '_button" class="far fa-circle text-warning fa-sm nav-icon"></i><p>&nbsp;Question ' + (i + 1) + '</p></a></li>')
    $('#q' + q.id).append('<div class="card-footer text-secondary"><span class="font-italic font-weight-light">' + q.topic + '</span><span class="float-right font-weight-normal">Marks: ' + q.marks + '</span></div>')
}

// Add user response if present
function displayUserResponse(r) {
    for (var i = 0; i < r.response.toString().length; i++) {
        populateUserResponse(r.id, r.response.toString()[i])
    }
}

// Check mark the option if selected previously
function populateUserResponse(q, c) {
    for (var i = 0; i < c.length; i++) {
        if (c[i] !== '0') { document.getElementById('o_' + q + '_' + c[i]).checked = true }
    }
}

// Add correct response
function displayCorrectResponse(r, i) {
    isCorrect = false
    if (myResponse[i].response.toString() == r.response.toString()) {
        isCorrect = true
        myMarks += questions[i].marks
    }
    for (var i = 0; i < r.response.toString().length; i++) { populateCorrectResponse(r.id, r.response.toString()[i], isCorrect) }
    if (r.reason != '') { $('#q' + r.id + '_body').append('<hr/>Explanation:<br/>').append('<small><i>' + r.reason + '</i></small>') }
}

// Display correct/incorrect response and highlight
function populateCorrectResponse(q, c, isCorrect) {
    if (isCorrect) {
        $('#q' + q).css({ 'background-color': 'rgba(27, 94, 32,0.1)' })
        $('#question' + q + '_button').removeClass('fa-circle').removeClass('text-warning').addClass('fa-check-circle text-success')
    }
    else {
        $('#q' + q).css({ 'background-color': 'rgba(229, 57, 53, 0.1)' })
        $('#question' + q + '_button').removeClass('fa-circle').removeClass('text-warning').addClass('fa-times-circle text-danger')
    }
    for (var i = 0; i < c.length; i++) {
        if (c[i] !== '0') {
            $('#o_' + q + '_' + c[i]).siblings().css({ 'border-style': 'dashed', 'border-width': '1px', 'border-radius': '5px', 'color': 'rgba(27, 94, 32)', 'font-weight': '900' })
            $('#o_' + q + '_' + c[i]).css({ 'text-color': 'green' })
        }
    }
}

// ADVANCED RESULT ANALYSIS

// 
function createMyPerTopicSummary(q, i) {
    isCorrect = false
    if (myResponse[i].response.toString() == correctResponse[i].response.toString()) {
        isCorrect = true
    }
    if (q.topic in myPerTopicSummary) {
        myPerTopicSummary[q.topic]['count'] += 1
        myPerTopicSummary[q.topic]['marksT'] += q.marks
        if (isCorrect) { myPerTopicSummary[q.topic]['marksO'] += q.marks }
        myPerTopicSummary[q.topic]['score'] = myPerTopicSummary[q.topic]['marksO'] / myPerTopicSummary[q.topic]['marksT']
    }
    else {
        myPerTopicSummary[q.topic] = []
        myPerTopicSummary[q.topic]['count'] = 1
        myPerTopicSummary[q.topic]['marksT'] = q.marks
        if (isCorrect) { myPerTopicSummary[q.topic]['marksO'] = q.marks }
        else { myPerTopicSummary[q.topic]['marksO'] = 0 }
        myPerTopicSummary[q.topic]['score'] = myPerTopicSummary[q.topic]['marksO'] / myPerTopicSummary[q.topic]['marksT']
    }
}

//
function displayMyPerTopicSummary(d, t) {
    if (d.score > .7) { $('#myStrength').append('<small>' + t + '<br/></small>') }
    else if (d.score < .3) { { $('#myWeakness').append('<small>' + t + '<br/></small>') } }
    else { { $('#myNeutral').append('<small>' + t + '<br/></small>') } }
    console.log(t)
    console.log(d)
}

// Analyse user's per topic performance
function analyseMyPerTopicSummary() {
    questions.forEach(function (question, index) { createMyPerTopicSummary(question, index) })
    for (var key in myPerTopicSummary) {
        displayMyPerTopicSummary(myPerTopicSummary[key], key);
    }
}

// Document on Ready
$(document).ready(function () {
    fillData()
    gatherUserDetail()

    // Load questions and previous responses
    questions.forEach(function (response, index) { displayQuestion(response, index) })
    myResponse.forEach(displayUserResponse)
    correctResponse.forEach(function (response, index) { displayCorrectResponse(response, index) })

    analyseMyPerTopicSummary()

    console.log(myPerTopicSummary)
    console.log(classPerTopicSummary)
})
