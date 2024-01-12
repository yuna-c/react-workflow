import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
);

/*
	Redux를 전역 상태관리가 필요한 이유
	- 리액트는 기본적으로 단방향 데이터 바인딩이기 때문에 부모에서 직계 자식컴포넌트로만 props를 전달 가능
	- 특정 지역 state정보값을 여러 컴포넌트에서 공유해야되는 경우 props통해서만 전달가능하기 때문에 데이터전달을 위한 로직이 복잡해짐
	- 컴포넌트 외부에서 독립적으로 동작하는 전역 state를 생성한뒤 아무리 depth가 깊은 자식 컴포넌트에서도 전역 state접근하고 데이터 변경요청을 할 수 있도록 하기위한 개발 방법론

	- context API를 활용한 외부 라이브러리(Application Programming Interface)
	- context API: GlobalContext 전역 객체를 생성해서 해당 전역객체를 하위 요소에서 구독하면서 액션이라는 객체를 통해서 전역객체를 변경요청처리 할수 있게 해주는 API
	- react에서는 contextAPI를 활용한 (createContext, useContext)내장 함수와 훅이 준비가 되어 있음
	
	- 위의 기능을 좀더 쓰기 편하도록 라이브러리화한게 redux
	- store(전역state가 담기는 객체), reducer(전역 state를 변경할 수 있는 변형자 함수), action(리듀서가 store데이터를 변경하기 위한 특별한 형태의 객체 {type, payload}), dipatch(컴포넌트에서 생성된 액션객체를 리듀서로 전달해주는 역할)

	자식컴포넌트에 부모컴포넌트로 값을 역으로 전달하는 방법
	- 부모에서 빈state를 생성하고 자식컴포넌트에서 state변경함수를 props로 전달해서 자식 컴포넌트에 담은 state를 부모에서 활용

	- forwardRef(hoc: 고차컴포넌트) 생성함수
	- forwardRef(특정컴포넌트 반환함수) => 특정컴포넌트 함수를 인수로 받아서 새로운 컴포넌트 반환
	- frowardRef를 쓰는 이유는 특정 자식컴포넌트를 호출하는 부모 컴포넌트에게 통채로 자기자신을 forwarding (상위로 전달) 처리
	- forwardRef로 생성된 고차컴포넌트는 내부적으로 useImperativeHandle이라는 내장훅 사용 가능
	
	- 특정 컴포넌트안쪽에 있는 특정 정보값을 객체로 묶어서 부모컴포넌트에게 역으로 전달가능
*/
