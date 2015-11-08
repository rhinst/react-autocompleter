import React, { Component, PropTypes } from 'react';

class Input extends Component {

	static propTypes = {
		value: PropTypes.string,
		placeholder: PropTypes.string,
		onBlur: PropTypes.func,
		onFocus: PropTypes.func,
		onChange: PropTypes.func,
		className: PropTypes.string,
		styles: PropTypes.object,
		props: PropTypes.object
	};

	render() {
		const {
			value,
			placeholder,
			onBlur,
			onFocus,
			onChange,
			className,
			styles,
			props
			} = this.props;

		const type = (props && props.type) ? props.type : 'text';

		return (
			<input ref='autocompleter-input' type={ type } value={ value } placeholder={ placeholder } onBlur={ onBlur } onFocus={ onFocus } onChange={ onChange } className={ className } style={ styles } { ...props } />
		);
	}
}

export default Input;
