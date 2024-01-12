import { useRef } from 'react';
import Layout from '../../common/layout/Layout';
import './Department.scss';
import { useCustomText } from '../../../hooks/useText';
import { useSelector } from 'react-redux';

export default function Department() {
	const MemberData = useSelector(store => store.memberReducer.members);
	const HistoryData = useSelector(store => store.historyReducer.history);
	const combinedTitle = useCustomText('combined');
	const path = useRef(process.env.PUBLIC_URL);

	return (
		<Layout title={'Department'}>
			<section className='historyBox'>
				<h2>{combinedTitle('History')}</h2>
				<div className='con'>
					{HistoryData?.map((history, idx) => {
						return (
							<article key={history + idx}>
								<h3>{Object.keys(history)[0]}</h3>
								<ul>
									{Object.values(history)[0].map((list, idx) => {
										return <li key={list + idx}>{list}</li>;
									})}
								</ul>
							</article>
						);
					})}
				</div>
			</section>

			<section className='memberBox'>
				<h2>{combinedTitle('Members')}</h2>

				<div className='con'>
					{MemberData?.map((member, idx) => {
						return (
							<article key={member + idx}>
								<div className='pic'>
									<img src={`${path.current}/img/${member.pic}`} alt={member.name} />
								</div>
								<h3>{member.name}</h3>
								<p>{member.position}</p>
							</article>
						);
					})}
				</div>
			</section>
		</Layout>
	);
}

/*
	Department.컴포넌트 작업흐름
	- public/DB폴더안쪽에 json파일을 미리 준비해서 data fetching 처리
	- 데이터를 기반으로 회사 연혁및 멤버소개 페이지 구현
	- 텍스트데이터를 편하게 가공하기 위해서 useText커스텀훅을 제작해서 다양한 방식으로 문자열 처리
	(useText훅 가이드문서 p.100)

	이슈사항
	- 상대적으로 리액트 지식이 적을때 처음 제작한 컴포넌트라 static한 데이터를 일일 JSX에 컨텐츠를 담아서 구현
	- 추후 데이터 관리가 비효율적인것 같아서 JSON파일형태로 데이터만 분리한다음에 동적으로 렌더링 처리
	- 이때까진 아직 DB를 공부하기 전이라 아쉬운대로 JSON처리
	- (Next.js로 Mongo DB 연동프로젝트는 p.100에서 확인가능)
*/
