const urlParams = new URLSearchParams(window.location.search);
const entries = urlParams.entries()
var datasets = []
var student = ''
var examID = ''

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
        question: '_______ is the practice and precautions taken to protect valuable information from unauthorized access, recording, disclosure or destruction.',
        options: ['Network Security', 'Database Security', 'Information Security', 'Physical Security'],
        topic: 'Topic 1',
        marks: 2
    },
    {
        question: 'From the options below, which of them is not a threat to information security?',
        options: ['Disaster', 'Eavesdropping', 'Information leakage', 'Unchanged default password'],
        topic: 'Topic 1',
        marks: 2
    },
    {
        question: 'From the options below, which of them is not a vulnerability to information security?',
        options: ['flood', 'without deleting data, disposal of storage media', 'unchanged default password', 'latest patches and updates not done'],
        topic: 'Topic 1',
        marks: 2
    },
    {
        question: '_______ platforms are used for safety and protection of information in the cloud.',
        options: ['Cloud workload protection platforms', 'Cloud security protocols', 'AWS', 'One Drive'],
        topic: 'Topic 2',
        marks: 2
    },
    {
        question: 'Which of the following information security technology is used for avoiding browser-based hacking?',
        options: ['Anti-malware in browsers', 'Remote browser access', 'Adware remover in browsers', 'Incognito mode in a browser'],
        topic: 'Topic 2',
        marks: 2
    },
    {
        question: 'The full form of EDR is _______',
        options: ['Endpoint Detection and recovery', 'Early detection and response', 'Endpoint Detection and response', 'Endless Detection and Recovery'],
        topic: 'Topic 2',
        marks: 2
    },
    {
        question: '_______ technology is used for analyzing and monitoring traffic in network and information flow.',
        options: ['Cloud access security brokers (CASBs)', 'Managed detection and response (MDR)', 'Network Security Firewall', 'Network traffic analysis (NTA)'],
        topic: 'Topic 2',
        marks: 2
    },
    {
        question: 'Compromising confidential information comes under _______',
        options: ['Bug', 'Threat', 'Vulnerability', 'Attack'],
        topic: 'Topic 3',
        marks: 2
    },
    {
        question: 'Lack of access control policy is a _______',
        options: ['Bug', 'Threat', 'Vulnerability', 'Attack'],
        topic: 'Topic 3',
        marks: 2
    },
    {
        question: 'Possible threat to any information cannot be _______',
        options: ['reduced', 'transferred', 'protected', 'ignored'],
        topic: 'Topic 3',
        marks: 2
    },
]

var myLog = []

var myResponse = ['0', '1234', '2', '3', '4', '0', '1', '2', '3', '4']

var otherResponse = [
    {
        user: 'Aman',
        response: ['0', '1', '2', '3', '4', '0', '1', '2', '3', '4']
    },
    {
        user: 'Anshuman',
        response: [1, 2, 3, 4, 0, 1, 2, 3, 4, 0]
    },
    {
        user: 'Kritarth',
        response: [2, 3, 4, 0, 1, 2, 3, 4, 0, 1]
    },
    {
        user: 'Vikram',
        response: [3, 4, 0, 1, 2, 3, 4, 0, 1, 2]
    },
    {
        user: 'Paras',
        response: [4, 0, 1, 2, 3, 4, 0, 1, 2, 3]
    },
]

var correctResponse = [0, 1, 2, 2, 3, 4, 0, 1, 2, 3]

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
    otherResponse.forEach(createOthersDataset)
    datasets.push({
        label: student,
        data: myResponse,
        borderColor: 'rgba(2, 136, 209,0.8)',
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
    var ctx = $('#lineChart').get(0).getContext('2d');
    var myLine = new Chart(ctx, {
        type: 'line',
        data: {
            xLabels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10', 'Q11', 'Q12', 'Q13', 'Q14', 'Q15', 'Q16', 'Q17', 'Q18', 'Q19', 'Q20', 'Q21', 'Q22', 'Q23', 'Q24', 'Q25'],
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
                    scaleLabel: { display: true, labelString: 'Month' }
                }],
                yAxes: [{
                    type: 'category',
                    scaleLabel: { display: true, labelString: 'Request State' },
                    ticks: { reverse: true },
                }]
            }
        }
    })
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
    $('#questions').append('<div id="question' + qc + '" style="padding-top:60px;" class="col-lg-12"><div id="q' + qc + '" class="card"></div></div>')
    $('#q' + qc).append('<div class="card-header"><h3 class="card-title">Question ' + qc + '</h3><div class="card-tools"><button id="q' + qc + '_flag" type="button" onclick="toggleFlag(' + qc + ')" class="btn btn-tool"><i class="fas fa-flag"> Flag</i></button><button id="q' + qc + '_checked" type="button" onclick="toggleChecked(' + qc + ')" class="btn btn-tool"><i class="fas fa-check-double"> Checked</i></button></div ></div>')
    $('#q' + qc).append('<div id="q' + qc + '_body" class="card-body"><h6 class= "card-title">' + q.question + '</h6><br/><br/></div>')
    q.options.forEach(populateOptions)
    $('#questionList').append('<li class="nav-item"><a href="#question' + qc + '" class="nav-link"><i id="question' + qc + '_button" class="far fa-circle text-warning fa-sm nav-icon"></i><p>&nbsp;Question ' + qc + '</p></a></li>')
    $('#q' + qc).append('<div id="q' + qc + '_body" class="card-footer text-secondary"><span class="font-italic font-weight-light">' + q.topic + '</span><span class="float-right font-weight-normal">Marks: ' + q.marks + '</span></div>')
}

// Add option for each option in question
function populateOptions(o) {
    ++oc
    $('#q' + qc + '_body').append('<div class="form-check"><input class= "form-check-input" type="checkbox" disabled id="o_' + qc + '_' + oc + '" ><label class="form-check-label">' + o + '</label></div >')
}

// Add user response if present
function displayUserResponse(r) {
    for (var i = 0; i < r.length; i++) {
        populateUserResponse(i + 1, r[i].toString());
    }
}

// Check mark the option selected by user
function populateUserResponse(q, c) {
    for (var i = 0; i < c.length; i++) {
        if (c[i] !== '0') { document.getElementById('o_' + q + '_' + c[i]).checked = true }
    }
}

// Add correct response
function displayCorrectResponse(r) {
    for (var i = 0; i < r.length; i++) {
        populateCorrectResponse(i + 1, r[i].toString());
    }
}

// Check mark the correct option
function populateCorrectResponse(q, c) {
    for (var i = 0; i < c.length; i++) {
        if (c[i] !== '0') { $('#o_' + q + '_' + c[i]).siblings().css({ 'background-color': 'rgba(27, 94, 32,0.25)', 'color': 'black', 'font-weight': '900' }) }
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
    displayUserResponse(myResponse)
    displayCorrectResponse(correctResponse)

    analysePerformance()
    initChart()
})
