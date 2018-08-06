import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListItem extends Component {

	static propTypes = {
		onSelect: PropTypes.func,
		content: PropTypes.string.isRequired,
		className: PropTypes.string,
		styles: PropTypes.object,
		active: PropTypes.bool.isRequired
	};

	handleSelect = () => {
		this.props.onSelect(this.props.content);
	}

	render() {
		const { content, active, className, styles } = this.props;

		let classes = this.props.className;

		if (className && active) {
			classes += ' active';
		}

		return (
			<li ref='autocompleter-listItems' className={ classes } onClick={ this.handleSelect } style={ styles }>
				{ content }
			</li>
		);
	}
}

export default ListItem;
