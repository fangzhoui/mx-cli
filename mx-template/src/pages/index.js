import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import ErrorBoundary from '../components/errorBoundary';
import {withRouter} from 'react-router-dom';

@withRouter
@inject('Store')
@observer
export default class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}
	render() {
		return (
			<ErrorBoundary>
				{this.props.children}
			</ErrorBoundary>
		);     
	}
}
