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