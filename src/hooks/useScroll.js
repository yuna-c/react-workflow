import Anime from '../asset/anime';
import { useRef, useEffect } from 'react';

export function useScroll(frame) {
	const frameRef = useRef(null);

	const scrollTo = targetPos => {
		new Anime(frameRef, { scroll: targetPos });
	};

	useEffect(() => {
		frameRef.current = document.querySelector(frame);
	}, []);

	return scrollTo;
}
