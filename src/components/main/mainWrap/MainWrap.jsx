import Info from '../info/Info';
import Visual from '../visual/Visual';
import Pics from '../pics/Pics';
import Banner from '../banner/Banner';
import './MainWrap.scss';

export default function MainWrap() {
	return (
		<div className='MainWrap'>
			<Visual />
			<Info />
			<Pics />
			<Banner />
		</div>
	);
}
