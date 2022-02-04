export function ApiService() {

	const BaseUrl = 'https://space-lookup-backend.herokuapp.com/';
	//const BaseUrl = 'http://localhost:4200/';
	
	async function searchByKeyword(keyword) {
		const body = {'q': keyword};
		const headers = {'Content-Type':'application/json'};
		try {
			let res = await fetch(BaseUrl+'search', {method:'POST', headers: headers, body: JSON.stringify(body)});
			let result = await res.json();
			return {...result, ...{httpErr: false}};
		}
		catch(e) {
			return {httpErr: true};
		}
	}

	async function searchTwitterUser(username) {
		const body = {'username': username};
		const headers = {'Content-Type':'application/json'};
		try {
			let res = await fetch(BaseUrl+'user', {method:'POST', headers: headers, body: JSON.stringify(body)});
			let result = await res.json();
			return {...result, ...{httpErr: false}};
		}
		catch(e) {
			return {httpErr: true};
		}
	}

	return {
		twitterUrl: 'https://twitter.com/',
		searchByKeyword: searchByKeyword,
		searchTwitterUser: searchTwitterUser
	}
}