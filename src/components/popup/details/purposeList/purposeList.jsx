import { h, Component } from 'preact';
import style from './purposeList.less';
import detailsStyle from '../details.less';
import Label from "../../../label/label";

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'purposes'
	};
}

export default class PurposeList extends Component {

	static defaultProps = {
		onBack: () => {},
	};

	render(props, state) {
		const {
			// onBack,
			theme,
			onPurposesClick,
		} = props;

		const {
			textColor,
			linkColor,
			titleColor
		} = theme;

		return (
			<div class={style.purposeList}>
				<div class={style.header}>
					<div class={detailsStyle.title} style={{color: titleColor}}>
						<LocalLabel localizeKey='title'>What information is being used?</LocalLabel>
					</div>
				</div>
				<div class={detailsStyle.description} style={{color: textColor}}>
					<LocalLabel localizeKey='description'>Below is a complete list of the information that may be gathered.</LocalLabel>
				</div>
				<div class={style.infoItems} style={{color: textColor}}>
					<LocalLabel localizeKey='items'>
						<ul>
							<li style={{color: textColor}}>Type of browser and its settings</li>
							<li style={{color: textColor}}>Information about the device's operating system</li>
							<li style={{color: textColor}}>Cookie information</li>
							<li style={{color: textColor}}>Information about other identifiers assigned to the device</li>
							<li style={{color: textColor}}>The IP address from which the device accesses a client's website or mobile application</li>
							<li style={{color: textColor}}>Information about the user's activity on that device, including web pages and mobile apps visited or used</li>
							<li style={{color: textColor}}>Information about the geographic location of the device when it accesses a website or mobile application</li>
						</ul>
					</LocalLabel>
				</div>
				<a onClick={onPurposesClick} style={{color: linkColor}}><LocalLabel localizeKey='customizeData'>Customize how this data is used</LocalLabel></a>
			</div>
		);
	}
}
