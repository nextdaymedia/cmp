import requirePostscribe from './lib/require-postscribe';
import { getTCData } from "./lib/cmp";
import log from './lib/log';

const currentScript = document.currentScript;
getTCData(window.top, (data, success) => {
	if (!success) {
		return log.error('getTCData was not successful');
	}
	const { gdprApplies , tcString } = data;
	const url = new URL(currentScript.src);
	const queryParams = new URLSearchParams(url.search);
	queryParams.set('gdpr', gdprApplies ? '1': '0');
	queryParams.set('gdpr_consent', tcString);
	const src = 'https://secure.adnxs.com/ttj?' + queryParams.toString();

	const container = document.createElement('div');
	const containerID = 'ndm-dfp-container-' + Math.random();
	container.setAttribute('id', containerID);
	currentScript.parentNode.appendChild(container);
	requirePostscribe()
		.then(postscribe => {
			postscribe('#' + containerID, `<script src="${src}"></script>`);
		});
});
