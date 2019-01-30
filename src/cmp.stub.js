import listener from "./cmp.ssp";

(function(window) {
	const commandQueue = [];
	const cmp = function (command, parameter, callback) {
		commandQueue.push({
			command,
			parameter,
			callback
		});
	};
	cmp.commandQueue = commandQueue;
	cmp.receiveMessage = function (event) {
		const data = event && event.data && event.data.__cmpCall;
		if (data) {
			const {callId, command, parameter} = data;
			commandQueue.push({
				callId,
				command,
				parameter,
				event
			});
		}
	};

	window.__cmp = cmp;

	window.ndmtag = window.ndmtag || {};
	window.ndmtag.cmd = window.ndmtag.cmd || [];

	window.addEventListener("message", listener, false);
}(window));
