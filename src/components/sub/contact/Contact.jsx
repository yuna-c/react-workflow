import { useEffect, useRef, useState, useCallback } from 'react';
import Layout from '../../common/layout/Layout';
import './Contact.scss';
import emailjs from '@emailjs/browser';
import { useThrottle } from '../../../hooks/useThrottle';

export default function Contact() {
	console.log('contact');
	const form = useRef();
	const resetForm = () => {
		const elArr = form.current.children;

		Array.from(elArr).forEach(el => {
			console.log(el);
			if (el.name === 'user_name' || el.name === 'user_email' || el.name === 'message') el.value = '';
		});
	};
	const sendEmail = e => {
		e.preventDefault();

		const [user, email] = form.current.querySelectorAll('input');
		const txtArea = form.current.querySelector('textarea');

		if (!user.value || !email.value || !txtArea.value) return alert('이름, 답장받을 이메일주소 문의내용을 모두 입력하세요.');

		emailjs.sendForm('service_ag7z96s', 'template_oh9ajns', form.current, '23g8RepczesqKPoIX').then(
			result => {
				alert('문의 내용이 성공적으로 전송되었습니다.');
				resetForm();
			},
			error => {
				alert('일시적인 장애로 문의 전송에 실패했습니다. 다음의 메일주소로 보내주세요.');
				resetForm();
			}
		);
	};

	const kakao = useRef(window.kakao);
	const [Index, setIndex] = useState(0);
	const [Traffic, setTraffic] = useState(false);
	const [View, setView] = useState(false);

	const mapFrame = useRef(null);
	const viewFrame = useRef(null);
	const marker = useRef(null);
	const mapInstance = useRef(null);

	const mapInfo = useRef([
		{
			title: '삼성역 코엑스',
			latlng: new kakao.current.maps.LatLng(37.51100661425726, 127.06162026853143),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
			imgSize: new kakao.current.maps.Size(232, 99),
			imgPos: { offset: new kakao.current.maps.Point(116, 99) }
		},
		{
			title: '넥슨 본사',
			latlng: new kakao.current.maps.LatLng(37.40211707077346, 127.10344953763003),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker2.png`,
			imgSize: new kakao.current.maps.Size(232, 99),
			imgPos: { offset: new kakao.current.maps.Point(116, 99) }
		},
		{
			title: '서울 시청',
			latlng: new kakao.current.maps.LatLng(37.5662952, 126.9779451),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker3.png`,
			imgSize: new kakao.current.maps.Size(232, 99),
			imgPos: { offset: new kakao.current.maps.Point(116, 99) }
		}
	]);

	marker.current = new kakao.current.maps.Marker({
		position: mapInfo.current[Index].latlng,
		image: new kakao.current.maps.MarkerImage(mapInfo.current[Index].imgSrc, mapInfo.current[Index].imgSize, mapInfo.current[Index].imgOpt)
	});

	const roadview = useCallback(() => {
		new kakao.current.maps.RoadviewClient().getNearestPanoId(mapInfo.current[Index].latlng, 50, panoId => {
			new kakao.current.maps.Roadview(viewFrame.current).setPanoId(panoId, mapInfo.current[Index].latlng);
		});
	}, [Index]);

	const setCenter = useCallback(() => {
		console.log('setCenter');
		mapInstance.current.setCenter(mapInfo.current[Index].latlng);
		//roadview.current();
	}, [Index]);

	const throttledSetCenter = useThrottle(setCenter);

	useEffect(() => {
		//Index값이 변경되는 것은 출력할 맵정보가 변경된다는 의미이므로 기존 프레임 안쪽의 정보를 지워서 초기화
		mapFrame.current.innerHTML = '';
		viewFrame.current.innerHTML = '';
		mapInstance.current = new kakao.current.maps.Map(mapFrame.current, {
			center: mapInfo.current[Index].latlng,
			level: 3
		});
		marker.current.setMap(mapInstance.current);
		setTraffic(false);
		setView(false);

		mapInstance.current.addControl(new kakao.current.maps.MapTypeControl(), kakao.current.maps.ControlPosition.TOPRIGHT);
		mapInstance.current.addControl(new kakao.current.maps.ZoomControl(), kakao.current.maps.ControlPosition.RIGHT);
		mapInstance.current.setZoomable(false);
	}, [Index]);

	//윈도우 객체에 등록할 핸들러함수를 따로 useEffect로 빼놓은 다음 의존성 배열을 가급적 비워두는 것이 좋음
	//윈도우 등록되는 핸들러함수에 만약 특정 state값을 의존한다면은 연결되는 함수이름자체를 의존성배열에 등록하되 useCallback처리
	useEffect(() => {
		window.addEventListener('resize', throttledSetCenter);
		return () => window.removeEventListener('resize', throttledSetCenter);
	}, [throttledSetCenter]);

	useEffect(() => {
		Traffic
			? mapInstance.current.addOverlayMapTypeId(kakao.current.maps.MapTypeId.TRAFFIC)
			: mapInstance.current.removeOverlayMapTypeId(kakao.current.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

	useEffect(() => {
		View && viewFrame.current.children.length === 0 && roadview();
	}, [View, roadview]);

	return (
		<Layout title={'Contact'}>
			<div id='mailSection'>
				<form ref={form} onSubmit={sendEmail}>
					<label>Name</label>
					<input type='text' name='user_name' />
					<label>Email</label>
					<input type='email' name='user_email' />
					<label>Message</label>
					<textarea name='message' />
					<input type='submit' value='Send' />
				</form>
			</div>

			<div id='mapSection'>
				<div className='controlBox'>
					<nav className='branch'>
						{mapInfo.current.map((el, idx) =>
							//prettier-ignore
							<button key={idx} onClick={() => setIndex(idx)} className={idx === Index ? 'on' : ''}>{el.title}</button>
						)}
					</nav>

					<nav className='info'>
						<button onClick={() => setTraffic(!Traffic)}>{Traffic ? 'Traffic OFF' : 'Traffic ON'}</button>
						<button onClick={() => setView(!View)}>{View ? 'map' : 'road view'}</button>
						<button onClick={setCenter}>위치 초기화</button>
					</nav>
				</div>
				<section className='tab'>
					<article className={`mapBox ${View ? '' : 'on'}`} ref={mapFrame}></article>
					<article className={`viewBox ${View ? 'on' : ''}`} ref={viewFrame}></article>
				</section>
			</div>
		</Layout>
	);
}

/*
	Contact 컴포넌트 작업흐름
	-mail.js api활용해서 폼메일 기능 연동
	-Kakao map api를 활용해서 카카오 지도 정보연동
	-지점이 많은 경도 많은 지도정보를 효율적으로 관리하기 위해서 객체값을 연동한 지도 데이터 반복출력
	-로드뷰기능 추가
	-useThrottle 커스텀훅 생성해서 기능 적용  (useThrottle.js p.100)

	이슈사항
	-cdn방식으로 데이터를 연동하다보니 리액트컴포넌트 안에서 kakao객체호출 실패
	-지점이 너무 많아서 사용자 이벤트에 의해 지도정보를 실시간으로 변경시 코드의 복잡도가 올라감
	-로드뷰 출력시 불필요하게 무겁게 동작
	-브라우저 리사이즈마다 마커위치가 가운대로 갱신안됨
	-브라우저 리사이즈시 버벅임현상 발생

	해결방안
	-컴포넌트 안쪽에서 window객체로부터 비구조화할당으로 직접 Kakao객체 추출및 활용
	-여러가지 지도정보를 각각의 객체로 구조화해서 배열로 구룹화한뒤 자동지도 인스턴스 생성 로직 구현
	-지도 지점 변경시 굳이 생성할 필요가 없는 로드뷰인스턴스를 같이 생성함으로 인해서 발생하는 문제점이었으므로 roadview버튼 클릭이벤트 발생하지 않으면 굳이 인스턴스 생성하지 않음
	-resize이벤트 발생할때마 마커위치를 가운데로 이동시키는 메서드 호출
	-리사이즈시마다 너무 많은 지도정보를 불러오게 되므로 useThrottle 커스텀훅을 생성해서 1초에 60초 발생하던 함수 호출을 3번으로 줄임
	(useThrottle.js p.100)
*/
