
// function textToFile (text, name) {
// 	const b = new Blob([text], { type: 'text/plain' });
// 	const url = window.URL.createObjectURL(b);
// 	const a = document.createElement('a');
// 	a.href = url;
// 	a.download = name || 'text.txt';
// 	a.type = 'text/plain';
// 	a.addEventListener('click', () => {
// 		setTimeout(() => window.URL.revokeObjectURL(url), 10000);
// 	})
// 	a.click();
// }

// function textToFile2(){
// textToFile(document.getElementById('txt').value, 'file.txt');
// }
