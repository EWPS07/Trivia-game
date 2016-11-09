
var questions = [];
	// get trivia questions function ---------
	let crossOrigin = 'https://crossorigin.me/';
	let api = 'https://www.opentdb.com/api.php?amount=10';
	let url = crossOrigin+api;

	function getQuestions() {
		$.get(url, function(data) {
			questions = data.results;
			return questions;
		})
		return questions;
	}

	// login function ---------------
	function login(event) {
		event.preventDefault();
		let name = document.getElementById('nameSi').value;
		let pass = document.getElementById('passSi').value;
		if(Lockr.get(name) !== undefined) {
			let currentUser = Lockr.get(name);
			console.log(currentUser.name);
			console.log(currentUser.pass);
			if(currentUser.name === name && currentUser.pass === pass) {
				document.getElementById('loginSignup').classList.add('hidden');
				document.getElementById('gameSelect').classList.remove('hidden');
				document.getElementById('userName').innerHTML = currentUser.name;
				document.getElementById('totQs').innerHTML = currentUser.totQs;
				document.getElementById('perc').innerHTML = currentUser.perc;
				document.getElementById('userStats').classList.remove('hidden');
			}
			else {
				alert("Sorry, the name and password combination doesn't match our records");
			}
		}
	}
	// signup function ----------------
	function signUp(event) {
		event.preventDefault();
		let name = document.getElementById('name').value;
		let pass = document.getElementById('pass').value;
		let passCon = document.getElementById('passCon').value;

		
		if(name.length>0) {
			if(pass === passCon) {
				Lockr.set(name, {name: name, pass: pass, totQs: 0, perc: 0});
				document.getElementById('loginSignup').classList.add('hidden');
				document.getElementById('gameSelect').classList.remove('hidden');
				document.getElementById('userName').innerHTML = currentUser.name;
				document.getElementById('totQs').innerHTML = currentUser.totQs;
				document.getElementById('perc').innerHTML = currentUser.perc;
				document.getElementById('userStats').classList.remove('hidden');
			}
			else {
				alert('Sorry, you must enter the same password');
			}
		}
		else {
			alert('Sorry, you must enter a name');
		}
	}

	// assemble question UI ----------------
	var count = 0;
	function assemble() {
		if(questions[count].type === 'boolean') {
			document.getElementById('multipleChoice').classList.add('hidden');
			document.getElementById('trueFalse').classList.remove('hidden');
		}
		else {
			document.getElementById('trueFalse').classList.add('hidden');
			document.getElementById('multipleChoice').classList.remove('hidden');
			let possibleAnswers = questions[count].incorrect_answers;
			possibleAnswers.push(questions[count].correct_answer);
			possibleAnswers.sort();
			console.log(possibleAnswers);
			document.getElementById('A').innerHTML = possibleAnswers[0];
			document.getElementById('B').innerHTML = possibleAnswers[1];
			document.getElementById('C').innerHTML = possibleAnswers[2];
			document.getElementById('D').innerHTML = possibleAnswers[3];
			document.getElementById('answer').innerHTML = questions[count].correct_answer;

			console.log(document.getElementById('A').innerHTML);
			console.log(document.getElementById('B').innerHTML);
			console.log(document.getElementById('C').innerHTML);
			console.log(document.getElementById('D').innerHTML);
		}
		document.getElementById('category').innerHTML = questions[count].category;
		document.getElementById('difficulty').innerHTML = questions[count].difficulty;
		document.getElementById('question').innerHTML = questions[count].question;
	}

$(document).ready(function() {
	getQuestions();

	// listeners -------------------
	document.getElementById('signUp').addEventListener('click', signUp);
	document.getElementById('login').addEventListener('click', login);
	document.getElementById('newUser').addEventListener('click', function() {
		this.classList.add('hidden');
		document.getElementById('loginModule').classList.add('hidden');
		document.getElementById('signUpModule').classList.remove('hidden');
	})
	document.getElementById('playNow').addEventListener('click', function() {
		assemble();
		document.getElementById('gameSelect').classList.add('hidden');
		document.getElementById('game').classList.remove('hidden');
	})
	document.getElementById('nextQ').addEventListener('click', function() {
		count+=1;
		assemble();
	})
})


// 	var questions = [];
// 	// get trivia questions function ---------
// 	let crossOrigin = 'https://crossorigin.me/';
// 	let api = 'https://www.opentdb.com/api.php?amount=10';
// 	let url = crossOrigin+api;

// 	function getQuestions() {
// 		$.get(url, function(data) {
// 			questions = data.results;
// 			return questions;
// 		})

// 		var count = 0;
// 		function assemble() {
// 			if(questions[count].type === 'boolean') {
// 				document.getElementById('multipleChoice').classList.add('hidden');
// 				document.getElementById('trueFalse').classList.remove('hidden');
// 			}
// 			else if(questions[count].type === 'multiple') {
// 				document.getElementById('trueFalse').classList.add('hidden');
// 				document.getElementById('multipleChoice').classList.remove('hidden');
// 				let possibleAnswers = questions[count].incorrect_answers;
// 				possibleAnswers.push(questions[count].correct_answer);
// 				possibleAnswers.sort();
// 				console.log(possibleAnswers);
// 				document.getElementById('A').innerHTML = possibleAnswers[0];
// 				document.getElementById('B').innerHTML = possibleAnswers[1];
// 				document.getElementById('C').innerHTML = possibleAnswers[2];
// 				document.getElementById('D').innerHTML = possibleAnswers[3];
// 				document.getElementById('answer').innerHTML = questions[count].correct_answer;

// 				console.log(document.getElementById('A').innerHTML);
// 				console.log(document.getElementById('B').innerHTML);
// 				console.log(document.getElementById('C').innerHTML);
// 				console.log(document.getElementById('D').innerHTML);
// 			}
// 			else if(questions[count].type === undefined) {
// 				assemble();
// 			}
// 			document.getElementById('category').innerHTML = questions[count].category;
// 			document.getElementById('difficulty').innerHTML = questions[count].difficulty;
// 			document.getElementById('question').innerHTML = questions[count].question;
// 		}
// 		function checkStatus() {
// 			var assembleInterval = window.setInterval(assemble, 100);
// 			if(questions.length>0) {
// 				window.clearInterval(assembleInterval);
// 			}
// 			else {
// 				checkStatus()
// 			}
// 		}
// 		checkStatus();
// 	}

// 	// login function ---------------
// 	function login(event) {
// 		event.preventDefault();
// 		let name = document.getElementById('nameSi').value;
// 		let pass = document.getElementById('passSi').value;
// 		if(Lockr.get(name) !== undefined) {
// 			let currentUser = Lockr.get(name);
// 			console.log(currentUser.name);
// 			console.log(currentUser.pass);
// 			if(currentUser.name === name && currentUser.pass === pass) {
// 				document.getElementById('loginSignup').classList.add('hidden');
// 				document.getElementById('gameSelect').classList.remove('hidden');
// 				document.getElementById('userName').innerHTML = currentUser.name;
// 				document.getElementById('totQs').innerHTML = currentUser.totQs;
// 				document.getElementById('perc').innerHTML = currentUser.perc;
// 				document.getElementById('userStats').classList.remove('hidden');
// 			}
// 			else {
// 				alert("Sorry, the name and password combination doesn't match our records");
// 			}
// 		}
// 	}
// 	// signup function ----------------
// 	function signUp(event) {
// 		event.preventDefault();
// 		let name = document.getElementById('name').value;
// 		let pass = document.getElementById('pass').value;
// 		let passCon = document.getElementById('passCon').value;

		
// 		if(name.length>0) {
// 			if(pass === passCon) {
// 				Lockr.set(name, {name: name, pass: pass, totQs: 0, perc: 0});
// 				document.getElementById('loginSignup').classList.add('hidden');
// 				document.getElementById('gameSelect').classList.remove('hidden');
// 				document.getElementById('userName').innerHTML = currentUser.name;
// 				document.getElementById('totQs').innerHTML = currentUser.totQs;
// 				document.getElementById('perc').innerHTML = currentUser.perc;
// 				document.getElementById('userStats').classList.remove('hidden');
// 			}
// 			else {
// 				alert('Sorry, you must enter the same password');
// 			}
// 		}
// 		else {
// 			alert('Sorry, you must enter a name');
// 		}
// 	}

// 	// assemble question UI ----------------
	

// $(document).ready(function() {
// 	getQuestions();
// 	// listeners -------------------
// 	document.getElementById('signUp').addEventListener('click', signUp);
// 	document.getElementById('login').addEventListener('click', login);
// 	document.getElementById('newUser').addEventListener('click', function() {
// 		this.classList.add('hidden');
// 		document.getElementById('loginModule').classList.add('hidden');
// 		document.getElementById('signUpModule').classList.remove('hidden');
// 	})
// 	document.getElementById('playNow').addEventListener('click', function() {
// 		document.getElementById('gameSelect').classList.add('hidden');
// 		document.getElementById('game').classList.remove('hidden');
// 	})
// 	document.getElementById('nextQ').addEventListener('click', function() {
// 		count+=1;
// 		assemble();
// 	})
// })

