import Anime from '../asset/anime';

export function useScroll(scrollFrame) {
	const scrollTo = targetPos => {
		new Anime(scrollFrame.current, { scroll: targetPos });
	};

	const getCurrentScroll = selfEl => {
		const scroll = scrollFrame.scrollTop;
		const modifiedScroll = scroll - selfEl?.offsetTop;
		return modifiedScroll;
	};

	return { scrollTo, getCurrentScroll };
}
