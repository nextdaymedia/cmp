import { expect } from 'chai';
import log from './log';

describe('log', () => {

	beforeEach(() => {
		window.console.log = jest.fn();
		window.console.info = jest.fn();
		window.console.warn = jest.fn();
		window.console.error = jest.fn();
	});

	it('default to warn', () => {
		expect(log.logLevel).to.equal('warn');
	});

	it('use console.log for "debug"', () => {
		log.logLevel = 'debug';
		log.debug('debug');
		log.info('info');
		log.warn('warn');
		log.error('error');

		expect(window.console.log.mock.calls).to.have.length(1);
		expect(window.console.info.mock.calls).to.have.length(1);
		expect(window.console.warn.mock.calls).to.have.length(1);
		expect(window.console.error.mock.calls).to.have.length(1);
	});

	it('use console.info for "info"', () => {
		log.logLevel = 'info';
		log.debug('debug');
		log.info('info');
		log.warn('warn');
		log.error('error');

		expect(window.console.log.mock.calls).to.be.empty;
		expect(window.console.info.mock.calls).to.have.length(1);
		expect(window.console.warn.mock.calls).to.have.length(1);
		expect(window.console.error.mock.calls).to.have.length(1);
	});

	it('use console.warn for "warn"', () => {
		log.logLevel = 'warn';
		log.debug('debug');
		log.info('info');
		log.warn('warn');
		log.error('error');

		expect(window.console.log.mock.calls).to.be.empty;
		expect(window.console.info.mock.calls).to.be.empty;
		expect(window.console.warn.mock.calls).to.have.length(1);
		expect(window.console.error.mock.calls).to.have.length(1);
	});

	it('use console.error for "error"', () => {
		log.logLevel = 'error';
		log.debug('debug');
		log.info('info');
		log.warn('warn');
		log.error('error');

		expect(window.console.log.mock.calls).to.be.empty;
		expect(window.console.info.mock.calls).to.be.empty;
		expect(window.console.warn.mock.calls).to.be.empty;
		expect(window.console.error.mock.calls).to.have.length(1);
	});
});
