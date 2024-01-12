import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GlobalProvider } from './hooks/useGlobalData';

ReactDOM.render(
	<BrowserRouter>
		<GlobalProvider>
			<App />
		</GlobalProvider>
	</BrowserRouter>,
	document.getElementById('root')
);

/*
	react-query작업 순서
	1. 루트컴포넌트 App에서 컴포넌트 전역에 비동기데이터별로 쿼리키를 공유할 수 있는 쿼리클라이언트 인스턴스 생성후 전달
	2. hooks폴더에서 react-query를 활용한 비동기 데이터 카테고리별 커스텀훅 생성
	3. useQuery로 fetching호출시 해당 반환데이터에 대한 고유 쿼리키 등록및 stale, cache설정
	4, 원하는 컴포넌트해서 해당 호출하기만 하면 됨

	해당 브랜치에서 react-query를 도입하게 된 이유
	- redux-toolkit으로 모든 비동기 데이터를 store에 저장해서 재활용하고 있었는데 
	- 유독 flickr컴포넌트에서만 컴포넌트가 느린듯한 이슈발생
	- flickr데이터에 새로운 이미지 업로드시 새로 업로드한 이미지가 출력이 예전이미지 출력되는 걸 확인
	- 구글링을 해보니 비동기 데이터를 전역state저장시의 문제점을 알게되고 react-query에 대해 알게됨
	
	기존 redux-saga프로젝트를 다시 갈아엎고 react-query로 변경하면서 좋아진점
	- client-side-data와 server-side-data관리를 분리함으로써 코드 관리가 수월해짐
	- 비동기데이터를 redux관리할 필요가 없어지면 클라이언트 사이드 데이터를 굳이 무거운 리덕스 시스템으로 관리할 필요가 없어짐
	- 리액트의 기본 내장훅인 contextAPI기반의 createContext, useContext를 조합한 커스텀훅으로 보다 간결하게 클라이언트 사이드 데이터를 관리할 수 있게됨
	- react-query로 비동기 데이터 호출 및 쿼리관리를 커스텀훅으로 재작해 react-query를 활용한 비동기 데이터의 재사용성을 높임
	- 비동기데이터 성격에따라서 staleTime, cacheTime을 다르게 설정해 자주 변경되는데이터는 새로운 데이터를 호출하게 해주고 변경주기가 느린 서버데이터는 staleTime과 cacheTime을 길게 설정해서 라우터이동시 불필요하게 refetching을 하지않아서 앱성능의 향상을 가져옴
	
	react-query의 기본 개념
	- 서버에서 수시로 변경될수도 있고 클라이언트에서 변경점을 인지못하는 서버데이터를 fetching된 상태그대로 전역store에 static하게 저장하는 개념자체가 잘못됨
	- 서버사이드데이터와 클라이언트사이드 데이터는 성격이 다름불구하고 redux로 통합해서 관리하는 것이 비효율적
	- 서버사이드 비동기 데이터는 사용자가 호출할때마다 계속해서 최신 데이터를 가져와서 옛날 데이터를 활용하지 않는 것이 주목
	- 동일한 서버사이드 데이터를 여러 컴포넌트에서 재활용하려고 할때 매번 같은데이터를 refetching해야되는것이 비효율적
	- 서버사이드 데이터를 필요할때마다 요청을 하되 한번 불러온 이력이 있는 데이터는 고유의 쿼리키를 붙여서 데이터를 구분
	- 쿼리클라인트 인스턴스객체를 컴포넌트 전역에 활용가능하게 하고 각 캐싱된 비동기데이터의 쿼리키를 공유
	- 클라이언트로 하여금 동일한 쿼리에 등록되었는 비동기데이터는 refetching을 하지 않고 캐싱된 값을 재활용
	- react-query활용으로 비동기데이터의 캐싱시간과 강제로 refetching하지 않을 시간을 비동기 데이터 성격에 맞게 설정가능
	- react-query를 통해서 반환된 데이터는 state에 저장되는 것이 아니기 때문에 useState, useEffect, useCallback등의 훅을 불필요하게 호출할 필요가 없어서 여러가지 이슈사항을 고려하지 않고 개발에만 집중 가능
*/
