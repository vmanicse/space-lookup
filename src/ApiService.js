export function ApiService() {

	async function searchByKeyword(keyword) {
		const body = {'q': keyword};
		const headers = {'Content-Type':'application/json'};
		let res = await fetch('http://localhost:4200/search', {method:'POST', headers: headers, body: JSON.stringify(body)});
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