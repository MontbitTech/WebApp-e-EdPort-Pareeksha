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

var myResponse = {
    response: [0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4]
}

var otherResponse = [
    {
        user: 'Aman',
        response: [0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4]
    },
    {
        user: 'Anshuman',
        response: [0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4]
    },
    {
        user: 'Kritarth',
        response: [0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4]
    },
    {
        user: 'Vikram',
        response: [0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4]
    },
    {
        user: 'Paras',
        response: [0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4]
    },
]

var correctResponse = {
    topic: ['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9', 't10', 't1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9', 't10', 't1', 't2', 't3', 't4', 't5'],
    marks: [2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2],
    response: [0, 1, 2, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4]
}

function createDataset() {
    otherResponse.forEach()
}

function initChart() {

    var lineChartData = {
        labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10', 'Q11', 'Q12', 'Q13', 'Q14', 'Q15', 'Q16', 'Q17', 'Q18', 'Q19', 'Q20', 'Q21', 'Q22', 'Q23', 'Q24', 'Q25'],
        datasets: [
            {
                label: 'My Response',
                backgroundColor: 'white',
                borderColor: 'grey',
                data: [0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4],
                lineTension: 0
            },
            {
                label: 'Anonymous 1 Response',
                backgroundColor: 'white',
                borderColor: 'rgba(210, 214, 222, .25)',
                data: [1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0],
                lineTension: 0
            },
            {
                label: 'Anonymous 2 Response',
                backgroundColor: 'white',
                borderColor: 'rgba(210, 214, 222, .25)',
                data: [2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1],
                lineTension: 0
            },
            {
                label: 'Anonymous 3 Response',
                backgroundColor: 'white',
                borderColor: 'rgba(210, 214, 222, .25)',
                data: [1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0],
                lineTension: 0
            },
            {
                label: 'Anonymous 4 Response',
                backgroundColor: 'white',
                borderColor: 'rgba(210, 214, 222, .25)',
                data: [2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1],
                lineTension: 0
            },
            {
                label: 'Correct Response',
                backgroundColor: 'white',
                borderColor: 'green',
                data: [1, 12, 2, 2, 3, 3, 4, 4, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 1, 1, 2, 2, 3, 3, 4],
                lineTension: 0
            },
        ]
    }

    var lineChartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        legend: { display: true },
        scales: {
            xAxes: [{ gridLines: { display: false, } }],
            yAxes: [{ gridLines: { display: false, }, ticks: { stepSize: 1 } }]
        }
    }

    //------------------------------
    //- CLASSMATE COMPARISON CHART -
    //------------------------------
    var lineChartCanvas = $('#lineChart').get(0).getContext('2d')
    lineChartData.datasets[0].fill = false;
    lineChartData.datasets[1].fill = false;
    lineChartOptions.datasetFill = false

    var lineChart = new Chart(lineChartCanvas, {
        type: 'line',
        data: lineChartData,
        options: lineChartOptions
    })
}

//
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
    initChart()
    fillData()
})
