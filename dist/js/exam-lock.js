// Disable text selection
$("body").attr("onmousedown", "return false");
$("body").attr("onselectstart", "return false");

// $("body").attr("onCopy", "return false");
// $("body").attr("onCut", "return false");
// $("body").attr("onpaste", "return false");
// $("body").attr("onDrag", "return false");
// $("body").attr("onDrop", "return false");
// $("body").attr("autocomplete", "off");

// Switch to full screen
function toggleFullscreen() {
    let elem = document.querySelector("body");

    if (!document.fullscreenElement) {
        elem.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
    }
}
toggleFullscreen()

// Disable keyboard
document.onkeydown = keydown;
function keydown(evt) {
    if (evt) {
        proctorLog('keyboard used')
        message = "Don't use keyboard while giving exam!"
        $('#log').val(message)
        proctorSpeak(message)
    }
}

// Get Exam ID, User ID from URL
var urlParams = new URLSearchParams(window.location.search);
var entries = urlParams.entries();
for (pair of entries) {
    console.log(pair[0], pair[1]);
}

// Check the validity of Exam ID & User ID