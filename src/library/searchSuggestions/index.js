'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {Input} from '../../library/validations';
import {scrollUp, scrollDown} from '../utilities/scrollHelpers';

export default function(Service, method) {
	let _keyChart = {
		9: 'tab',
		13: 'enter',
		27: 'escape',
		38: 'up',
		40: 'down'
	};

	let _skipSearch = false;
	let _selectedSuggestion = null;

	function configureSuggestion(displayKeys, suggestion) {
		let formattedSuggestion = '';
		displayKeys.forEach((key, i) => {
			formattedSuggestion += suggestion[key];
			if (i < displayKeys.length -1) {
				formattedSuggestion += ', '
			}
		})
		return formattedSuggestion;
	}

	const SearchSuggestions = class SearchSuggestions extends React.Component {
		constructor() {
			super();

			this.state = {
				'element': null,
				'inputString': '',
				'results': [],
				'selectedIndex': -1,
				'showSuggestions': false,
				'storedInputString': '',
				'suggestions': []
			};

			this.handleInputChange = this.handleInputChange.bind(this);
			this.onKeyDown = this.onKeyDown.bind(this);
			this.handleClickSelect = this.handleClickSelect.bind(this);
			this.handleClickAway = this.handleClickAway.bind(this);
			this.toggleSuggestions = this.toggleSuggestions.bind(this);
			this._scrollDown = this._scrollDown.bind(this);
			this._scrollUp = this._scrollUp.bind(this);
		}

		componentDidMount() {
			let element = ReactDOM.findDOMNode(this);
			this.setState({
				'element': element
			})
		}

		_scrollDown(suggestions, selectedIndex) {
			// TODO: Apply and test scroll utilities from library
			let rowCount = this.props.rowCount || 4;
			let elem = this.state.element
			let listElement = elem.getElementsByTagName('ul')[0];
			let rowHeight = elem.getElementsByTagName('li')[0].offsetHeight;
			let selectedRow = selectedIndex + 1;
			if (selectedRow <= suggestions.length) {
				if (selectedRow - (listElement.scrollTop / rowHeight) > rowCount) {
					listElement.scrollTop = (selectedRow - rowCount) * rowHeight + 3;
				} else if (selectedRow - (listElement.scrollTop / rowHeight) < 1) {
					listElement.scrollTop = 3 + (selectedRow * rowHeight) - rowHeight;
				}
			}
		}

		_scrollUp(selectedIndex) {
			// TODO: Apply and test scroll utilities from library
			let rowCount = this.props.rowCount || 4;
			let elem = this.state.element
			let listElement = elem.getElementsByTagName('ul')[0];
			let rowHeight = elem.getElementsByTagName('li')[0].offsetHeight;
			let containerHeight = rowCount * rowHeight;
			let selectedRow = selectedIndex + 1;
			if (selectedRow > 0) {
				if (selectedRow - ((listElement.scrollTop - 3) / rowHeight) < 2) {
					listElement.scrollTop = (selectedIndex - 1) * rowHeight + 3;
				} else if (selectedRow - ((listElement.scrollTop - 3) / rowHeight) > rowCount + 1) {
					listElement.scrollTop = 3 + (selectedRow * rowHeight) - (containerHeight + rowHeight);
				}
			}
		}

		handleClickAway() {
			this.setState({
				'inputString': this.state.storedInputString,
				'selectedIndex': -1,
				'selectedSuggesetion': null,
				'showSuggestions': false,
				'suggestions': []
			});
		}

		handleInputChange(e) {
			let value = e.target.value;
			this.setState({
				'inputString': value,
				'storedInputString': value
			});
			if (!_skipSearch) {
				Service[method](
					{
						"searchQuery": value,
						"maxResults": this.props.maxResults
					}
				).then((response) => {
					let showSuggestions = false;
					let suggestions = [];
					if (response.results.length > 0 && value.length >= this.props.minCharacters) {
						suggestions = response.results;
						showSuggestions = true;
					};
					this.setState({
						'showSuggestions': showSuggestions,
						'suggestions': suggestions
					})
				});
			} else {
				_skipSearch = false;
			}
			e.target.value = e.target.value;
			e.target.suggestionObject = _selectedSuggestion || null;
			this.props.handleInputChange(e);
		}

		handleClickSelect(e) {
			let suggestion = this.state.suggestions[e.target.getAttribute('data-index')];
			_selectedSuggestion = suggestion;
			let value = configureSuggestion(this.props.displayKeys, suggestion);
			_skipSearch = true;
			let event = new Event('input', { bubbles: true });
			let elem = ReactDOM.findDOMNode(this);
			let input = elem.getElementsByTagName('input')[0];
			input.value = configureSuggestion(this.props.displayKeys, suggestion);
			input.dispatchEvent(event);
			this.setState({
				'inputString': value,
				'selectedIndex': -1,
				'showSuggestions': false,
				'storedInputString': configureSuggestion(this.props.displayKeys, suggestion),
				'suggestions': []
			});
		}

		onKeyDown(e) {
			let key = _keyChart[e.keyCode];
			let inputString = this.state.inputString;
			let suggestions = this.state.suggestions;
			let selectedIndex = this.state.selectedIndex;
			let showSuggestions = this.state.showSuggestions;
			let storedInputString = this.state.storedInputString;
			if (!key) {
				_selectedSuggestion = null;
				this.setState({
					'selectedIndex': -1
				})
				return;
			}
			if (key !== 'tab') {
				e.preventDefault();
			}
			if (key === 'enter') {
				if (selectedIndex > -1) {
					storedInputString = configureSuggestion(this.props.displayKeys, suggestions[selectedIndex]);
					_selectedSuggestion = suggestions[selectedIndex];
				} else {
					_selectedSuggestion = null;
				}
				_skipSearch = true;
				let event = new Event('input', { bubbles: true });
				let elem = ReactDOM.findDOMNode(this);
				let input = elem.getElementsByTagName('input')[0];
				input.value = configureSuggestion(this.props.displayKeys, suggestions[selectedIndex]);
				input.dispatchEvent(event);
				selectedIndex = -1;
				showSuggestions = false;
				suggestions = [];
			}
			if (key === 'escape') {
				inputString = storedInputString;
				selectedIndex = -1;
				showSuggestions = false;
				suggestions = [];
			}
			if (key === 'down') {
				selectedIndex = selectedIndex < this.state.suggestions.length - 1 ? selectedIndex + 1 : selectedIndex;
				if (suggestions.length > 0) {
					this._scrollDown(suggestions, selectedIndex);
				}
			}
			if (key === 'tab') {
				if (selectedIndex < this.state.suggestions.length - 1) {
					selectedIndex++;
					e.preventDefault();
					if (suggestions.length > 0) {
						this._scrollDown(suggestions, selectedIndex);
					}
				} else {
					selectedIndex = -1;
					suggestions = [];
					inputString = storedInputString;
				}
			}
			if (key === 'up') {
				if (suggestions.length > 0) {
					this._scrollUp(selectedIndex);
				}
				selectedIndex = selectedIndex > -1 ? selectedIndex - 1 : selectedIndex;
				if (selectedIndex === -1) {
					inputString = storedInputString;
				}

			}
			if (selectedIndex > -1 && key !== 'escape') {
				inputString = configureSuggestion(this.props.displayKeys, suggestions[selectedIndex]) ;
			}
			this.setState({
				'inputString': inputString,
				'selectedIndex': selectedIndex,
				'showSuggestions': showSuggestions,
				'storedInputString': storedInputString,
				'suggestions': suggestions
			});
		}

		toggleSuggestions() {
			this.setState({
				'showSuggestions': !this.state.showSuggestions
			})
		}

		render() {
			let suggestionClasses = classNames({
				'search-suggestions': true,
				'active': this.state.showSuggestions && this.state.suggestions.length > 0
			});

			return (
				<div className={suggestionClasses} onKeyDown={this.onKeyDown}>
					<Input type="text" name={this.props.name} value={this.state.inputString} handleInputChange={this.handleInputChange} validate={this.props.validate} autoComplete="off" required={this.props.required}/>
					{
						this.state.showSuggestions && this.state.suggestions.length > 0 &&
						<div className="suggestions">
							<ul>
								{
									this.state.suggestions.map((suggestion, i) =>
										<li key={i} data-index={i} className={i === this.state.selectedIndex ? 'selected' : ''} onClick={this.handleClickSelect}>{configureSuggestion(this.props.displayKeys, suggestion)}</li>
									)
								}
							</ul>
						</div>
					}
					{
						this.state.showSuggestions && this.state.suggestions.length > 0 &&
						<div className="clickaway-backdrop" onClick={this.handleClickAway}></div>
					}
				</div>
			)
		}
	}

	SearchSuggestions.propTypes = {
		'displayKeys': React.PropTypes.array.isRequired,
		'handleInputChange': React.PropTypes.func.isRequired,
		'maxResults': React.PropTypes.number,
		'minCharacters': React.PropTypes.number,
		'name': React.PropTypes.string.isRequired,
		'required': React.PropTypes.bool,
		'rowCount': React.PropTypes.number,
		'validate': React.PropTypes.string
	}

	SearchSuggestions.defaultProps = {
		'maxResults': 10,
		'minCharacters': 3,
		'required': false
	}

	return SearchSuggestions;
}
