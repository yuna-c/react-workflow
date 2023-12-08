import { useEffect, useRef } from 'react';
import Layout from '../../common/layout/Layout';
import './Contact.scss';

export default function Contact() {
	const { kakao } = window;
	const mapFrame = useRef(null);

	const mapOption = useRef({
		center: new kakao.maps.LatLng(37.5127347299894, 127.0607705454063),
		level: 3,
	});

	const imgSrc = process.env.PUBLIC_URL + '/img/marker1.png';
	const imgSize = new kakao.maps.Size(232, 99);
	const imgOpt = { offset: new kakao.maps.Point(116, 99) };

	useEffect(() => {
		const mapInstance = new kakao.maps.Map(mapFrame.current, mapOption.current);
		const markerImageInstance = new kakao.maps.MarkerImage(imgSrc, imgSize, imgOpt);

		const markerInstance = new kakao.maps.Marker({
			position: mapOption.current.center,
			image: markerImageInstance,
		});

		markerInstance.setMap(mapInstance);
	}, []);

	return (
		<Layout title={'Contact'}>
			<article className='mapBox' ref={mapFrame}></article>
		</Layout>
	);
}
