const video = document.getElementById('video')
var warningCount = 0

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('dist/js/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('dist/js/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('dist/js/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('dist/js/models')
]).then(startVideo)

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
                alert("The following error occurred: " + err.name);
            }
        );
    } else {
        alert("getUserMedia not supported");
    }
}

video.addEventListener('play', () => {
    //const canvas = faceapi.createCanvasFromMedia(video)
    //document.body.append(canvas)
    //const displaySize = { width: video.width, height: video.height }
    //faceapi.matchDimensions(canvas, displaySize)
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
        //const resizedDetections = faceapi.resizeResults(detections, displaySize)
        document.getElementById('log').innerHTML = '';
        //canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        //faceapi.draw.drawDetections(canvas, resizedDetections)
        //faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        //faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
        proctorScene(detections)
    }, 1000)
})
