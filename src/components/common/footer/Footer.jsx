import './Footer.scss';
import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
//npm i react-icons

export default function Footer() {
	return (
		<footer className='Footer'>
			<h1>Dcodelab</h1>

			<p>2023 Dcodelab &copy; All Rights Reserved.</p>

			<ul>
				<li>
					{/* 외부 링크 연결시 일반 a태그 처리 rel=noopener noreferrer 속성 추가해서 window객체에 이전 리액트 컴포넌트의 정보를 참조못하게 처리 */}
					<a href='https://www.facebook.com' target='_self' rel='noopener noreferrer'>
						<FaFacebookF />
					</a>
				</li>
				<li>
					<FaTwitter />
				</li>
				<li>
					<FaYoutube />
				</li>
			</ul>
		</footer>
	);
}
