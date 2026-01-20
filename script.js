// Utility function to shuffle array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Page Navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    updateSidebarMenu(pageId);
}

function updateSidebarMenu(pageId) {
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    
    if (pageId === 'homePage') {
        document.querySelectorAll('.nav-item')[0].classList.add('active');
    } else if (pageId === 'quizSelectionPage') {
        document.querySelectorAll('.nav-item')[1].classList.add('active');
    } else if (pageId === 'statisticsPage') {
        document.querySelectorAll('.nav-item')[2].classList.add('active');
    } else if (pageId === 'profilePage') {
        document.querySelectorAll('.nav-item')[3].classList.add('active');
    }
}

function showFrontPage() {
    showPage('frontPage');
}

function showLoginPage() {
    showPage('loginPage');
}

function showRegisterPage() {
    showPage('registerPage');
}

function navigateToHome() {
    updateHomeStats();
    showPage('homePage');
}

function showQuizSelection() {
    showPage('quizSelectionPage');
}

function showStatistics() {
    loadStatistics();
    showPage('statisticsPage');
}

function showProfile() {
    loadProfile();
    showPage('profilePage');
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

// User Management
function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    // Validate inputs
    if (!name || !email || !password) {
        alert('Please fill in all fields!');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(u => u.email === email)) {
        alert('Email already registered!');
        return;
    }
    
    const user = {
        id: Date.now(),
        name: name,
        email: email,
        password: password,
        quizzes: []
    };
    
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('Registration successful! Please login.');
    
    // Clear form
    const registerForm = document.getElementById('registerPage').querySelector('form');
    if (registerForm) {
        registerForm.reset();
    }
    
    // Clear input fields
    document.getElementById('registerName').value = '';
    document.getElementById('registerEmail').value = '';
    document.getElementById('registerPassword').value = '';
    
    showLoginPage();
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Validate inputs
    if (!email || !password) {
        alert('Please fill in all fields!');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        document.getElementById('userNameDisplay').textContent = user.name;
        
        // Clear login form
        const loginForm = document.getElementById('loginPage').querySelector('form');
        if (loginForm) {
            loginForm.reset();
        }
        
        // Clear input fields
        document.getElementById('loginEmail').value = '';
        document.getElementById('loginPassword').value = '';
        
        // Show sidebar and navigate to home
        document.getElementById('sidebar').style.display = 'flex';
        navigateToHome();
    } else {
        alert('Invalid email or password!');
    }
}

function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        document.getElementById('sidebar').style.display = 'none';
        showFrontPage();
    }
}

// Hide sidebar on initial load
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('sidebar').style.display = 'none';
});

// Quiz Questions Database - Multiple Choice
const multipleChoiceQuizzes = {
    easy: [
        { question: 'What is 5 + 3?', options: ['8', '7', '9', '6'], correct: 0 },
        { question: 'What is 12 - 4?', options: ['8', '6', '7', '9'], correct: 0 },
        { question: 'What is 3 × 4?', options: ['12', '11', '13', '10'], correct: 0 },
        { question: 'What is 20 ÷ 4?', options: ['5', '4', '6', '3'], correct: 0 },
        { question: 'What is 7 + 8?', options: ['15', '14', '16', '13'], correct: 0 },
        { question: 'What is 25 - 10?', options: ['15', '14', '16', '13'], correct: 0 },
        { question: 'What is 6 × 2?', options: ['12', '11', '13', '10'], correct: 0 },
        { question: 'What is 18 ÷ 3?', options: ['6', '5', '7', '4'], correct: 0 },
        { question: 'What is 9 + 6?', options: ['15', '14', '16', '13'], correct: 0 },
        { question: 'What is 30 ÷ 5?', options: ['6', '5', '7', '4'], correct: 0 },
        { question: 'What is 11 + 9?', options: ['20', '19', '21', '18'], correct: 0 },
        { question: 'What is 16 - 7?', options: ['9', '8', '10', '7'], correct: 0 },
        { question: 'What is 4 × 5?', options: ['20', '19', '21', '22'], correct: 0 },
        { question: 'What is 24 ÷ 6?', options: ['4', '3', '5', '6'], correct: 0 },
        { question: 'What is 13 + 7?', options: ['20', '19', '21', '18'], correct: 0 }
    ],
    medium: [
        { question: 'What is 25 + 17?', options: ['42', '41', '43', '40'], correct: 0 },
        { question: 'What is 56 - 23?', options: ['33', '32', '34', '35'], correct: 0 },
        { question: 'What is 12 × 5?', options: ['60', '59', '61', '58'], correct: 0 },
        { question: 'What is 144 ÷ 12?', options: ['12', '11', '13', '10'], correct: 0 },
        { question: 'What is 7² (7 squared)?', options: ['49', '48', '50', '47'], correct: 0 },
        { question: 'What is 15 × 8?', options: ['120', '119', '121', '118'], correct: 0 },
        { question: 'What is 98 - 45?', options: ['53', '52', '54', '51'], correct: 0 },
        { question: 'What is 8 × 9?', options: ['72', '71', '73', '70'], correct: 0 },
        { question: 'What is 100 ÷ 4?', options: ['25', '24', '26', '23'], correct: 0 },
        { question: 'What is √64?', options: ['8', '7', '9', '6'], correct: 0 },
        { question: 'What is 37 + 28?', options: ['65', '64', '66', '63'], correct: 0 },
        { question: 'What is 85 - 32?', options: ['53', '52', '54', '51'], correct: 0 },
        { question: 'What is 6² (6 squared)?', options: ['36', '35', '37', '34'], correct: 0 },
        { question: 'What is √121?', options: ['11', '10', '12', '9'], correct: 0 },
        { question: 'What is 18 × 4?', options: ['72', '71', '73', '70'], correct: 0 }
    ],
    hard: [
        { question: 'What is 234 + 567?', options: ['801', '800', '802', '799'], correct: 0 },
        { question: 'What is 1000 - 342?', options: ['658', '657', '659', '656'], correct: 0 },
        { question: 'What is 23 × 17?', options: ['391', '390', '392', '389'], correct: 0 },
        { question: 'What is 144 ÷ 12?', options: ['12', '11', '13', '10'], correct: 0 },
        { question: 'What is 9³ (9 cubed)?', options: ['729', '728', '730', '727'], correct: 0 },
        { question: 'What is 15% of 200?', options: ['30', '29', '31', '28'], correct: 0 },
        { question: 'What is √196?', options: ['14', '13', '15', '12'], correct: 0 },
        { question: 'What is 45 × 12?', options: ['540', '539', '541', '538'], correct: 0 },
        { question: 'What is 256 ÷ 16?', options: ['16', '15', '17', '14'], correct: 0 },
        { question: 'What is 2⁸ (2 to the 8th power)?', options: ['256', '255', '257', '254'], correct: 0 },
        { question: 'What is 456 + 789?', options: ['1245', '1244', '1246', '1243'], correct: 0 },
        { question: 'What is 2000 - 567?', options: ['1433', '1432', '1434', '1431'], correct: 0 },
        { question: 'What is 32 × 25?', options: ['800', '799', '801', '798'], correct: 0 },
        { question: 'What is 5⁴ (5 to the 4th)?', options: ['625', '624', '626', '623'], correct: 0 },
        { question: 'What is √289?', options: ['17', '16', '18', '15'], correct: 0 }
    ]
};

// Quiz Questions Database - True or False
const trueOrFalseQuizzes = {
    easy: [
        { question: '5 + 3 = 8', correct: true },
        { question: '12 - 4 = 9', correct: false },
        { question: '3 × 4 = 12', correct: true },
        { question: '20 ÷ 4 = 4', correct: false },
        { question: '7 + 8 = 15', correct: true },
        { question: '25 - 10 = 14', correct: false },
        { question: '6 × 2 = 12', correct: true },
        { question: '18 ÷ 3 = 5', correct: false },
        { question: '9 + 6 = 15', correct: true },
        { question: '30 ÷ 5 = 6', correct: true },
        { question: '11 + 9 = 20', correct: true },
        { question: '16 - 7 = 8', correct: false },
        { question: '4 × 5 = 20', correct: true },
        { question: '24 ÷ 6 = 4', correct: true },
        { question: '13 + 7 = 19', correct: false }
    ],
    medium: [
        { question: '25 + 17 = 42', correct: true },
        { question: '56 - 23 = 32', correct: false },
        { question: '12 × 5 = 60', correct: true },
        { question: '144 ÷ 12 = 11', correct: false },
        { question: '7² = 49', correct: true },
        { question: '15 × 8 = 121', correct: false },
        { question: '98 - 45 = 53', correct: true },
        { question: '8 × 9 = 71', correct: false },
        { question: '100 ÷ 4 = 25', correct: true },
        { question: '√64 = 8', correct: true },
        { question: '37 + 28 = 65', correct: true },
        { question: '85 - 32 = 54', correct: false },
        { question: '6² = 36', correct: true },
        { question: '√121 = 11', correct: true },
        { question: '18 × 4 = 72', correct: true }
    ],
    hard: [
        { question: '234 + 567 = 801', correct: true },
        { question: '1000 - 342 = 657', correct: false },
        { question: '23 × 17 = 391', correct: true },
        { question: '144 ÷ 12 = 12', correct: true },
        { question: '9³ = 729', correct: true },
        { question: '15% of 200 = 40', correct: false },
        { question: '√196 = 14', correct: true },
        { question: '45 × 12 = 540', correct: true },
        { question: '256 ÷ 16 = 16', correct: true },
        { question: '2⁸ = 256', correct: true },
        { question: '456 + 789 = 1245', correct: true },
        { question: '2000 - 567 = 1432', correct: false },
        { question: '32 × 25 = 800', correct: true },
        { question: '5⁴ = 625', correct: true },
        { question: '√289 = 17', correct: true }
    ]
};

// Quiz Questions Database - Matching
const matchingQuizzes = {
    easy: [
        { pairs: [{ left: '5 + 3', right: '8' }, { left: '12 - 4', right: '8' }, { left: '3 × 4', right: '12' }, { left: '20 ÷ 4', right: '5' }, { left: '7 + 8', right: '15' }, { left: '25 - 10', right: '15' }, { left: '6 × 2', right: '12' }, { left: '18 ÷ 3', right: '6' }, { left: '9 + 6', right: '15' }, { left: '30 ÷ 5', right: '6' }] },
        { pairs: [{ left: '11 + 9', right: '20' }, { left: '16 - 7', right: '9' }, { left: '4 × 5', right: '20' }, { left: '24 ÷ 6', right: '4' }, { left: '13 + 7', right: '20' }, { left: '8 + 5', right: '13' }, { left: '14 - 6', right: '8' }, { left: '3 × 3', right: '9' }, { left: '15 ÷ 3', right: '5' }, { left: '10 + 10', right: '20' }] }
    ],
    medium: [
        { pairs: [{ left: '25 + 17', right: '42' }, { left: '56 - 23', right: '33' }, { left: '12 × 5', right: '60' }, { left: '144 ÷ 12', right: '12' }, { left: '7²', right: '49' }, { left: '15 × 8', right: '120' }, { left: '98 - 45', right: '53' }, { left: '8 × 9', right: '72' }, { left: '100 ÷ 4', right: '25' }, { left: '√64', right: '8' }] },
        { pairs: [{ left: '37 + 28', right: '65' }, { left: '85 - 32', right: '53' }, { left: '6²', right: '36' }, { left: '√121', right: '11' }, { left: '18 × 4', right: '72' }, { left: '50 + 30', right: '80' }, { left: '100 - 45', right: '55' }, { left: '9 × 7', right: '63' }, { left: '200 ÷ 8', right: '25' }, { left: '√144', right: '12' }] }
    ],
    hard: [
        { pairs: [{ left: '234 + 567', right: '801' }, { left: '1000 - 342', right: '658' }, { left: '23 × 17', right: '391' }, { left: '144 ÷ 12', right: '12' }, { left: '9³', right: '729' }, { left: '15% of 200', right: '30' }, { left: '√196', right: '14' }, { left: '45 × 12', right: '540' }, { left: '256 ÷ 16', right: '16' }, { left: '2⁸', right: '256' }] },
        { pairs: [{ left: '456 + 789', right: '1245' }, { left: '2000 - 567', right: '1433' }, { left: '32 × 25', right: '800' }, { left: '5⁴', right: '625' }, { left: '√289', right: '17' }, { left: '111 + 222', right: '333' }, { left: '500 - 123', right: '377' }, { left: '25 × 20', right: '500' }, { left: '1000 ÷ 8', right: '125' }, { left: '3⁵', right: '243' }] }
    ]
};

// Quiz State
let currentQuiz = {
    level: '',
    gameType: 'multipleChoice',
    questions: [],
    currentQuestion: 0,
    score: 0,
    selectedAnswers: [],
    startTime: 0,
    timeLimit: 120 // 2 minutes
};

let quizTimer = null;
let selectedQuizLevel = '';

function selectQuizLevel(level) {
    selectedQuizLevel = level;
    showPage('gameTypeSelectionPage');
}

function startQuiz(level, gameType) {
    // If level is null, use the selected level from the previous step
    if (level === null) {
        level = selectedQuizLevel;
    }
    
    currentQuiz.level = level;
    currentQuiz.gameType = gameType;
    
    // Get questions based on game type
    let quizzesDB;
    if (gameType === 'multipleChoice') {
        quizzesDB = multipleChoiceQuizzes;
    } else if (gameType === 'trueOrFalse') {
        quizzesDB = trueOrFalseQuizzes;
    } else if (gameType === 'matching') {
        quizzesDB = matchingQuizzes;
    }
    
    // Deep copy questions and shuffle
    let allQuestions = JSON.parse(JSON.stringify(quizzesDB[level]));
    
    if (gameType === 'multipleChoice') {
        // Shuffle answer options for each question
        allQuestions = allQuestions.map(q => {
            const indices = [0, 1, 2, 3];
            const shuffledIndices = shuffleArray(indices);
            const newCorrectIndex = shuffledIndices.indexOf(q.correct);
            const shuffledOptions = shuffledIndices.map(i => q.options[i]);
            
            return {
                question: q.question,
                options: shuffledOptions,
                correct: newCorrectIndex
            };
        });
    } else if (gameType === 'trueOrFalse') {
        // Shuffle answer order for true/false
        allQuestions = allQuestions.map(q => ({
            question: q.question,
            correct: q.correct
        }));
    } else if (gameType === 'matching') {
        // Shuffle the answer options in the matching pairs
        allQuestions = allQuestions.map(set => ({
            pairs: set.pairs.map(pair => ({
                left: pair.left,
                right: pair.right
            }))
        }));
    }
    
    // Shuffle question order
    allQuestions = shuffleArray(allQuestions);
    if (gameType !== 'matching') {
        allQuestions = allQuestions.slice(0, 10);
    }
    
    currentQuiz.questions = allQuestions;
    currentQuiz.currentQuestion = 0;
    currentQuiz.score = 0;
    currentQuiz.selectedAnswers = [];
    currentQuiz.startTime = Date.now();
    currentQuiz.timeLimit = 120;
    
    const typeLabel = gameType === 'multipleChoice' ? 'Multiple Choice' : gameType === 'trueOrFalse' ? 'True or False' : 'Matching';
    document.getElementById('quizTitle').textContent = `${level.charAt(0).toUpperCase() + level.slice(1)} - ${typeLabel}`;
    
    showPage('quizPage');
    displayQuestion();
    startTimer();
}

function displayQuestion() {
    const question = currentQuiz.questions[currentQuiz.currentQuestion];
    const answersContainer = document.getElementById('answersContainer');
    answersContainer.innerHTML = '';
    
    if (currentQuiz.gameType === 'multipleChoice') {
        document.getElementById('questionText').textContent = question.question;
        document.getElementById('questionCounter').textContent = `${currentQuiz.currentQuestion + 1}/10`;
        
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'answer-btn';
            button.textContent = option;
            button.onclick = () => selectAnswer(index);
            answersContainer.appendChild(button);
        });
    } else if (currentQuiz.gameType === 'trueOrFalse') {
        document.getElementById('questionText').textContent = question.question;
        document.getElementById('questionCounter').textContent = `${currentQuiz.currentQuestion + 1}/10`;
        answersContainer.className = 'true-false-grid';
        
        const trueBtn = document.createElement('button');
        trueBtn.className = 'answer-btn true-false-btn';
        trueBtn.textContent = 'True';
        trueBtn.onclick = () => selectAnswer(true);
        answersContainer.appendChild(trueBtn);
        
        const falseBtn = document.createElement('button');
        falseBtn.className = 'answer-btn true-false-btn';
        falseBtn.textContent = 'False';
        falseBtn.onclick = () => selectAnswer(false);
        answersContainer.appendChild(falseBtn);
    } else if (currentQuiz.gameType === 'matching') {
        document.getElementById('questionText').textContent = `Match the items (${currentQuiz.currentQuestion + 1}/${currentQuiz.questions.length})`;
        answersContainer.className = 'matching-container';
        
        const matchingPairs = question.pairs;
        const shuffledRights = shuffleArray(matchingPairs.map(p => p.right));
        
        // Create matching interface
        const leftColumn = document.createElement('div');
        leftColumn.className = 'matching-column left-column';
        
        const rightColumn = document.createElement('div');
        rightColumn.className = 'matching-column right-column';
        
        matchingPairs.forEach((pair, index) => {
            const leftItem = document.createElement('div');
            leftItem.className = 'matching-item left-item';
            leftItem.textContent = pair.left;
            leftItem.dataset.index = index;
            leftColumn.appendChild(leftItem);
        });
        
        shuffledRights.forEach((right) => {
            const rightItem = document.createElement('div');
            rightItem.className = 'matching-item right-item';
            rightItem.textContent = right;
            rightItem.onclick = () => handleMatchingSelection(right);
            rightColumn.appendChild(rightItem);
        });
        
        answersContainer.appendChild(leftColumn);
        answersContainer.appendChild(rightColumn);
    }
    
    document.getElementById('nextBtn').style.display = 'none';
}

function selectAnswer(answer) {
    const question = currentQuiz.questions[currentQuiz.currentQuestion];
    
    if (currentQuiz.gameType === 'multipleChoice') {
        currentQuiz.selectedAnswers[currentQuiz.currentQuestion] = answer;
        
        // Check if answer is correct
        if (answer === question.correct) {
            currentQuiz.score++;
        }
        
        // Highlight selected answer
        const buttons = document.querySelectorAll('.answer-btn');
        buttons.forEach((btn, i) => {
            btn.classList.remove('selected');
            if (i === answer) {
                btn.classList.add('selected');
            }
        });
    } else if (currentQuiz.gameType === 'trueOrFalse') {
        currentQuiz.selectedAnswers[currentQuiz.currentQuestion] = answer;
        
        // Check if answer is correct
        if (answer === question.correct) {
            currentQuiz.score++;
        }
        
        // Highlight selected answer
        const buttons = document.querySelectorAll('.true-false-btn');
        buttons.forEach(btn => {
            btn.classList.remove('selected');
            if ((btn.textContent === 'True' && answer === true) || (btn.textContent === 'False' && answer === false)) {
                btn.classList.add('selected');
            }
        });
    }
    
    // Show next button
    document.getElementById('nextBtn').style.display = 'block';
}

function handleMatchingSelection(selectedRight) {
    const question = currentQuiz.questions[currentQuiz.currentQuestion];
    const matchingPairs = question.pairs;
    
    // For matching, we'll store the selections as they make them
    if (!currentQuiz.selectedAnswers[currentQuiz.currentQuestion]) {
        currentQuiz.selectedAnswers[currentQuiz.currentQuestion] = [];
    }
    
    const userSelections = currentQuiz.selectedAnswers[currentQuiz.currentQuestion];
    
    // Mark this right item as selected
    const rightItems = document.querySelectorAll('.right-item');
    rightItems.forEach(item => {
        item.classList.remove('matched');
        if (item.textContent === selectedRight) {
            item.classList.add('matched');
        }
    });
    
    // When all pairs are matched, show next button
    if (userSelections.length === matchingPairs.length) {
        // Check if all matches are correct
        let allCorrect = true;
        matchingPairs.forEach((pair, index) => {
            if (userSelections[index] !== pair.right) {
                allCorrect = false;
            }
        });
        
        if (allCorrect) {
            currentQuiz.score++;
        }
        
        document.getElementById('nextBtn').style.display = 'block';
    }
}

function nextQuestion() {
    currentQuiz.currentQuestion++;
    
    const maxQuestions = currentQuiz.gameType === 'matching' ? currentQuiz.questions.length : 10;
    
    if (currentQuiz.currentQuestion < maxQuestions) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

function startTimer() {
    let timeLeft = currentQuiz.timeLimit;
    
    quizTimer = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.getElementById('timeDisplay').textContent = 
            `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        
        if (timeLeft <= 0) {
            clearInterval(quizTimer);
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(quizTimer);
    
    const timeTaken = Math.floor((Date.now() - currentQuiz.startTime) / 1000);
    const totalQuestions = currentQuiz.gameType === 'matching' ? currentQuiz.questions.length : 10;
    const percentage = Math.round((currentQuiz.score / totalQuestions) * 100);
    
    // Save quiz result
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('users'));
    const userIndex = users.findIndex(u => u.id === user.id);
    
    const typeLabel = currentQuiz.gameType === 'multipleChoice' ? 'MC' : currentQuiz.gameType === 'trueOrFalse' ? 'T/F' : 'Match';
    
    users[userIndex].quizzes.push({
        level: currentQuiz.level,
        gameType: typeLabel,
        score: currentQuiz.score,
        totalQuestions: totalQuestions,
        percentage: percentage,
        date: new Date().toLocaleDateString(),
        time: timeTaken
    });
    
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
    
    // Display results
    document.getElementById('finalScore').textContent = currentQuiz.score;
    document.getElementById('resultLevel').textContent = currentQuiz.level.charAt(0).toUpperCase() + currentQuiz.level.slice(1);
    document.getElementById('correctCount').textContent = currentQuiz.score;
    document.getElementById('timeTaken').textContent = timeTaken + 's';
    document.getElementById('resultPercentage').textContent = percentage + '%';
    
    // Build review of questions based on game type
    let reviewHtml = '<h3 style="color: #667eea; margin-bottom: 15px;">Review Your Answers</h3>';
    
    if (currentQuiz.gameType === 'multipleChoice') {
        currentQuiz.questions.forEach((question, index) => {
            const isCorrect = currentQuiz.selectedAnswers[index] === question.correct;
            const selectedAnswer = question.options[currentQuiz.selectedAnswers[index]];
            const correctAnswer = question.options[question.correct];
            
            reviewHtml += `
                <div class="result-item">
                    <div class="result-question">Q${index + 1}: ${question.question}</div>
                    <div class="result-answer">Your answer: <span class="${isCorrect ? 'result-correct' : 'result-incorrect'}">${selectedAnswer}</span></div>
                    ${!isCorrect ? `<div class="result-answer">Correct answer: <span class="result-correct">${correctAnswer}</span></div>` : ''}
                </div>
            `;
        });
    } else if (currentQuiz.gameType === 'trueOrFalse') {
        currentQuiz.questions.forEach((question, index) => {
            const isCorrect = currentQuiz.selectedAnswers[index] === question.correct;
            const selectedAnswer = currentQuiz.selectedAnswers[index] ? 'True' : 'False';
            const correctAnswer = question.correct ? 'True' : 'False';
            
            reviewHtml += `
                <div class="result-item">
                    <div class="result-question">Q${index + 1}: ${question.question}</div>
                    <div class="result-answer">Your answer: <span class="${isCorrect ? 'result-correct' : 'result-incorrect'}">${selectedAnswer}</span></div>
                    ${!isCorrect ? `<div class="result-answer">Correct answer: <span class="result-correct">${correctAnswer}</span></div>` : ''}
                </div>
            `;
        });
    } else if (currentQuiz.gameType === 'matching') {
        currentQuiz.questions.forEach((question, index) => {
            const matchingPairs = question.pairs;
            reviewHtml += `<div class="result-item"><div class="result-question">Matching Set ${index + 1}</div>`;
            matchingPairs.forEach((pair, pIndex) => {
                const userAnswer = currentQuiz.selectedAnswers[index] ? currentQuiz.selectedAnswers[index][pIndex] : 'Not answered';
                const isCorrect = userAnswer === pair.right;
                reviewHtml += `
                    <div class="result-answer">
                        ${pair.left} → <span class="${isCorrect ? 'result-correct' : 'result-incorrect'}">${userAnswer}</span>
                        ${!isCorrect ? ` (Correct: <span class="result-correct">${pair.right}</span>)` : ''}
                    </div>
                `;
            });
            reviewHtml += '</div>';
        });
    }
    
    document.getElementById('resultsReview').innerHTML = reviewHtml;
    
    showPage('resultsPage');
}

function quitQuiz() {
    if (confirm('Are you sure you want to quit? Your progress will not be saved.')) {
        clearInterval(quizTimer);
        navigateToHome();
    }
}

function navigateToHome() {
    updateHomeStats();
    showPage('homePage');
}

function retakeQuiz() {
    startQuiz(currentQuiz.level, currentQuiz.gameType);
}

// Update home page stats
function updateHomeStats() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!user.quizzes || user.quizzes.length === 0) {
        document.getElementById('totalQuizzes').textContent = '0';
        document.getElementById('avgScore').textContent = '0%';
        document.getElementById('bestScore').textContent = '0';
        return;
    }
    
    const totalQuizzes = user.quizzes.length;
    const avgScore = Math.round(user.quizzes.reduce((sum, q) => sum + q.percentage, 0) / totalQuizzes);
    const bestScore = Math.max(...user.quizzes.map(q => q.score));
    
    document.getElementById('totalQuizzes').textContent = totalQuizzes;
    document.getElementById('avgScore').textContent = avgScore + '%';
    document.getElementById('bestScore').textContent = bestScore + '/10';
}

// Statistics
function loadStatistics() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const statsContainer = document.getElementById('statsContainer');
    
    if (!user.quizzes || user.quizzes.length === 0) {
        statsContainer.innerHTML = '<p class="no-stats">No quiz attempts yet. Start your first quiz!</p>';
        return;
    }
    
    let html = '';
    user.quizzes.forEach((quiz) => {
        const levelColor = quiz.level === 'easy' ? '🟢' : quiz.level === 'medium' ? '🟡' : '🔴';
        html += `
            <div class="stat-card">
                <div class="stat-header">
                    <h4>${levelColor} ${quiz.level.charAt(0).toUpperCase() + quiz.level.slice(1)}</h4>
                    <span class="stat-date">${quiz.date}</span>
                </div>
                <div class="stat-info">
                    <p><strong>Score:</strong> ${quiz.score}/10</p>
                    <p><strong>Percentage:</strong> ${quiz.percentage}%</p>
                    <p><strong>Time:</strong> ${quiz.time}s</p>
                </div>
            </div>
        `;
    });
    
    statsContainer.innerHTML = html;
}

// Load Profile
function loadProfile() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    document.getElementById('profileName').textContent = user.name;
    document.getElementById('profileEmail').textContent = user.email;
    
    if (!user.quizzes || user.quizzes.length === 0) {
        document.getElementById('profileQuizzes').textContent = '0';
        document.getElementById('profileAvg').textContent = '0%';
        document.getElementById('profileBest').textContent = '0/10';
        return;
    }
    
    const totalQuizzes = user.quizzes.length;
    const avgScore = Math.round(user.quizzes.reduce((sum, q) => sum + q.percentage, 0) / totalQuizzes);
    const bestScore = Math.max(...user.quizzes.map(q => q.score));
    
    document.getElementById('profileQuizzes').textContent = totalQuizzes;
    document.getElementById('profileAvg').textContent = avgScore + '%';
    document.getElementById('profileBest').textContent = bestScore + '/10';
}
