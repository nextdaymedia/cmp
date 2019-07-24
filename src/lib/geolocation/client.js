import 'whatwg-fetch';
import log from '../log';

const GDPR_APPLIES_UNKNOWN = "0";
const GDPR_APPLIES_NO = "1";
const GDPR_APPLIES_YES = "2";

class GeolocationClient {
	constructor(config) {
		this.config = config;
	}

	gdprCheck() {
		const controller = new AbortController();
		const signal = controller.signal;
		const fetchPromise = fetch(this.config.domain + '/gdpr-check', {signal});
		setTimeout(() => {
			controller.abort();
		}, this.config.timeout);

		return fetchPromise
			.then(res => {
				if (res.status !== 200) {
					throw new Error(`GDPR check expected response status 200, got ${res.status}`);
				}
				return res.text();
			})
			.catch(err => {
				log.error(`Failed to perform GDPR check: ${err}`);
				return GDPR_APPLIES_UNKNOWN;
			});
	}
}

export {
	GeolocationClient,
	GDPR_APPLIES_UNKNOWN,
	GDPR_APPLIES_NO,
	GDPR_APPLIES_YES,
};
