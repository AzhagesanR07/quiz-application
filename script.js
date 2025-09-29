// DOM helper
const $ = sel => document.querySelector(sel);
const decodeHTML = s => new DOMParser().parseFromString(s,'text/html').documentElement.textContent;

// Escape HTML for displaying <, >, &
function escapeHTML(str){
  return str.replace(/&/g,'&amp;')
            .replace(/</g,'&lt;')
            .replace(/>/g,'&gt;')
            .replace(/"/g,'&quot;')
            .replace(/'/g,'&#39;');
}

// ----------------------------
// Question bank (local)
const LOCAL_SETS = {
  1: [
    {q:'What does HTML stand for?', correct:'HyperText Markup Language', incorrect:['Home Tool Markup Language','Hyperlinks and Text Markup Language','Hyperlinking Text Markup Language']},
    {q:'Which tag defines the document title?', correct:'<title>', incorrect:['<head>','<meta>','<header>']},
    {q:'Which tag is used for a line break?', correct:'<br>', incorrect:['<lb>','<break>','<newline>']},
    {q:'Which attribute specifies an image path?', correct:'src', incorrect:['href','path','link']},
    {q:'Which tag creates a numbered list?', correct:'<ol>', incorrect:['<ul>','<li>','<list>']},
    {q:'Which tag is used for a hyperlink?', correct:'<a>', incorrect:['<link>','<href>','<navigate>']},
    {q:'Which attribute opens a link in a new tab?', correct:'target="_blank"', incorrect:['rel="external"','open="_new"','href="_blank"']},
    {q:'Which element defines metadata?', correct:'<head>', incorrect:['<meta>','<header>','<info>']},
    {q:'Which tag groups related options in a dropdown?', correct:'<optgroup>', incorrect:['<group>','<options>','<fieldset>']},
    {q:'Which tag emphasizes text?', correct:'<em>', incorrect:['<i>','<strong>','<mark>']}
  ],
  2: [
    {q:'Which tag creates a paragraph?', correct:'<p>', incorrect:['<para>','<text>','<div>']},
    {q:'Which tag defines a table row?', correct:'<tr>', incorrect:['<td>','<table>','<row>']},
    {q:'Which tag defines a table cell?', correct:'<td>', incorrect:['<th>','<tr>','<tc>']},
    {q:'Which input allows multiple lines?', correct:'<textarea>', incorrect:['<input type="text">','<multitext>','<input type="textarea">']},
    {q:'Which attribute gives an element a unique ID?', correct:'id', incorrect:['name','key','uid']},
    {q:'Which tag groups form controls?', correct:'<fieldset>', incorrect:['<group>','<formgroup>','<controls>']},
    {q:'Which attribute specifies form submission URL?', correct:'action', incorrect:['method','submit','target']},
    {q:'Which HTTP method is used for form submission?', correct:'method', incorrect:['type','action','submit']},
    {q:'Which input type hides characters?', correct:'password', incorrect:['text','secret','hidden']},
    {q:'Which tag defines a section with a heading?', correct:'<section>', incorrect:['<div>','<article>','<aside>']}
  ],
  3: [
    {q:'What does CSS stand for?', correct:'Cascading Style Sheets', incorrect:['Colorful Style Sheets','Creative Style System','Computer Style Sheets']},
    {q:'Which property sets text color?', correct:'color', incorrect:['text-color','font-color','fg']},
    {q:'Which property sets background color?', correct:'background-color', incorrect:['bgcolor','bg-color','background']},
    {q:'Select element by id "main"?', correct:'#main', incorrect:['.main','main','*main']},
    {q:'Select elements with class "card"?', correct:'.card', incorrect:['#card','card','*card']},
    {q:'Which property sets font size?', correct:'font-size', incorrect:['text-size','size','fontheight']},
    {q:'Which property sets font family?', correct:'font-family', incorrect:['font-style','typeface','font-name']},
    {q:'Which unit is relative to root font-size?', correct:'rem', incorrect:['em','px','%']},
    {q:'Which property adds space inside an element?', correct:'padding', incorrect:['margin','gap','spacing']},
    {q:'Which property adds space outside an element?', correct:'margin', incorrect:['padding','border','spacing']}
  ],
  4: [
    {q:'Which property makes an element a flex container?', correct:'display:flex', incorrect:['block','inline','grid']},
    {q:'Which property makes an element a grid container?', correct:'display:grid', incorrect:['layout:grid','grid-template','grid-mode']},
    {q:'Which property sets element width to full?', correct:'width:100%', incorrect:['size:100%','w:100%','full-width']},
    {q:'Which property rounds element corners?', correct:'border-radius', incorrect:['radius','corner','round']},
    {q:'Which property controls flex wrapping?', correct:'flex-wrap', incorrect:['white-space','word-wrap','text-wrap']},
    {q:'Which property controls stacking order?', correct:'z-index', incorrect:['order','stack','depth']},
    {q:'Which property sets box-sizing including padding?', correct:'box-sizing:border-box', incorrect:['content-box','padding-box','box']},
    {q:'Which property sets gap between flex items?', correct:'gap', incorrect:['column-gap','space','flex-gap']},
    {q:'Which property aligns flex items vertically?', correct:'align-items', incorrect:['justify-items','align-content','vertical-align']},
    {q:'Which property aligns flex items horizontally?', correct:'justify-content', incorrect:['align-content','justify-items','align-self']}
  ],
  5: [
    {q:'Which keyword declares a variable?', correct:'let', incorrect:['varible','constaint','int']},
    {q:'How do you declare a function?', correct:'function', incorrect:['func','def','method']},
    {q:'Arrow function syntax?', correct:'()=>', incorrect:['->','=>{}','->{}']},
    {q:'Add element to an array?', correct:'push()', incorrect:['add()','append()','insert()']},
    {q:'Remove last element from an array?', correct:'pop()', incorrect:['delete()','remove()','shift()']},
    {q:'Parse a JSON string?', correct:'JSON.parse()', incorrect:['JSON.decode()','parse()','toJSON()']},
    {q:'Convert object to JSON?', correct:'JSON.stringify()', incorrect:['JSON.toString()','object.stringify()','JSON.encode()']},
    {q:'Check the type of a variable?', correct:'typeof', incorrect:['type','typeOf','instanceof']},
    {q:'Global object in browser?', correct:'window', incorrect:['global','document','browser']},
    {q:'Log output to console?', correct:'console.log()', incorrect:['print()','echo()','log()']}
  ],
  6: [
    {q:'Add an event listener?', correct:'addEventListener()', incorrect:['on()','listen()','bind()']},
    {q:'Prevent default action?', correct:'preventDefault()', incorrect:['stopDefault()','cancel()','prevent()']},
    {q:'Select element by id?', correct:'document.getElementById()', incorrect:['document.query()','getId()','document.querySelectorAll()']},
    {q:'Select elements by class?', correct:'document.getElementsByClassName()', incorrect:['getClass()','document.querySelectorAll()','getClassName()']},
    {q:'Select first element by selector?', correct:'document.querySelector()', incorrect:['query()','document.getElement()','getSelector()']},
    {q:'Select all elements by selector?', correct:'document.querySelectorAll()', incorrect:['document.selectAll()','queryAll()','getAll()']},
    {q:'Add HTML inside element?', correct:'innerHTML', incorrect:['html','innerText','textContent']},
    {q:'Change element style?', correct:'element.style', incorrect:['element.css','style','element.cssText']},
    {q:'Set timeout function?', correct:'setTimeout()', incorrect:['timeout()','delay()','wait()']},
    {q:'Set interval function?', correct:'setInterval()', incorrect:['interval()','repeat()','loop()']}
  ]
};

// ----------------------------
// App State
let state = {
  selectedSet: 1,
  amount: 10,
  setSeconds: 15 * 60,
  qs: [],
  idx: 0,
  score: 0,
  timerId: null,
  timeLeft: 0,
  started: false
};

// ----------------------------
// UI: set cards
function makeSetCards(){
  const grid = $('#setsGrid');
  grid.innerHTML = '';
  for(let i=1;i<=6;i++){
    const card = document.createElement('div');
    card.className = 'set-card ' + (i<=2? 'set-html': i<=4? 'set-css':'set-js');
    card.dataset.set = i;
    card.innerHTML = `<div class="num">Set ${i}</div><div class="label">${i<=2? 'HTML': i<=4? 'CSS':'JavaScript'}</div>`;
    card.addEventListener('click', ()=> {
      document.querySelectorAll('.set-card').forEach(c=>c.classList.remove('active'));
      card.classList.add('active');
      state.selectedSet = i;
    });
    if(i===1) card.classList.add('active');
    grid.appendChild(card);
  }
}
makeSetCards();

// ----------------------------
// Helpers
function shuffle(a){ for(let i=a.length-1;i>0;i--){ let j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; }
function clamp(v,min,max){ return Math.max(min, Math.min(max, v)); }
function formatTime(sec){ const mm = Math.floor(sec/60).toString().padStart(2,'0'); const ss = (sec%60).toString().padStart(2,'0'); return `${mm}:${ss}`; }

// ----------------------------
// Start set
function startSet(){
  if(state.started) return;
  state.amount = clamp(parseInt($('#amount').value||10,10),1,50);
  const minutes = clamp(parseInt($('#setMinutes').value||15,10),1,60);
  state.setSeconds = minutes*60;
  $('#startSetBtn').disabled = true;

  const bank = LOCAL_SETS[state.selectedSet] || [];
  let raw = bank.slice(0,state.amount);
  while(raw.length < state.amount){
    raw.push(...bank.slice(0,Math.min(bank.length,state.amount-raw.length)));
  }
  state.qs = shuffle(raw.map(q=>({ ...q, choices: shuffle([q.correct,...q.incorrect]) }))).slice(0,state.amount);
  state.idx = 0; state.score=0; state.timeLeft = state.setSeconds; state.started=true;

  renderQuestion();
  startTimer();
  $('#startSetBtn').disabled=false;
}

// ----------------------------
// Timer
function startTimer(){
  clearTimer();
  updateTimerUI();
  state.timerId = setInterval(()=>{
    state.timeLeft--;
    updateTimerUI();
    if(state.timeLeft<=0){ clearTimer(); onTimeUp(); }
  },1000);
}
function clearTimer(){ if(state.timerId){ clearInterval(state.timerId); state.timerId=null; } }
function updateTimerUI(){
  const timerEl = document.querySelector('.timer');
  if(timerEl) timerEl.textContent = formatTime(state.timeLeft);
}

// ----------------------------
// Render question
function renderQuestion(){
  if(state.idx >= state.qs.length){ showResults(); return; }
  const cur = state.qs[state.idx];
  const area = $('#quizArea');
  area.innerHTML = `
    <div class="meta">
      <div class="small">Set ${state.selectedSet} — Q <strong>${state.idx+1}/${state.amount}</strong></div>
      <div class="timer">${formatTime(state.timeLeft)}</div>
    </div>
    <div class="question">${cur.q}</div>
    <div class="answers" role="list">
      ${cur.choices.map(c=>`<button class="answer" data-answer="${c}">${escapeHTML(c)}</button>`).join('')}
    </div>
    <div class="controls-row">
      <div class="small">Score: <strong>${state.score}</strong></div>
      <div class="center-buttons">
        <button id="skipBtn" class="btn ghost">Skip</button>
        <button id="endBtn" class="btn ghost">End Set</button>
      </div>
    </div>
  `;
  area.querySelectorAll('.answer').forEach(b=>b.addEventListener('click', onAnswer));
  $('#skipBtn').addEventListener('click', ()=>{ state.idx++; renderQuestion(); });
  $('#endBtn').addEventListener('click', ()=>{ if(confirm('End this set early?')) showResults(); });
}

// ----------------------------
// Answer handling
function onAnswer(ev){
  if(!state.started) return;
  const btn = ev.currentTarget;
  const selected = btn.dataset.answer;
  const cur = state.qs[state.idx];
  const correct = cur.correct;
  const buttons = document.querySelectorAll('.answer');
  buttons.forEach(b => b.classList.add('disabled'));

  if(selected===correct){ btn.classList.add('correct'); state.score++; }
  else {
    btn.classList.add('wrong');
    buttons.forEach(b=>{ if(b.dataset.answer===correct) b.classList.add('correct'); });
  }

  setTimeout(()=>{ state.idx++; if(state.idx<state.amount) renderQuestion(); else showResults(); }, 900);
}

// ----------------------------
// End / results
function onTimeUp(){ alert('Time is up!'); showResults(); }
function showResults(){
  clearTimer(); state.started=false;
  const total=state.amount, score=state.score;
  $('#quizArea').innerHTML = `
    <div class="result">
      <div class="big">${score} / ${total}</div>
      <div class="sub">Set ${state.selectedSet} completed.</div>
      <div style="display:flex;gap:8px;margin-top:8px">
        <button id="retryBtn" class="btn primary">Retry Set</button>
      </div>
    </div>
  `;
  $('#retryBtn')?.addEventListener('click', startSet);
}

// ----------------------------
// Reset
function resetSet(){
  clearTimer();
  state.started=false;
  state.qs=[]; state.idx=0; state.score=0;
  $('#quizArea').innerHTML = `<div class="intro"><h2>Choose a set to start</h2></div>`;
}

// ----------------------------
// Attach controls
$('#startSetBtn').addEventListener('click', startSet);
$('#resetBtn').addEventListener('click', resetSet);

// Init
resetSet();
// ----------------------------
// End / results with review
function showResults(){
  clearTimer();
  state.started = false;
  const total = state.amount;
  const score = state.score;
  const percent = Math.round((score / Math.max(1, total)) * 100);

  $('#quizArea').innerHTML = `
    <div class="result">
      <div class="big">${score} / ${total}</div>
      <div class="sub">Score: ${percent}% — Set ${state.selectedSet} completed.</div>
      <div style="display:flex;gap:8px;margin-top:8px">
        <button id="retryBtn" class="btn primary">Retry Set</button>
        <button id="nextBtn" class="btn ghost">${state.selectedSet < 6 ? 'Next Set' : 'Choose Set'}</button>
        <button id="reviewBtn" class="btn ghost">Review Answers</button>
      </div>
    </div>
  `;

  $('#retryBtn')?.addEventListener('click', startSet);

  $('#nextBtn')?.addEventListener('click', ()=>{
    if(state.selectedSet < 6){
      document.querySelectorAll('.set-card').forEach(c=>c.classList.remove('active'));
      const next = state.selectedSet + 1;
      const card = document.querySelector(`.set-card[data-set="${next}"]`);
      if(card) card.classList.add('active');
      state.selectedSet = next;
      startSet();
    } else {
      $('#quizArea').innerHTML = `<div class="intro"><p class="small">Choose another set to start.</p></div>`;
    }
  });

  $('#reviewBtn')?.addEventListener('click', reviewAnswers);
}

// ----------------------------
// Review all answers
function reviewAnswers(){
  const arr = state.qs;
  if(!arr || !arr.length){ alert('No answers to review. Run a set first.'); return; }
  let i = 0;

  function show(i){
    const q = arr[i];
    $('#quizArea').innerHTML = `
      <div class="question">${q.q}</div>
      <div class="answers">
        ${q.choices.map(c=>`<div class="answer ${c===q.correct?'correct':''}">${escapeHTML(c)}</div>`).join('')}
      </div>
      <div class="controls-row">
        <div class="small">${i+1} / ${arr.length}</div>
        <div class="center-buttons">
          <button id="prev" class="btn ghost" ${i===0?'disabled':''}>Prev</button>
          <button id="next" class="btn ghost" ${i===arr.length-1?'disabled':''}>Next</button>
          <button id="done" class="btn ghost">Done</button>
        </div>
      </div>
    `;

    $('#prev')?.addEventListener('click', ()=>{ if(i>0){ i--; show(i); } });
    $('#next')?.addEventListener('click', ()=>{ if(i<arr.length-1){ i++; show(i); } });
    $('#done')?.addEventListener('click', ()=>{ $('#quizArea').innerHTML = `<div class="intro"><p class="small">Review finished. Choose another set to start.</p></div>`; });
  }

  show(i);
}