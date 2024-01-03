import { useYoutubeQuery } from '../../../hooks/useYoutubeQuery';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import './Visual.scss';
import 'swiper/css';
import { useRef, useState, useEffect } from 'react';

export default function Visual() {
	console.log('render');
	const num = useRef(5);
	const { isSuccess, data } = useYoutubeQuery();
	const [Index, setIndex] = useState(0);

	const [PrevIndex, setPrevIndex] = useState(0);
	const [NextIndex, setNextIndex] = useState(0);
	console.log('index', Index);
	console.log('prev', PrevIndex);
	console.log('next', NextIndex);

	const swiperOpt = useRef({
		modules: [Autoplay],
		loop: true,
		slidesPerView: 1,
		spaceBetween: 50,
		centeredSlides: true,
		onSwiper: swiper => {
			//swiper.slideNext(300);
			//setIndex(swiper.realIndex);
			//setPrevIndex(swiper.previousIndex);
			//setNextIndex(swiper.nextIndex);
		},
		onSlideChange: swiper => {
			//console.log('prev', swiper.previousIndex);
			//console.log('next', swiper.nextIndex);
			//if (swiper.swipeDirection === 'prev') setIndex(swiper.previousIndex);
			//if (swiper.swipeDirection === 'next') setIndex(swiper.nextIndex);
		},
		//autoplay: { delay: 2000, disableOnInteraction: true },
		breakpoints: {
			1000: { slidesPerView: 2 },
			1400: { slidesPerView: 3 }
		}
	});

	// useEffect(() => {
	// 	Index === 0 ? setPrevIndex(num.current - 1) : setPrevIndex(Index - 1);
	// 	Index === num.current - 1 ? setNextIndex(0) : setNextIndex(Index + 1);
	// }, [Index]);

	return (
		<figure className='Visual'>
			<div className='txtBox'>
				<ul>
					{isSuccess &&
						data.map((el, idx) => {
							if (idx >= 5) return null;

							return (
								<li key={el.id} className={idx === Index ? 'on' : ''}>
									<h3>{el.snippet.title}</h3>
								</li>
							);
						})}
				</ul>
			</div>

			<Swiper {...swiperOpt.current}>
				{isSuccess &&
					data.map((el, idx) => {
						if (idx >= num.current) return null;
						return (
							<SwiperSlide key={el.id}>
								<div className='pic'>
									<p>
										<img src={el.snippet.thumbnails.standard.url} alt={el.snippet.title} />
									</p>
									<p>
										<img src={el.snippet.thumbnails.standard.url} alt={el.snippet.title} />
									</p>
								</div>
							</SwiperSlide>
						);
					})}
			</Swiper>

			<nav className='preview'>
				{isSuccess && (
					<>
						<p className='prevBox'>
							<img src={data[PrevIndex].snippet.thumbnails.default.url} alt={data[PrevIndex].snippet.title} />
						</p>
						<p className='nextBox'>
							<img src={data[NextIndex].snippet.thumbnails.default.url} alt={data[NextIndex].snippet.title} />
						</p>
					</>
				)}
			</nav>
		</figure>
	);
}
