function createPostMessageScript(id, target) {
	let script = document.createElement("script");
	script.type = "text/javascript";
	script.text = `var div = document.querySelector("div");
		var containerWidth = div.offsetWidth;
		var containerHeight = div.offsetHeight;

		window.parent.postMessage({
			id: "${id}",
			containerWidth: containerWidth,
			containerHeight: containerHeight,
		}, "${target}");`;

	return script;
}

export default createPostMessageScript;