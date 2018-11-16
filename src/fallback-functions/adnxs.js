function adnxs() {
	let tag = document.createElement("script");
	tag.src = "https://secure.adnxs.com/ttj?id=13379551&cb=${CACHEBUSTER}&pubclick=${CLICK_URL}";

	let div = document.createElement("div");
	div.style.display = "inline-block";
	div.appendChild(tag);

	return div;
}

export default adnxs;