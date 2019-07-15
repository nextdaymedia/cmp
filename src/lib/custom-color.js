import color from "color";

const renderCustomColor = function(config) {
	// Custom styling
	console.log('CONFIG:', config);
	if (config.theme.primaryColor || config.customColor) {
		let theme = config.theme;
		theme.primaryColor = theme.primaryColor ? theme.primaryColor : config.customColor;
		theme.buttonHoverText = theme.buttonHoverText ? theme.buttonHoverText : '#FFF'; 
		let customStyle = `
			button.primary {
				color: ${theme.primaryColor} !important;
				border-color: ${theme.primaryColor} !important;
			}
			button.primary span {
				color: ${theme.primaryColor} !important;				
			}

			button.primary:hover {
				color: ${theme.buttonHoverText} !important;
				background: ${theme.primaryColor} !important;
				background: linear-gradient(90deg, ${theme.gradientLeft} 0%, ${theme.gradientRight} 100%) !important;
			}
			button.primary:hover span{
				color: ${theme.buttonHoverText} !important;
			}
		`;
		console.log(customStyle);
		const head = document.head || document.getElementsByTagName('head')[0];
		const style = document.createElement('style');
		style.type = 'text/css';
		if (style.styleSheet){
			style.styleSheet.cssText = customStyle;
		} else {
			style.appendChild(document.createTextNode(customStyle));
		}
		head.appendChild(style);
	}
};

export default renderCustomColor;
