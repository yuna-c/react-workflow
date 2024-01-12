import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
);

/*
	해당 redux-saga로 작업을 진행한 이유
	- redux로 비동기 데이터를 전역 관리하려다보니 redux는 기본적으로 특정 데이터를 저장하는 역할

	- redux자체적으로 비동기데이터를 처리하기 위한 로직의 부재
	- redux-saga, redux-thunk, redux-toolkit같은 리덕스 전용의 미들웨어가 필요해짐
	- 액션(type,payload)(컴포넌트)  ---> reducer (비동기관련 미들웨어 없을떄)
	- 액션(type)(컴포넌트) ----> saga(middleware -비동기 데이터요청 수행후 초기액션객체 생성)  ----> reducer

	- generator기반으로 promise객체의 상태값을 내부적으로 판단해서 yield문으로 동기화처리후 반환된 값을 리듀서에 전달
	- generator함수 (여러개의 함수의 리턴값을 동기적으로 반환하게 하는 이터러블 객체를 생성해주는 함수)

	redux-saga로 비동기 데이터를 전역관리함으로 개선된점
	1. api함수를 따로 컴포넌트외부에서 정의한다음에 saga미들웨어를 통해서 비동기데이터 상태에 따라 비동기데이터를 액션객체 담아 리듀서에 자동으로 전달되도록 처리되므로 전역 state에 저장될 데이터의 동기화이슈를 신경쓸 필요가 없어짐
	2.프로젝트에서 수시로 데이터변경요청이 일어나는 flickr데이터로 컴포넌트에서 saga로 편리하게 관리가 가능해짐

	redux-saga를 적용하면서 개인적으로 느낀 아쉬운 점
	1.비동기데이터를 관리하기 위해서 설정하기위한 함수와 파일이 너무 많아져서 코드관리가 오히려 더 어려워지는 문제 발생
	2.코드자체가 너무 중앙집중적이기 때문에 전역관리할 비동기데이터가 많아질수록 파일하나하나의 코드량이 비대해져서 관리 어려움(파일이 다 모여서 있어서)
	3.saga전용의 메서드를 숙지해야되는 러닝커브가 높음 (call, put, takeLastest, fork)
	4.해당 문제점을 개선하기 위해서 또다른 redux 비동기데이터관련 미들웨어를 찾던중 redux-toolkit알게됨
	(redux-toolkit관련 가이드 p.100)
*/
