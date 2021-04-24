const encryptBTN = document.getElementById('encryptBtn');
const decryptBTN = document.getElementById('decryptBtn');
const plainText = document.getElementById('pt');
const cipherText = document.getElementById('ct');
const ptkey = document.getElementById('ptkey');
const ctkey = document.getElementById('ctkey');
const encryptedText = document.querySelector('.encrypted-text');
const decryptedText = document.querySelector('.decrypted-text');
const form1 = document.querySelector('.form1');
const form2 = document.querySelector('.form2');

const alphabets = 'abcdefghijklmnopqrstuvwxyz';

function removeSpace(gStr) {
	let str = '';
	let gStrLen = gStr.length;

	for (let i = 0; i < gStrLen; i++) {
		if (gStr[i] !== ' ') {
			str += gStr[i];
		}
	}

	return str;
}

function encryption(pt, key) {
	const ptWithoutSpace = removeSpace(pt);
	let keyWithoutSpace = removeSpace(key);
	console.log('Without Space : ', ptWithoutSpace, keyWithoutSpace);
	console.log('Hello inside encrypt', pt, key);

	// encryption logic
	const ptLen = ptWithoutSpace.length;
	const keyLen = keyWithoutSpace.length;

	if (keyLen < ptLen) {
		const diff = ptLen - keyLen;
		const extra = ptWithoutSpace.slice(0, diff);
		console.log('diff', diff, extra);
		keyWithoutSpace = keyWithoutSpace.concat(extra);
		console.log('New Key : ', keyWithoutSpace);
	}

	console.log(
		'After making length of key and pt equal : ',
		ptWithoutSpace,
		keyWithoutSpace,
		ptLen,
		keyWithoutSpace.length
	);

	let ans = '';

	for (let i = 0; i < ptLen; i++) {
		const ptCharValue = alphabets.indexOf(ptWithoutSpace[i]);
		const keyValue = alphabets.indexOf(keyWithoutSpace[i]);
		const remainder = (ptCharValue + keyValue) % 26;
		console.log(
			`Encryption of ${ptWithoutSpace[i]} ${ptCharValue} and ${
				keyWithoutSpace[i]
			} ${keyValue} and rem is ${remainder} ${alphabets.charAt(remainder)}`
		);
		ans += alphabets.charAt(remainder);
	}
	console.log('CT is : ', ans.toUpperCase());

	encryptedText.innerHTML = ans;
}

function decryption(ct, key) {
	const ctWithoutSpace = removeSpace(ct);
	let keyWithoutSpace = removeSpace(key);

	let difference = 0;
	let cnt = 0;
	let ans = '';
	const ctLen = ctWithoutSpace.length;
	const keyLen = keyWithoutSpace.length;

	console.log('Hello inside decrypt', ct, key);
	console.log('Without Space : ', ctWithoutSpace, keyWithoutSpace);

	// decryption logic
	if (keyLen < ctLen) {
		difference = ctLen - keyLen;
		console.log('diff of key size in decrypt:', difference);
	}

	for (let j = 0; j < ctLen; j++) {
		const ctCharValue = alphabets.indexOf(ctWithoutSpace[j]);
		const keyValue = alphabets.indexOf(keyWithoutSpace[j]);
		let remainder = (ctCharValue - keyValue) % 26;

		if (remainder < 0) {
			remainder += 26;
		}

		console.log(
			`Decryption of ${ctWithoutSpace[j]} ${ctCharValue} and ${
				keyWithoutSpace[j]
			} ${keyValue} and rem is ${remainder} ${alphabets.charAt(remainder)}`
		);
		ans += alphabets.charAt(remainder);

		// append the characters if key size is less than cipher text size
		if (difference != 0) {
			keyWithoutSpace += ans[cnt];
			cnt++;
			difference--;
		}
	}

	console.log(
		'After making length of key and ct equal : ',
		ctWithoutSpace,
		keyWithoutSpace,
		ctLen,
		keyWithoutSpace.length
	);
	console.log('Plain Text is : ', ans);

	decryptedText.innerHTML = ans;
}

encryptBTN.addEventListener('click', (evt) => {
	const ptVal = plainText.value.toLowerCase();
	const keyVal = ptkey.value.toLowerCase();

	encryption(ptVal, keyVal);
});

decryptBTN.addEventListener('click', (evt) => {
	const ctVal = cipherText.value.toLowerCase();
	const keyVal = ctkey.value.toLowerCase();

	decryption(ctVal, keyVal);
});

form2.addEventListener('submit', (evt) => {
	evt.preventDefault();
});

form1.addEventListener('submit', (evt) => {
	evt.preventDefault();
});
