function styleContainer(container) {
	let containerWidth = container.offsetWidth;
	let containerHeight = container.offsetHeight;

	container.innerHTML = null;
	container.style.position = "relative";
	container.style.margin = "0 auto";
	container.style.textAlign = "center";
	container.style.transition = "width 300ms, height 300ms";
	container.style.width = containerWidth + "px";
	container.style.height = containerHeight + "px";
}

export default styleContainer;
