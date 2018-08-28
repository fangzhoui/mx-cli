import React, { Component } from 'react';
import { Toast } from 'antd-mobile';

export default class Loading extends Component{
	constructor(props){
		super(props);
		this.state = {

		};
	}
	UNSAFE_componentWillMount(){
		Toast.loading('Loading...', 0, () => {});
	}

	componentWillUnmount(){
		Toast.hide();
	}
	render(){
		return null;
	}
}