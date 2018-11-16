import createImage from "./fallback-ad/createImage";
import createIframe from "./fallback-ad/createIframe";
import adSense from "./fallback-ad/adSense";
import { styleContainer, resizeContainer} from "./fallback-ad/container";
import adnxs from "./fallback-ad/adnxs";
import improve from "./fallback-ad/improve";
import weborama from "./fallback-ad/weborama";
import flashTalking from "./fallback-ad/flashTalking";
import dcm from "./fallback-ad/dcm";

window.addEventListener("message", (event) => {
	if  (~event.origin.indexOf('null')) {
		let data = event.data;
		resizeContainer(data);
	}

	if  (~event.origin.indexOf('https://s3.eu-central-1.amazonaws.com')) {
		let data = event.data;
		let { id, target, type, format } = data;
		let container = document.getElementById(id);

		if (container) {
			styleContainer(container);

			let image;
			let ad;
			let iframe;
			let parentDiv;

			switch (type) {
				case "image":
					image = createImage();
					container.appendChild(image);
					break;
				case "adSense":
					ad = adSense(container, data);
					container.appendChild(ad);
					break;
				case "improve":
					ad = improve(format);

					if (format == "970x250") {
						iframe = createIframe(ad, id, target);
						container.appendChild(iframe);
					} else {
						parentDiv = container.parentNode;
						parentDiv.replaceChild(ad, container);
					}

					break;
				case "adnxs":
					ad = adnxs();
					iframe = createIframe(ad, id, target);
					container.appendChild(iframe);
					break;
				case "weborama":
					ad = weborama();
					iframe = createIframe(ad, id, target);
					container.appendChild(iframe);
					break;
				case "flashtalking":
					ad = flashTalking();
					iframe = createIframe(ad, id, target);
					container.appendChild(iframe);
					break;
				case "dcm":
					ad = dcm();
					container.appendChild(ad);
					break;
				default:
					container.style.height = 0;
			}
		}
	} else {
		// The data hasn't been sent from your site!
		// Be careful! Do not use it.
		return;
	}
}, false);
