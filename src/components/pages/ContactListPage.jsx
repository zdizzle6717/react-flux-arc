'use strict';

import React from 'react';
import {Link} from 'react-router';
import Animation from 'react-addons-css-transition-group';
import ContactCard from '../pieces/ContactCard';
import ContactActions from '../../actions/ContactActions';
import ContactStore from '../../stores/ContactStore';
import { PaginationControls } from '../../library/pagination';

export default class ContactListPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            contacts: [],
			pagination: {}
        }
        this.onChange = this.onChange.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
    }

	componentWillMount() {
        ContactStore.addChangeListener(this.onChange);
    }

    componentDidMount() {
        document.title = "Sandbox | Contacts";
        ContactActions.searchContacts({
			'searchQuery': '',
			'pageNumber': 1,
			'pageSize': 3
		}).then((response) => {
			this.setState({
				pagination: response.pagination
			})
		});
    }

	componentWillUnmount() {
		ContactStore.removeChangeListener(this.onChange);
	}

	onChange() {
	    this.setState({
	      contacts: ContactStore.getContacts()
	    });
	}

	handleSort(e) {
		let searchParam = e.target.value;
		let contacts = this.state.contacts;
		let newOrder = contacts.sort(function(a, b) {
			a = a[searchParam].toLowerCase();
			b = b[searchParam].toLowerCase();
		    if(a < b) return -1;
		    if(a > b) return 1;
		    return 0;
		});
		this.setState({
			contacts: newOrder
		})
	}

	handleFilter(e) {
		let searchParam = e.target.value.toLowerCase();
		let contacts = ContactStore.getContacts();
		let filteredContacts = contacts.filter((contact) => {
			if (JSON.stringify(contact).indexOf(searchParam) > -1) {
				return true;
			} else {
				return false;
			};
		});
		this.setState({
			contacts: filteredContacts
		});
	}

	handlePageChange(pageNumber) {
		ContactActions.searchContacts({
			'searchQuery': '',
			'pageNumber': pageNumber,
			'pageSize': 3
		}).then((response) => {
			this.setState({
				pagination: response.pagination
			})
		});
	}

    render() {
        return (
            <div className="row">
                <h1 className="push-bottom-2x">Contacts</h1>
                <div className="row">
                    <div className="small-12 medium-4 large-4 columns">
                        <Link key="contactCreate" to="/contacts/create" className="button small-12 large-6"><i className="fa fa-plus"></i> Add New Contact</Link>
                    </div>
                    <div className="small-12 medium-4 large-4 columns medium-offset-4 large-offset-4">
						<div className="search-input">
							<input type="search" placeholder="Enter search terms..." onChange={this.handleFilter}/>
							<span className="fa fa-search search-icon"></span>
						</div>
                    </div>
                </div>
                <div className="row">
					<Animation transitionName="fade" transitionAppear={true} transitionAppearTimeout={250} transitionEnter={true} transitionEnterTimeout={250} transitionLeave={true} transitionLeaveTimeout={250}>
	                    {this.state.contacts.map((contact, i) => <ContactCard key={i} {...contact} fullName={contact.firstName + ' ' + contact.lastName}></ContactCard>)}
					</Animation>
                </div>
				<div className="row">
					<div className="small-12 medium-6 medium-offset-6 large-3 large-offset-9 columns text-right">
	                    <label>Sort by:
	                        <select id="orderParams" defaultValue="createdAt" onChange={this.handleSort}>
	                            <option value="lastName">Lastname (ascending)</option>
	                            <option value="email">Email (ascending)</option>
	                            <option value="mobilePhone">Mobile Phone (ascending)</option>
	                            <option value="createdAt">Date Created (ascending)</option>
	                            <option value="updatedAt">Last Updated (ascending)</option>
	                        </select>
	                    </label>
	                </div>
				</div>
				<div className="row">
					<div className="small-12 columns">
						<PaginationControls pageNumber={this.state.pagination.pageNumber} pageSize={this.state.pagination.pageSize} totalPages={this.state.pagination.totalPages} totalResults={this.state.pagination.totalResults} handlePageChange={this.handlePageChange.bind(this)}></PaginationControls>
					</div>
				</div>
            </div>
        );
    }
}
