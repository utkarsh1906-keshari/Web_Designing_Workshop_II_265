const ALL_QUESTIONS = {
  "Science": [
    {q:"What is the chemical symbol for gold?",opts:["Au","Ag","Go","Gd"],ans:0,exp:"Au comes from the Latin 'aurum'."},
    {q:"How many bones are in the adult human body?",opts:["196","206","216","226"],ans:1,exp:"Adults have 206 bones; babies are born with ~270."},
    {q:"What planet is closest to the Sun?",opts:["Venus","Earth","Mars","Mercury"],ans:3,exp:"Mercury is the innermost planet of our solar system."},
    {q:"What gas do plants absorb during photosynthesis?",opts:["Oxygen","Nitrogen","Carbon dioxide","Hydrogen"],ans:2,exp:"Plants use CO₂ and water to produce glucose and oxygen."},
    {q:"What is the speed of light (approx)?",opts:["300,000 km/s","150,000 km/s","500,000 km/s","100,000 km/s"],ans:0,exp:"Light travels at ~299,792 km/s in a vacuum."}
  ],
  "History": [
    {q:"In what year did World War II end?",opts:["1943","1944","1945","1946"],ans:2,exp:"WWII ended in 1945 with Germany surrendering in May and Japan in September."},
    {q:"Who was the first President of the United States?",opts:["John Adams","Benjamin Franklin","Abraham Lincoln","George Washington"],ans:3,exp:"George Washington served as the 1st President from 1789–1797."},
    {q:"The Great Wall of China was primarily built during which dynasty?",opts:["Tang","Ming","Song","Han"],ans:1,exp:"Most of the existing wall was built during the Ming Dynasty (1368–1644)."},
    {q:"Which empire was ruled by Julius Caesar?",opts:["Greek","Ottoman","Roman","Persian"],ans:2,exp:"Julius Caesar was a Roman general and statesman."},
    {q:"In what year did the Berlin Wall fall?",opts:["1987","1988","1989","1991"],ans:2,exp:"The Berlin Wall fell on November 9, 1989."}
  ],
  "Technology": [
    {q:"What does 'HTTP' stand for?",opts:["HyperText Transfer Protocol","High Transfer Text Process","Hyper Technical Transfer Page","Home Text Tool Protocol"],ans:0,exp:"HTTP is the foundation of data communication on the World Wide Web."},
    {q:"Which company developed the Python programming language?",opts:["Google","Microsoft","MIT","No company — it's open source"],ans:3,exp:"Python was created by Guido van Rossum and is open source."},
    {q:"What does 'CPU' stand for?",opts:["Central Processing Unit","Computer Processing Utility","Core Power Unit","Central Program Uploader"],ans:0,exp:"The CPU is the primary component that executes instructions in a computer."},
    {q:"Which data structure works on a LIFO principle?",opts:["Queue","Stack","Array","Linked list"],ans:1,exp:"Stack = Last In, First Out. Queue = First In, First Out."},
    {q:"What is the binary equivalent of the decimal number 10?",opts:["1001","1010","1100","0110"],ans:1,exp:"10 in binary = 8+2 = 1010."}
  ],
  "Geography": [
    {q:"What is the capital city of Australia?",opts:["Sydney","Melbourne","Brisbane","Canberra"],ans:3,exp:"Canberra has been the capital since 1913, chosen as a compromise between Sydney and Melbourne."},
    {q:"Which is the longest river in the world?",opts:["Amazon","Congo","Nile","Yangtze"],ans:2,exp:"The Nile stretches ~6,650 km through northeastern Africa."},
    {q:"Which country has the most natural lakes?",opts:["Russia","USA","Brazil","Canada"],ans:3,exp:"Canada has over 60% of the world's natural lakes."},
    {q:"What is the smallest country in the world by area?",opts:["Monaco","San Marino","Vatican City","Liechtenstein"],ans:2,exp:"Vatican City covers just ~0.44 km² within Rome, Italy."},
    {q:"Which continent is the Sahara Desert located in?",opts:["Asia","Australia","South America","Africa"],ans:3,exp:"The Sahara is the world's largest hot desert, covering much of North Africa."}
  ]
};
const ICONS = {"Science":"🔬","History":"🏛️","Technology":"💻","Geography":"🌍"};
const COLORS = {"Science":"#378ADD","History":"#D85A30","Technology":"#1D9E75","Geography":"#7F77DD"};
const TIME_LIMIT = 15;

let selCat = null, questions = [], qIdx = 0, score = 0, answers = [], timerInt = null, timeLeft = 0;

function shuffle(arr){return [...arr].sort(()=>Math.random()-0.5)}

function buildCats(){
  const grid = document.getElementById('cat-grid');
  grid.innerHTML = '';
  Object.keys(ALL_QUESTIONS).forEach(cat=>{
    const btn = document.createElement('button');
    btn.className = 'cat-btn';
    btn.innerHTML = `<span class="cat-icon">${ICONS[cat]}</span><div class="cat-name">${cat}</div><div class="cat-count">${ALL_QUESTIONS[cat].length} questions</div>`;
    btn.onclick = ()=>{
      document.querySelectorAll('.cat-btn').forEach(b=>b.classList.remove('sel'));
      btn.classList.add('sel');
      selCat = cat;
      const sb = document.getElementById('start-btn');
      sb.disabled = false;
      sb.textContent = `Start ${cat} quiz →`;
    };
    grid.appendChild(btn);
  });
}

function startQuiz(){
  questions = shuffle(ALL_QUESTIONS[selCat]);
  qIdx = 0; score = 0; answers = [];
  show('quiz');
  loadQuestion();
}

function loadQuestion(){
  const q = questions[qIdx];
  document.getElementById('prog').style.width = (qIdx/questions.length*100)+'%';
  document.getElementById('q-num').textContent = `Question ${qIdx+1} of ${questions.length}`;
  document.getElementById('q-text').textContent = q.q;
  const opts = document.getElementById('options');
  opts.innerHTML = '';
  const labels = ['A','B','C','D'];
  q.opts.forEach((o,i)=>{
    const btn = document.createElement('button');
    btn.className = 'opt';
    btn.innerHTML = `<span class="badge">${labels[i]}</span>${o}`;
    btn.onclick = ()=>selectAnswer(i);
    opts.appendChild(btn);
  });
  document.getElementById('feedback').className = 'feedback';
  document.getElementById('feedback').textContent = '';
  document.getElementById('next-btn').className = 'next-btn';
  startTimer();
}

function startTimer(){
  timeLeft = TIME_LIMIT;
  const el = document.getElementById('timer');
  el.className = 'timer';
  el.textContent = timeLeft+'s';
  clearInterval(timerInt);
  timerInt = setInterval(()=>{
    timeLeft--;
    el.textContent = timeLeft+'s';
    if(timeLeft<=5) el.className = 'timer danger';
    else if(timeLeft<=8) el.className = 'timer warn';
    if(timeLeft<=0){clearInterval(timerInt);timeUp();}
  },1000);
}

function timeUp(){
  const q = questions[qIdx];
  answers.push({q:q.q,correct:false,given:"—",right:q.opts[q.ans]});
  lockOptions(-1,q.ans);
  showFeedback(false,"Time's up! "+q.exp);
  document.getElementById('next-btn').className = 'next-btn show';
}

function selectAnswer(idx){
  clearInterval(timerInt);
  const q = questions[qIdx];
  const correct = idx === q.ans;
  if(correct) score++;
  answers.push({q:q.q,correct,given:q.opts[idx],right:q.opts[q.ans]});
  lockOptions(idx,q.ans);
  showFeedback(correct, correct?"Correct! "+q.exp : "Not quite. "+q.exp);
  document.getElementById('next-btn').className = 'next-btn show';
}

function lockOptions(chosen,correct){
  document.querySelectorAll('.opt').forEach((btn,i)=>{
    btn.disabled = true;
    if(i===correct && chosen!==-1) btn.classList.add(chosen===correct?'correct':'reveal-correct');
    if(i===chosen && chosen!==correct) btn.classList.add('wrong');
    if(chosen===-1 && i===correct) btn.classList.add('reveal-correct');
  });
}

function showFeedback(ok,msg){
  const el = document.getElementById('feedback');
  el.className = 'feedback show '+(ok?'ok':'bad');
  el.textContent = (ok?'✓ ':'✗ ')+msg;
}

document.getElementById('next-btn').onclick = ()=>{
  qIdx++;
  if(qIdx<questions.length) loadQuestion();
  else showResults();
};

function showResults(){
  clearInterval(timerInt);
  show('results');
  document.getElementById('prog').style.width = '100%';
  const pct = Math.round(score/questions.length*100);
  let grade, color, bg;
  if(pct>=90){grade='Excellent!';color='#0F6E56';bg='#E1F5EE';}
  else if(pct>=70){grade='Good job!';color='#185FA5';bg='#E6F1FB';}
  else if(pct>=50){grade='Not bad!';color='#BA7517';bg='#FAEEDA';}
  else{grade='Keep practicing';color='#A32D2D';bg='#FCEBEB';}
  document.getElementById('grade-area').innerHTML = `
    <div class="grade-circle" style="background:${bg};color:${color}">${pct}%</div>
    <div style="font-size:18px;font-weight:500;color:var(--color-text-primary);margin-bottom:4px">${grade}</div>
    <div class="grade-msg">${score} of ${questions.length} correct in ${selCat}</div>`;
  document.getElementById('stats-area').innerHTML = `
    <div class="stat"><div class="stat-val">${score}</div><div class="stat-lbl">Correct</div></div>
    <div class="stat"><div class="stat-val">${questions.length-score}</div><div class="stat-lbl">Incorrect</div></div>
    <div class="stat"><div class="stat-val">${pct}%</div><div class="stat-lbl">Score</div></div>`;
  const bd = document.getElementById('breakdown');
  bd.innerHTML = answers.map((a,i)=>`
    <div class="bd-row">
      <span style="font-size:12px;color:var(--color-text-tertiary);min-width:20px">Q${i+1}</span>
      <span class="bd-q">${a.q.length>60?a.q.slice(0,60)+'…':a.q}</span>
      <span class="bd-ans ${a.correct?'bd-ok':'bd-bad'}">${a.correct?'✓ Correct':'✗ '+a.right}</span>
    </div>`).join('');
}

function show(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function reset(){
  selCat=null;
  document.querySelectorAll('.cat-btn').forEach(b=>b.classList.remove('sel'));
  const sb=document.getElementById('start-btn');
  sb.disabled=true;sb.textContent='Select a category to start';
  show('home');
}

buildCats();
document.getElementById('start-btn').onclick = startQuiz;