import {observable, action} from 'mobx';

class App {
	@observable title = "loading";

	@action changeTitle(params){
		this.title = params;
	}
}

export default new App();

