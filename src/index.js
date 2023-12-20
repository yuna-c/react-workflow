import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import youtubeReducer, { fetchYoutube } from './redux/youtubeSlice';
import memberReducer, { fetchMember } from './redux/memberSlice';
import historyReducer, { fetchHistory } from './redux/historySlice';

const store = configureStore({
	reducer: {
		youtubue: youtubeReducer,
		member: memberReducer,
		history: historyReducer
	}
});

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<App api={[fetchYoutube, fetchMember, fetchHistory]} />
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
);
