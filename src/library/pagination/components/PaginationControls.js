'use strict';

import React from 'react';
import classNames from 'classnames';

export default class PaginationControls extends React.Component {
	constructor() {
		super();

		this.state = {
			pages: [],
			currentPage: 1
		}
	}

	componentWillReceiveProps(nextProps) {
		let startPage, endPage, phantomArraySlice;
		let phantomArray = [];
		for (let i = 0; i < nextProps.totalPages; i++) {
			phantomArray.push({
				'pageNumber': i + 1
			});
		}
		if (nextProps.totalPages <= 5) {
			startPage = 1;
			endPage = nextProps.totalPages;
		} else {
	        if (this.state.currentPage <= 3) {
	            startPage = 1;
	            endPage = 5;
	        } else if (this.state.currentPage + 2 >= nextProps.totalPages) {
	            startPage = nextProps.totalPages - 4;
	            endPage = nextProps.totalPages;
	        } else {
	            startPage = this.state.currentPage - 2;
	            endPage = this.state.currentPage + 2;
	        }
	    }

		phantomArraySlice = phantomArray.slice(startPage - 1, endPage);

		this.setState({
			pages: phantomArraySlice
		});
	}

	handlePageChange(pageNumber, e) {
		e.preventDefault();

		if (pageNumber !== this.state.currentPage) {
			this.props.handlePageChange(pageNumber);
			this.setState({
				currentPage: pageNumber
			});
		}
	}

	render() {
		return (
			<div className="pagination-controls">
				{
					this.props.totalPages > 1 &&
					<div>
						<div className="controls-list">
							<div className="page-button" onClick={this.handlePageChange.bind(this, (1))}><span className="fa fa-angle-double-left"></span></div>
							<div className="page-button" onClick={this.handlePageChange.bind(this, (this.state.currentPage > 1 ? this.state.currentPage - 1 : 1))}><span className="fa fa-angle-left"></span></div>

							{this.state.pages.map((button, i) => <div key={i} className={button.pageNumber === this.state.currentPage ? 'page-button active' : 'page-button'} onClick={this.handlePageChange.bind(this, button.pageNumber)}>{button.pageNumber}</div>)}

							<div className="page-button" onClick={this.handlePageChange.bind(this, (this.state.currentPage < this.props.totalPages ? this.state.currentPage + 1 : this.props.totalPages))}><span className="fa fa-angle-right"></span></div>
							<div className="page-button" onClick={this.handlePageChange.bind(this, (this.props.totalPages))}><span className="fa fa-angle-double-right"></span></div>
						</div>
						<div className="pages-info">
							{this.state.currentPage} of {this.props.totalPages} Total Pages
						</div>
					</div>
				}
			</div>
		);
	}
};

PaginationControls.propTypes = {
	pageNumber: React.PropTypes.number,
	pageSize: React.PropTypes.number,
	totalPages: React.PropTypes.number,
	totalResults: React.PropTypes.number,
	handlePageChange: React.PropTypes.func
}
