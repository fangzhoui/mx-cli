import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import './index.scss';
import {Button} from 'antd-mobile';

@inject('Store')
@observer
export default class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: 'home',
			buttonName: 'gotopage1',
			show: false
		};
	}
	UNSAFE_componentWillMount(){
		console.log(this.props, 'props');
		this.props.Store.App.changeTitle('2222');
	}
	render() {
		return (
			<div className="home_container">
				<h3 className="home_container-title" onClick={() => this.setState({show: !this.state.show})}>{this.state.title}2222</h3>
				<Button onClick={() => this.props.history.push({pathname: '/login'})}>{this.state.buttonName}</Button>
				{this.state.show ? <div className="home_container-banner"><img src={require('../../assets/banner01_bg.png')} alt="" /></div> : null}
			</div>
		);     
	}
}
