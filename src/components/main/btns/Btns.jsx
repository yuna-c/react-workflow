import Anime from '../../../asset/anime';
import './Btns.scss';
import { useRef, useState, useEffect, useCallback } from 'react';
import { useThrottle } from '../../../hooks/useThrottle';

export default function Btns() {
	const [Num, setNum] = useState(0);
	const isAutoScroll = useRef(false);
	const wrap = useRef(null);
	const secs = useRef(null);
	const btns = useRef(null);
	const baseLine = useRef(-window.innerHeight / 2);
	//isMotion.current값이 true면 모션중이므로 재실행방지, false면 모션중이 아니므로 재실행가능
	const isMotion = useRef(false);

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
		//초기값이 false이므로 처음 한번은 해당 조건문이 무시되면서 아래 코드실행됨
		if (isMotion.current) return;
		//조건문을 통과하자마자 바로 값을 true로 변경해서 다음부터는 재호출 안되도록 막음
		isMotion.current = true;
		console.log('move');
		//모션함수가 실행되고 모션이 끝나는순간 실행되는 callback으로 다시 isMotion.current값을 false로 변경해서 재실행 가능케 설정
		//결론 isMotion.current값을 이용해서 모션중에는 중복 함수호출 불가능하도록 모션중 재이벤트방지 처리
		new Anime(wrap.current, { scroll: secs.current[idx].offsetTop }, { callback: () => (isMotion.current = false) });
	};

	const autoScroll = useCallback(
		e => {
			const btnsArr = Array.from(btns.current.children);
			const activeEl = btns.current.querySelector('li.on');
			const activeIndex = btnsArr.indexOf(activeEl);

			if (e.deltaY > 0) {
				activeIndex !== Num - 1 && moveScroll(activeIndex + 1);
			} else {
				activeIndex !== 0 && moveScroll(activeIndex - 1);
			}
		},
		[Num]
	);

	const throttledActivation = useThrottle(activation);

	useEffect(() => {
		wrap.current = document.querySelector('.wrap');
		secs.current = wrap.current.querySelectorAll('.myScroll');
		setNum(secs.current.length);

		wrap.current.addEventListener('scroll', throttledActivation);
		isAutoScroll.current && wrap.current.addEventListener('mousewheel', autoScroll);

		return () => {
			wrap.current.removeEventListener('scroll', throttledActivation);
			wrap.current.removeEventListener('mousewheel', autoScroll);
		};
	}, [throttledActivation, autoScroll]);

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
