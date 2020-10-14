const urlParams = new URLSearchParams(window.location.search);
const entries = urlParams.entries()
var datasets = []
var student = ''
var examID = ''
var strength = []
var neutral = []
var weakness = []

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
    { id: 4, response: 0 },
    { id: 6, response: 1234 },
    { id: 8, response: 2 },
    { id: 10, response: 3 },
    { id: 12, response: 4 },
    { id: 14, response: 0 },
    { id: 16, response: 1 },
    { id: 18, response: 2 },
    { id: 20, response: 3 },
    { id: 22, response: 4 }
]

var myLog = []

var otherResponse = [
    {
        user: 'Aman',
        response: ['0', '1', '2', '3', '4', '0', '1', '2', '3', '4']
    },
    {
        user: 'Anshuman',
        response: ['1', '2', '3', '4', '0', '1', '2', '3', '4', '0']
    },
    {
        user: 'Kritarth',
        response: ['2', '3', '4', '0', '1', '2', '3', '4', '0', '1']
    },
    {
        user: 'Vikram',
        response: ['3', '4', '0', '1', '2', '3', '4', '0', '1', '2']
    },
    {
        user: 'Paras',
        response: ['4', '0', '1', '2', '3', '4', '0', '1', '2', '3']
    },
]

var correctResponse = [
    { id: 4, response: 0 },
    { id: 6, response: 134 },
    { id: 8, response: 2 },
    { id: 10, response: 2 },
    { id: 12, response: 4 },
    { id: 14, response: 0 },
    { id: 16, response: 123 },
    { id: 18, response: 2 },
    { id: 20, response: 3 },
    { id: 22, response: 4 }
]

// Global Variables
var qc = 0
var oc = 0

function analysePerformance() {
    topics = new Set(correctResponse.topic)
    qc = correctResponse.length
    for (i = 0; i < qc; i++) {
        if (myResponse[i] == correctResponse[i]) {
            // Do Something
        }
    }
}

function createOthersDataset(d) {
    data = {
        label: d.user,
        data: d.response,
        borderColor: 'rgba(100,100,100,0.1)',
        fill: false,
        lineTension: 0
    }
    datasets.push(data)
}

function initChart() {
    // Classmate Comparison Chart
    otherResponse.forEach(createOthersDataset)
    datasets.push({
        label: student,
        data: myResponse,
        borderColor: 'rgba(2, 136, 209,0.5)',
        fill: false,
        lineTension: 0
    })
    datasets.push({
        label: 'Correct Response',
        data: correctResponse,
        borderColor: 'rgba(27, 94, 32,.8)',
        fill: false,
        lineTension: 0
    })
    var ctx = $('#classmateComparisonChart').get(0).getContext('2d');
    var myLine = new Chart(ctx, {
        type: 'line',
        data: {
            xLabels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25'],
            yLabels: ['0', '1', '2', '3', '4', '12', '13', '14', '23', '24', '34', '123', '124', '134', '234', '1234'],
            datasets: datasets
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            legend: { display: false },
            scales: {
                xAxes: [{
                    display: true,
                    gridLines: { display: false, },
                    scaleLabel: { display: true, labelString: 'Questions' }
                }],
                yAxes: [{
                    type: 'category',
                    scaleLabel: { display: true, labelString: 'Response' },
                    ticks: { reverse: true },
                }]
            }
        }
    })

    // Examination Timeline Chart
    window.onload = function () {
        var ctx = $('#examinationTimelineChart').get(0).getContext('2d');
        window.myScatter = Chart.Scatter(ctx, {
            data: [{ x: 7, y: 2 }, { x: 2, y: 7 }],
            options: {
                maintainAspectRatio: false,
                responsive: true,
                legend: { display: false },
            }
        });
    };
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
function displayQuestion(q) {
    ++qc
    oc = 0
    $('#questions').append('<div id="question' + q.id + '" class="col-lg-12"><div id="q' + q.id + '" class="card collapsed-card"></div></div>')
    $('#q' + q.id).append('<div class="card-header"><h3 class="card-title">Question ' + qc + '</h3><div class="card-tools"><button type="button" class="btn btn-tool" data-card-widget="collapse"><i class= "fas fa-plus" ></i ></button ></div></div>')
    $('#q' + q.id).append('<div id="q' + q.id + '_body" class="card-body"><h6 class= "card-title">' + q.question + '</h6><br/><br/></div>')
    for (const o of q.options) {
        ++oc
        $('#q' + q.id + '_body').append('<div class="form-check"><input class= "form-check-input" type="checkbox" id="o_' + q.id + '_' + oc + '" ><label class="form-check-label">' + o + '</label></div >')
    }
    $('#questionList').append('<li class="nav-item"><a href="#question' + q.id + '" class="nav-link"><i id="question' + q.id + '_button" class="far fa-circle text-warning fa-sm nav-icon"></i><p>&nbsp;Question ' + q.id + '</p></a></li>')
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
function displayCorrectResponse(r) {
    for (var i = 0; i < r.response.toString().length; i++) {
        populateCorrectResponse(r.id, r.response.toString()[i])
    }
}

// TODO Check mark the correct option
function populateCorrectResponse(q, c) {
    if (c == myResponse[q - 1]) {
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

function fillData() {
    for (const entry of entries) {
        if (entry[0] == 'student') { student = entry[1] }
        if (entry[0] == 'examID') { examID = entry[1] }
    }
    document.title = `परीक्षा | ${examID} | Result`
    $('.examID').html(examID)
}

// Document on Ready
$(document).ready(function () {
    fillData()
    gatherUserDetail()

    // Load questions and previous responses
    questions.forEach(displayQuestion)
    myResponse.forEach(displayUserResponse)
    correctResponse.forEach(displayCorrectResponse)

    analysePerformance()
    initChart()
})
