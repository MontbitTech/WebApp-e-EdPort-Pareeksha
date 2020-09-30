// Global variables
var peopleCounts = new Array(10).fill(1)
var audioLevels = new Array(150).fill(0)
var examLog = []
var elapsedTime = 0
const videoFeed = document.getElementById('video')
const isNotAlone = (currentValue) => currentValue > 1
const isNotVisible = (currentValue) => currentValue < 1
const isAloneVisible = (currentValue) => currentValue == 1
const isNoisyBackground = (currentValue) => currentValue > 10


// Proctor video as exam starts
function proctorVideo() {
    Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('dist/js/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('dist/js/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('dist/js/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('dist/js/models')
    ]).then(startVideoFeed)
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(videoFeed, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
        videoAssistantAI(detections)
    }, 1500)
}

// Start webcam video stream
function startVideoFeed() {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    if (navigator.getUserMedia) {
        navigator.getUserMedia({ audio: false, video: true },
            function (stream) {
                videoFeed.srcObject = stream;
                videoFeed.onloadedmetadata = function (e) {
                    videoFeed.play();
                };
            },
            function (err) {
                console.log("ERROR: The following error occurred: " + err.name);
                if (userVideoTracking) {
                    endExam('cameraNotAllowed')
                }
            }
        );
    } else {
        console.log("ERROR: getUserMedia not supported, try another device and give all necessary permissions.")
        if (userVideoTracking) {
            endExam('cameraNotFound')
        }
    }
}

// AI assisted proctor video monitoring
function videoAssistantAI(detections) {
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
                return terminateExam('User not alone')
            }
            else {
                peopleCounts.fill(1)
                // Proctor Warning
                proctorLog('userNotAloneWarning')
                proctorSpeak('userNotAloneWarning')
                // Pause Exam
                return pauseExam('You must be alone while giving exam: ' + userNotAloneWarningCount + ' attempt(s) remaining.')
            }
        }
        else if (peopleCounts.every(isNotVisible)) {
            --userNotVisibleWarningCount
            if (userNotVisibleWarningCount <= 0) {
                return terminateExam('User not visible')
            }
            else {
                peopleCounts.fill(1)
                // Proctor Warning
                proctorLog('userNotVisibleWarning')
                proctorSpeak('userNotVisibleWarning')
                // Pause Exam
                return pauseExam('You must be visible in camera while giving exam: ' + userNotVisibleWarningCount + ' attempt(s) remaining.')
            }
        }
        else if (peopleCount == 1) {
            $('#emotion').html(
                emojiFromExpression(detections[0]['expressions'])
            )
        }
    }
}

// Proctor audio as exam starts
function proctorAudio() {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    if (navigator.getUserMedia) {
        navigator.getUserMedia({ audio: true, video: false },
            function (stream) {
                try {
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
                        audioAssistantAI(values / length)
                    }
                }
                catch (err) {
                    $('#noise').html(err)
                }

            },
            function (err) {
                console.log("ERROR: The following error occurred: " + err.name)
                if (userAudioTracking) { endExam('microphoneNotAllowed') }
            });
    } else {
        console.log("getUserMedia not supported, try another device and give all necessary permissions.");
        if (userAudioTracking) { endExam('microphoneNotFound') }
    }
}

// AI assisted proctor audio monitoring
function audioAssistantAI(detections) {
    if (!examPaused) {
        // Update the buffer array
        audioLevels.unshift(detections)
        audioLevels.pop()

        average = audioLevels.reduce((a, b) => (a + b)) / audioLevels.length;
        $('#noise').html('<i class="fa fa-2x fa-microphone-alt-slash" style="opacity:' + average / 30
            + '"></i>')

        if (audioLevels.every(isNoisyBackground) && average > 30) {
            --userAudioWarningCount
            if (userAudioWarningCount <= 0) {
                return terminateExam('Noisy environment')
            }
            else {
                audioLevels.fill(0)
                // Proctor Warning
                proctorLog('userAudioWarning')
                proctorSpeak('userAudioWarning')
                // Pause Exam
                pauseExam('You must remain silent and ensure low noise around you while giving exam: ' + userAudioWarningCount + ' attempt(s) remaining.')
            }
        }
    }
}

// Voice feedback for warnings
function proctorSpeak(warningCode) {
    var message = d[warningCode][Math.floor(Math.random() * 3) + 1]
    message = new SpeechSynthesisUtterance(message)
    window.speechSynthesis.speak(message)
}

// Update proctor log for warnings
function proctorLog(warningCode) {
    var message = d[warningCode][0]
    Toast.fire({ icon: 'error', title: message })
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