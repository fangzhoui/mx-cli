import axios from 'axios';

const createAxiosInstance = (headers) => {
	if (!headers["Accept"]) {
		headers["Accept"] = "application/json";
	}
	if (!headers["Content-Type"]) {
		headers["Content-Type"] = "application/json";
	}
	//默认限定15秒超时
	let instance = axios.create({
		timeout: 30000,
		headers: headers
	});
	return instance;
};

export const get = ({url, headers})=>{
	return new Promise((resolve, reject) => {
		// logRequest(url);
		createAxiosInstance(headers)
			.get(url)
			.then(jsonData => {
				resolve(jsonData.data);
			})
			.catch(error => {
				// logFailed('GET', url, headers, undefined, error);
				reject({code: 1, msg: "网络请求失败", error});
			});
	});
};

export const post = async ({url, headers, params})=>{
	return new Promise((resolve, reject) => {
		// logRequest(url);
		createAxiosInstance(headers)
			.post(url, params)
			.then(jsonData => {
				// logSuccess('POST', url, headers, params, jsonData);
				resolve(jsonData.data);
			})
			.catch(error => {
				// logFailed('POST', url, headers, params, {msg: "网络请求失败", error});
				reject({code: 1, msg: "网络请求失败", error});
			});
	});
};

export const put = async ({url, headers, params})=>{
	return new Promise((resolve, reject) => {
		// logRequest(url);
		createAxiosInstance(headers)
			.put(url, params)
			.then(jsonData => {
				// logSuccess('PUT', url, headers, params, jsonData);
				resolve(jsonData.data);
			})
			.catch(error => {
				// logFailed('PUT', url, headers, params, error);
				reject({code: 1, msg: "网络请求失败", error});
			});
	});
};

export const deleteRequest = ({url, headers, params})=>{
	return new Promise((resolve, reject) => {
		// logRequest(url);
		createAxiosInstance(headers)
			.delete(url, {params})
			.then(jsonData => {
				// logSuccess('DELETE', url, headers, params, jsonData);
				resolve(jsonData.data);
			})
			.catch(error => {
				// logFailed('DELETE', url, headers, params, error);
				reject({code: 1, msg: "网络请求失败", error});
			});
	});
};

export const logRequest = (url)=>{
	console.time(`${url} 请求耗时`);
};

export const logSuccess = (method, url, headers, params, data)=>{
	console.log({
		[method + '-SUCCESS']: url,
		headers: JSON.stringify(headers),
		params: JSON.stringify(params)
	}, data);
	console.timeEnd(`${url} 请求耗时`);
};

export const logFailed = (method, url, headers, params, error)=>{
	console.warn({
		[method + '-FAIL']: url,
		headers: JSON.stringify(headers || ""),
		params: JSON.stringify(params || "")
	}, error);
	console.timeEnd(`${url} 请求耗时`);
};
