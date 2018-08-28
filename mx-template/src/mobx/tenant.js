import {observable, action} from 'mobx';
import * as axiosHelper from "../utils/axiosHelper";

const initBaseInfo = {
	login: 0,
	user: '',
	age: 999
};

class Tenant {
	@observable baseInfo = localStorage.getItem('baseInfo') || initBaseInfo;

	@action async Logined(){
		let params = await axiosHelper.get({
			url: '/loginDate.json'
		}).catch(err => {
			console.log(err);
		});
		localStorage.setItem('baseInfo', params);
		this.baseInfo = params;
	}
    
    @action logout() {
		localStorage.removeItem('baseInfo');
		this.baseInfo = initBaseInfo;
	}
}

export default new Tenant();

