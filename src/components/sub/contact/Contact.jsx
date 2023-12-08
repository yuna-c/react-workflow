import { useEffect, useRef } from 'react';
import Layout from '../../common/layout/Layout';
import './Contact.scss';

export default function Contact() {
	const mapFrame = useRef(null);
	const { kakao } = window;
	console.log(kakao);

	const mapOption = useRef({
		center: new kakao.maps.LatLng(33.450701, 126.570667),
		level: 3,
	});

	useEffect(() => {
		const map = new kakao.maps.Map(mapFrame.current, mapOption.current);
	}, [kakao]);

	return (
		<Layout title={'Contact'}>
			<article className='mapBox' ref={mapFrame}></article>
		</Layout>
	);
}
