export function useSplitText() {
	return (ref, txt, speed = 0, interval = 0) => {
		let tags = '';
		let count = 0;

		for (let letter of txt) {
			tags += `
        <span style='transition-duration:${speed}s;transition-delay:${
				interval * count
			}s; display:inline-block;'>${letter === ' ' ? '&nbsp' : letter}</span>
      `;
			count++;
		}
		ref.innerHTML = tags;
	};
}

export function useCustomText(type) {
	const toUpperText = txt => {
		return txt.charAt(0).toUpperCase() + txt.slice(1);
	};

	if (type === 'shorten') {
		return (txt, len = 100) => {
			if (txt.length > len) {
				return txt.slice(0, len) + '...';
			} else {
				return txt;
			}
		};
	}

	if (type === 'combined') {
		return (txt, spc = ' ') => {
			const resultText = txt
				.split(/-|_|\+/)
				.map(data => toUpperText(data))
				.join(spc);
			return resultText;
		};
	}
}

/*
	useText 훅 제작 배경
	- 각 컴포넌트에서 텍스트 데이터를 가공할때 자주쓰는 패턴을 미리 훅으로 제작해서 불필요한 로직을 반복하지 않기 위함
	
	useSplitText() : 인수로 특정 문자열을 받아서 해당 문자를 글자별로 분리해주는 함수 반환
	useCustomText(타입) : 타입에 따라 문자열을 가공해주는 함수 반환
	'shorten'타입 : 원하는 글자수만큼 글자짜르고 말줄임표 붙임
	'combined'타입 : 특정 기호를 구분해서 문자열을 분리후 원하는 요소로 이어붙여줌
*/
