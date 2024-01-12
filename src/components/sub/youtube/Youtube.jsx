import Layout from '../../common/layout/Layout';
import './Youtube.scss';
import { useCustomText } from '../../../hooks/useText';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Youtube() {
	const Vids = useSelector(store => store.youtubeReducer.youtube);
	const customText = useCustomText('combined');
	const shortenText = useCustomText('shorten');

	return (
		<Layout title={'Youtube'}>
			{Vids?.map(data => {
				const [date, time] = data.snippet.publishedAt.split('T');

				return (
					<article key={data.id}>
						<h2>{shortenText(data.snippet.title, 50)}</h2>

						<div className='txt'>
							<p>{shortenText(data.snippet.description, 250)}</p>
							<div className='infoBox'>
								<span>{customText(date, '.')}</span>
								<em>{time.split('Z')[0]}</em>
							</div>
						</div>

						<div className='pic'>
							<Link to={`/detail/${data.id}`}>
								<img src={data.snippet.thumbnails.standard.url} alt={data.snippet.title} />
							</Link>
						</div>
					</article>
				);
			})}
		</Layout>
	);
}

/*
	Youtube 컴포넌트 작업흐름
	-Youtube API를 활용한 동적 Youtube동영상 갤러리 페이지
	-썸네일 클릭시 params를 전달해서 상세페이지로 유튜브 영상출력
	-useText커스텀 훅으로 미리보기 문자열 처리

	이슈사항
	- 유튜브 목록을 미리보기 형식으로 가져올떄 유튜브 제목이 길어서 목록 UI 깨지는 현상 발생
	- 유튜브 영상 시간 출력시 출력되는 텍스트형식이 맘에 들지않음
	
	해결방법
	- 문자열을 원하는 갯수만큼 짜르고, 전체 문자열에서 제가 원하는 옵션에 따라 범용적으로 가공할 수있는 재활용가능한 훅 추가 제작
	(훅 설명 링크)
*/
