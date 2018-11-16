import createImage from "./createImage";
import adSense from "./adSense";
import improve from "./improve";
import createIframe from "./createIframe";
import adnxs from "./adnxs";
import weborama from "./weborama";
import flashTalking from "./flashTalking";
import dcm from "./dcm";

function createAd(container, data) {
	let { id, target, type, format } = data;
	let image, ad, iframe, parentDiv;

	switch (type) {
		case "image":
			image = createImage();
			container.appendChild(image);
			break;
		case "adsense":
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

export default createAd;
