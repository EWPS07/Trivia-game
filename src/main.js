var currentUser;
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
		// return questions;
		.done(function() {
			assemble();
		})
	}

	// login function ---------------
	function login(event) {
		event.preventDefault();
		let name = document.getElementById('nameSi').value;
		let pass = document.getElementById('passSi').value;
		if(Lockr.get(name) !== undefined) {
			currentUser = Lockr.get(name);
			// check if name and password are connected
			if(currentUser.name === name && currentUser.pass === pass) {
				document.getElementById('loginSignup').classList.add('hidden');
				document.getElementById('welcomeMessage').classList.remove('hidden');
				document.getElementById('userName').innerHTML = currentUser.name;
				document.getElementById('totQs').innerHTML = currentUser.totQs;
				document.getElementById('perc').innerHTML = currentUser.perc;
				document.getElementById('userStats').classList.remove('hidden');
			}
			else {
				alert("Sorry, the name and password combination doesn't match our records");
			}
			console.log(currentUser);
			return currentUser;
		}
	}
	// signup function ----------------
	function signUp(event) {
		event.preventDefault();
		let name = document.getElementById('name').value;
		let pass = document.getElementById('pass').value;
		let passCon = document.getElementById('passCon').value;

		// make sure the user enters a name
		if(name.length>0) {
			// make sure the user confirmed password correctly
			if(pass === passCon) {
				Lockr.set(name, {name: name, pass: pass, totQs: 0, corQs: 0, inQs: 0, perc: 0});
				currentUser = Lockr.get(name);
				document.getElementById('loginSignup').classList.add('hidden');
				document.getElementById('welcomeMessage').classList.remove('hidden');
				document.getElementById('userName').innerHTML = currentUser.name;
				document.getElementById('totQs').innerHTML = currentUser.totQs;
				document.getElementById('perc').innerHTML = currentUser.perc;
				document.getElementById('userStats').classList.remove('hidden');
				console.log(currentUser);
				return currentUser;
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
	currentUser = currentUser;
	console.log(currentUser);
	function assemble() {
		document.getElementById('category').innerHTML = questions[count].category;
		document.getElementById('difficulty').innerHTML = questions[count].difficulty;
		document.getElementById('question').innerHTML = questions[count].question;
		document.getElementById('response').classList.add('hidden');
		
		// check question format
		if(questions[count].type === 'boolean') {
			document.getElementById('multipleChoice').classList.add('hidden');
			document.getElementById('trueFalse').classList.remove('hidden');
			
			let T = document.getElementById('true');
			let F = document.getElementById('false');
			
			T.addEventListener('click', function() {
				if(T.innerHTML === questions[count].correct_answer) {
					document.getElementById('response').innerHTML = 'this is true!';
					document.getElementById('response').classList.remove('hidden');
					currentUser.corQs+=1;
				}
				else {
					document.getElementById('response').innerHTML = 'Sorry, this is false';
					document.getElementById('response').classList.remove('hidden');
					currentUser.inQs+=1;
				}
				currentUser.totQs+=1;
				currentUser.perc=Math.round((currentUser.corQs/currentUser.totQs)*100);
				Lockr.set(currentUser.name, currentUser);
			})

			F.addEventListener('click', function() {
				if(F.innerHTML === questions[count].correct_answer) {
					document.getElementById('response').innerHTML = 'this is false!';
					document.getElementById('response').classList.remove('hidden');
					currentUser.corQs+=1;
				}
				else {
					document.getElementById('response').innerHTML = 'Sorry, this is true';
					document.getElementById('response').classList.remove('hidden');
					currentUser.inQs+=1;
				}
				currentUser.totQs+=1;
				currentUser.perc=Math.round((currentUser.corQs/currentUser.totQs)*100);
				Lockr.set(currentUser.name, currentUser);
			})
		}
		else {
			document.getElementById('trueFalse').classList.add('hidden');
			document.getElementById('multipleChoice').classList.remove('hidden');
			
			let possibleAnswers = questions[count].incorrect_answers;
			
			possibleAnswers.push(questions[count].correct_answer);
			possibleAnswers.sort();

			let A = document.getElementById('A');
			let B = document.getElementById('B');
			let C = document.getElementById('C');
			let D = document.getElementById('D');
			
			A.innerHTML = possibleAnswers[0];
			B.innerHTML = possibleAnswers[1];
			C.innerHTML = possibleAnswers[2];
			D.innerHTML = possibleAnswers[3];
			
			A.addEventListener('click', function() {
				if(A.innerHTML === questions[count].correct_answer) {
					document.getElementById('response').innerHTML = 'Correct!';
					document.getElementById('response').classList.remove('hidden');
					currentUser.corQs+=1;
				}
				else {
					document.getElementById('response').innerHTML = 'Sorry, the correct answer is '+questions[count].correct_answer;
					document.getElementById('response').classList.remove('hidden');
					currentUser.inQs+=1;
				}
				currentUser.totQs+=1;
				currentUser.perc=Math.round((currentUser.corQs/currentUser.totQs)*100);
				Lockr.set(currentUser.name, currentUser);
			})
			B.addEventListener('click', function() {
				if(B.innerHTML === questions[count].correct_answer) {
					document.getElementById('response').innerHTML = 'Correct!';
					document.getElementById('response').classList.remove('hidden');
					currentUser.corQs+=1;
				}
				else {
					document.getElementById('response').innerHTML = 'Sorry, the correct answer is '+questions[count].correct_answer;
					document.getElementById('response').classList.remove('hidden');
					currentUser.inQs+=1;
				}
				currentUser.totQs+=1;
				currentUser.perc=Math.round((currentUser.corQs/currentUser.totQs)*100);
				Lockr.set(currentUser.name, currentUser);
			})
			C.addEventListener('click', function() {
				if(C.innerHTML === questions[count].correct_answer) {
					document.getElementById('response').innerHTML = 'Correct!';
					document.getElementById('response').classList.remove('hidden');
					currentUser.corQs+=1;
				}
				else {
					document.getElementById('response').innerHTML = 'Sorry, the correct answer is '+questions[count].correct_answer;
					document.getElementById('response').classList.remove('hidden');
					currentUser.inQs+=1;
				}
				currentUser.totQs+=1;
				currentUser.perc=Math.round((currentUser.corQs/currentUser.totQs)*100);
				Lockr.set(currentUser.name, currentUser);
			})
			D.addEventListener('click', function() {
				if(D.innerHTML === questions[count].correct_answer) {
					document.getElementById('response').innerHTML = 'Correct!';
					document.getElementById('response').classList.remove('hidden');
					currentUser.corQs+=1;
				}
				else {
					document.getElementById('response').innerHTML = 'Sorry, the correct answer is '+questions[count].correct_answer;
					document.getElementById('response').classList.remove('hidden');
					currentUser.inQs+=1;
				}
				currentUser.totQs+=1;
				currentUser.perc=Math.round((currentUser.corQs/currentUser.totQs)*100);
				Lockr.set(currentUser.name, currentUser);
			})
		}
	}

$(document).ready(function() {
	getQuestions();
	document.getElementById('signUp').addEventListener('click', signUp);
	document.getElementById('login').addEventListener('click', login);
	document.getElementById('newUser').addEventListener('click', function() {
		this.classList.add('hidden');
		document.getElementById('loginModule').classList.add('hidden');
		document.getElementById('signUpModule').classList.remove('hidden');
	})
	document.getElementById('playNow').addEventListener('click', function() {
		document.getElementById('welcomeMessage').classList.add('hidden');
		document.getElementById('game').classList.remove('hidden');
	})
	document.getElementById('nextQ').addEventListener('click', function() {
		count+=1;
		if(count === 10) {
			count=0;
			getQuestions();
		}
		else {
			assemble();
		}
	})
})