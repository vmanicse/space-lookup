import {React, useState} from 'react';
import './css/SearchResults.css';
import {ApiService} from './ApiService.js';

export function SearchResults({result, creatorList, noResultFound}) {
	
	const [initiatePagination, setPaginationDone] = useState(false);
	const [resultCards, setResultCards] = useState([]);
  	let paginatedPageContainer = [];

	function listen(spaceId) { 
		window.open(`${ApiService().twitterUrl}i/spaces/${spaceId}`, '_blank');
	}

	function formatDate(dateString) {
		if(dateString == null) return;
		let date = new Date(dateString);
		return `${date.toDateString()}, ${getUserReadableTimeFormat(date)}`;
	}

	function getUserReadableTimeFormat(date) {
		let minutes = date.getMinutes();
		let meridiem = '';
		let hours = '';
		let hour_in_24hrFormat = date.getHours();
		if(hour_in_24hrFormat >= 12) {
			if(hour_in_24hrFormat == 12) hours = hour_in_24hrFormat;
			else hours = hour_in_24hrFormat - 12;
			meridiem = 'PM';		
		} else {
			hours = hour_in_24hrFormat;
			meridiem = 'AM';
		}
		return `${hours}:${minutes < 10 ? '0'+minutes : minutes} ${meridiem}`;
	}

	
	const resultCardList = result.map((card, index) => {
		return (
			<div className="result" key={index}>
				<div className="space-title">
					<i className="fa fa-microphone-alt"></i>&nbsp;&nbsp;{card.title}
				</div>
				<div className="space-timing" style={card.state === 'live' ? {'color': '#4caf50'} : {'color': 'gray'}}>
					{card.state.toUpperCase()}
					<br/><br/>
					{card?.started_at ? (<span className="time">Started at: {formatDate(card.started_at)}</span>) : <span className="time">Scheduled at: {formatDate(card.scheduled_start)}</span>}
				</div>
				{card?.started_at ? <div id="listener-count"><i className="fa fa-headphones"></i> {card?.participant_count} Listeners</div> : <></>}
				
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
				{
					card?.started_at ? 
						<button onClick={() => listen(card.id)}><i className="fa fa-headphones"></i>&nbsp;&nbsp;Listen</button>
					:
						<button onClick={() => listen(card.id)}><i className="fas fa-bell"></i>&nbsp;&nbsp;Set Reminder</button>
				}
				</div>
			</div>
		);
	});

	const paginationProcess = () => {
    	paginatedPageContainer = [];
    	let temp = [...resultCardList],
      	_chunk = [];
    	while (temp.length > 0) {
      		_chunk = temp.splice(0, 10);
      		paginatedPageContainer.push(_chunk);
    	}
  	};

  	const paginator = (e = null, index = 0) => {
    	if (e != null) {
      		e.preventDefault();
      		index = Number(e.target.id);
      		e.stopPropagation();
      		activeBtnStyling(e.target.id);
      		if (Number(e.target.id)) window.scrollTo({ top: 0, behavior: 'smooth' });
    	}
    	if (index < paginatedPageContainer.length && paginatedPageContainer.length !== 0)
      	setResultCards(paginatedPageContainer[index]);
    	setPaginationDone(true);
  	};

  	const activeBtnStyling = (id) => {
    	let pageBtnList = document.getElementById('result-paginator');
    	if(pageBtnList == null) return;
    	if (pageBtnList.id == id) return;
    	let list = Array.from(pageBtnList.children);
    	list.map((element) => {
      		if (id === element.id) element.classList.add('activePageBtn');
      		else element.classList.remove('activePageBtn');
    	});
  	};

  	if (result.length !== 0) {
    	paginationProcess();
    	if (!initiatePagination) {
      		paginator(null, 0);
      		setTimeout(() => activeBtnStyling('0'), 1000);
    	}
  	}

  	const pagination = paginatedPageContainer.map((page, index) => {
    	let page_number = index + 1;
    	return (
      		<button key={index} id={index}>
        		{page_number}
      		</button>
    	);
  	});

	return(
		<>
			<div id="results-container">{resultCards}</div>
			{result.length > 10 ? <div id="result-paginator" onClick={(e) => paginator(e)}>{pagination}</div> : <></>}
			<p id="credit">
				<small>
					<a style={{'color':'gray'}} href={`${ApiService().twitterUrl}/being_mani`} target="_blank">
						Developed by <i className="fab fa-twitter"></i>@being_mani | Powered by Twitter
					</a>
				</small>
			</p>			
		</>
	);
}