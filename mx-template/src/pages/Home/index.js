import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import './index.scss';
import {Button} from 'antd';

@inject('Store')
@observer
export default class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: 'home',
			buttonName: 'gotopage1'
		};
	}
	UNSAFE_componentWillMount(){
		console.log(this.props, 'props');
	}
	render() {
		return (
			<div className="home_container">
				<h3 className="home_container-title">{this.state.title}</h3>
				<img src={require('../../assets/banner01_bg.png')} alt="" />
				<Button onClick={() => this.props.history.push({pathname: '/login'})}>{this.state.buttonName}</Button>
				<div className="home_container-banner"></div>
			</div>
		);     
	}
}
