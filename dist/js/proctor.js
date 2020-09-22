// Global variables
const audioVideoFeed = document.getElementById('video')
const isNotAlone = (currentValue) => currentValue > 1
const isNotVisible = (currentValue) => currentValue < 1
const isAloneVisible = (currentValue) => currentValue == 1
var peopleCounts = [1, 1, 1, 1, 1, 1]
var examLog = []
var elapsedTime = 0

// Start webcam video stream
function startVideo() {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    if (navigator.getUserMedia) {
        navigator.getUserMedia({ audio: true, video: true },
            function (stream) {
                audioVideoFeed.srcObject = stream;
                audioVideoFeed.onloadedmetadata = function (e) {
                    audioVideoFeed.play();
                };
            },
            function (err) {
                console.log("ERROR: The following error occurred: " + err.name);
                endExam('cameraNotAllowed')
            }
        );
    } else {
        console.log("ERROR: getUserMedia not supported, try another device and give all necessary permissions.")
        endExam('cameraNotFound')
    }
}

// Proctor video as exam starts
function proctorVideo() {
    Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('dist/js/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('dist/js/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('dist/js/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('dist/js/models')
    ]).then(startVideo)
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(audioVideoFeed, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
        assistantAI(detections)
    }, 2500)
    Toast.fire({ icon: 'success', title: 'Successfully connected with online examiner (proctor).' })
}

// AI assisted proctor video monitoring
function assistantAI(detections) {
    if (!examPaused) {
        var peopleCount = detections.length
        var message = ''

        // Visual feedback if user not visible or not alone
        if (peopleCount == 1) { $('#video').css('border-color', 'whitesmoke') }
        else { $('#video').css('border-color', 'red'); }

        // Update the buffer array
        peopleCounts.unshift(peopleCount)
        peopleCounts.pop()

        // The user must give the exam alone and he must be present in front of the screen
        if (peopleCounts.every(isNotAlone)) {
            --userNotAloneWarningCount
            if (userNotAloneWarningCount <= 0) {
                examTerminated = true
                examTerminationReason += 'User not alone'
                return terminateExam()
            }
            else {
                // Proctor Warning
                proctorLog('userNotAloneWarning')
                proctorSpeak('userNotAloneWarning')
                // Display Warning
                // Pause Exam
                return pauseExam()
            }
        }
        else if (peopleCounts.every(isNotVisible)) {
            --userNotVisibleWarningCount
            if (userNotVisibleWarningCount <= 0) {
                examTerminated = true
                examTerminationReason += 'User not visible'
                return terminateExam()
            }
            else {
                // Proctor Warning
                proctorLog('userNotVisibleWarning')
                proctorSpeak('userNotVisibleWarning')
                // Display Warning
                // Pause Exam
                return pauseExam()
            }
        }
        else if (peopleCount == 1) {
            $('#emotion').html(
                emojiFromExpression(detections[0]['expressions'])
            )
        }
    }
}

// AI assisted proctor audio monitoring
function proctorAudio() {
    navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;
    if (navigator.getUserMedia) {
        navigator.getUserMedia({
            audio: true
        },
            function (stream) {
                audioContext = new AudioContext();
                analyser = audioContext.createAnalyser();
                microphone = audioContext.createMediaStreamSource(stream);
                javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

                analyser.smoothingTimeConstant = 0.8;
                analyser.fftSize = 1024;

                microphone.connect(analyser);
                analyser.connect(javascriptNode);
                javascriptNode.connect(audioContext.destination);

                javascriptNode.onaudioprocess = function () {
                    var array = new Uint8Array(analyser.frequencyBinCount);
                    analyser.getByteFrequencyData(array);
                    var values = 0;

                    var length = array.length;
                    for (var i = 0; i < length; i++) {
                        values += (array[i]);
                    }

                    var average = values / length;

                    //console.log(Math.round(average - 40));
                }
            },
            function (err) {
                console.log("The following error occured: " + err.name)
            });
    } else {
        console.log("getUserMedia not supported");
    }
}

// Audio feedback for warnings
function proctorSpeak(warningCode) {
    var message = d[warningCode][Math.floor(Math.random() * 3) + 1]
    message = new SpeechSynthesisUtterance(message)
    window.speechSynthesis.speak(message)
}

// Update proctor log for warnings
function proctorLog(warningCode) {
    var message = d[warningCode][0]
    $('#status').text(message)
    setTimeout(function () { $('#status').empty() }, 3000)
    var hh = Math.floor(elapsedTime / 60 / 60) % 24
    var mm = Math.floor(elapsedTime / 60) % 60
    var ss = elapsedTime % 60
    examLog.unshift((hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss) + ' - ' + message)
    $('#warning').empty()
    examLog.forEach(function showExamLog(l) { $('#warning').append(l + '<br/>'); })
}

// Return the emotion emoji based on values
function emojiFromExpression(expression) {
    e = sortByValue(expression)[0][1]
    if (e == 'angry') { return '<i class="far fa-2x fa-angry"></i>' }
    if (e == 'disgusted') { return '<i class="far fa-2x fa-frown-open"></i>' }
    if (e == 'fearful') { return '<i class="far fa-2x fa-flushed"></i>' }
    if (e == 'happy') { return '<i class="far fa-2x fa-laugh"></i>' }
    if (e == 'neutral') { return '<i class="far fa-2x fa-meh"></i>' }
    if (e == 'sad') { return '<i class="far fa-2x fa-sad-tear"></i>' }
    if (e == 'surprised') { return '<i class="far fa-2x fa-surprise"></i>' }
}

// Return sorted array
function sortByValue(jsObj) {
    var sortedArray = [];
    for (var i in jsObj) {
        sortedArray.push([jsObj[i], i]);
    }
    return sortedArray.sort();
}