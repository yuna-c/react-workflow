import './ThemeControl.scss';
import { useCookie } from '../../../hooks/useCookie';
import { useRef } from 'react';

//skku1006
//미션1 - 테마초기화버튼 생성한뒤 해당 버튼 클릭시 css변수에 등록되어 있는 색상값으로 초기화
//미션2 - Dark모드의 값도 쿠키에 등록을 해서 한번 설정된 값으로 유지되도록 처리

export default function ThemeControl() {
	const inputEl = useRef(null);

	const { setCookie, isCookie } = useCookie();

	if (isCookie('theme')) {
		//현재 쿠키값에서 'theme='다음 문자값을 가져와서 ;기준으로 배열분리한뒤 제일 첫번째값이 theme 컬러값
		//해당 쿠키 컬러값으로 자동 세팅
		document.body.style.setProperty('--pointColor', document.cookie.split('theme=')[1].split(';')[0]);
	}
	//만약 쿠키가 없으면 그냥 css에 등록되어 있는 기본 --pointColor값 활용

	const changeThemeColor = () => {
		const color = inputEl.current.value;
		console.log(color);
		setCookie('theme', color, 10);
		console.log(getComputedStyle(document.body).getPropertyValue('--pointColor'));
		document.body.style.setProperty('--pointColor', color);
	};

	return (
		<nav className='ThemeControl'>
			<input type='color' ref={inputEl} onChange={changeThemeColor} />
			{/* <button onClick={changeThemeColor}>theme color</button> */}
		</nav>
	);
}

/*
  1.클릭이벤트 컬러팔레트에서 선택한 색상코드값을 쿠키로 저장
  2.App마운트시 --pointColor에 등록된 value값을 쿠키에있는 값으로 변경처리
*/
