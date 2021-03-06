

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
	let loginSignup = document.getElementById('loginSignup');
	let welcomeMessage = document.getElementById('welcomeMessage');
	let userName = document.getElementById('userName');
	let totQs = document.getElementById('totQs');
	let perc = document.getElementById('perc');
	var count = 0;
	var answeredCorrect;
	let signUpBtn = document.getElementById('signUp');
	let loginBtn = document.getElementById('login');
	let newUser = document.getElementById('newUser');
	let loginModule = document.getElementById('loginModule');
	let signUpModule = document.getElementById('signUpModule');
	let back = document.getElementById('back');
	
	// https://www.opentdb.com/api.php?amount=50&category=21&difficulty=medium
	// get trivia questions function ---------
	let crossOrigin = 'https://crossorigin.me/';
	let apiBase = 'https://www.opentdb.com/api.php?amount=50';
	let category = document.getElementById('chooseC').value;
	let newQuestions = document.getElementById('newQuestions');
	let urlBase = crossOrigin+apiBase;	

	function getQuestions() {

		if(category !== 'any') {
			url+='&category='+category;
		}
		else {
			url=urlBase;
		}
		console.log(url);
		$.get(url, function(data) {
			questions = data.results;
			return questions;
		})
		.fail(function() {
			console.log('error');
			alert('Sorry, something went wrong with the request');
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
				loginSignup.classList.add('hidden');
				welcomeMessage.classList.remove('hidden');
				userName.innerHTML = currentUser.name;
				totQs.innerHTML = currentUser.totQs;
				perc.innerHTML = currentUser.perc;
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
				Lockr.set(name, currentUser);
				// currentUser = Lockr.get(name);
				loginSignup.classList.add('hidden');
				welcomeMessage.classList.remove('hidden');
				userName.innerHTML = currentUser.name;
				totQs.innerHTML = currentUser.totQs;
				perc.innerHTML = currentUser.perc;
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

	// new questions set function ---------------------------------
	function personalize(event) {
		event.preventDefault();
		category = document.getElementById('chooseC').value;
		console.log(category);
		getQuestions();
	}

	// assemble question UI --------------------------------------------
	function assemble() {
		answeredCorrect = false;
		let response = document.getElementById('response');
		let multipleChoice = document.getElementById('multipleChoice')
		let next = document.getElementById('next');
		let trueFalse = document.getElementById('trueFalse')
		let category = document.getElementById('category');
		let difficulty = document.getElementById('difficulty');
		let question = document.getElementById('question');
		function hideBtns() {
			question.classList.add('hidden');
			trueFalse.classList.add('hidden');
			multipleChoice.classList.add('hidden');
			next.classList.remove('hidden');
		}
		function showTrueFalse() {
			question.classList.remove('hidden');
			trueFalse.classList.remove('hidden');
			next.classList.add('hidden');
		}
		function showMultipleChoice() {
			question.classList.remove('hidden');
			multipleChoice.classList.remove('hidden');
			next.classList.add('hidden');
		}
		category.innerHTML = questions[count].category;
		difficulty.innerHTML = questions[count].difficulty;
		question.innerHTML = questions[count].question;
		response.classList.add('hidden');
		hideBtns();
		// check question format ------------------
		if(questions[count].type === 'boolean') {
			showTrueFalse();
			
			let T = document.getElementById('true');
			let F = document.getElementById('false');
			
			T.addEventListener('click', function() {
				hideBtns();
				if(T.innerHTML === questions[count].correct_answer) {
					response.innerHTML = 'this is true!';
					response.classList.remove('hidden');
					answeredCorrect = true;
				}
				else {
					response.innerHTML = 'Sorry, this is false';
					response.classList.remove('hidden');
				}
			})

			F.addEventListener('click', function() {
				hideBtns();
				if(F.innerHTML === questions[count].correct_answer) {
					response.innerHTML = 'this is false!';
					response.classList.remove('hidden');
					answeredCorrect = true;
				}
				else {
					response.innerHTML = 'Sorry, this is true';
					response.classList.remove('hidden');
				}
			})
		}
		else {
			showMultipleChoice();
			
			let possibleAnswers = questions[count].incorrect_answers;
			// loop through and add a reference number to possible answers
			for(var i=0;i<possibleAnswers.length;i++) {
				possibleAnswers[i] = [possibleAnswers[i], i+1];
			}
			// add reference number(index 0) to correct answer
			let rightAnswer = [questions[count].correct_answer, 0];
			// add correct answer to possible answers
			possibleAnswers.push(rightAnswer);
			// change order of possible answers
			possibleAnswers.sort();

			let A = document.getElementById('A');
			let B = document.getElementById('B');
			let C = document.getElementById('C');
			let D = document.getElementById('D');
			
			// add answer text to ABCD buttons
			A.innerHTML = possibleAnswers[0][0];
			B.innerHTML = possibleAnswers[1][0];
			C.innerHTML = possibleAnswers[2][0];
			D.innerHTML = possibleAnswers[3][0];
			
			// Multiple choice answer buttons ------------
			A.addEventListener('click', function() {
				hideBtns();
				if(possibleAnswers[0][1] === 0) {
					response.innerHTML = 'Correct!';
					response.classList.remove('hidden');
					answeredCorrect = true;
				}
				else {
					response.innerHTML = 'Sorry, the correct answer is '+questions[count].correct_answer;
					response.classList.remove('hidden');
				}
			})
			B.addEventListener('click', function() {
				hideBtns();
				if(possibleAnswers[1][1] === 0) {
					response.innerHTML = 'Correct!';
					response.classList.remove('hidden');
					answeredCorrect = true;
				}
				else {
					response.innerHTML = 'Sorry, the correct answer is '+questions[count].correct_answer;
					response.classList.remove('hidden');
				}
			})
			C.addEventListener('click', function() {
				hideBtns();
				if(possibleAnswers[2][1] === 0) {
					response.innerHTML = 'Correct!';
					response.classList.remove('hidden');
					answeredCorrect = true;
				}
				else {
					response.innerHTML = 'Sorry, the correct answer is '+questions[count].correct_answer;
					response.classList.remove('hidden');
				}
			})
			D.addEventListener('click', function() {
				hideBtns();
				if(possibleAnswers[3][1] === 0) {
					response.innerHTML = 'Correct!';
					response.classList.remove('hidden');
					answeredCorrect = true;
				}
				else {
					response.innerHTML = 'Sorry, the correct answer is '+questions[count].correct_answer;
					response.classList.remove('hidden');
				}
			})
		}
		return (answeredCorrect, currentUser);
	}
	// Grab trivia questions ---------------------
	getQuestions();

	// Signup/Login buttons
	signUpBtn.addEventListener('click', signUp);
	loginBtn.addEventListener('click', login);
	newUser.addEventListener('click', function() {
		document.getElementById('toSignup').classList.add('hidden');
		loginModule.classList.add('hidden');
		signUpModule.classList.remove('hidden');
		back.classList.remove('hidden');
	})
	// Back to login screen ---------------------
	back.addEventListener('click', function() {
		this.classList.add('hidden');
		loginModule.classList.remove('hidden');
		signUpModule.classList.add('hidden');
		document.getElementById('toSignup').classList.remove('hidden');
	})
	// Play now button --------------------------
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
	// next question button ----------------------
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
		userName.innerHTML = currentUser.name;
		totQs.innerHTML = currentUser.totQs;
		perc.innerHTML = currentUser.perc;
		Lockr.set(currentUser.name, currentUser);
		count+=1;
		if(count === 50) {
			count=0;
			getQuestions();
		}
		else {
			assemble();
		}
	})
	newQuestions.addEventListener('click', personalize);
})