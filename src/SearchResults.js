import React from 'react';
import './css/SearchResults.css';
import { ApiService } from './ApiService.js';

export function SearchResults() {

	ApiService().searchByKeyword('BB15');
	ApiService().fetchUserData('1475790344574799872');

	return(

		<div id="results-container">
			<div className="result">
				<div className="space-title">
					<i className="fa fa-microphone-alt"></i>&nbsp;&nbsp;Space Title
				</div>
				<div className="space-timing">
					Time: Active Now
				</div>
				<div className="action-btn">
					<button><i className="fa fa-headphones"></i>&nbsp;&nbsp;Listen</button>
				</div>
			</div>
			<div className="result">
				<div className="space-title">
					<i className="fa fa-microphone-alt"></i>&nbsp;&nbsp;Space Title
				</div>
				<div className="space-timing">
					Time: Active Now
				</div>
				<div className="action-btn">
					<button><i className="fa fa-headphones"></i>&nbsp;&nbsp;Listen</button>
				</div>
			</div>
		</div>

		);
}