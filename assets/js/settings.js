function findSel(sel, name) {
	return [...sel.querySelectorAll("option")].filter(e => e.value == name)[0];
}

function changeFavicon(value) {
	setFavicon(value);
	localStorage.setItem("astralerz||favicon", value);
}

function changeTitle(value) {
	document.title = value;
	localStorage.setItem("astralerz||title", value);
}


window.addEventListener("load", () => {
	const searchSelector = document.getElementById("se");
	const proxySelector = document.getElementById("proxy");
	try {
	const st = localStorage.getItem("astralerz||themehex");
	if (st) document.querySelector("#colorPicker").value = savedTheme;
	if(localStorage.getItem("astralerz||search")) findSel(searchSelector, localStorage.getItem("astralerz||search")).selected = true;
	if(localStorage.getItem("astralerz||proxy")) findSel(proxySelector, localStorage.getItem("astralerz||proxy")).selected = true;
	} catch {}
	searchSelector.addEventListener("change", e => localStorage.setItem("astralerz||search", e.target.value));
	proxySelector.addEventListener("change", e => localStorage.setItem("astralerz||proxy", e.target.value));
	document.querySelector("#reset-theme").addEventListener("click", resetTheme);
	document.querySelector("#abc").addEventListener("click", abc);
	document.querySelector("#mystery-button").addEventListener("click", setFortniteMode);
});

function changeTheme(value) {
	localStorage.setItem("astralerz||themehex", value);
	document.body.style.backgroundColor = value;
}

function resetTheme() {
	localStorage.removeItem("astralerz||themehex");
	document.body.style.backgroundColor = "#0b0b0b";
	document.querySelector("#colorPicker").value = "#0b0b0b";
}

function setFortniteMode() {
	if (localStorage.getItem("astralerz||fortniteMode") === "activated") {
		// If Fortnite Mode is already activated, deactivate it
		document.body.style.backgroundImage = "";
		localStorage.removeItem("astralerz||fortniteMode")
	} else {
		// Otherwise, activate it
		document.body.style.backgroundImage = "url(\"https://i.ytimg.com/vi/6evDWowLMbE/maxresdefault.jpg\")";
		localStorage.setItem("astralerz||fortniteMode", "activated");
	}
}