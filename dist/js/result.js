const urlParams = new URLSearchParams(window.location.search);
const entries = urlParams.entries()
var dataset = []
var student = ''
var examID = ''

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
    response: [0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4]
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
                borderColor: 'teal',
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
                data: [1, 1, 2, 2, 3, 3, 4, 4, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 1, 1, 2, 2, 3, 3, 4],
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
function setValuesFromURL() {
    for (const entry of entries) {
        if (entry[0] == 'student') {
            student = entry[1]
        }
        if (entry[0] == 'examID') {
            examID = entry[1]
        }
    }
}

function fillData() {
    setValuesFromURL()
    document.title = `परीक्षा | ${examID} | Result`
    $('.examID').html(examID)
}

// Document on Ready
$(document).ready(function () {
    // Check if the values are correct

    // Start displaying result
    initChart()
    fillData()
})