import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Button} from 'antd-mobile';

@inject('Store')
@observer
export default class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: 'page1',
			buttonName: 'gotohome34'
		};
	}
	render() {
		return (
			<div className="home_container">
				<h3 className="home_container-title">{this.state.title}</h3>
				<Button onClick={() => this.props.history.push({pathname: '/'})}>{this.state.buttonName}</Button>
			</div>
		);     
	}
}
