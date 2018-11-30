export default function(script, data) {
	let { container_id, target } = data;
	let html = `<html>
					<body style="position: absolute;
							margin: 0;
							top: 50%;
							left: 50%;
							-webkit-transform: translate(-50%, -50%);
							-moz-transform: translate(-50%, -50%);
							-ms-transform: translate(-50%, -50%);
							-o-transform: translate(-50%, -50%);
							transform: translate(-50%, -50%);">
						${script}
						<script type="text/javascript">
							let body = document.querySelector("body");
							let { offsetWidth, offsetHeight } = body;
							let data = { 
								container_id: "${container_id}",
								width: offsetWidth, 
								height: offsetHeight, 
							};
							window.parent.postMessage(data, "${target}");
						</script>
					</body>
				</html>`;
	return `<iframe width="100%" height="100%" frameborder="0" src="data:text/html;charset=utf-8,${encodeURI(html)}" />`;
}
