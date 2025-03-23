const search = document.getElementById("search");
const searchInput = document.getElementById("search");
let debounceTimeout;
let isRequestPending = false;
var erudaScript; 


window.addEventListener("DOMContentLoaded", () => {
	const link = atob(window.location.hash.slice(1));
	if (link) go(link);
});

document.getElementById("form").addEventListener("submit", (event) => {
	event.preventDefault();
	go(search.value);
});

async function fetchResults(searchText) {
	try {
		const response = await bare.fetch(`https://duckduckgo.com/ac/?q=${encodeURIComponent(searchText)}`);
		const data = await response.json();
		isRequestPending = false;
		if (!Array.isArray(data)) {
			console.log(`Error: Invalid response format. Expected Array (got ${typeof data})`);
			return;
		}
		const suggestions = document.getElementById("suggestions");
		suggestions.innerHTML = "";
		for(const result of (data.map(r => r.phrase))) {
			const suggestionItem = document.createElement("div");
			const suggestionLink = document.createElement("a");
			suggestionItem.classList = ["suggestions"];

			const boldText = result.includes(searchText) ? `<strong>${searchText}</strong>` : searchText;
			suggestionLink.innerHTML = result.replace(searchText, boldText);

			suggestionLink.addEventListener("click", (event) => {
				event.preventDefault();
				searchurl(result);
			});
			suggestionItem.appendChild(suggestionLink);
			suggestions.appendChild(suggestionItem);
		}
	} catch (e) {
		isRequestPending = false;
		console.error(e);
	}
}

searchInput.addEventListener("input", (event) => {
	clearTimeout(debounceTimeout);
	const searchText = event.target.value;
	if (document.getElementById("suggestions").children.length < 1) {
		document.getElementById("suggestions").style.display = "none"
	}
	debounceTimeout = setTimeout(() => {
		if (searchText.length >= 1) {
			fetchResults(searchText)
		}
		if (searchText.length < 1) {
			document.getElementById("suggestions").style.display = "none";
		} else {
			document.getElementById("suggestions").style.display = "block";
		}
	}, 100);
});

const form = document.getElementById("form");

searchInput.addEventListener("input", (event) => {
	const searchText = event.target.value;

	if (searchText.trim().length > 0) {
		form.focus();
	}
});

function erudaToggle() {
	var elem = document.getElementById("erudascr");
	
	if (erudaScript) {
		eruda.destroy(); 
		elem.removeChild(erudaScript);
		erudaScript = undefined;
	} else {
		erudaScript = document.createElement("script");
		erudaScript.src = "https://cdn.jsdelivr.net/npm/eruda";
		elem.appendChild(erudaScript);
		erudaScript.onload = function() {
			eruda.init();
			eruda.show();
		};
	}
}