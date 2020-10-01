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
        options: ['Network Security', 'Database Security', 'Information Security', 'Physical Security']
    },
    {
        question: 'From the options below, which of them is not a threat to information security?',
        options: ['Disaster', 'Eavesdropping', 'Information leakage', 'Unchanged default password']
    },
    {
        question: 'From the options below, which of them is not a vulnerability to information security?',
        options: ['flood', 'without deleting data, disposal of storage media', 'unchanged default password', 'latest patches and updates not done']
    },
    {
        question: '_______ platforms are used for safety and protection of information in the cloud.',
        options: ['Cloud workload protection platforms', 'Cloud security protocols', 'AWS', 'One Drive']
    },
    {
        question: 'Which of the following information security technology is used for avoiding browser-based hacking?',
        options: ['Anti-malware in browsers', 'Remote browser access', 'Adware remover in browsers', 'Incognito mode in a browser']
    },
    {
        question: 'The full form of EDR is _______',
        options: ['Endpoint Detection and recovery', 'Early detection and response', 'Endpoint Detection and response', 'Endless Detection and Recovery']
    },
    {
        question: '_______ technology is used for analyzing and monitoring traffic in network and information flow.',
        options: ['Cloud access security brokers (CASBs)', 'Managed detection and response (MDR)', 'Network Security Firewall', 'Network traffic analysis (NTA)']
    },
    {
        question: 'Compromising confidential information comes under _______',
        options: ['Bug', 'Threat', 'Vulnerability', 'Attack']
    },
    {
        question: 'Lack of access control policy is a _______',
        options: ['Bug', 'Threat', 'Vulnerability', 'Attack']
    },
    {
        question: 'Possible threat to any information cannot be _______',
        options: ['reduced', 'transferred', 'protected', 'ignored']
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

var myResponse = [0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4]

var otherResponse = [
    {
        user: 'Aman',
        response: [0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4]
    },
    {
        user: 'Anshuman',
        response: [1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0]
    },
    {
        user: 'Kritarth',
        response: [2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1]
    },
    {
        user: 'Vikram',
        response: [3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2]
    },
    {
        user: 'Paras',
        response: [4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3]
    },
]

var correctResponse = {
    topic: ['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9', 't10', 't1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9', 't10', 't1', 't2', 't3', 't4', 't5'],
    marks: [2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2],
    response: [0, 1, 2, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4]
}

function analysePerformance() {
    topics = new Set(correctResponse.topic)
    qc = correctResponse.topic.length
    for (i = 0; i < qc; i++) {
        if (myResponse[i] == correctResponse.response[i]) {
            console.log('Correct' + i)
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
        borderColor: 'rgba(100,100,255,0.5)',
        fill: false,
        lineTension: 0
    })
    datasets.push({
        label: 'Correct Response',
        data: correctResponse.response,
        borderColor: 'rgba(100,255,100,0.5)',
        fill: false,
        lineTension: 0
    })
    var ctx = $('#lineChart').get(0).getContext('2d');
    var myLine = new Chart(ctx, {
        type: 'line',
        data: {
            xLabels: correctResponse.topic,
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
    analysePerformance()
    initChart()
    fillData()
})
