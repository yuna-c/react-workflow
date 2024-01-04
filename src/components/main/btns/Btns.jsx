import './Btns.scss';
import { useRef, useState, useEffect } from 'react';
//window.scrollY : 브라우저를 스크롤할때마다 스크롤되고 있는 거리값 (동적)
//DOM.scrollTop : DOM요소안쪽에서 스크롤할때마다 스크롤되는 거리값 (동적)
//DOM.offsetTop : 문서에서 해당 돔요소의 세로 위치값 (정적)

export default function Btns() {
	const [Index, setIndex] = useState(0);
	const [Num, setNum] = useState(0);
	const wrap = useRef(null);
	const secs = useRef(null);

	useEffect(() => {
		wrap.current = document.querySelector('.wrap');
		secs.current = document.querySelectorAll('.myScroll');
		setNum(secs.current.length);

		wrap.current.addEventListener('scroll', e => {
			console.log('scroll', e.target.scrollTop);
			console.log('offset', secs.current[1].offsetTop);
		});
	}, []);

	return (
		<ul className='Btns'>
			{Array(Num)
				.fill()
				.map((_, idx) => {
					return <li key={idx} className={idx === Index ? 'on' : ''}></li>;
				})}
		</ul>
	);
}
