const quiz = [
  {
    question: "Kloning merupakan proses menghasilkan salinan identik dari sebuah organisme atau bagiannya. Proses ini dilakukan tanpa melibatkan reproduksi seksual. Apakah jenis kloning yang menghasilkan salinan sel identik?",
    options: [
      "Kloning reproduktif",
      "Kloning terapeutik",
      "Kloning genetik",
      "Kloning sel",
      "Kloning individu"
    ],
    answer: 3
  },
  {
    question: "Dalam proses kloning, inti sel tubuh dari organisme yang ingin dikloning dipindahkan ke sel telur yang telah dikosongkan intinya. Proses ini disebut...?",
    options: [
      "Fusi sel",
      "Rekombinasi DNA",
      "Somatic cell nuclear transfer (SCNT)",
      "Transgenesis",
      "Artificial insemination"
    ],
    answer: 2
  },
  {
    question: "Salah satu contoh kloning yang berhasil adalah kloning domba Dolly. Kloning pada domba Dolly menggunakan inti sel dari?",
    options: [
      "Sel telur domba",
      "Sel mamalia lain",
      "Kloning genetik",
      "Kloning sel",
      "Kloning individu"
    ],
    answer: 2
  },
  {
    question: "Manfaat kloning dalam bidang kedokteran antara lain adalah untuk menghasilkan sel-sel yang dapat digunakan untuk terapi. Kloning jenis ini disebut...?",
    options: [
      "Kloning reproduktif",
      "Kloning terapeutik",
      "Kloning genetik",
      "Kloning sel",
      "Kloning individu"
    ],
    answer: 1
  },
  {
    question: "Proses kloning DNA bertujuan untuk menghasilkan salinan gen tertentu. Salinan gen tersebut kemudian dapat digunakan untuk...?",
    options: [
      "Memperbaiki mutasi gen",
      "Menghasilkan produk farmasi",
      "Menghasilkan salinan organisme identik",
      "Mempercepat pertumbuhan sel",
      "Menguji kepekaan gen terhadap obat"
    ],
    answer: 1
  }
];

let answerStatus = Array(quiz.length).fill(null); // 'correct', 'wrong', or null
let currentQuestion = 0;


function loadQuestion() {
  const q = quiz[currentQuestion];
  document.getElementById("question").innerText = q.question;
  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  document.getElementById("nextBtn").style.display = "none";

  q.options.forEach((option, i) => {
    const btn = document.createElement("button");
    btn.innerText = `${String.fromCharCode(97 + i)}. ${option}`;
    btn.onclick = () => selectAnswer(btn, i);
    choicesDiv.appendChild(btn);
  });

  renderPagination();
}

function selectAnswer(button, index) {
  const buttons = document.querySelectorAll(".choices button");
  buttons.forEach(btn => btn.classList.add("locked"));

  const audioTrue = document.getElementById("audioTrue");
  const audioFalse = document.getElementById("audioFalse");

  if (index === quiz[currentQuestion].answer) {
    button.classList.add("correct");
    answerStatus[currentQuestion] = 'correct';
    audioTrue.currentTime = 0;
    audioTrue.play();
  } else {
    button.classList.add("wrong");
    buttons[quiz[currentQuestion].answer].classList.add("correct");
    answerStatus[currentQuestion] = 'wrong';
    audioFalse.currentTime = 0;
    audioFalse.play();
  }

  document.getElementById("nextBtn").style.display = currentQuestion < quiz.length - 1 ? "inline-block" : "none";
  renderPagination(); // tambahkan ini untuk memperbarui warna pagination
}


function nextQuestion() {
  if (currentQuestion < quiz.length - 1) {
    currentQuestion++;
    loadQuestion();
  }
}

function renderPagination() {
  const paginationDiv = document.getElementById("pagination");
  if (!paginationDiv) return;

  paginationDiv.innerHTML = "";

  for (let i = 0; i < quiz.length; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.innerText = i + 1;
    pageBtn.className = "page-btn";
    pageBtn.style.marginRight = "8px";

    if (i === currentQuestion) pageBtn.classList.add("active");
    if (answerStatus[i] === 'wrong') pageBtn.classList.add("wrong-page");
    if (answerStatus[i] === 'correct') pageBtn.classList.add("correct-page");

    pageBtn.onclick = () => {
      currentQuestion = i;
      loadQuestion();
    };
    paginationDiv.appendChild(pageBtn);
  }
}


window.onload = () => {
  const container = document.querySelector(".question-box");

  let nextBtn = document.getElementById("nextBtn");
  if (!nextBtn) {
    const btnContainer = document.createElement("div");
    btnContainer.id = "navButtons";
    btnContainer.style.marginTop = "20px";

    nextBtn = document.createElement("button");
    nextBtn.id = "nextBtn";
    nextBtn.innerText = "Soal Berikutnya";
    nextBtn.onclick = nextQuestion;
    nextBtn.style.padding = "10px 20px";
    nextBtn.style.fontSize = "18px";
    nextBtn.style.borderRadius = "8px";
    nextBtn.style.background = "#007BFF";
    nextBtn.style.color = "white";
    nextBtn.style.border = "none";
    nextBtn.style.cursor = "pointer";
    nextBtn.style.display = "none";

    btnContainer.appendChild(nextBtn);
    container.appendChild(btnContainer);
  }

  renderPagination();
  loadQuestion();
};
