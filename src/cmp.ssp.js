window.addEventListener("message", (event) => {
	let data = event.data;
	let { container_id, type } = data;
	let container = document.getElementById(container_id);
	if (!container) return;

	if (~event.origin.indexOf("https://s3.eu-central-1.amazonaws.com")) {
		let { offsetWidth, offsetHeight } = container;

		container.innerHTML = null;
		container.style.position = "relative";
		container.style.margin = "0 auto";
		container.style.textAlign = "center";
		container.style.transition = "width 300ms, height 300ms";
		container.style.width = offsetWidth + "px";
		container.style.height = offsetHeight + "px";

		if (type == 'close') {
			container.style.height = 0;
		} else {
			/*
			option 1: create iframe with script_url src
			container.innerHTML = <iframe src="{script_url}" />
			*/

			/*
			option 2: get script data with xhr
			create new iframe with script data
			container.innerHTML = <iframe src="data:text/html;charset=utf-8,${encodeURI(html)}" />
			 */
		}

	} else if (~event.origin.indexOf("null")) {
		// resize parent container to size inner iframe
		let { width, height } = data;
		container.style.width = width + "px";
		container.style.height = height + "px";
	} else {
		// The data hasn't been sent from your site!
		// Be careful! Do not use it.
		return;
	}
}, false);
