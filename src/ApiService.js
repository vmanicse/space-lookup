export function ApiService() {

	const BaseUrl = 'https://space-lookup-backend.herokuapp.com/';
	
	async function searchByKeyword(keyword) {
		const body = {'q': keyword};
		const headers = {'Content-Type':'application/json'};
		let res = await fetch(BaseUrl+'search', {method:'POST', headers: headers, body: JSON.stringify(body)});
		let result = await res.json();
		console.log(result);
		return result;
	}

	async function fetchUserData(id) {
		//1475790344574799872
	}

	return {
		twitterUrl: 'https://twitter.com/',
		searchByKeyword: searchByKeyword,
		fetchUserData: fetchUserData
	}
}