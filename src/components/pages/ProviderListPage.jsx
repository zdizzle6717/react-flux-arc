'use strict';

import React from 'react';
import { Link } from 'react-router';
import ProviderCard from '../pieces/ProviderCard';
import ProviderActions from '../../actions/ProviderActions';
import ProviderStore from '../../stores/ProviderStore';
import Animation from 'react-addons-css-transition-group';

export default class ProviderListPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            providers: []
        }
        this.onChange = this.onChange.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
    }

	componentWillMount() {
        ProviderStore.addChangeListener(this.onChange);
    }

    componentDidMount() {
        document.title = "Sandbox | Providers";
        ProviderActions.getProviders();
    }

	componentWillUnmount() {
		ProviderStore.removeChangeListener(this.onChange);
	}

	onChange() {
	    this.setState({
	      providers: ProviderStore.getProviders()
	    });
	}

	handleSort(e) {
		let searchParam = e.target.value;
		let providers = this.state.providers;
		let newOrder = providers.sort(function(a, b) {
			a = a[searchParam].toLowerCase();
			b = b[searchParam].toLowerCase();
		    if(a < b) return -1;
		    if(a > b) return 1;
		    return 0;
		});
		this.setState({
			providers: newOrder
		})
	}

	handleFilter(e) {
		let searchParam = e.target.value.toLowerCase();
		let providers = ProviderStore.getProviders();
		let filteredProviders = providers.filter((provider) => {
			if (JSON.stringify(provider).indexOf(searchParam) > -1) {
				return true;
			} else {
				return false;
			};
		});
		this.setState({
			providers: filteredProviders
		});
	}

    render() {
        return (
            <div className="row">
                <h1 className="push-bottom-2x">Providers</h1>
				<div className="row">
                    <div className="small-12 medium-4 large-4 columns">
						<Link key="providerCreate" to="/providers/create" className="button small-12 large-6"><i className="fa fa-plus"></i> Add New Provider</Link>
                    </div>
                    <div className="small-12 medium-4 large-4 columns medium-offset-4 large-offset-4">
						<div className="search-input">
							<input type="search" placeholder="Enter search terms..." onChange={this.handleFilter}/>
							<span className="fa fa-search search-icon"></span>
						</div>
                    </div>
                </div>
				<div className="row">
					<Animation transitionName="fade" transitionAppear={false} transitionEnter={true} transitionEnterTimeout={250} transitionLeave={true} transitionLeaveTimeout={250}>
						{this.state.providers.map((provider, i) => <ProviderCard key={i} {...provider}></ProviderCard>)}
					</Animation>
				</div>
				<div className="row">
					<div className="small-12 medium-6 large-3 medium-offset-6 large-offset-9 columns text-right">
	                    <label>Sort by:
	                        <select id="orderParams" defaultValue="createdAt" onChange={this.handleSort}>
	                            <option value="name">Name (ascending)</option>
	                            <option value="email">Email (ascending)</option>
	                            <option value="phone">Phone (ascending)</option>
	                            <option value="createdAt">Date Created (ascending)</option>
	                            <option value="updatedAt">Last Updated (ascending)</option>
	                        </select>
	                    </label>
	                </div>
				</div>
            </div>
        );
    }
}
