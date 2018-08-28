import React from 'react';
import ReactDOM from 'react-dom';
import App from './router/index';
import './index.scss';
import Store from './mobx';
import { Provider } from 'mobx-react';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
	<Provider Store={Store}>
		<App/>
	</Provider>,
	document.getElementById('app')
);
 
if (module.hot) {
	module.hot.accept();
}

registerServiceWorker();

 