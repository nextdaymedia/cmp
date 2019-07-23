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
	render(props, state) {
		const {
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
						<LocalLabel localizeKey='title'/>
					</div>
				</div>
				<div class={detailsStyle.description} style={{color: textColor}}>
					<LocalLabel localizeKey='description'/>
				</div>
				<div class={style.infoItems} style={{color: textColor}}>
					<ul>
						<li><LocalLabel localizeKey='item1' style={{color: textColor}}/></li>
						<li><LocalLabel localizeKey='item2' style={{color: textColor}}/></li>
						<li><LocalLabel localizeKey='item3' style={{color: textColor}}/></li>
						<li><LocalLabel localizeKey='item4' style={{color: textColor}}/></li>
						<li><LocalLabel localizeKey='item5' style={{color: textColor}}/></li>
						<li><LocalLabel localizeKey='item6' style={{color: textColor}}/></li>
						<li><LocalLabel localizeKey='item7' style={{color: textColor}}/></li>
					</ul>
				</div>
				<a onClick={onPurposesClick} style={{color: linkColor}}>
					<LocalLabel localizeKey='customizeData'/>
				</a>
			</div>
		);
	}
}
