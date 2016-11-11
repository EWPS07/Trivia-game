

$(document).ready(function() {

	// User constructor -------------------------------------
	var User = function(name, pass, totQs, corQs, perc) {
		this.name = name;
		this.pass = pass;
		this.totQs = totQs;
		this.corQs = corQs;
		this.perc = perc;
	}
	var currentUser;
	var questions = [];
	// get trivia questions function ---------
	let crossOrigin = 'https://crossorigin.me/';
	let api = 'http://www.opentdb.com/api.php?amount=50';
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

	// login function --------------------------------------------
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
				console.log('from login', currentUser);
				return currentUser;
			}
			else {
				alert("Sorry, the name and password combination doesn't match our records");
			}
		}
		else {
			alert("Sorry, we don't seem to have your information");
		}
	}
	// signup function --------------------------------------------
	function signUp(event) {
		event.preventDefault();
		let name = document.getElementById('name').value;
		let pass = document.getElementById('pass').value;
		let passCon = document.getElementById('passCon').value;

		// make sure the user enters a name
		if(name.length>0) {
			// make sure the user confirmed password correctly
			if(pass === passCon) {
				currentUser = new User(name, pass, 0, 0, 0);
				console.log('from signup', currentUser);
				Lockr.set(name, currentUser);
				// currentUser = Lockr.get(name);
				document.getElementById('loginSignup').classList.add('hidden');
				document.getElementById('welcomeMessage').classList.remove('hidden');
				document.getElementById('userName').innerHTML = currentUser.name;
				document.getElementById('totQs').innerHTML = currentUser.totQs;
				document.getElementById('perc').innerHTML = currentUser.perc;
				console.log('from signup', currentUser);
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


	// assemble question UI --------------------------------------------
	var count = 0;
	var answeredCorrect;
	console.log('from assemble', currentUser);
	function assemble() {
		answeredCorrect = false;
		function hideBtns() {
			document.getElementById('true').classList.add('hidden');
			document.getElementById('false').classList.add('hidden');
			document.getElementById('A').classList.add('hidden');
			document.getElementById('B').classList.add('hidden');
			document.getElementById('C').classList.add('hidden');
			document.getElementById('D').classList.add('hidden');
			document.getElementById('triviaBottom').classList.remove('hidden');
		}
		function showBtns() {
			document.getElementById('true').classList.remove('hidden');
			document.getElementById('false').classList.remove('hidden');
			document.getElementById('A').classList.remove('hidden');
			document.getElementById('B').classList.remove('hidden');
			document.getElementById('C').classList.remove('hidden');
			document.getElementById('D').classList.remove('hidden');
			document.getElementById('triviaBottom').classList.add('hidden');
		}
		showBtns();
		document.getElementById('category').innerHTML = questions[count].category;
		document.getElementById('difficulty').innerHTML = questions[count].difficulty;
		document.getElementById('question').innerHTML = questions[count].question;
		document.getElementById('response').classList.add('hidden');
		
		// check question format ------------------
		if(questions[count].type === 'boolean') {
			document.getElementById('multipleChoice').classList.add('hidden');
			document.getElementById('multipleChoice').classList.add('noClick');
			document.getElementById('trueFalse').classList.remove('hidden');
			document.getElementById('trueFalse').classList.remove('noClick');
			
			let T = document.getElementById('true');
			let F = document.getElementById('false');
			
			T.addEventListener('click', function() {
				hideBtns();
				if(T.innerHTML === questions[count].correct_answer) {
					document.getElementById('response').innerHTML = 'this is true!';
					document.getElementById('response').classList.remove('hidden');
					answeredCorrect = true;
				}
				else {
					document.getElementById('response').innerHTML = 'Sorry, this is false';
					document.getElementById('response').classList.remove('hidden');
				}
			})

			F.addEventListener('click', function() {
				hideBtns();
				if(F.innerHTML === questions[count].correct_answer) {
					document.getElementById('response').innerHTML = 'this is false!';
					document.getElementById('response').classList.remove('hidden');
					answeredCorrect = true;
				}
				else {
					document.getElementById('response').innerHTML = 'Sorry, this is true';
					document.getElementById('response').classList.remove('hidden');
				}
			})
		}
		else {
			document.getElementById('multipleChoice').classList.remove('hidden');
			document.getElementById('multipleChoice').classList.remove('noClick');
			document.getElementById('trueFalse').classList.add('hidden');
			document.getElementById('trueFalse').classList.add('noClick');
			
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
				hideBtns();
				if(A.innerHTML === questions[count].correct_answer) {
					document.getElementById('response').innerHTML = 'Correct!';
					document.getElementById('response').classList.remove('hidden');
					answeredCorrect = true;
				}
				else {
					document.getElementById('response').innerHTML = 'Sorry, the correct answer is '+questions[count].correct_answer;
					document.getElementById('response').classList.remove('hidden');
				}
			})
			B.addEventListener('click', function() {
				hideBtns();
				if(B.innerHTML === questions[count].correct_answer) {
					document.getElementById('response').innerHTML = 'Correct!';
					document.getElementById('response').classList.remove('hidden');
					answeredCorrect = true;
				}
				else {
					document.getElementById('response').innerHTML = 'Sorry, the correct answer is '+questions[count].correct_answer;
					document.getElementById('response').classList.remove('hidden');
				}
			})
			C.addEventListener('click', function() {
				hideBtns();
				if(C.innerHTML === questions[count].correct_answer) {
					document.getElementById('response').innerHTML = 'Correct!';
					document.getElementById('response').classList.remove('hidden');
					answeredCorrect = true;
				}
				else {
					document.getElementById('response').innerHTML = 'Sorry, the correct answer is '+questions[count].correct_answer;
					document.getElementById('response').classList.remove('hidden');
				}
			})
			D.addEventListener('click', function() {
				hideBtns();
				if(D.innerHTML === questions[count].correct_answer) {
					document.getElementById('response').innerHTML = 'Correct!';
					document.getElementById('response').classList.remove('hidden');
					answeredCorrect = true;
				}
				else {
					document.getElementById('response').innerHTML = 'Sorry, the correct answer is '+questions[count].correct_answer;
					document.getElementById('response').classList.remove('hidden');
				}
			})
		}
		console.log('from end of assemble', currentUser);
		return (answeredCorrect, currentUser);
	}

	getQuestions();
	document.getElementById('signUp').addEventListener('click', signUp);
	
	document.getElementById('login').addEventListener('click', login);
	
	document.getElementById('newUser').addEventListener('click', function() {
		document.getElementById('toSignup').classList.add('hidden');
		document.getElementById('loginModule').classList.add('hidden');
		document.getElementById('signUpModule').classList.remove('hidden');
		document.getElementById('back').classList.remove('hidden');
	})
	
	document.getElementById('back').addEventListener('click', function() {
		this.classList.add('hidden');
		document.getElementById('loginModule').classList.remove('hidden');
		document.getElementById('signUpModule').classList.add('hidden');
		document.getElementById('toSignup').classList.remove('hidden');
	})

	document.getElementById('playNow').addEventListener('click', function() {
		document.getElementById('welcomeMessage').classList.add('hidden');
		document.getElementById('userStats').classList.remove('hidden');
		function loaded() {
			if(questions.length === 50) {
				document.getElementById('game').classList.remove('hidden');
				document.getElementById('loadingMessage').classList.add('hidden');
				return;
			}
			else {
				loaded();
			}
		}
		loaded();
	})
	
	document.getElementById('nextQ').addEventListener('click', function() {
		if(answeredCorrect === true) {
			currentUser.corQs+=1;
			currentUser.totQs+=1;
			currentUser.perc = Math.round((currentUser.corQs/currentUser.totQs) *100);
		}
		else {
			currentUser.totQs+=1;
			currentUser.perc = Math.round((currentUser.corQs/currentUser.totQs) *100)
		}
		document.getElementById('userName').innerHTML = currentUser.name;
		document.getElementById('totQs').innerHTML = currentUser.totQs;
		document.getElementById('perc').innerHTML = currentUser.perc;
		Lockr.set(currentUser.name, currentUser);
		console.log(currentUser);
		count+=1;
		if(count === 50) {
			count=0;
			getQuestions();
		}
		else {
			assemble();
		}
	})
})