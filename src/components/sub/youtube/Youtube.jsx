import Layout from '../../common/layout/Layout';
import './Youtube.scss';
import { useState, useEffect } from 'react';

export default function Youtube() {
	const [Vids, setVids] = useState([]);
	console.log(Vids);

	//promise then구문을 async await 변경하기 위한 조건2가지
	//조건1 - promise반환 함수를 감싸주는 wrapping함수 필요 (async)
	//조건2 - await문은 promise반환함수에만 지정 가능

	const fetchYoutube = async () => {
		const api_key = 'AIzaSyDC60bIIkAJFzy7ji4a0Eo3AX6tYudhe1w';
		const pid = 'PLYOPkdUKSFgWqafuDQN9di3uLJoTV3L3W';
		const num = 10;
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

		/*
		fetch(baseURL)
			.then((data) => data.json())
			.then((json) => {
				setVids(json.items);
			});
		*/
		try {
			const data = await fetch(baseURL);
			const json = await data.json();
			setVids(json.items);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchYoutube();
	}, []);

	return <Layout title={'Youtube'}>Youtube</Layout>;
}
