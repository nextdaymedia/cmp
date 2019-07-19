import log from './../log';

const GDPR_CHECK_DONE = "gdpr-check-done";

class GeolocationEventManager {
	constructor() {
		this.eventListeners = {};
		this[GDPR_CHECK_DONE] = false;
	}

	addEventListener(event, callback) {
		const eventSet = this.eventListeners[event] || new Set();
		eventSet.add(callback);
		this.eventListeners[event] = eventSet;
		if (event === GDPR_CHECK_DONE && this[GDPR_CHECK_DONE]) {
			callback({event});
		}
	}

	removeEventListener(event, callback) {
		const eventSet = this.eventListeners[event] || new Set();
		eventSet.delete(callback);
		this.eventListeners[event] = eventSet;
	}

	notify(event, data = {}) {
		log.info(`Notify event: ${event}`);
		const eventSet = this.eventListeners[event] || new Set();
		eventSet.forEach(listener => {
			listener({event, data});
		});
	}

	gdprCheckDone() {
		this[GDPR_CHECK_DONE] = true;
		this.notify(GDPR_CHECK_DONE);
	}
}

export {
	GeolocationEventManager,
	GDPR_CHECK_DONE,
};
