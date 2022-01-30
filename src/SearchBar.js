import React from 'react';
import './css/SearchBar.css';

export function SearchBar() {

    return (

        <div id="searchbar-container">
			<div id="site-title">
				Space <i className="fa fa-microphone-alt"></i> Lookup
			</div>
			<div id="searchbar">
				<input type="text" name="q" id="q-input" placeholder="Search Twitter space by name or space ID."/>
			</div>
			<div><button id="search-btn">Search</button></div>
		</div>

    );
}