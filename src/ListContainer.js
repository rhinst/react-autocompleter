import React, { Component, PropTypes } from 'react';
import ListItem from './ListItem';
import * as _ from 'lodash';

class ListContainer extends Component {

	static propTypes = {
		onSelect: PropTypes.func,
		data: PropTypes.array,
		className: PropTypes.string,
		itemClassName: PropTypes.string,
		styles: PropTypes.object,
		itemStyles: PropTypes.object,
		navigate: PropTypes.number.isRequired
	};

	static defaultProps = {
		itemStyles: {}
	};

	constructor(props) {
		super();
		const styles = _.cloneDeep(props.itemStyles);

		if (styles['.active']) {
			Object.assign(styles, styles['.active'] || {});
			delete styles['.active'];
		}

		this.state = {
			activeStyle: styles
		};
	}

	render() {
		const { onSelect, data, className, itemClassName, styles, navigate } = this.props;
		const { activeStyle } = this.state;
		
		// lodash cloneDeep prevents data mutation
		const itemStyles = _.cloneDeep(this.props.itemStyles);
		if (itemStyles['.active']) {
			delete itemStyles['.active'];
		}

		const container = (
			<ul className={ className } style={ styles } ref='autocompleter-listContainer'>
				{
					data.map((item, index) => {
						return (
							<ListItem onSelect={ onSelect } content={ item } key={ item } className={ itemClassName } styles={ (navigate === index ? activeStyle : itemStyles) } active={ navigate === index }/>
						);
					})
				}
			</ul>
		);

		if (!data.length) {
			return React.cloneElement(container, {
				style: {
					display: 'none'
				}
			});
		} else {
			return container;
		}
	}
}

export default ListContainer;
