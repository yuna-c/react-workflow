import './Btns.scss';
import { useRef, useState, useEffect } from 'react';

export default function Btns() {
	const [Index, setIndex] = useState(0);
	const [Num, setNum] = useState(0);
	const wrap = useRef(null);
	const secs = useRef(null);
	const btns = useRef(null);

	const activation = () => {
		const scroll = wrap.current.scrollTop;

		secs.current.forEach((sec, idx) => {
			if (scroll >= secs.current[idx].offsetTop) {
				Array.from(btns.current.children).forEach(btn => btn.classList.remove('on'));
				btns.current.children[idx].classList.add('on');
			}
		});
		/*
		if (scroll >= secs.current[0].offsetTop) {
			Array.from(btns.current.children).forEach(btn => btn.classList.remove('on'));
			btns.current.children[0].classList.add('on');
		}
		if (scroll >= secs.current[1].offsetTop) {
			Array.from(btns.current.children).forEach(btn => btn.classList.remove('on'));
			btns.current.children[1].classList.add('on');
		}
		if (scroll >= secs.current[2].offsetTop) {
			Array.from(btns.current.children).forEach(btn => btn.classList.remove('on'));
			btns.current.children[2].classList.add('on');
		}
		if (scroll >= secs.current[3].offsetTop) {
			Array.from(btns.current.children).forEach(btn => btn.classList.remove('on'));
			btns.current.children[3].classList.add('on');
		}
    */
	};

	useEffect(() => {
		wrap.current = document.querySelector('.wrap');
		secs.current = document.querySelectorAll('.myScroll');

		setNum(secs.current.length);

		wrap.current.addEventListener('scroll', activation);
	}, []);

	return (
		<ul className='Btns' ref={btns}>
			{Array(Num)
				.fill()
				.map((_, idx) => {
					return <li key={idx} className={idx === Index ? 'on' : ''} onClick={() => setIndex(idx)}></li>;
				})}
		</ul>
	);
}
