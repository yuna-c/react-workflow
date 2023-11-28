export function useSplitText() {
	return (ref, txt, speed = 0, interval = 0) => {
		let tags = '';
		let count = 0;

		for (let letter of txt) {
			tags += `
        <span style='transition-duration:${speed}s;transition-delay:${interval * count}s; display:inline-block;'>${letter}</span>
      `;
			count++;
		}
		ref.innerHTML = tags;
	};
}

export function useCustomText(type) {
	const toUpperText = (txt) => {
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
		//regEx (regular expression: 정규표현식) 문자열의 패턴별로 특정 기능 수행식
		// /정규표현식/
		return (txt) => {
			const resultText = txt
				.split(/-|_|\+/) //인수로 들어가는 특수문자가 -,_,+일때는 해당 구분자로 문자를 분리함 (예약어 문자열을 앞에 \붙여서 처리)
				.map((data) => toUpperText(data))
				.join(' ');
			return resultText;
		};
	}
}
