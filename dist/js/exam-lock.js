// Disable text selection
//$("body").attr("onmousedown", "return false");
//$("body").attr("onselectstart", "return false");

// Switch to full screen
fullscreen = false
function toggleFullscreen() {
    let elem = document.querySelector("body");

    if (!document.fullscreenElement) {
        elem.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
        fullscreen = true
    }
}