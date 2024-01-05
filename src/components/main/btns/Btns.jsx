import Anime from '../../../asset/anime';
import './Btns.scss';
import { useRef, useState, useEffect, useCallback } from 'react';
import { useThrottle } from '../../../hooks/useThrottle';

export default function Btns(opt) {
	const defOpt = useRef({ frame: '.wrap', items: '.myScroll', base: -window.innerHeight / 2, isAuto: false });
	const resultOpt = useRef({ ...defOpt.current, ...opt });
	const [Num, setNum] = useState(0);
	const [Mounted, setMounted] = useState(true);

	const isAutoScroll = useRef(resultOpt.current.isAuto);
	const wrap = useRef(null);
	const secs = useRef(null);
	const btns = useRef(null);
	const baseLine = useRef(resultOpt.current.base);
	const isMotion = useRef(false);

	//activation에서 null요소의 값을 읽을수 없다는 오류 뜨는 이유 (throttle과는 무관)
	//아래함수는 scroll이 동작될때마다 실행되는 함수
	const activation = () => {
		if (!Mounted) return;
		const scroll = wrap.current?.scrollTop;

		//내부적으로 scroll시 모든 section요소와, btns요소를 탐색해서 가져와야 됨
		//스크롤하자마 바로 라우터 이동을 하면 모든 section요소를 참조객체에 담기기전에
		//컴포넌트가 언마운트 됨
		//컴포넌트 언마운트시 비어있는 참조객체를 호출하려고 하기 때문에 에러 발생
		//컴포넌트가 언마운트되면 return문으로 참조객체활용 구문자체를 무시
		if (secs.current) {
			secs.current.forEach((_, idx) => {
				if (scroll >= secs.current[idx].offsetTop + baseLine.current) {
					Array.from(btns.current.children).forEach(btn => btn?.classList.remove('on'));
					btns.current.children[idx].classList.add('on');
				}
			});
		}
	};

	const moveScroll = idx => {
		if (isMotion.current) return;
		isMotion.current = true;
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

	const modifyPos = () => {
		const btnsArr = Array.from(btns.current.children);
		const activeEl = btns.current.querySelector('li.on');
		const activeIndex = btnsArr.indexOf(activeEl);
		wrap.current.scrollTop = secs.current[activeIndex].offsetTop;
	};

	const throttledActivation = useThrottle(activation);
	const throttledModifyPos = useThrottle(modifyPos, 200);

	//컴포넌트가 언마운트 한번만 동작되야 되기 때문에
	//의존성배열이 비어있는 useEffect훅안쪽의 클린업함수에서 Mounted값 변경
	useEffect(() => {
		return () => setMounted(false);
	}, []);

	useEffect(() => {
		wrap.current = document.querySelector(resultOpt.current.frame);
		secs.current = wrap.current.querySelectorAll(resultOpt.current.items);
		setNum(secs.current.length);

		window.addEventListener('resize', throttledModifyPos);
		Mounted && wrap.current.addEventListener('scroll', throttledActivation);
		isAutoScroll.current && wrap.current.addEventListener('mousewheel', autoScroll);

		return () => {
			window.removeEventListener('resize', throttledModifyPos);
			wrap.current.removeEventListener('scroll', throttledActivation);
			wrap.current.removeEventListener('mousewheel', autoScroll);
		};
	}, [autoScroll, throttledActivation, throttledModifyPos, resultOpt.current.frame, resultOpt.current.items, Mounted]);

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
