import Anime from '../asset/anime';
import { useRef, useEffect } from 'react';

export function useScroll(frame = '.wrap') {
	const frameRef = useRef(null);

	const scrollTo = targetPos => {
		new Anime(frameRef.current, { scroll: targetPos });
	};

	useEffect(() => {
		frameRef.current = document.querySelector(frame);
	}, [frame]);

	return { scrollTo };
}
