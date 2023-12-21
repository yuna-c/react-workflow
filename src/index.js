import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import youtubeReducer from './redux/youtubeSlice';
import memberReducer from './redux/memberSlice';
import historyReducer from './redux/historySlice';
import flickrReducer from './redux/flickrSlice';
import modalReducer from './redux/modalSlice';

//리듀서 객체값 하나로 묶어서 store생성
const store = configureStore({
	reducer: {
		youtubue: youtubeReducer,
		member: memberReducer,
		history: historyReducer,
		flickr: flickrReducer,
		modal: modalReducer
	}
});

ReactDOM.render(
	<BrowserRouter>
		{/* 전역 객체 APP에 전달 */}
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
);
