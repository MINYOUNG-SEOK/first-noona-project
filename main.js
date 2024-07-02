// 배경색 바꾸기
function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function changeBackgroundColor() {
    let body = document.querySelector('body');
    setInterval(function() {
        let newColor = getRandomColor();
        body.style.backgroundColor = newColor;
    }, 2000); 
}

changeBackgroundColor();

// 랜덤 게임
let randomNumber;
let attempts;
let previousGuess;

// 초기화
function startGame() {
randomNumber = generateRandomNumber(1, 100);
attempts = 3;
previousGuess = null; // 이전 추측 초기화
guessesList = [];
console.log(randomNumber)

document.getElementById('attempts').textContent = attempts;
document.getElementById('result').textContent = '';
document.getElementById('userGuess').value = '';
document.getElementById('userGuess').disabled = false; // 게임 재시작 시 입력 필드 활성화


document.getElementById('answer').textContent = ''; // 초기화
            document.getElementById('answer').textContent= `Answer : ${randomNumber}`;

            let submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = false;
}

function checkGuess(event) {
event.preventDefault(); // 폼 제출 기본 동작 방지

let userGuessString = document.getElementById('userGuess').value.trim();

if (userGuessString === '') {
alert("Please enter a number.");
return;
}

let userGuess = parseInt(userGuessString);

if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
alert("Please enter a number between 1 and 100.");
return;
}

if (guessesList.includes(userGuess)) {
    alert("You have already guessed this number.");
    return;
}

guessesList.push(userGuess);


if (attempts > 0) {
attempts--;

if (userGuess > randomNumber) {
document.getElementById('result').textContent = 'Down!';
} else if (userGuess < randomNumber) {
document.getElementById('result').textContent = 'Up!';

} else {
document.getElementById('result').textContent = "Bingo!";
document.getElementById('userGuess').disabled = true; // 정답 맞추면 입력 필드 비활성화
submitBtn.disabled = true; 
}

document.getElementById('attempts').textContent = attempts;

if (attempts === 0) {
alert(`Game Over! The answer is ${randomNumber}.`);
document.getElementById('userGuess').disabled = true;
submitBtn.disabled = true; 
}
}
}

function generateRandomNumber(min, max) {
return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 게임 시작
startGame();

// 폼 제출 시 checkGuess 함수 호출
document.getElementById('guessForm').addEventListener('submit', checkGuess);

// 입력 창에 포커스를 두면 이전 값을 지우기
document.getElementById('userGuess').addEventListener('focus', function() {
    this.value = ''; // 입력 창에 포커스가 들어가면 값을 비웁니다.
});

// Reset 버튼 처리
document.getElementById('resetBtn').addEventListener('click', function() {
    event.preventDefault(); // 기본 동작 방지
    startGame();


});
