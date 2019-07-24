/* eslint-disable max-nested-callbacks */

import { expect } from 'chai';
import {GeolocationEventManager, GDPR_CHECK_DONE} from "./eventManager";

let eventManager;

describe('Geolocation event manager', () => {
	beforeEach(() => {
		eventManager = new GeolocationEventManager();
	});

	it('can add event listener', () => {
		let listenerCalledCount = 0;
		const listener = () => {
			listenerCalledCount++;
		};
		eventManager.addEventListener(GDPR_CHECK_DONE, listener);
		expect(eventManager.eventListeners.hasOwnProperty(GDPR_CHECK_DONE)).to.equal(true);
		expect(eventManager.eventListeners[GDPR_CHECK_DONE].has(listener)).to.equal(true);
		eventManager.gdprCheckDone();
		expect(listenerCalledCount).to.equal(1);
		eventManager.gdprCheckDone();
		expect(listenerCalledCount).to.equal(2);
	});

	it('can remove event listener', () => {
		let listenerCalledCount = 0;
		const listener = () => {
			listenerCalledCount++;
		};
		eventManager.addEventListener(GDPR_CHECK_DONE, listener);
		expect(eventManager.eventListeners.hasOwnProperty(GDPR_CHECK_DONE)).to.equal(true);
		expect(eventManager.eventListeners[GDPR_CHECK_DONE].has(listener)).to.equal(true);
		eventManager.gdprCheckDone();
		expect(listenerCalledCount).to.equal(1);

		eventManager.removeEventListener(GDPR_CHECK_DONE, listener);
		expect(eventManager.eventListeners.hasOwnProperty(GDPR_CHECK_DONE)).to.equal(true);
		expect(eventManager.eventListeners[GDPR_CHECK_DONE].has(listener)).to.equal(false);
		eventManager.gdprCheckDone();
		expect(listenerCalledCount).to.equal(1);
	});

	it('if gdpr check is done and listener is added afterwards, listener gets notified', () => {
		let listenerCalledCount = 0;
		const listener = () => {
			listenerCalledCount++;
		};

		eventManager.gdprCheckDone();
		expect(listenerCalledCount).to.equal(0);
		eventManager.addEventListener(GDPR_CHECK_DONE, listener);
		expect(listenerCalledCount).to.equal(1);
	});
});
