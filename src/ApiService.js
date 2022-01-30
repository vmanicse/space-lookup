export function ApiService() {

	const url = 'https://api.twitter.com/2/spaces/search';

	async function searchByKeyword(keyword) {
		const headers = {
			"Authorization": "Bearer AAAAAAAAAAAAAAAAAAAAAJSyYgEAAAAATIcYBvDxLl8wesEdKnelcg8xaWw%3DwzjUq0ZPtIb12DN57VVSAxXineFyeOQRzXqTTI4ilXA22fCVXO"
		};
		const res = await fetch('https://cors-anywhere.herokuapp.com/'+url+'?query='+keyword, {headers});
		const result = res.json();
		return result;
	}

	return {
		searchByKeyword: searchByKeyword
	}
}