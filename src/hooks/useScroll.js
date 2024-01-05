import Anime from '../asset/anime';
import { useRef, useEffect, useState } from 'react';

export function useScroll(frame = '.wrap') {
	const scrollFrame = useRef(null);

	const scrollTo = targetPos => {
		new Anime(scrollFrame.current, { scroll: targetPos });
	};

	const getCurrentScroll = selfEl => {
		const scroll = scrollFrame.current.scrollTop;
		const modifiedScroll = scroll - selfEl?.offsetTop;
		return modifiedScroll;
	};

	useEffect(() => {
		scrollFrame.current = document.querySelector(frame);
	}, [frame]);

	return { scrollTo, getCurrentScroll, scrollFrame: scrollFrame.current };
}
