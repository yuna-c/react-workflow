import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
);

//npm i @reduxjs/toolkit@1 react-redux

/*
	리덕스 비동기데이터의 효율적 처리를 위한 대표적인 미들웨어 2가지
	redux-saga
	--action객체의 변화를 감시하면서 적절한 상태 변화 시점에 액션객체를 생성해서 리듀서를 전달하는 미들웨어 (generator)

	redux-thunk
	--함수자체를 리듀서에 전달하게 해주는 미들웨어 해당함수가 자동으로 액션객체를 반환하도록 처리

	redux-toolkit이라는 thunk기반의 통합 전역관리 패키지가 나오게된 개념
	- 초반에는 액션객체를 중앙집중적으로 관리하면서 리듀서에 전달하는 방식이 thunk방식에 비해서 기존 리덕스를 사용하던 개발자에게 더 친숙해서 saga를 많이 쓰게됨
	- saga방식으로 하다보니 관리할 파일의 갯수가 많아지고 코드의 관리가 어려워짐

	- 데이터 카테코리 별로 전역관리할 비동기 데이터를 분리할 필요생성
	- 이 시점의 불편했던 thunk방식의 코드를 개선한 redux-toolkit이라는 통합 라이브러리 등작

	redux-toolkit의 장점
	- 데이터별로 전역상태관리 파일을 불리할 수 있고
	- 사용자가 직접 데이터 상태별로 actionType을 만들필요가 없도록 자동생성됨
	- 하나의 slice파일 안에 api함수와 reducer 함수를 간결한 문법으로 관리가능
*/
