function dcm() {
	let script = document.createElement("script");
	script.src = "https://www.googletagservices.com/dcm/dcmads.js";

	let ins = document.createElement("ins");
	ins.className = "dcmads";
	ins.style.display = "inline-block";
	ins.style.width = "970px";
	ins.style.height = "250px";
	ins.dataset.dcmPlacement = "N33505.2276702NEXTDAYMEDIANL/B21655605.228150382";
	ins.dataset.renderingMode = "script";
	ins.dataset.dcmClickTracker = "${CLICK_URL}";
	ins.appendChild(script);

	return ins;
}

export default dcm;