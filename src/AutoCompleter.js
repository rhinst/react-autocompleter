import React, { Component } from 'react';
import Input from './Input';
import ListContainer from './ListContainer';
import PropTypes from 'prop-types';

class AutoCompleter extends Component {

	static displayName = 'AutoCompleter';

	static propTypes = {
		onSelect: PropTypes.func,
		onBlur: PropTypes.func,
		onFocus: PropTypes.func,
		onChange: PropTypes.func,
		data: PropTypes.array.isRequired,
		placeholder: PropTypes.string,
		limit: PropTypes.number,
		classes: PropTypes.object,
		styles: PropTypes.object,
		inputProps: PropTypes.object,
		keyboard: PropTypes.bool,
		value: PropTypes.string
	};

	static defaultProps = {
		placeholder: '',
		limit: 20,
		classes: {},
		styles: {
			root: {},
			input: {},
			listContainer: {},
			listItems: {}
		},
		inputProps: {},
		keyboard: true,
		value: ''
	};

	state = {
		itemList: this.props.data,
		filteredItemList: [],
		inputValue: this.props.value,
		navigate: 0
	};

	componentWillReceiveProps(nextProps) {
		// update itemList if itemList prop changed, and clear the input field
		if (nextProps.data !== this.props.data) {
			this.setState({ 
				itemList: nextProps.data,
				inputValue: ''
			});
		}
  }

	onSelect = (value) => {
		this.setState({
			filteredItemList: [],
			inputValue: value,
			navigate: 0
		});

		if (this.props.onSelect) {
			this.props.onSelect(value);
		}
	}

	onBlur = () => {
		this.setState({
			filteredItemList: []
		});

		if (this.props.onBlur) {
			this.props.onBlur();
		}
	}

	onFocus = () => {
		if (this.props.onFocus) {
			this.props.onFocus();
		}
	}

	onChange = (value) => {
		if (this.props.onChange) {
			this.props.onChange(value);
		}
	}

	handleInputChange = (e) => {
		this.onChange(e.target.value);
		let updatedList = [];

		this.setState({
			inputValue: e.target.value,
			navigate: 0
		});

		if (e.target.value.length) {
			updatedList = this.state.itemList.filter(item => {
				return e.target.value.length <= item.length && item.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
			});
		}

		if (this.props.limit && updatedList.length > this.props.limit) {
			updatedList = updatedList.slice(0, this.props.limit);
		}

		this.setState({
			filteredItemList: updatedList
		});
	}

	handleKeyEvent = (e) => {
		const { filteredItemList, inputValue } = this.state;
		const { onSelect, onChange } = this.props;
		let { navigate } = this.state;

		// down = 40, up = 38, enter = 13
		if (filteredItemList.length && (e.keyCode === 40 || e.keyCode === 38)) {
			if (e.keyCode === 40) {
				navigate++;
				if (navigate <= filteredItemList.length) {
					this.setState({
						navigate,
						inputValue: filteredItemList[navigate - 1]
					}, onChange(filteredItemList[navigate - 1]));
				}
			}
			if (e.keyCode === 38) {
				if (navigate === 1) {
					this.setState({
						navigate: 0,
						inputValue: '',
						filteredItemList: []
					}, onChange(filteredItemList[navigate - 1]));
				}
				if (navigate > 1) {
					navigate--;
					this.setState({
						navigate,
						inputValue: filteredItemList[navigate - 1]
					}, onChange(filteredItemList[navigate - 1]));
				}
			}
		}
		if (e.keyCode === 13 && inputValue !== '' && onSelect) {
			onSelect(inputValue);
			this.setState({
				navigate: 0,
				inputValue: inputValue,
				filteredItemList: []
			});
		}
	}

	render() {
		const { filteredItemList, inputValue, navigate } = this.state;
		const { placeholder, classes, styles, inputProps, keyboard } = this.props;

		return (
			<div className={ classes.root } style={ styles.root } ref='autocompleter-root' onKeyDown={ keyboard && this.handleKeyEvent }>
				<Input value={ inputValue } placeholder={ placeholder } className={ classes.input } styles={ styles.input } props={ inputProps } onChange={ this.handleInputChange } onBlur={ this.onBlur } onFocus={ this.onFocus } />
				<ListContainer data={ filteredItemList } onSelect={ this.onSelect } className={ classes.listContainer } itemClassName={ classes.listItems } styles={ styles.listContainer } itemStyles={ styles.listItems } navigate={ navigate - 1 } />
			</div>
		);
	}
}

export default AutoCompleter;
