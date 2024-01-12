import Footer from './components/common/footer/Footer';
import Header from './components/common/header/Header';
import MainWrap from './components/main/mainWrap/MainWrap';
import Members from './components/sub/members/Members';
import Community from './components/sub/community/Community';
import Contact from './components/sub/contact/Contact';
import Department from './components/sub/department/Department';
import Gallery from './components/sub/gallery/Gallery';
import Youtube from './components/sub/youtube/Youtube';
import { Route } from 'react-router-dom';
import './globalStyles/Variables.scss';
import './globalStyles/Reset.scss';
import { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMedia } from './hooks/useMedia';
import Menu from './components/common/memu/Menu';
import Detail from './components/sub/youtube/Detail';
import Welcome from './components/sub/members/Welcome';
import * as types from './redux/action';

export default function App() {
	const dispatch = useDispatch();
	const Dark = useSelector(store => store.darkReducer.dark);
	const path = useRef(process.env.PUBLIC_URL);

	const fetchDepartment = useCallback(async () => {
		const data = await fetch(`${path.current}/DB/department.json`);
		const json = await data.json();
		dispatch({ type: types.MEMBER.success, payload: json.members });
	}, [dispatch]);

	const fetchHistory = useCallback(async () => {
		const data = await fetch(`${path.current}/DB/history.json`);
		const json = await data.json();
		dispatch({ type: types.HISTORY.success, payload: json.history });
	}, [dispatch]);

	const fetchYoutube = useCallback(async () => {
		const api_key = process.env.REACT_APP_YOUTUBE_API;
		const pid = process.env.REACT_APP_YOUTUBE_LIST;
		const num = 10;
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

		try {
			const data = await fetch(baseURL);
			const json = await data.json();
			dispatch({ type: types.YOUTUBE.success, payload: json.items });
		} catch (err) {
			dispatch({ type: types.YOUTUBE.fail, payload: err });
		}
	}, [dispatch]);

	useEffect(() => {
		fetchDepartment();
		fetchHistory();
		fetchYoutube();
	}, [fetchDepartment, fetchHistory, fetchYoutube]);

	return (
		<div className={`wrap ${Dark ? 'dark' : ''} ${useMedia()}`}>
			<Header />
			<Route exact path='/' component={MainWrap} />
			<Route path='/department' component={Department} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/community' component={Community} />
			<Route path='/members' component={Members} />
			<Route path='/contact' component={Contact} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/detail/:id' component={Detail} />
			<Route path='/welcome/:id' component={Welcome} />
			<Footer />
			<Menu />
		</div>
	);
}

/*
	App 컴포넌트 개발흐름
	- 루트 컴포넌트이기 때문에 모든 비동기 데이터를 호출한뒤 액션객체를 생성해서 dispatch로 리듀서에 전달한 후 store에 저장

	- 메인 페이지, 서브페이지용 컴포넌트를 Router설정
	- 실무에서 아직 레거시코드를 많이 쓰기 때문에 일부러 react-router-dom, 같은 원리로 프로젝트에서 redux를 활용하고자 일부러 react17버전으로 작업
	- module.scss는 아니지만 컴포넌트의 효율적인 유지보수를 위해서 폴더별로 jsx, scss파일을 그룹화하다보니 일반 미디어쿼리로 반응형처리하기에는 반복작업과 css변수활용에 어려움이 있어서 useMedia라는 커스텀훅을 직접 만들어서 스크립트로 반응형 스타일링되도록 처리
	(useMedia 가이드 p.100)

	해당 프로젝트 진행시 발생한 이슈사항들
	1. 처음에 비동기데이터를 여러컴포넌트에서 재활용하기 위해서 redux를 사용했는데, Flickr데이터같이 검색이나 사용자 이벤트에 따라서 빈번하게 비동기데이터를 다시 담아야 되는 경우에는 redux로 처리하기 힘들었음

	해결절차
	- Flickr만 리덕스에서 제외하고 고민하던중에 비동기데이터 전역State 처리를 위한 redux-saga를 알게되고 saga버전으로 작업을 진행처리했다
*/
