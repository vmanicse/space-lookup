import {React, useState, useRef } from 'react';
import './css/SearchBar.css';
import { ApiService } from './ApiService.js';
import { SearchResults } from './SearchResults'

export function SearchBar() {

	const queryRef = useRef('');
	const [isLoading, setLoading] = useState(false);
	const [result, setResult] = useState([]);
	const [creatorList, setCreatorList] = useState([]);
	const errors = [undefined, null, ''];

	const searchResult = ApiService().searchByKeyword;

	async function search() {
		const q = queryRef.current.value;
		if(errors.includes(q)) return;
		setLoading(true);
		let res = await searchResult(q);
		if(res['data'] != undefined) {
			setResult(res['data']);
			setCreatorList(res['includes']['users']);
		} else {
			setResult([]);
			setCreatorList([]);
		}
		setLoading(false);
	}

	function keyupSearch(e) {
		if(e.keyCode == '13') search();
	}

    return (

        <>
        	<div id="searchbar-container">
				<div id="site-title">
					Space <i className="fa fa-microphone-alt"></i> Lookup
				</div>
				<div id="searchbar">
					<input type="text" name="q" id="q-input" placeholder="Try searching for Twitter spaces" ref={queryRef} onKeyUp={(e) => keyupSearch(e)} />
				</div>
				<div><button id="search-btn" onClick = {search}>Search</button></div>
			</div>

			{isLoading ? (<p className="loading">Searching... Please wait.</p>) : (<SearchResults result = {result} creatorList = {creatorList}/>)}
        </>

    );
}