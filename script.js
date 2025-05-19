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
    answer: 3 // "Kloning sel"
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
    answer: 2 // "Somatic cell nuclear transfer (SCNT)"
  },
  {
    question: "Salah satu contoh kloning yang berhasil adalah kloning domba Dolly. Kloning pada domba Dolly menggunakan inti sel dari...?",
    options: [
      "Sel telur domba",
      "Sel mamalia lain",
      "Sel jaringan kelenjar payudara domba",
      "Sel darah domba",
      "Sel sperma domba"
    ],
    answer: 2 // "Sel jaringan kelenjar payudara domba"
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
    answer: 1 // "Kloning terapeutik"
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
    answer: 1 // "Menghasilkan produk farmasi"
  },
];


let currentQuestion = 0;

function loadQuestion() {
  const q = quiz[currentQuestion];
  document.getElementById("question").innerText = q.question;
  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  document.getElementById("nextBtn").style.display = "none";
  document.getElementById("prevBtn").style.display = currentQuestion > 0 ? "inline-block" : "none";

  q.options.forEach((option, i) => {
    const btn = document.createElement("button");
    btn.innerText = `${String.fromCharCode(97 + i)}. ${option}`;
    btn.onclick = () => selectAnswer(btn, i);
    choicesDiv.appendChild(btn);
  });
}

function selectAnswer(button, index) {
  const buttons = document.querySelectorAll(".choices button");
  buttons.forEach(btn => btn.classList.add("locked"));

  const audioTrue = document.getElementById("audioTrue");
  const audioFalse = document.getElementById("audioFalse");

  if (index === quiz[currentQuestion].answer) {
    button.classList.add("correct");
    audioTrue.currentTime = 0;
    audioTrue.play();
  } else {
    button.classList.add("wrong");
    buttons[quiz[currentQuestion].answer].classList.add("correct");
    audioFalse.currentTime = 0;
    audioFalse.play();
  }

  document.getElementById("nextBtn").style.display = currentQuestion < quiz.length - 1 ? "inline-block" : "none";
}

function nextQuestion() {
  if (currentQuestion < quiz.length - 1) {
    currentQuestion++;
    loadQuestion();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
}

// Tambahkan tombol prev ke dalam DOM jika belum ada
window.onload = () => {
  const navBtns = document.getElementById("navButtons");
  if (!navBtns) {
    const container = document.querySelector(".question-box");

    const btnContainer = document.createElement("div");
    btnContainer.id = "navButtons";
    btnContainer.style.marginTop = "20px";

    const prevBtn = document.createElement("button");
    prevBtn.id = "prevBtn";
    prevBtn.innerText = "Soal Sebelumnya";
    prevBtn.onclick = prevQuestion;
    prevBtn.style.display = "none";
    prevBtn.style.marginRight = "10px";
    prevBtn.style.padding = "10px 20px";
    prevBtn.style.fontSize = "18px";
    prevBtn.style.borderRadius = "8px";
    prevBtn.style.background = "#888";
    prevBtn.style.color = "white";
    prevBtn.style.border = "none";
    prevBtn.style.cursor = "pointer";

    const nextBtn = document.getElementById("nextBtn");
    btnContainer.appendChild(prevBtn);
    btnContainer.appendChild(nextBtn);
    container.appendChild(btnContainer);
  }

  loadQuestion();
};
