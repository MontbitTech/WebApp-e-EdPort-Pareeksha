// Global variables
const video = document.getElementById('video')
const isNotAlone = (currentValue) => currentValue > 1
const isNotVisible = (currentValue) => currentValue < 1
const isAloneVisible = (currentValue) => currentValue == 1
var peopleCounts = [1, 1, 1, 1, 1, 1, 1, 1]
var examLog = []
var elapsedTime = 0

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('dist/js/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('dist/js/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('dist/js/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('dist/js/models')
]).then(startVideo)

// Start webcam video stream
function startVideo() {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    if (navigator.getUserMedia) {
        navigator.getUserMedia({ audio: false, video: true },
            function (stream) {
                video.srcObject = stream;
                video.onloadedmetadata = function (e) {
                    video.play();
                };
            },
            function (err) {
                console.log("ERROR: The following error occurred: " + err.name);
            }
        );
    } else {
        console.log("ERROR: getUserMedia not supported, try another device and give all necessary permissions.");
    }
}

// Connect with proctor as exam starts
function connectProctor() {
    if (userVideoTracking) {
        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
            proctorScene(detections)
        }, 2000)
    }
}

// Audio feedback for warnings
function proctorSpeak(warningCode) {
    var message = new SpeechSynthesisUtterance(warningCode)
    window.speechSynthesis.speak(message)
}

// Logging user details
function proctorLog(message) {
    var hh = Math.floor(elapsedTime / 60 / 60) % 24
    var mm = Math.floor(elapsedTime / 60) % 60
    var ss = elapsedTime % 60
    examLog.push((hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss) + ' - ' + message)
    $('#warning').empty()
    examLog.forEach(function showExamLog(l) { $('#warning').append(l + '<br/>'); })
}

// AI assisted proctor monitoring
function proctorScene(detections) {
    var peopleCount = detections.length
    var message = ''

    // Visual feedback if user not visible or not alone
    if (peopleCount == 1) { $('#video').css('border-color', 'whitesmoke') }
    else { $('#video').css('border-color', 'red'); }

    // Update the buffer array
    peopleCounts.unshift(peopleCount)
    peopleCounts.pop()

    // The student must give the exam alone and he must be present in front of the screen
    if (peopleCounts.every(isNotAlone)) {
        message = 'Please be alone while giving exam.'
        proctorLog('not alone: ' + peopleCount)
        $('#status').text(message)
        proctorSpeak(message)

        --userNotAloneWarningCount
        if (userNotAloneWarningCount <= 0) {
            examTerminated = true
            examTerminationReason += 'Not alone'
            // TODO: End Exam
        }
        else {
            // Proctor Warning
            // Display Warning
            // Pause Exam
            var res = prompt("Your exam is paused. Want to resume?")
        }
    }
    else if (peopleCounts.every(isNotVisible)) {
        message = 'I can\'t see you. Please remain in front of your screen while giving exam.'
        proctorLog('not visible')
        $('#status').text(message)
        proctorSpeak(message)

        --userNotVisibleWarningCount
        if (userNotVisibleWarningCount <= 0) {
            examTerminated = true
            examTerminationReason += 'Not visible'
            // TODO: End Exam
        }
        else {
            // Proctor Warning
            // Display Warning
            // Pause Exam
            var res = prompt("Your exam is paused. Want to resume?")
        }
    }
    else if (peopleCount == 1) {
        $('#status').html(
            emojiFromExpression(detections[0]['expressions'])
        )
    }
}

// Return the emotion emoji based on values
function emojiFromExpression(expression) {
    e = sortByValue(expression)[0][1]
    if (e == 'angry') { return '<i class="far fa-lg fa-angry"></i>' }
    if (e == 'disgusted') { return '<i class="far fa-lg fa-frown-open"></i>' }
    if (e == 'fearful') { return '<i class="far fa-lg fa-flushed"></i>' }
    if (e == 'happy') { return '<i class="far fa-lg fa-laugh"></i>' }
    if (e == 'neutral') { return '<i class="far fa-lg fa-meh"></i>' }
    if (e == 'sad') { return '<i class="far fa-lg fa-sad-tear"></i>' }
    if (e == 'surprised') { return '<i class="far fa-lg fa-surprise"></i>' }
}

// Return sorted array
function sortByValue(jsObj) {
    var sortedArray = [];
    for (var i in jsObj) {
        sortedArray.push([jsObj[i], i]);
    }
    return sortedArray.sort();
}