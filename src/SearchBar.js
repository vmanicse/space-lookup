import {React, useState, useRef} from 'react';
import './css/SearchBar.css';
import { ApiService } from './ApiService.js';
import { SearchResults } from './SearchResults'
import {Filter} from './Filter';

export function SearchBar() {

	const queryRef = useRef('');
	const [isLoading, setLoading] = useState(false);
	const [result, setResult] = useState([]);
	const [noResultFound, setNoResut] = useState(false);
	const [isHttpErr, setHttpErr] = useState(false);
	const [creatorList, setCreatorList] = useState([]);
	const errors = [undefined, null, ''];
	const loadingMsg = 'Searching... Please wait.';
	const noResultMsg = 'Sorry. The term you entered did not bring up any results.';
	const httpErrMsg = 'Sorry. Something went wrong.';
	const [filterIcon, setFilterIcon] = useState("fas fa-filter");
	const [filterOn, setFilter] = useState(false);

	const searchResult = ApiService().searchByKeyword;

	async function search() {
		const q = queryRef.current.value;
		if(errors.includes(q)) return;
		setLoading(true);
		let res = await searchResult(q);
		if(!res.httpErr) {
			if(res['data'] != undefined) {
				setResult(res['data']);
				setCreatorList(res['includes']['users']);
				setNoResut(false);
			} else {
				setResult([]);
				setCreatorList([]);
				setNoResut(true);
			}
		} else {
			setHttpErr(true);
		}
		setLoading(false);
	}

	function keyupSearch(e) {
		if(e.keyCode == '13') {
			e.target.blur();
			search();
		}
	}

	function loadingScreen() {
		return (
			<>
				<div id="loading-icon"><i className="fa fa-microphone-alt"></i></div>
				<p className="loading">{loadingMsg}</p>				
			</>
		);
	}

	function resultsNotFound() {
		return (<p id="no-result">{noResultMsg}</p>);
	}

	function getSearchResults() {
		return (<SearchResults result = {result} creatorList = {creatorList} noResultFound = {noResultFound}/>);
	}

	function httpErr() {
		return (<p id="no-result">{httpErrMsg}</p>);
	}

	function filterSearch() {
  		if(filterOn) {
  			setFilter(false);
  			setFilterIcon("fas fa-filter");
  		} else {
  			setFilter(true);
  			setFilterIcon("fas fa-times");
  		}
  	}

  	function filterOptions(options) {
  		filterSearch();
  		let filtered_result = result.filter(obj => {
  			if(options.status != '' && obj.state == options.status) {
  				return obj;
  			}
  		});
  		setResult(filtered_result);
  	}

    return (

        <>
        	<div id="searchbar-container">
				<div id="site-title">
					Space <i className="fa fa-microphone-alt"></i> Lookup
				</div>
				<div id="searchbar">
					<input type="search" name="q" id="q-input" placeholder="Try searching for Twitter spaces" ref={queryRef} onKeyUp={(e) => keyupSearch(e)} disabled={isLoading} />
				</div>
				<div><button id="search-btn" onClick = {search} disabled={isLoading}>Search</button></div>				
			</div>

			{ isLoading ? loadingScreen() : noResultFound ? resultsNotFound() : isHttpErr ? httpErr() : getSearchResults() }

			{/* <div id="filter-icon" onClick={filterSearch}><i className={filterIcon}></i></div> */}
   {/*    		{filterOn ? <Filter filterOptions={filterOptions} /> : <></>} */}
        </>

    );
}