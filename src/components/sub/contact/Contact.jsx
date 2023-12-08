import { useEffect, useRef } from 'react';
import Layout from '../../common/layout/Layout';
import './Contact.scss';

export default function Contact() {
	const { kakao } = window;
	const mapFrame = useRef(null);

	const mapOption = useRef({
		//위치값 정밀하게 보정하는 법
		//기존 구글지도 위치값 복사한 뒤, 카카오예제의 클릭한위치의 마커표시 직접해보기에서
		//해당 코드를 붙여넣기 하고 원하는 지점을 찍으면 아래와 같이 정밀한 수치값을 확인 가능
		center: new kakao.maps.LatLng(37.5127347299894, 127.0607705454063),
		level: 3,
	});

	useEffect(() => {
		const mapInstance = new kakao.maps.Map(mapFrame.current, mapOption.current);
		const markerInstance = new kakao.maps.Marker({
			position: mapOption.current.center,
		});

		markerInstance.setMap(mapInstance);
	}, []);

	return (
		<Layout title={'Contact'}>
			<article className='mapBox' ref={mapFrame}></article>
		</Layout>
	);
}
