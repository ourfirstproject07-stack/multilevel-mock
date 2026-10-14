/* ===== JAVOBLAR KALITI: keyin shu yerga yozing =====
   Masalan: 1:"B", 8:"Sharma", 10:["biology","Biology"], 15:"C" */
const KEY={8:"Bhatt",9:["31 March","31st March","March 31","March 31st"],10:"nursing",11:["2","two"],12:"meat",13:"bedsit",14:["theatre","theater"],
19:"G",20:"D",21:"B",22:"F",24:"A",25:"C",26:"C",27:"B",28:"C",29:"B",
129:"queen",130:"colony",131:"feedback",132:"sandbags",133:"intelligence",134:"researchers",135:"model"};
const MAP="../img/map.jpg";
const P1=[["What day is that?","What time is best?","Thanks for doing it."],["Sorry about that.","I will give it back.","Thanks a lot."],["No, you saw it.","I really loved it.","Not very often."],["Try the newsagent's","The bank is closed.","You put them here."],["Me too, after all this time.","It'll be good to meet you.","I always help if I can."],["I went yesterday.","I don't know the result yet.","I'm looking forward to it."],["Don't mind.","Don't call.","Don't worry."]];
const FORM=[[8,"Name: Anu "],[9,"Date of birth: "],[10,"Course of study: "],[11,"Number of years planned in hall: "],[12,"Special dietary requirements: no "," (red)"],[13,"Preferred room type: a single "],[14,"Interests: the "," and badminton"]];
const SP=["A. Entertainment is important for me too!","B. Holidays are not for workaholics like me.","C. My trips require a lot of preparation.","D. Being brave makes me feel good.","E. Holidays are meant for relaxation.","F. It might be hard but it is worth it!"];
const P5=[["Extract One — a broadcaster talks about a series of programmes on landscape painting.",[["Why did he decide to include a picture by a politician?",["to point out how painting helps people in different ways","to show some interesting points about styles of painting","to stress that amateur art can equal professional painting"]],["How does he feel about the process of drawing?",["The activity relaxes him.","He is ashamed of the results.","Concentrating on it is exciting."]]]],
["Extract Two — an amateur pilot, Gina Nesbit, talks about aerobatics in her small plane.",[["What does Gina find hard about learning new aerobatic movements?",["It is difficult to practise without any instructions.","Trying out some of them makes her feel sick at first.","She can get nervous flying the plane unaccompanied."]],["What gives Gina most pleasure when taking part in competitions?",["the relief she feels after completing a sequence of actions","the satisfaction of knowing she has performed accurately","the pride she takes in preparing as thoroughly as possible"]]]],
["Extract Three — a chef, George, talks to a friend about his daily routine.",[["What does George appreciate most about riding a motorbike?",["It allows him to avoid the traffic jams on the way to work.","It reminds him of when he was a teenager.","It gives him some time for himself."]],["Which is George's favourite object in his house?",["the kitchen table","the shower","the cooker"]]]]];
const P6=[[29,"Jim says termites differ from bees in that a "," is not responsible for organising their building work."],[30,"Jim uses the word "," to refer to the group of robots he's created to function as independent units."],[31,"Jim states that the robots receive "," to help them correct any errors they make."],[32,"Jim predicts that his robots will soon be able to move "," into position to help people cope with the threat of floods."],[33,"Jim compares both termites and his robots to brain cells, in that they all create a superior form of ","."],[34,"A group of Turkish "," has observed Jim's work in the hope of coming up with a"],[35,""," they can learn from."]];
const L="ABCDEFG";let QS=[];
const $=id=>document.getElementById(id);
const inp=n=>`<input type="text" data-n="${n}" aria-label="Savol ${n}" autocomplete="off">`;
const sel=(n,k)=>`<select data-n="${n}" aria-label="Savol ${n}"><option value="">—</option>${L.slice(0,k).split("").map(c=>`<option>${c}</option>`).join("")}</select>`;
const radios=(n,opts)=>opts.map((o,i)=>`<label class="opt"><input type="radio" name="q${n}" data-n="${n}" value="${L[i]}">${L[i]}. ${o}</label>`).join("");
function qrow(n,html,lab){QS.push(n);return `<div class="q" id="r${n}"><b class="num">${lab||n}.</b>${html}<span class="fb"></span></div>`}
function build(){QS=[];let h="";
h+=`<div class="part"><h2>Part 1</h2><p class="ins">You will hear some sentences. Choose the best reply to each sentence.</p>`+P1.map((o,i)=>qrow(i+1,radios(i+1,o))).join("")+`</div>`;
h+=`<div class="part"><h2>Part 2 — Questions 8–14</h2><p class="ins">Complete the notes below. Write ONE WORD AND/OR NUMBER for each answer.</p><p class="words"><b>Accommodation Form – Student Information</b><br>Type of accommodation: hall of residence · Country of origin: India · Preferred catering arrangement: half board</p>`+FORM.map(f=>qrow(f[0],f[1]+inp(f[0])+(f[2]||""))).join("")+`</div>`;
h+=`<div class="part"><h2>Part 3 — Questions 15–18</h2><p class="ins">You will hear people speaking in different situations. Match each speaker to the statement (A–F). There are TWO EXTRA statements you do not need to use.</p><div class="words">${SP.join("<br>")}</div>`+[15,16,17,18].map(n=>qrow(n,`Speaker ${n-14} `+sel(n,6))).join("")+`</div>`;
h+=`<div class="part"><h2>Part 4 — Questions 19–22</h2><p class="ins">Label the plan below. Write the correct letter, A–G, next to each question.</p><img class="map" src="${MAP}" alt="Ground floor plan of theatre">`+[[19,"box office"],[20,"theatre manager's office"],[21,"lighting box"],[22,"artistic director's office"]].map(x=>qrow(x[0],x[1]+" "+sel(x[0],7))).join("")+`</div>`;
let n=24;h+=`<div class="part"><h2>Part 5 — Questions 24–29</h2><p class="ins">You will hear three different extracts. Choose the answer (A, B or C) which fits best. There are two questions for each extract.</p>`;
P5.forEach(e=>{h+=`<p><b>${e[0]}</b></p>`;e[1].forEach(q=>{h+=qrow(n,q[0]+radios(n,q[1]));n++})});h+=`</div>`;
h+=`<div class="part"><h2>Part 6 — Questions 29–35</h2><p class="ins">Robots Like Termites. You will hear part of a lecture. Fill in the missing information. Write no more than ONE WORD for each answer.</p>`+P6.map(f=>qrow(f[0]+100,f[1]+inp(f[0]+100)+f[2],f[0])).join("")+`</div>`;
$("parts").innerHTML=h}
function goHome(){$("au").pause();location.href="mock.html"}
function val(n){const e=document.querySelector(`[data-n="${n}"]`);if(!e)return"";if(e.type==="radio"){const c=document.querySelector(`input[name="q${n}"]:checked`);return c?c.value:""}return e.value.trim()}
/* ===== YAKUNLASH (Reading bilan bir xil tizim) ===== */
// Ball jadvali (100 ballik jadval x 0.75 = 75): har bir part uchun maksimum ball
const PARTS=[{n:1,a:1,b:7,max:12},{n:2,a:8,b:14,max:11.25},{n:3,a:15,b:18,max:9},{n:4,a:19,b:22,max:11.25},{n:5,a:24,b:29,max:13.5},{n:6,a:129,b:135,max:18}];
let done=false;
const norm=s=>String(s).toLowerCase().replace(/\s+/g," ").trim();
const fmt=x=>(Math.round(x*100)/100).toString();
const level=t=>t>=65?"C1":t>=51?"B2":t>=38?"B1":"B1 dan past";
const answered=()=>QS.filter(n=>val(n)!=="").length;
function updateBtn(){const all=answered()===QS.length;$("fin").classList.toggle("on",all);$("fin").setAttribute("aria-disabled",all?"false":"true");if(all)$("warn").textContent=""}
document.addEventListener("input",()=>{if(!done)updateBtn()});
document.addEventListener("change",()=>{if(!done)updateBtn()});
function tryFinish(){if(done)return;
const left=QS.length-answered();
if(left>0){$("warn").textContent=`Test yakunlanmagan. Javob berilmagan savollar: ${left} ta.`;return}
finish()}
function finish(){done=true;$("au").pause();$("warn").textContent="";
let earned=0,maxG=0,rows="",skip=0,right=0,keyedAll=0;
PARTS.forEach(p=>{
const ns=QS.filter(n=>n>=p.a&&n<=p.b);let keyed=0,c=0;
ns.forEach(n=>{const k=KEY[n],row=$("r"+n),fb=row.querySelector(".fb");
if(k===undefined){skip++;fb.textContent="";return}
keyed++;const u=val(n);const good=[].concat(k).map(norm).includes(norm(u));
if(good)c++;
row.classList.add(good?"ok":"no");
row.querySelectorAll(".opt").forEach(l=>{if(l.querySelector("input").value===u)l.classList.add(good?"ok":"no")});
fb.className="fb "+(good?"good":"wrong");
fb.textContent=good?"✓ To'g'ri":`✗ Sizniki: ${u||"—"} · To'g'ri javob: ${[].concat(k)[0]}`});
if(keyed>0){const pts=c/keyed*p.max;earned+=pts;maxG+=p.max;right+=c;keyedAll+=keyed;
rows+=`<tr><td>Part ${p.n}</td><td>${c} / ${keyed}</td><td>${fmt(pts)} / ${fmt(p.max)}</td></tr>`}
else rows+=`<tr><td>Part ${p.n}</td><td colspan="2" class="na">javoblar kaliti yo'q</td></tr>`});
document.querySelectorAll("input,select").forEach(e=>e.disabled=true);
$("fin").style.display="none";
const total=maxG?earned/maxG*75:0;
const r=$("res");r.style.display="block";
r.innerHTML=`<p class="big">Natija: ${fmt(total)} / 75 · <span class="lv">${level(total)}</span></p>
<table><tr><th>Part</th><th>To'g'ri</th><th>Ball</th></tr>${rows}<tr><th>Jami</th><th>${right} / ${keyedAll}</th><th>${fmt(total)} / 75</th></tr></table>
<p class="na" style="font-size:14px;margin:6px 0 0">Daraja: B1 — 38–50, B2 — 51–64, C1 — 65–75 ball.</p>${skip?`<p class="na" style="font-size:14px;margin:6px 0 0">Eslatma: javoblar kaliti bo'lmagan ${skip} ta savol hisobga olinmadi, natija qolgan partlar bo'yicha 75 ballga o'tkazildi.</p>`:""}`;
r.scrollIntoView({behavior:"smooth"})}

build();
