import styleContainer from "./fallback-functions/container";
import createAd from "./fallback-functions/createAd";

window.addEventListener("message", (event) => {
	if (~event.origin.indexOf("https://s3.eu-central-1.amazonaws.com")) {
		let data = event.data;
		let { id } = data;
		let container = document.getElementById(id);

		if (container) {
			styleContainer(container);
			createAd(container, data);
		}
	} else if (~event.origin.indexOf('null')) {
		let data = event.data;
		let { id, containerWidth, containerHeight } = data;
		let container = document.getElementById(id);

		if (container) {
			container.style.width = containerWidth + "px";
			container.style.height = containerHeight + "px";
		}
	} else {
		// The data hasn't been sent from your site!
		// Be careful! Do not use it.
		return;
	}
}, false);
