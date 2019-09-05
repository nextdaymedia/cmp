import requirePostscribe from './lib/require-postscribe';

const currentScript = document.currentScript;
window.top.__cmp('getConsentData', null, data => {
	const { gdprApplies , consentData } = data;
	const url = new URL(currentScript.src);
	const queryParams = new URLSearchParams(url.search);
	queryParams.set('gdpr', gdprApplies ? '1': '0');
	queryParams.set('gdpr_consent', consentData);
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
