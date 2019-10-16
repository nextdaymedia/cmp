import config from '../../config';

const logLevels = [
	'debug',
	'info',
	'warn',
	'error'
];

class Log {
	constructor(logLevel) {
		this.logLevel = logLevel || config.logLevel || 'warn';

		logLevels.reduce((logger, funcName, index) => {
			logger[funcName] = function (...args) {
				const consoleFunc = funcName === 'debug' ? 'log' : funcName;
				if (this.logLevel && console && typeof console[consoleFunc] === 'function') {
					const enabledLevelIndex = logLevels.indexOf(this.logLevel.toString().toLocaleLowerCase());
					if (enabledLevelIndex > -1 && index >= enabledLevelIndex) {
						const [message, ...rest] = [...args];
						console[consoleFunc](`${funcName.toUpperCase()} - (CMP) ${message}`, ...rest);
					}
				}
			};
			return logger;
		}, this);
	}
}

const log = new Log();
export default log;
