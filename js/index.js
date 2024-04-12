var quiz = {
    // (A) PROPERTIES
    // (A1) QUESTIONS & ANSWERS
    // Q = QUESTION, O = OPTIONS, A = CORRECT ANSWER
    data: [
        {
          q : "What is the chemical symbol for the element Hydrogen?",
          o : [
            "H",
            "He",
            "O",
            "N"
          ],
          a : 0
        },
        {
          q : "What is the largest planet in our solar system?",
          o : [
            "Jupiter",
            "Saturn",
            "Mars",
            "Earth"
          ],
          a : 0
        },
        {
          q : "What is the unit of measurement for the amount of energy required to raise the temperature of one gram of water by one degree Celsius?",
          o : [
            "Joule",
            "Watt",
            "Calorie",
            "Kelvin"
          ],
          a : 2
        },
        {
          q : "What is the name of the process by which plants convert light energy, usually from the sun, into chemical energy that can be later released to fuel the plant's activities?",
          o : [
            "Photosynthesis",
            "Respiration",
            "Fermentation",
            "Decomposition"
          ],
          a : 0
        },
        {
          q : "What is the name of the theory that explains the diversity of life on Earth through the process of evolution by natural selection?",
          o : [
            "The Theory of Everything",
            "The Theory of Relativity",
            "The Theory of Evolution",
            "The Theory of Gravity"
          ],
          a : 2
        }
        ],
  
    // (A2) HTML ELEMENTS
    hWrap: null, // HTML quiz container
    hQn: null, // HTML question wrapper
    hAns: null, // HTML answers wrapper
  //////////sthrhrhrtyr////////////
    // (A3) GAME FLAGS
    now: 0, // current question
    score: 0, // current score
  
    // (B) INIT QUIZ HTML
    init: () => {
      // (B1) WRAPPER
      quiz.hWrap = document.getElementById("quizWrap");
  
      // (B2) QUESTIONS SECTION
      quiz.hQn = document.createElement("div");
      quiz.hQn.id = "quizQn";
      quiz.hWrap.appendChild(quiz.hQn);
  
      // (B3) ANSWERS SECTION
      quiz.hAns = document.createElement("div");
      quiz.hAns.id = "quizAns";
      quiz.hWrap.appendChild(quiz.hAns);
  
      // (B4) GO!
      quiz.draw();
    },
  
    // (C) DRAW QUESTION
    draw: () => {
      // (C1) QUESTION
      quiz.hQn.innerHTML = quiz.data[quiz.now].q;
  
      // (C2) OPTIONS
      quiz.hAns.innerHTML = "";
      for (let i in quiz.data[quiz.now].o) {
        let radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "quiz";
        radio.id = "quizo" + i;
        quiz.hAns.appendChild(radio);
        let label = document.createElement("label");
        label.innerHTML = quiz.data[quiz.now].o[i];
        label.setAttribute("for", "quizo" + i);
        label.dataset.idx = i;
        label.addEventListener("click", () => { quiz.select(label); });
        quiz.hAns.appendChild(label);
      }
    },
  
    // (D) OPTION SELECTED
    select: (option) => {
      // (D1) DETACH ALL ONCLICK
      let all = quiz.hAns.getElementsByTagName("label");
      for (let label of all) {
        label.removeEventListener("click", quiz.select);
      }
  
      // (D2) CHECK IF CORRECT
      let correct = option.dataset.idx == quiz.data[quiz.now].a;
      if (correct) {
        quiz.score++;
        option.classList.add("correct");
      } else {
        option.classList.add("wrong");
      }
  
      // (D3) NEXT QUESTION OR END GAME
      quiz.now++;
      setTimeout(() => {
        if (quiz.now < quiz.data.length) { quiz.draw(); }
        else {
          quiz.hQn.innerHTML = `You have answered ${quiz.score} of ${quiz.data.length} correctly.`;
          quiz.hAns.innerHTML = "";
        }
      }, 1000);
    },
  
    // (E) RESTART QUIZ
    reset : () => {
      quiz.now = 0;
      quiz.score = 0;
      quiz.draw();
    }
  };
  window.addEventListener("load", quiz.init);
  