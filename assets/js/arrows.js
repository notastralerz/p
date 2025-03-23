var ifr = document.getElementById("ifr")


function ifrBack() {
    ifr.contentWindow.history.back();
}

function ifrForward() {
    ifr.contentWindow.history.forward();
}