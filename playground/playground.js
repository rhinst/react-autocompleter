import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AutoCompleter from '../src/AutoCompleter';
import languages from './languages.json';

document.title = 'React AutoCompleter Playground';
document.body.style.padding = '30px 40px';
document.body.style.background = '#eeeeee';
document.body.style.display = 'flex';
document.body.style.flexDirection = 'column';
document.body.style.alignItems = 'center';
document.body.style.fontFamily = '"Helvetica Neue", Helvetica, Arial, sans-serif';

document.body.innerHTML = `
	<div id="root"></div>
	<script src="/.js"></script>
`;

const styles = {
	root: {
		padding: '5px'
	},
	input: {
		padding: '20px',
		width: '350px',
		fontSize: '14px'
	},
	listContainer: {
		listStyleType: 'none',
		background: '#ffffff',
		padding: '20px',
		margin: '0'
	},
	listItems: {
		padding: '15px',

		'.active': {
			fontSize: '30px'
		}
	}
};

class Example extends Component {

	state = {
		value: '',
        placeholder: 'Find a programming language...',
		data: languages
	};

	updateValue = (value) => {
		console.log('Value updated', value);
		this.setState({
			value
		});
	};

	reloadData = () => {
		fetch('./countries.json')
            .then(response => (response.json()))
            .then(newData => {
                this.setState({
                    data: newData
                });
            });
		this.setState({
            placeholder: 'Find a programming language...'
		});
	};

	render() {
		return (
			<div>
				<h5>Press the up, down and enter keys to navigate!</h5>
				<h5>(Check the console for output)</h5>
				<button onClick={ this.reloadData }>Async Data Reload</button>
				<AutoCompleter
					data={ this.state.data }
					placeholder={ this.state.placeholder }
					onSelect={ (item) => { console.log('Selected', item); } }
					onFocus={ () => { console.log('Focused'); } }
					onBlur={ () => { console.log('Blurred'); } }
					onChange={ this.updateValue }
					limit={ 10 }
					classes={ {
                        root: 'autocomplete',
                        input: 'autocomplete-input',
                        listContainer: 'autocomplete-container',
                        listItems: 'autocomplete-items'
                    } }
					styles={ {
						...styles
                    } }
					inputProps={ {
						name: 'url',
						autoComplete: 'off'
					} }
				/>
			</div>
		);
	}
}

ReactDOM.render(<Example />, document.getElementById('root'));
