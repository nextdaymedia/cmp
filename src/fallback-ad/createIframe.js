import createPostMessageScript from "./createPostMessageScript";

function createIframe(div, id, target) {
	let html = document.createElement("body");
	html.style.margin = 0;
	html.appendChild(div);

	let script = createPostMessageScript(id, target);
	html.appendChild(script);

	let iframe = document.createElement("iframe");
	iframe.width = "100%";
	iframe.height = "100%";
	iframe.frameBorder = 0;
	iframe.src = "data:text/html;charset=utf-8," + encodeURI(html.outerHTML);

	return iframe;
}

export default createIframe;
