import Promise from "promise-polyfill";

const requirePostscribe = () => {
	return new Promise(resolve => {
		if (window.postscribe) {
			resolve(window.postscribe);
		} else {
			import('postscribe' /* webpackChunkName: "postscribe" */).then(postscribe => {
				window.postscribe = postscribe.default;
				resolve(window.postscribe);
			});
		}
	});
};

export default requirePostscribe;
