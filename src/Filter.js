import {React, useRef} from 'react';
import './css/Filter.css'

export function Filter({filterOptions}) {

	const creator_name = useRef('');
	const status = useRef('');

	function filterSearch() {
		const options = {
			creator_name: creator_name.current.value,
			status: status.current.value
		};

		if(options.creator_name == '' && options.status == '') return;		
		
		filterOptions(options);
	}

	return (
		<div id="popup-container">
			<select name="creator_name" ref={creator_name}>
				<option value="">Creater Name</option>
			</select>
			<select name="status" ref={status}>
				<option value="">Status</option>
				<option value="live">Live</option>
				<option value="scheduled">Scheduled</option>
			</select>
			<button id="filter-button" onClick={filterSearch}>Filter Search</button>
		</div>
		)
}