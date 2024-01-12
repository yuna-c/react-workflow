import { useEffect, useRef, useState, useCallback } from 'react';
import Masonry from 'react-masonry-component';
import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import { LuSearch } from 'react-icons/lu';
import Modal from '../../common/modal/Modal';
import { useDispatch } from 'react-redux';
import * as types from '../../../redux/action';

export default function Gallery() {
	const dispatch = useDispatch();
	const myID = useRef('197119297@N02');
	const isUser = useRef(myID.current);
	const refNav = useRef(null);
	const refFrameWrap = useRef(null);
	const searched = useRef(false);
	const gap = useRef(20);

	const [Pics, setPics] = useState([]);
	const [Index, setIndex] = useState(0);
	const [Mounted, setMounted] = useState(true);

	const activateBtn = e => {
		const btns = refNav.current.querySelectorAll('button');
		btns.forEach(btn => btn.classList.remove('on'));
		e && e.target.classList.add('on');
	};
	const handleInterest = e => {
		if (e.target.classList.contains('on')) return;
		isUser.current = '';
		activateBtn(e);
		fetchFlickr({ type: 'interest' });
	};
	const handleMine = e => {
		if (e.target.classList.contains('on') || isUser.current === myID.current) return;
		isUser.current = myID.current;
		activateBtn(e);
		fetchFlickr({ type: 'user', id: myID.current });
	};
	const handleUser = e => {
		if (isUser.current) return;
		isUser.current = e.target.innerText;
		activateBtn();
		fetchFlickr({ type: 'user', id: e.target.innerText });
	};
	const handleSearch = e => {
		e.preventDefault();
		isUser.current = '';
		activateBtn();
		const keyword = e.target.children[0].value;
		if (!keyword.trim()) return;
		e.target.children[0].value = '';
		fetchFlickr({ type: 'search', keyword: keyword });
		//검색함수가 한번이라도 실행되면 영구적으로 초기값을 true로 변경처리
		searched.current = true;
	};
	const fetchFlickr = useCallback(
		async opt => {
			const num = 500;
			const flickr_api = process.env.REACT_APP_FLICKR_API;
			const baseURL = `https://www.flickr.com/services/rest/?&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1&method=`;
			const method_interest = 'flickr.interestingness.getList';
			const method_user = 'flickr.people.getPhotos';
			const method_search = 'flickr.photos.search'; //search method 추가
			const interestURL = `${baseURL}${method_interest}`;
			const userURL = `${baseURL}${method_user}&user_id=${opt.id}`;
			const searchURL = `${baseURL}${method_search}&tags=${opt.keyword}`; //search url 추가
			let url = '';
			opt.type === 'user' && (url = userURL);
			opt.type === 'interest' && (url = interestURL);
			opt.type === 'search' && (url = searchURL);
			const data = await fetch(url);
			const json = await data.json();

			Mounted && setPics(json.photos.photo);
		},
		[Mounted]
	);

	useEffect(() => {
		refFrameWrap.current.style.setProperty('--gap', gap.current + 'px');
		//fetchFlickr({ type: 'user', id: myID.current });
		fetchFlickr({ type: 'interest' });
		return () => setMounted(false);
	}, [fetchFlickr]);

	return (
		<>
			<Layout title={'Gallery'}>
				<article className='controls'>
					<nav className='btnSet' ref={refNav}>
						<button onClick={handleInterest}>Interest Gallery</button>
						<button className='on' onClick={handleMine}>
							My Gallery
						</button>
					</nav>

					<form onSubmit={handleSearch}>
						<input type='text' placeholder='Search' />

						<button className='btnSearch'>
							<LuSearch />
						</button>
					</form>
				</article>

				<section className='frameWrap' ref={refFrameWrap}>
					<Masonry className={'frame'} options={{ transitionDuration: '0.5s', gutter: gap.current }}>
						{searched.current && Pics.length === 0 ? (
							<h2>해당 키워드에 대한 검색 결과가 없습니다.</h2>
						) : (
							Pics.map((pic, idx) => {
								return (
									<article key={pic.id}>
										<div
											className='pic'
											onClick={() => {
												dispatch({ type: types.MODAL.start, payload: true });
												setIndex(idx);
											}}>
											<img src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`} alt={pic.title} />
										</div>
										<h2>{pic.title}</h2>

										<div className='profile'>
											<img
												src={`http://farm${pic.farm}.staticflickr.com/${pic.server}/buddyicons/${pic.owner}.jpg`}
												alt='사용자 프로필 이미지'
												onError={e => e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif')}
											/>
											<span onClick={handleUser}>{pic.owner}</span>
										</div>
									</article>
								);
							})
						)}
					</Masonry>
				</section>
			</Layout>

			<Modal>
				{Pics.length !== 0 && (
					<img src={`https://live.staticflickr.com/${Pics[Index].server}/${Pics[Index].id}_${Pics[Index].secret}_b.jpg`} alt={Pics[Index].title} />
				)}
			</Modal>
		</>
	);
}

/*
	Gallery 컴포넌트 작업흐름
	- Flickr API연동해서 갤러리 데이터 동적 생성
	- 초기 마이 갤러리 출력
	- 검색량이 많은 Flickr 추천 갤러리 사용자 이벤트에 의해 refetching후 변경
	- 사용자 프로필 클릭시 해당 해당 사용자 갤러리 refetching
	- masonry API활용해서 Pinterest 형식의 UI구현
	- 썸네일 클릭시 모달창 생성 state값 redux로 전역관리

	이슈사항
	- 비동기데이터가 사용자 이벤트에 의해서 빈번하게 refetching발생해서 코드가 지저분해짐
	- masonry 활용시 UI의 위치값을 제대로 인지하지 못해서 SCSS에서 제대로 적용 불가
	- 반응형시 column의 갯수를 변경시 scss의 너무 많은 구문을 수정해야 되는 번거로움
	-갤러리 컴포넌트에서 다른 컴포넌트로 빠르게 라우터 이동시 콘솔에 메모리누수 오류 발생
	- 갤러리에서 모달창 생성시 지역 state로 모달창을 제어하니 모달컴포넌트 재활용 어려움

	해결사항
	- fetching함수를 asyn await형식으로 wrapping함수로 묶어 호출해야 되는 데이터 카테고리 별로 쿼리에 적용할 값을 인수로 전달처리
	- 각 이벤트마다 fetching함수에 인수를 다르게 전달하는 식으로 코드를 재사용가능하도록 개선
	- masonry에서 사이 간격을 제대로 인식하지 못하는 문제가 발생해서 scss에서 변수를 활용해서 위치값을 보정해주고 반응형시 변수값 변수값 변경만으로 column갯수를 효율적으로 제어할 수 있도록 scss 연산 로직 활용
	- 구글링을 통한 아직 비동기 데이터가 state에 담기지 않았는데 컴포넌트가 언마운트되서 발생하는 문제였기 때문에 State를 생성해서 Cleanup함수를 활용해 해당 컴포넌트 언마운트시 비동기데이터를 state에 담는것 막아줌
	- 모달컴포넌트를 범용적으로 활용하기 위해서 모달창을 열고 닫는 State자체를 redux로 전역관리
*/
