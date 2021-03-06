import { expect } from 'chai';
import { getTCData } from "./cmp";
import log from './log';

describe('getTCData', () => {
	it('can get data from __tcfapi, if defined, with unknown cmpId, useractioncomplete', (done) => {
		log.logLevel = false;

		const tcfapi = jest.fn((command, version, callback) => {
			switch (command) {
				case 'addEventListener':
					callback({
						cmpId: -1,
						eventStatus: 'useractioncomplete'
					}, true);
					break;
				case 'removeEventListener':
					callback(true);
					break;
				default:
					throw new Error(`unknown command '${command}'`);
			}
		});
		const view = {
			__tcfapi: tcfapi
		};
		const callback = (data, success) => {
			expect(success).to.equal(true);
			expect(data.eventStatus).to.equal('useractioncomplete');

			expect(tcfapi.mock.calls.length).to.equal(2);

			expect(tcfapi.mock.calls[0][0]).to.equal('addEventListener');
			expect(tcfapi.mock.calls[0][1]).to.equal(2);
			expect(typeof(tcfapi.mock.calls[0][2])).to.equal('function');

			expect(tcfapi.mock.calls[1][0]).to.equal('removeEventListener');
			expect(tcfapi.mock.calls[1][1]).to.equal(2);
			expect(typeof(tcfapi.mock.calls[1][2])).to.equal('function');

			done();
		};

		getTCData(view, callback);
	});

	it('can get data from __tcfapi, if defined, with unknown cmpId, tcloaded', (done) => {
		log.logLevel = false;

		const tcfapi = jest.fn((command, version, callback) => {
			switch (command) {
				case 'addEventListener':
					callback({
						cmpId: -1,
						eventStatus: 'tcloaded',
					}, true);
					break;
				case 'removeEventListener':
					callback(true);
					break;
				default:
					throw new Error(`unknown command '${command}'`);
			}
		});
		const view = {
			__tcfapi: tcfapi
		};
		const callback = (data, success) => {
			expect(success).to.equal(true);
			expect(data.eventStatus).to.equal('tcloaded');

			expect(tcfapi.mock.calls.length).to.equal(2);

			expect(tcfapi.mock.calls[0][0]).to.equal('addEventListener');
			expect(tcfapi.mock.calls[0][1]).to.equal(2);
			expect(typeof(tcfapi.mock.calls[0][2])).to.equal('function');

			expect(tcfapi.mock.calls[1][0]).to.equal('removeEventListener');
			expect(tcfapi.mock.calls[1][1]).to.equal(2);
			expect(typeof(tcfapi.mock.calls[1][2])).to.equal('function');

			done();
		};

		getTCData(view, callback);
	});

	it('can get data from __tcfapi, if defined, with quantcast cmp v5', (done) => {
		log.logLevel = false;

		const tcfapi = jest.fn((command, version, callback) => {
			switch (command) {
				case 'addEventListener':
					callback({
						cmpId: 10,
						cmpVersion: 5,
						eventStatus: 'useractioncomplete',
					}, true);
					break;
				case 'removeEventListener':
					callback(true);
					break;
				default:
					throw new Error(`unknown command '${command}'`);
			}
		});
		const view = {
			__tcfapi: tcfapi
		};
		const callback = (data, success) => {
			expect(success).to.equal(true);
			expect(data.eventStatus).to.equal('useractioncomplete');

			expect(tcfapi.mock.calls.length).to.equal(2);

			expect(tcfapi.mock.calls[0][0]).to.equal('addEventListener');
			expect(tcfapi.mock.calls[0][1]).to.equal(2);
			expect(typeof(tcfapi.mock.calls[0][2])).to.equal('function');

			expect(tcfapi.mock.calls[1][0]).to.equal('removeEventListener');
			expect(tcfapi.mock.calls[1][1]).to.equal(2);
			expect(typeof(tcfapi.mock.calls[1][2])).to.equal('function');

			done();
		};

		getTCData(view, callback);
	});

	it('can get data from __tcfapi, if defined, with quantcast cmp >=v6, useractioncomplete', (done) => {
		log.logLevel = false;

		const tcfapi = jest.fn((command, version, callback) => {
			switch (command) {
				case 'addEventListener':
					callback({
						cmpId: 10,
						cmpVersion: 6,
						eventStatus: 'useractioncomplete',
					}, true);
					break;
				case 'removeEventListener':
					callback(true);
					break;
				default:
					throw new Error(`unknown command '${command}'`);
			}
		});
		const view = {
			__tcfapi: tcfapi
		};
		const callback = (data, success) => {
			expect(success).to.equal(true);
			expect(data.eventStatus).to.equal('useractioncomplete');

			expect(tcfapi.mock.calls.length).to.equal(2);

			expect(tcfapi.mock.calls[0][0]).to.equal('addEventListener');
			expect(tcfapi.mock.calls[0][1]).to.equal(2);
			expect(typeof(tcfapi.mock.calls[0][2])).to.equal('function');

			expect(tcfapi.mock.calls[1][0]).to.equal('removeEventListener');
			expect(tcfapi.mock.calls[1][1]).to.equal(2);
			expect(typeof(tcfapi.mock.calls[1][2])).to.equal('function');

			done();
		};

		getTCData(view, callback);
	});

	it('can get data from __tcfapi, if defined, with quantcast cmp >=v6, tcloaded', (done) => {
		log.logLevel = false;

		const tcfapi = jest.fn((command, version, callback) => {
			switch (command) {
				case 'addEventListener':
					callback({
						cmpId: 10,
						cmpVersion: 6,
						eventStatus: 'tcloaded',
					}, true);
					break;
				case 'removeEventListener':
					callback(true);
					break;
				default:
					throw new Error(`unknown command '${command}'`);
			}
		});
		const view = {
			__tcfapi: tcfapi
		};
		const callback = (data, success) => {
			expect(success).to.equal(true);
			expect(data.eventStatus).to.equal('tcloaded');

			expect(tcfapi.mock.calls.length).to.equal(2);

			expect(tcfapi.mock.calls[0][0]).to.equal('addEventListener');
			expect(tcfapi.mock.calls[0][1]).to.equal(2);
			expect(typeof(tcfapi.mock.calls[0][2])).to.equal('function');

			expect(tcfapi.mock.calls[1][0]).to.equal('removeEventListener');
			expect(tcfapi.mock.calls[1][1]).to.equal(2);
			expect(typeof(tcfapi.mock.calls[1][2])).to.equal('function');

			done();
		};

		getTCData(view, callback);
	});

	it('can get data from __tcfapi, if defined, with liveramp cmp, gdpr does apply', (done) => {
		log.logLevel = false;

		let consentDataExistCallback;
		const tcfapi = jest.fn((command, version, callback) => {
			switch (command) {
				case 'addEventListener':
					callback({
						cmpId: 3,
						gdprApplies: true,
					}, true);
					break;
				case 'removeEventListener':
					callback(true);
					break;
				case 'consentDataExist': // LiveRamp specific command
					consentDataExistCallback = callback;
					callback(true, true);
					break;
				default:
					throw new Error(`unknown command '${command}'`);
			}
		});
		const view = {
			__tcfapi: tcfapi
		};

		const callback = (data, success) => {
			// extra invocations from the consentDataExist command should not matter
			consentDataExistCallback(true, true);
			consentDataExistCallback(true, true);
			consentDataExistCallback(true, true);
			consentDataExistCallback(true, true);

			expect(success).to.equal(true);
			expect(data.gdprApplies).to.equal(true);

			expect(tcfapi.mock.calls.length).to.equal(3);

			expect(tcfapi.mock.calls[0][0]).to.equal('addEventListener');
			expect(tcfapi.mock.calls[0][1]).to.equal(2);
			expect(typeof(tcfapi.mock.calls[0][2])).to.equal('function');

			expect(tcfapi.mock.calls[1][0]).to.equal('consentDataExist');
			expect(tcfapi.mock.calls[1][1]).to.equal(2);
			expect(typeof(tcfapi.mock.calls[1][2])).to.equal('function');

			expect(tcfapi.mock.calls[2][0]).to.equal('removeEventListener');
			expect(tcfapi.mock.calls[2][1]).to.equal(2);
			expect(typeof(tcfapi.mock.calls[2][2])).to.equal('function');

			done();
		};

		getTCData(view, callback);
	});

	it('can get data from __tcfapi, if defined, with liveramp cmp, gdpr does not apply', (done) => {
		log.logLevel = false;

		const tcfapi = jest.fn((command, version, callback) => {
			switch (command) {
				case 'addEventListener':
					callback({
						cmpId: 3,
						gdprApplies: false,
					}, true);
					break;
				case 'removeEventListener':
					callback(true);
					break;
				default:
					throw new Error(`unknown command '${command}'`);
			}
		});
		const view = {
			__tcfapi: tcfapi
		};

		const callback = (data, success) => {
			expect(success).to.equal(true);
			expect(data.gdprApplies).to.equal(false);

			expect(tcfapi.mock.calls.length).to.equal(2);

			expect(tcfapi.mock.calls[0][0]).to.equal('addEventListener');
			expect(tcfapi.mock.calls[0][1]).to.equal(2);
			expect(typeof(tcfapi.mock.calls[0][2])).to.equal('function');

			expect(tcfapi.mock.calls[1][0]).to.equal('removeEventListener');
			expect(tcfapi.mock.calls[1][1]).to.equal(2);
			expect(typeof(tcfapi.mock.calls[1][2])).to.equal('function');

			done();
		};

		getTCData(view, callback);
	});

	it('can get data from __tcfapi, if defined, with cookiebot cmp', (done) => {
		log.logLevel = false;

		const tcfapi = jest.fn((command, version, callback) => {
			switch (command) {
				case 'addEventListener':
					callback({
						cmpId: 134,
						tcString: '1234',
					}, true);
					break;
				case 'removeEventListener':
					callback(true);
					break;
				default:
					throw new Error(`unknown command '${command}'`);
			}
		});
		const view = {
			__tcfapi: tcfapi
		};

		const callback = (data, success) => {
			expect(success).to.equal(true);
			expect(data.tcString).to.equal('1234');

			expect(tcfapi.mock.calls.length).to.equal(2);

			expect(tcfapi.mock.calls[0][0]).to.equal('addEventListener');
			expect(tcfapi.mock.calls[0][1]).to.equal(2);
			expect(typeof(tcfapi.mock.calls[0][2])).to.equal('function');

			expect(tcfapi.mock.calls[1][0]).to.equal('removeEventListener');
			expect(tcfapi.mock.calls[1][1]).to.equal(2);
			expect(typeof(tcfapi.mock.calls[1][2])).to.equal('function');

			done();
		};

		getTCData(view, callback);
	});

	it('can get data from __tcfapi, with Funding Choices cmp, GDPR does not apply', (done) => {
		log.logLevel = false;

		const tcfapi = jest.fn((command, version, callback) => {
			switch (command) {
				case 'addEventListener':
					callback({
						cmpId: 300,
						gdprApplies: false,
					}, true);
					break;
				case 'removeEventListener':
					callback(true);
					break;
				default:
					throw new Error(`unknown command '${command}'`);
			}
		});
		const view = {
			__tcfapi: tcfapi
		};

		const callback = (data, success) => {
			expect(success).to.equal(true);
			expect(data.gdprApplies).to.equal(false);

			expect(tcfapi.mock.calls.length).to.equal(2);

			expect(tcfapi.mock.calls[0][0]).to.equal('addEventListener');
			expect(tcfapi.mock.calls[0][1]).to.equal(2);
			expect(typeof(tcfapi.mock.calls[0][2])).to.equal('function');

			expect(tcfapi.mock.calls[1][0]).to.equal('removeEventListener');
			expect(tcfapi.mock.calls[1][1]).to.equal(2);
			expect(typeof(tcfapi.mock.calls[1][2])).to.equal('function');

			done();
		};

		getTCData(view, callback);
	});

	it('can get data from __tcfapi, with Funding Choices cmp, on useractioncomplete', (done) => {
		log.logLevel = false;

		const tcfapi = jest.fn((command, version, callback) => {
			switch (command) {
				case 'addEventListener':
					callback({
						cmpId: 300,
						eventStatus: 'useractioncomplete',
					}, true);
					break;
				case 'removeEventListener':
					callback(true);
					break;
				default:
					throw new Error(`unknown command '${command}'`);
			}
		});
		const view = {
			__tcfapi: tcfapi
		};

		const callback = (data, success) => {
			expect(success).to.equal(true);
			expect(data.eventStatus).to.equal('useractioncomplete');

			expect(tcfapi.mock.calls.length).to.equal(2);

			expect(tcfapi.mock.calls[0][0]).to.equal('addEventListener');
			expect(tcfapi.mock.calls[0][1]).to.equal(2);
			expect(typeof(tcfapi.mock.calls[0][2])).to.equal('function');

			expect(tcfapi.mock.calls[1][0]).to.equal('removeEventListener');
			expect(tcfapi.mock.calls[1][1]).to.equal(2);
			expect(typeof(tcfapi.mock.calls[1][2])).to.equal('function');

			done();
		};

		getTCData(view, callback);
	});

	it('can get data from __tcfapi, with Funding Choices cmp, on tcloaded', (done) => {
		log.logLevel = false;

		const tcfapi = jest.fn((command, version, callback) => {
			switch (command) {
				case 'addEventListener':
					callback({
						cmpId: 300,
						eventStatus: 'tcloaded',
					}, true);
					break;
				case 'removeEventListener':
					callback(true);
					break;
				default:
					throw new Error(`unknown command '${command}'`);
			}
		});
		const view = {
			__tcfapi: tcfapi
		};

		const callback = (data, success) => {
			expect(success).to.equal(true);
			expect(data.eventStatus).to.equal('tcloaded');

			expect(tcfapi.mock.calls.length).to.equal(2);

			expect(tcfapi.mock.calls[0][0]).to.equal('addEventListener');
			expect(tcfapi.mock.calls[0][1]).to.equal(2);
			expect(typeof(tcfapi.mock.calls[0][2])).to.equal('function');

			expect(tcfapi.mock.calls[1][0]).to.equal('removeEventListener');
			expect(tcfapi.mock.calls[1][1]).to.equal(2);
			expect(typeof(tcfapi.mock.calls[1][2])).to.equal('function');

			done();
		};

		getTCData(view, callback);
	});

	it('can get data from __tcfapi, with Funding Choices cmp, wait for CMP', (done) => {
		log.logLevel = false;

		const tcfapi = jest.fn((command, version, callback) => {
			switch (command) {
				case 'addEventListener':
					callback({
						cmpId: 300,
						gdprApplies: false,
					}, true);
					break;
				case 'removeEventListener':
					callback(true);
					break;
				default:
					throw new Error(`unknown command '${command}'`);
			}
		});
		const view = {};
		setTimeout(() => {
			view.__tcfapi = tcfapi;
		}, 1000);

		const callback = (data, success) => {
			expect(success).to.equal(true);
			expect(data.gdprApplies).to.equal(false);

			expect(tcfapi.mock.calls.length).to.equal(2);

			expect(tcfapi.mock.calls[0][0]).to.equal('addEventListener');
			expect(tcfapi.mock.calls[0][1]).to.equal(2);
			expect(typeof(tcfapi.mock.calls[0][2])).to.equal('function');

			expect(tcfapi.mock.calls[1][0]).to.equal('removeEventListener');
			expect(tcfapi.mock.calls[1][1]).to.equal(2);
			expect(typeof(tcfapi.mock.calls[1][2])).to.equal('function');

			done();
		};

		getTCData(view, callback);
	});

	it('can get data from __cmp, if defined', (done) => {
		log.logLevel = false;

		const cmp = jest.fn((command, arg, callback) => {
			switch (command) {
				case 'getConsentData':
					callback({consentData: '1234'}, true);
					break;
				default:
					throw new Error(`unknown command '${command}'`);
			}
		});
		const view = {
			__cmp: cmp,
		};
		const callback = (data, success) => {
			expect(success).to.equal(true);
			expect(data.tcString).to.equal('1234');

			done();
		};

		getTCData(view, callback);

		expect(cmp.mock.calls.length).to.equal(1);
		expect(cmp.mock.calls[0][0]).to.equal('getConsentData');
		expect(cmp.mock.calls[0][1]).to.equal(null);
		expect(typeof(cmp.mock.calls[0][2])).to.equal('function');
	});
});
