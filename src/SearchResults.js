import React from 'react';
import './css/SearchResults.css';
import {ApiService} from './ApiService.js';

export function SearchResults({result, creatorList}) {
	
	function listen(spaceId) { 
		window.open(`${ApiService().twitterUrl}i/spaces/${spaceId}`, '_blank');
	}

	function formatDate(dateString) {
		if(dateString == null) return;
		let date = new Date(dateString);
		return date.toLocaleString();
	}

	const resultCards = result.map((card, index) => {
		return (
			<div className="result" key={index}>
				<div className="space-title">
					<i className="fa fa-microphone-alt"></i>&nbsp;&nbsp;{card.title}
				</div>
				<div className="space-timing" style={card.state === 'live' ? {'color': '#4caf50'} : {'color': '#d6d5d5'}}>
					{card.state.toUpperCase()}
					<br/><br/>
					{card?.started_at ? (<span className="time">Started at: {formatDate(card.started_at)}</span>) : <span className="time">Scheduled at: {formatDate(card.scheduled_start)}</span>}
				</div>
				<div id="listener-count"><i className="fa fa-headphones"></i> {card?.participant_count} Listeners</div>
				
				{ creatorList[index]?.profile_image_url ? (
					<div id="host-info-container">
						<div id="creator-name">Created by:&nbsp;&nbsp;</div>
						<div id="host-info">
							<div id="img"><img src={creatorList[index]?.profile_image_url} width="100%"/></div>
							<div id="name">&nbsp;&nbsp;<a href={ApiService().twitterUrl+creatorList[index]?.username} target="_blank">{creatorList[index]?.name}</a></div>
						</div>
					</div>
					) 
				: 
					(<></>)
				}
				
				<div className="action-btn">
					<button onClick={() => listen(card.id)}><i className="fa fa-headphones"></i>&nbsp;&nbsp;Listen</button>
				</div>
			</div>
		);
	});

	return(
		result.length != 0 ? (

			<>
				<div id="results-container">{resultCards}</div>
				<p id="credit"><small>Developed by twitter.com/being_mani | Powered by Twitter</small></p>
			</>
		) : (

		<div></div>

		)
	);
}