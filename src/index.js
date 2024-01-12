import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import youtubeReducer, { fetchYoutube } from './redux/youtubeSlice';
import memberReducer, { fetchMember } from './redux/memberSlice';
import historyReducer, { fetchHistory } from './redux/historySlice';
import flickrReducer, { fetchFlickr } from './redux/flickrSlice';
import modalReducer from './redux/modalSlice';
import menuReducer from './redux/menuSlice';
import darkReducer from './redux/darkSlice';

//리듀서 객체값 하나로 묶어서 store생성
const store = configureStore({
	reducer: {
		youtube: youtubeReducer,
		member: memberReducer,
		history: historyReducer,
		flickr: flickrReducer,
		modal: modalReducer,
		menu: menuReducer,
		dark: darkReducer
	}
});

ReactDOM.render(
	<BrowserRouter>
		{/* 전역 객체 APP에 전달 */}
		<Provider store={store}>
			<App api={[fetchFlickr, fetchYoutube, fetchMember, fetchHistory]} />
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
);

/*
	redux-toolkit 작업흐름
	1.데이터 카테고리 별로 slice파일안에 asyncThink비동기데이터반환및 액션객체 생성함수와 리듀서역할을 해주는 slice함수를 같이 정의
	2.index.js에서 개별적인 slice함수가 반환하는 각각의 객체를 합쳐서 store로 만든다음 Provider로 App에 전달
	3.fetching함수도 같이 App에 props로 전달
	4.App에서 배열로 전단된 데이터별 thunk함수는 반복호출하면서 dispatch로 slice에게 전달

	redux-toolkit 개념 (redux, thunk 미들웨어, immer.js가 포함된 통합 라이브러리)
	- redux-thunk :(saga와 더불어서 많이 쓰이는 비동기데이터 관련 미들웨어)
	- thunk는 액션객체뿐만 아니라 함수까지 객체로 묶어서 리듀서로 전달하는 방식
	- immer.js를 기반으로 saga대비 코드의 구조가 많이 간결해짐

	redux-toolkit을 채택하게된 배경
	- saga전용의 숙지해야될 메서드도 많고 파일구조도 복잡하게 비대해서 코드 관리 어렵고 액션타입 일일이 지정하는것도 불편
	- 특정 카테코리의 비동기데이터를 관리하기 위해서는 saga, reducer, api, actionTYpe파일들을 같이 봐야되는 번거로움
	- 비동기데이터 카테고리별로 관리하기 힘듬

	redux-tookit을 쓰면서 좋았던 점
	- tookit slice파일의 리듀서가 자동으로 asyncThunck메서드가 반환하는 비동기 promise의 상태를 인지해서 일일이 액션타입을 지정할 필요가 없어서 편함 (pending, fullfilled, rejected상태를 인지해서 내부적으로 고유액션타입을 자동생성해줌)
	- api함수 및 리듀서함수를 slice파일 하나로 관리할 수 있기 때문의 코드의 복잡도가 내려가고 내가 전역관리하려고 하는 비동기 데이터 관리만 집중할 수 있음

	redux-toolkit의 단점
	- 첨에는 자주쓰는 비동기데이터를 전역데이터에 저장해서 재활용하는 것이 불필요하게 refetching하지않아도 편하다고 생각됨
	- 비동기데이터 (서버데이터) 클라이언트에 제어권이 수시로 변경되는 데이터를 fetching한 그 순간의 정적인 상태로 store에 저장하는 것이 적절치 않다고 판단됨 (store에 저장되어 있는 비동기데이터는 fetching된 시점의 outdated data를 모든 컴포넌트에서 공유하는것이 데이터의 신뢰성 문제가 있을것으로 판단됨)
	- 비동기데이터를 컴포넌트에서 활용하기 위해서는 state생성 fetching함수 정의, useCallback으로 fetching함수 메모이제이션, useEffect에서 해당함수 호출이라는 일련의 작업이 번거로움
	- react-query새로운 개념의 비동기데이터 방법을 알게됨
	(react-query가이드문서 p.100)
*/
