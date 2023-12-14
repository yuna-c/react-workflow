import './Footer.scss';
import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';
import { useSelector } from 'react-redux';

export default function Footer() {
	//순서5 - 전역 store값을 useSelector바로 호출 가능
	const MemberData = useSelector(store => store.memberReducer.members);

	return (
		<footer className='Footer'>
			<h1>Dcodelab</h1>

			<p>2023 Dcodelab &copy; All Rights Reserved.</p>
			{/* 아래 코드에서 조건문을 쓴 이유 */}
			{/* 첫번째 렌더링시에는 store부터 빈 배열이 전달되므로 두번째 렌더링부터 해당 구문이 실행되도록 조건문 처리 */}
			<p>{MemberData && `${MemberData[0].position}:${MemberData[0].name}`}</p>

			<ul>
				<li>
					<FaFacebookF />
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
