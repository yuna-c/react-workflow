import Anime from '../../../asset/anime';
import './Btns.scss';
import { useRef, useState, useEffect } from 'react';
import { useThrottle } from '../../../hooks/useThrottle';

export default function Btns() {
	console.log('re-render');
	const [Index, setIndex] = useState(0);
	const [Num, setNum] = useState(0);
	const wrap = useRef(null);
	const secs = useRef(null);
	const btns = useRef(null);

	const activation = () => {
		console.log('activation');
		const scroll = wrap.current.scrollTop;

		secs.current.forEach((sec, idx) => {
			if (scroll >= secs.current[idx].offsetTop) {
				Array.from(btns.current.children).forEach(btn => btn.classList.remove('on'));
				btns.current.children[idx].classList.add('on');
			}
		});
	};

	const throttledActivation = useThrottle(activation);

	useEffect(() => {
		wrap.current = document.querySelector('.wrap');
		secs.current = document.querySelectorAll('.myScroll');
		setNum(secs.current.length);

		wrap.current.addEventListener('scroll', throttledActivation);
		return () => wrap.current.removeEventListener('scroll', throttledActivation);
	}, [throttledActivation]);

	return (
		<ul className='Btns' ref={btns}>
			{Array(Num)
				.fill()
				.map((_, idx) => {
					return (
						<li
							key={idx}
							className={idx === Index ? 'on' : ''}
							onClick={() => {
								//new Anime(선택자, {속성명1:속성값2, 속성명2:속성값2}, {duration:속도, easeType:가속도, callback:컴플릭함수})
								new Anime(wrap.current, { scroll: secs.current[idx].offsetTop }, { duration: 1000 });
							}}></li>
					);
				})}
		</ul>
	);
}
