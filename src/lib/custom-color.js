import color from "color";

const renderCustomColor = function(config) {
	// Custom styling
	if (config.customColor) {
		let lighterColor = color(config.customColor).lighten(0.2).hex();
		let customStyle = `
			body div.intro_Ntqks .intro_KRr-J span {
				color: ${config.customColor};
			}
			body button.button_lgX0P.button_1bse9:hover, body input[type=button].button_lgX0P.button_1bse9:hover {
				background: #fff;
			}
			body button.button_lgX0P.button_1bse9:hover span, body input[type=button].button_lgX0P.button_1bse9:hover span {
				color: ${lighterColor};
			}
			body button.button_lgX0P.button_1bse9, body input[type=button].button_lgX0P.button_1bse9 {
				border-color: ${config.customColor};
				color: #499ec9;
			}
			body button.button_lgX0P:hover, body input[type=button].button_lgX0P:hover {
				background: ${lighterColor};
			}
			body button.button_lgX0P.button_1bse9 span, body input[type=button].button_lgX0P.button_1bse9 span {
				color: ${config.customColor};
			}
			body button.button_lgX0P, body input[type=button].button_lgX0P {
				background-color: ${config.customColor};
			}
			body .switch_YfiyU.switch_17KWm .switch_1u7wB {
				background-color: ${config.customColor};
			}
			body .switch_YfiyU .switch_3N7Vv {
				background-color: ${config.customColor};
			}
        `;
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
