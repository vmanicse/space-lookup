import React from 'react';

export function ApiService() {

	const url = 'https://api.twitter.com/2/spaces/search';

	async function searchByKeyword(keyword) {
		const headers = {"Authorization": "Bearer AAAAAAAAAAAAAAAAAAAAAKacYgEAAAAA00%2Fiyz%2Fot5Uhlvvxtblb8m7H5Aw%3DGOonXNRlv0ReYOB4uzm9RHuvdNpXZqjW9w5joG9Uq9KhvbnRs0"};
		const res = await fetch(url+'?query='+keyword, {headers});
		const result = res.json();
		return result;
	}

	return {
		searchByKeyword: searchByKeyword
	}
}