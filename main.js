const encryptBTN = document.getElementById('encryptBtn');
const decryptBTN = document.getElementById('decryptBtn');
const plainText = document.getElementById('pt');
const cipherText = document.getElementById('ct');
const key = document.getElementById('key');

const alphabets = 'abcdefghijklmnopqrstuvwxyz';

function encrypt(pt, key) {
	console.log('Hello inside encrypt', pt, key);

	// encryption logic
	const ptLen = pt.length;
	const keyLen = key.length;
	console.log(ptLen, keyLen);

	if (keyLen < ptLen) {
		const diff = ptLen - keyLen;
		const extra = pt.slice(0, diff);
		console.log('diff', diff, extra);
		key = key.concat(extra);
		console.log('New Key : ', key);
	}

	console.log(
		'After making length of key and pt equal : ',
		pt,
		key,
		ptLen,
		key.length
	);

	let ans = '';

	for (let i = 0; i < ptLen; i++) {
		const ptCharValue = alphabets.indexOf(pt[i]);
		const keyValue = alphabets.indexOf(key[i]);
		const remainder = (ptCharValue + keyValue) % 26;
		console.log(
			`Encryption of ${pt[i]} ${ptCharValue} and ${
				key[i]
			} ${keyValue} and rem is ${remainder} ${alphabets.charAt(remainder)}`
		);
		ans += alphabets.charAt(remainder);
	}
	console.log('CT is : ', ans.toUpperCase());

	cipherText.value = ans.toUpperCase();
}

function decrypt(ct, key) {
	let difference = 0;
	let cnt = 0;
	let ans = '';
	const ctLen = ct.length;
	const keyLen = key.length;

	console.log('Hello inside decrypt', ct, key);

	// decryption logic
	if (keyLen < ctLen) {
		difference = ctLen - keyLen;
		console.log('diff in decrypt:', difference);
	}

	for (let j = 0; j < ctLen; j++) {
		const ctCharValue = alphabets.indexOf(ct[j]);
		const keyValue = alphabets.indexOf(key[j]);
		let remainder = (ctCharValue - keyValue) % 26;

		if (remainder < 0) {
			remainder += 26;
		}

		console.log(
			`Decryption of ${ct[j]} ${ctCharValue} and ${
				key[j]
			} ${keyValue} and rem is ${remainder} ${alphabets.charAt(remainder)}`
		);
		ans += alphabets.charAt(remainder);
		// console.log('remainder ans : ', remainder, ans);

		// append the characters if key size is less than cipher text size
		if (difference != 0) {
			key += ans[cnt];
			cnt++;
			difference--;
		}
	}

	console.log(
		'After making length of key and ct equal : ',
		ct,
		key,
		ctLen,
		key.length
	);
	console.log('Plain Text is : ', ans);

	plainText.value = ans;
}

encryptBTN.addEventListener('click', (evt) => {
	// evt.preventDefault();
	const ptVal = plainText.value.toLowerCase();
	const keyVal = key.value.toLowerCase();

	encrypt(ptVal, keyVal);
});

decryptBTN.addEventListener('click', (evt) => {
	// evt.preventDefault();
	const ctVal = cipherText.value.toLowerCase();
	const keyVal = key.value.toLowerCase();

	decrypt(ctVal, keyVal);
});
