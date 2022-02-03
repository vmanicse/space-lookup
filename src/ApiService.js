export function ApiService() {

	const BaseUrl = 'https://space-lookup-backend.herokuapp.com/';
	//const BaseUrl = 'http://localhost:4200/';
	
	async function searchByKeyword(keyword) {
		const body = {'q': keyword};
		const headers = {'Content-Type':'application/json'};
		let res = await fetch(BaseUrl+'search', {method:'POST', headers: headers, body: JSON.stringify(body)});
		let result = await res.json();
		return result;
	}

	return {
		twitterUrl: 'https://twitter.com/',
		searchByKeyword: searchByKeyword,
	}
}