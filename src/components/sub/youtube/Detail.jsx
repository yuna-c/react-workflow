import { useEffect, useRef, useState, useCallback } from 'react';
import Layout from '../../common/layout/Layout';
import './Detail.scss';
import { useParams } from 'react-router-dom';
import { useYoutubeQueryById } from '../../../hooks/useYoutubeQuery';

export default function Detail() {
	const refTitle = useRef(null);
	const { id } = useParams();

	//const { data: YoutubeData, isSuccess, isError } = useYoutubeQueryById(id);
	const result = useYoutubeQueryById(id);
	console.log(result);

	return (
		<Layout title={'Detail'}>
			{/* <h2 ref={refTitle}>{YoutubeData?.title}</h2>
			{isSuccess && (
				<article>
					<div className='videoBox'>
						<iframe src={`https://www.youtube.com/embed/${YoutubeData.resourceId.videoId}`} title={YoutubeData.title}></iframe>
					</div>
					<h3>{YoutubeData.title}</h3>
					<p>{YoutubeData.description}</p>
				</article>
			)}

			{isError && <p>fail to fetch data</p>} */}
		</Layout>
	);
}
