const questions = [
  {
    question: "What is my favorite color?",
    options: ["Blue", "Red", "Green", "Purple"],
    correctAnswer: 0,
    gifts: ["Candle set", "Custom mug", "Photo frame", "Chocolate box"],
  },
  {
    question: "Where did we have our first date?",
    options: ["Restaurant", "Park", "Beach", "Movies"],
    correctAnswer: 2,
    gifts: ["Handwritten letter", "Flower bouquet", "Star map", "Jewelry"],
  },
  {
    question: "What is my dream destination?",
    options: ["Paris", "Maldives", "New York", "Tokyo"],
    correctAnswer: 1,
    gifts: ["Book collection", "Scrapbook", "Cooking class", "Perfume set"],
  },
  {
    question: "Which movie is our favorite?",
    options: ["The Notebook", "Titanic", "La La Land", "Casablanca"],
    correctAnswer: 3,
    gifts: ["Personalized playlist", "Movie night basket", "Subscription service", "Handmade coupon book"],
  },
];

let currentQuestion = 0;
let correctAnswers = 0;
let selectedGifts = [];
let attemptMade = false; // Flag to track if the user has made an attempt

function startQuiz() {
  displayQuestion();
}

function displayQuestion() {
  const questionElement = document.getElementById("question");
  const optionsContainer = document.getElementById("options-container");

  if (currentQuestion < questions.length) {
    // Display quiz questions
    questionElement.textContent = questions[currentQuestion].question;

    optionsContainer.innerHTML = "";
    questions[currentQuestion].options.forEach((option, index) => {
      const button = document.createElement("button");
      button.classList.add("option");
      button.textContent = option;
      button.onclick = function () {
        checkAnswer(this);
      };
      optionsContainer.appendChild(button);
    });
  } else {
    // Display marriage question
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("marriage-container").style.display = "block";
    document.getElementById("marriage-question").textContent = "Will you marry me?";
    document.getElementById("try-no-button").textContent = "Try using the 'No' button, baby!";
  }
}

function checkAnswer(selectedOption) {
  if (!attemptMade) {
    attemptMade = true;
    const selectedIndex = Array.from(selectedOption.parentNode.children).indexOf(
      selectedOption
    );

    if (selectedIndex === questions[currentQuestion].correctAnswer) {
      // Correct answer
      showAnswerPopup();
      correctAnswers++;
    } else {
      // Incorrect answer
      showMissedPopup();
    }
  }
}

function showAnswerPopup() {
  const answerPopup = document.getElementById("answer-popup");
  const giftList = document.getElementById("gift-list");

  giftList.innerHTML = "";
  questions[currentQuestion].gifts.forEach((gift, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<input type="radio" name="gift" value="${index}" id="gift${index}"><label for="gift${index}">${gift}</label>`;
    giftList.appendChild(listItem);
  });

  answerPopup.style.display = "block";
}

function selectGift() {
  const selectedGift = document.querySelector('input[name="gift"]:checked');

  if (selectedGift) {
    selectedGifts.push(questions[currentQuestion].gifts[selectedGift.value]);
    alert("You selected: " + questions[currentQuestion].gifts[selectedGift.value]);
    document.getElementById("answer-popup").style.display = "none";
    nextQuestion();
  } else {
    alert("Please select a gift.");
  }
}

function showMissedPopup() {
  const missedPopup = document.getElementById("missed-popup");
  const correctAnswerSpan = document.getElementById("correct-answer");
  const missedGiftList = document.getElementById("missed-gift-list");

  correctAnswerSpan.textContent = questions[currentQuestion].options[questions[currentQuestion].correctAnswer];

  missedGiftList.innerHTML = "";
  questions[currentQuestion].gifts.forEach((gift) => {
    const listItem = document.createElement("li");
    listItem.textContent = gift;
    missedGiftList.appendChild(listItem);
  });

  missedPopup.style.display = "block";
  setTimeout(() => {
    nextQuestion();
  }, 10000); // Move to the next question after 10 seconds for incorrect answers
}

function nextQuestion() {
  const answerPopup = document.getElementById("answer-popup");
  const missedPopup = document.getElementById("missed-popup");

  answerPopup.style.display = "none";
  missedPopup.style.display = "none";

  currentQuestion++;
  attemptMade = false; // Reset attempt flag

  displayQuestion();
}

function showMarriageGifts() {
  const marriageMessage = document.getElementById("marriage-message");
  const marriageGiftsContainer = document.getElementById("marriage-gifts");
  const marriageGiftList = document.getElementById("marriage-gift-list");

  if (correctAnswers > 0) {
    marriageMessage.textContent = "I love you, baby! Here are your gifts:";
    marriageGiftList.innerHTML = "";

    for (let i = 0; i < Math.min(correctAnswers, 3); i++) {
      const listItem = document.createElement("li");
      listItem.textContent = "Gift " + (i + 1) + ": " + selectedGifts[i];
      marriageGiftList.appendChild(listItem);
    }
    marriageGiftsContainer.style.display = "block";
    teaseNoButton();
  } else {
    marriageMessage.textContent = "Sorry, baby! No gifts for you this time.";
  }
}

function moveNoButton() {
  const noButton = document.getElementById("no-button-marriage");
  noButton.style.position = "absolute";
  noButton.style.left = Math.random() * window.innerWidth + "px";
  noButton.style.top = Math.random() * window.innerHeight + "px";
}

function teaseNoButton() {
  moveNoButton();
  alert("Aww, try using the 'No' button!");
}

// Start the quiz when the page loads
startQuiz();