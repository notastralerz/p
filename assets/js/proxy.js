const frame = document.getElementById("ifr");



function searchurl(url) {
	switch (localStorage.getItem("astralerz||search")) {
		case "ddg":
			proxy(`https://duckduckgo.com/?q=${url}`)
			break;
		case "brave":
			proxy(`https://search.brave.com/search?q=${url}`)
			break;
		default:
		case "google":
			proxy(`https://www.google.com/search?q=${url}`)
			break;
	}
}

function go(url) {
	if (!isUrl(url)) searchurl(url); else {
		if (!(url.startsWith("https://") || url.startsWith("http://"))) url = "http://" + url
		proxy(url)
	}
}

function isUrl(val = "") {
	if (/^http(s?):\/\//.test(val) || val.includes(".") && val.substr(0, 1) !== " ") return true;
	return false;
}

function resolveURL(url) {
	switch(localStorage.getItem("astralerz||proxy")) {
		case "dy": 
			return "/astralerz-dn/" + Ultraviolet.codec.xor.decode(url);
		default:
			case "uv":
				return  __uv$config.prefix + __uv$config.encodeUrl(url);
	}
}

function proxy(url) {
    // Show the ad before proxying the URL
    show_videoad(url);

    document.getElementById("align").style.display = "flex";
    document.querySelector(".sidebar").style.display = "";
    registerSW().then(worker => {
        frame.src = resolveURL(url);
    });
}

function exit() {
	document.getElementById("align").style.display = "none";
	document.querySelector(".sidebar").style.display = "";
	frame.src = "";
}

function show_videoad(url) {
    document.getElementById("align").style.display = "flex";
    document.querySelector(".sidebar").style.display = "";
    registerSW().then(worker => {
        frame.src = resolveURL(url);
    });
}
