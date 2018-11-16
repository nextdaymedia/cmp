function adSense(container, format) {
	let tag = document.createElement("script");
	tag.src = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
	tag.async = true;
	tag.onload = function() {
		let insWidth = ins.offsetWidth;
		let insHeight = ins.offsetHeight;
		container.style.width = insWidth + "px";
		container.style.height = insHeight + "px";
	};

	let ins = document.createElement("ins");
	ins.className = "adsbygoogle";
	ins.style.textAlign = "center";
	ins.dataset.adClient = "ca-pub-4402427756333803";

	if (format === "300x600") {
		ins.style.display = "inline-block";
		ins.style.width = "300px";
		ins.style.height = "600px";
		ins.dataset.adSlot = "3453110453";
	} else if (format === "728x90") {
		ins.style.display = "inline-block";
		ins.style.width = "728px";
		ins.style.height = "90px";
		ins.dataset.adSlot = "8945110286";
	} else {
		ins.style.display = "block";
		ins.dataset.adSlot = "4786373426";
		ins.dataset.adFormat = "auto";
		ins.dataset.fullWidthResponsive = "true";
	}

	let googleScript = document.createElement("script");
	googleScript.text = "(adsbygoogle = window.adsbygoogle || []).push({});";

	let div = document.createElement("div");
	div.appendChild(googleScript);
	div.appendChild(ins);
	div.appendChild(tag);

	return div;
}

export default adSense;