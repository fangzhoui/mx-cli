import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Loading from '../components/loading';
import App from '../pages/index';
// 按路由拆分代码
import Loadable from 'react-loadable';

const getComponent = (page) => {
	return Loadable({
		loader: () => import(`../pages/${page}`),
		loading: Loading,
		timeout: 10000
	});
};

// const getComponent = (page) => {
// 	if(process.env.NODE_ENV !== 'production'){
// 		return require(`../pages/${page}`);
// 	}else{
// 		return Loadable({
// 			loader: () => import(`../pages/${page}`),
// 			loading: Loading,
// 			timeout: 10000
// 		});
// 	}
// };


export default () => (
	<Router>
		<App>
			<Switch>
				<Route exact path="/" component={getComponent('Home')} />
				<Route path="/login" component={getComponent('Login')} />
			</Switch>
		</App>
	</Router>
);
