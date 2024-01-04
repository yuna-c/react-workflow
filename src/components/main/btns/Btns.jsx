import Anime from '../../../asset/anime';
import './Btns.scss';
import { useRef, useState, useEffect } from 'react';
import { useThrottle } from '../../../hooks/useThrottle';

export default function Btns() {
	const [Num, setNum] = useState(0);
	const wrap = useRef(null);
	const secs = useRef(null);
	const btns = useRef(null);
	const baseLine = useRef(-window.innerHeight / 2);

	const activation = () => {
		const scroll = wrap.current.scrollTop;

		secs.current.forEach((sec, idx) => {
			if (scroll >= secs.current[idx].offsetTop + baseLine.current) {
				Array.from(btns.current.children).forEach(btn => btn.classList.remove('on'));
				btns.current.children[idx].classList.add('on');
			}
		});
	};

	const moveScroll = idx => {
		console.log('move');
		new Anime(wrap.current, { scroll: secs.current[idx].offsetTop }, { duration: 500 });
	};

	const autoScroll = e => {
		const btnsArr = Array.from(btns.current.children);
		const activeEl = btns.current.querySelector('li.on');
		//현재 활성화된 버튼의 순번구함
		const activeIndex = btnsArr.indexOf(activeEl);

		//휠 다운시
		if (e.deltaY > 0) {
			console.log('wheel down');
			//현재순번이 마지막순번이 아니면 다음순번 섹션위치로 모션이동
			activeIndex !== Num - 1 && moveScroll(activeIndex + 1);
		} else {
			//휠 업시
			console.log('wheel up');
			//현재순번이 첫번째순번이 아니면 이전순번 섹션 위치로 모션이동
			activeIndex !== 0 && moveScroll(activeIndex - 1);
		}
	};

	const throttledActivation = useThrottle(activation);

	useEffect(() => {
		wrap.current = document.querySelector('.wrap');
		secs.current = wrap.current.querySelectorAll('.myScroll');
		setNum(secs.current.length);

		wrap.current.addEventListener('mousewheel', autoScroll);
		wrap.current.addEventListener('scroll', throttledActivation);
		return () => {
			wrap.current.removeEventListener('scroll', throttledActivation);
			wrap.current.removeEventListener('mousewheel', autoScroll);
		};
	}, [throttledActivation]);

	return (
		<ul className='Btns' ref={btns}>
			{Array(Num)
				.fill()
				.map((_, idx) => {
					return <li key={idx} className={idx === 0 ? 'on' : ''} onClick={() => moveScroll(idx)}></li>;
				})}
		</ul>
	);
}
