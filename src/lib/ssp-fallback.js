import log from './log';
import Config from './config';
import requirePostscribe from './require-postscribe';

const listener = (event) => {
	const fallbackDomain = Config.fallback.listenDomain;
	if (! ~event.origin.indexOf(fallbackDomain)) {
		log.debug(`Origin '${event.origin}' does not contain '${fallbackDomain}'`);
		return;
	}

	const data = event.data;
	if (typeof data !== 'object' || data === null) {
		log.error('Data is not an object');
		return;
	}
	const { container_id, type } = data;

	const container = document.getElementById(container_id);
	if (!container) {
		log.error(`Could not find element by id '${container_id}'`);
		return;
	}

	const close = function(reason) {
		container.style.display = 'none';
		log.info(`Close ${container_id}: ${reason}`);
	};

	const setScript = function(script) {
		log.info('Set fallback script');
		for (let i = 0; i < container.children.length; i++) {
			container.children[i].style.display = 'none';
		}
		const newChild = document.createElement('div');
		const newChildID = 'fallback-ad-' + Math.random();
		newChild.setAttribute('id', newChildID);
		newChild.style.position = "relative";
		newChild.style.margin = "0 auto";
		newChild.style.textAlign = "center";
		newChild.style.height = 'auto';
		container.appendChild(newChild);

		requirePostscribe()
			.then(postscribe => {
				postscribe('#' + newChildID, script);
			});
	};

	if (type === 'script' || type === 'image') {
		const scriptURL = data.script_url;
		const scriptDomain = Config.fallback.scriptURL;
		if (! ~scriptURL.indexOf(scriptDomain)) {
			log.error(`Invalid script URL: '${scriptURL}' does not contain '${scriptDomain}'`);
			return;
		}

		const client = new XMLHttpRequest();
		client.ontimeout = function() {
			close(`request took longer than ${client.timeout} ms`);
		};
		client.onreadystatechange = function() {
			if (this.readyState === 4) {
				if (this.status === 200) {
					if (this.responseText === '') {
						close(`${scriptURL} returned an empty response body`);
						return;
					}
					setScript(this.responseText);
				} else {
					close(`request to ${scriptURL} failed with status ${this.status}`);
				}
			}
		};
		client.open('GET', scriptURL);
		client.timeout = 2000; // 2s
		client.send();
	} else if (type === 'close') {
		close("fallback type is 'close'");
	} else {
		close(`unknown fallback type '${type}'`);
	}
};

export default listener;
