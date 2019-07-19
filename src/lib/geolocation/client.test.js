/* eslint-disable max-nested-callbacks */

import { expect } from 'chai';
import {GeolocationClient, GDPR_APPLIES_UNKNOWN, GDPR_APPLIES_NO, GDPR_APPLIES_YES} from "./client";

let geolocationClient;

describe('Geolocation client', () => {
	beforeEach(() => {
		window.fetch = null;
		geolocationClient = new GeolocationClient({domain: 'foo', timeout: 1000});
	});

	it('gdprCheck returns a promise with a string on 200', () => {
		window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
			status: 200,
			text: () => GDPR_APPLIES_NO,
		}));
		return geolocationClient.gdprCheck()
			.then(result => {
				expect(result).to.equal(GDPR_APPLIES_NO);
			});
	});

	it('gdprCheck returns a promise with a GDPR_APPLIES_UNKNOWN if response is not 200', () => {
		window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
			status: 400,
			text: () => GDPR_APPLIES_NO,
		}));
		return geolocationClient.gdprCheck()
			.then(result => {
				expect(result).to.equal(GDPR_APPLIES_UNKNOWN);
			});
	});

	it('check constants', () => {
		expect(GDPR_APPLIES_UNKNOWN).to.equal("0");
		expect(GDPR_APPLIES_NO).to.equal("1");
		expect(GDPR_APPLIES_YES).to.equal("2");
	});
});
