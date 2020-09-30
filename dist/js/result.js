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






    < script src = "https://code.jquery.com/jquery-3.5.1.min.js" integrity = "sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin = "anonymous" ></script >
<script src="https://cdn.jsdelivr.net/npm/pdfjs-dist@2.5.207/build/pdf.min.js" integrity="sha256-NMk29+Q3bvHtq0hPDEcnEvBTed8DhkQRdiUMw7xG2fE=" crossorigin="anonymous"></script>

<h1>PDF.js 'Hello, world!' example</h1>

<canvas id="the-canvas"></canvas>

<script>
            // If absolute URL from the remote server is provided, configure the CORS
            // header on that server.
            var url = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf';

// Loaded via <script> tag, create shortcut to access PDF.js exports.
            var pdfjsLib = window['pdfjs-dist/build/pdf'];

            // The workerSrc property shall be specified.
            pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

            // Asynchronous download of PDF
            var loadingTask = pdfjsLib.getDocument(url);
loadingTask.promise.then(function(pdf) {
  console.log('PDF loaded');
  
  // Fetch the first page
  var pageNumber = 1;
  pdf.getPage(pageNumber).then(function(page) {
    console.log('Page loaded');
    
    var scale = 1.5;
    var viewport = page.getViewport({scale: scale});

    // Prepare canvas using PDF page dimensions
    var canvas = document.getElementById('the-canvas');
    var context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Render PDF page into canvas context
    var renderContext = {
      canvasContext: context,
      viewport: viewport
    };
    var renderTask = page.render(renderContext);
    renderTask.promise.then(function () {
      console.log('Page rendered');
    });
  });
}, function (reason) {
  // PDF loading error
  console.error(reason);
});
</script>