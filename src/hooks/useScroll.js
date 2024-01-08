import Anime from '../asset/anime';
import { useState, useEffect } from 'react';

export function useScroll(scrollFrame) {
	const [Frame, setFrame] = useState(null);
	const scrollTo = targetPos => {
		Frame && new Anime(Frame, { scroll: targetPos });
	};

	const getCurrentScroll = (selfEl, baseLine = 0) => {
		const scroll = Frame.scrollTop - baseLine;
		const modifiedScroll = scroll - selfEl?.offsetTop;
		return modifiedScroll;
	};

	useEffect(() => {
		setFrame(document.querySelector('.wrap'));
	}, []);

	return { scrollTo, getCurrentScroll, Frame };
}
