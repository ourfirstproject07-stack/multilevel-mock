// WRITING: so'z hisoblagich, 60 daqiqalik taymer, Telegramga yuborish
const $=id=>document.getElementById(id);

/* ===== SOZLAMALAR (kerak bo'lsa shu yerda o'zgartiring) ===== */
const TIME_SEC=60*60;                       // jami vaqt: 20 daq (Part 1) + 40 daq (Part 2)
const TASKS=[                               // min = yakunlash uchun kamida so'z soni (1 = shunchaki bo'sh bo'lmasin; so'z soni ahamiyatsiz)
 {name:"Task 1.1 (email to friend)",       min:1},
 {name:"Task 1.2 (email to administrator)",min:1},
 {name:"Part 2 (essay)",                   min:1}];
const DRAFT_KEY="mm_writing_draft_v1";

const areas=[...document.querySelectorAll(".task textarea")];
const wcs=[...document.querySelectorAll(".wc")];
let done=false,endAt=0,tick=null,lastText="";

const phoneOk=()=>$("ph").value.replace(/\D/g,"").length>=9;
const words=t=>t.trim()?t.trim().split(/\s+/).length:0;
const counts=()=>areas.map(a=>words(a.value));

function refresh(){
 const c=counts();
 c.forEach((n,i)=>{wcs[i].querySelector(".cnt").textContent=n;wcs[i].classList.toggle("okc",n>=TASKS[i].min)});
 const ready=$("nm").value.trim()&&phoneOk()&&c.every((n,i)=>n>=TASKS[i].min);
 $("fin").classList.toggle("on",!!ready);
 $("fin").setAttribute("aria-disabled",ready?"false":"true");
 if(ready)$("warn").textContent="";
 try{localStorage.setItem(DRAFT_KEY,JSON.stringify({nm:$("nm").value,ph:$("ph").value,t:areas.map(a=>a.value)}))}catch(e){}
}
document.addEventListener("input",()=>{if(!done)refresh()});
try{const d=JSON.parse(localStorage.getItem(DRAFT_KEY)||"null");
 if(d){$("nm").value=d.nm||"";$("ph").value=d.ph||"";areas.forEach((a,i)=>a.value=(d.t&&d.t[i])||"")}}catch(e){}

function missing(){
 const c=counts(),m=[];
 if(!$("nm").value.trim())m.push("ism va familiyangizni yozing");
 if(!phoneOk())m.push("telefon raqamingizni to'liq yozing");
 c.forEach((n,i)=>{if(n<TASKS[i].min)m.push(`${TASKS[i].name}: javob yozing`)});
 return m}

function tryFinish(){
 if(done)return;
 const m=missing();
 if(m.length){$("warn").textContent="Test yakunlanmagan. "+m.join("; ")+".";return}
 finish(false)}

/* ===== TELEGRAMGA YUBORISH ===== */
function buildMessages(timeUp){
 const c=counts(),spent=TIME_SEC-Math.max(0,Math.round((endAt-Date.now())/1000));
 const mm=String(Math.floor(spent/60)).padStart(2,"0"),ss=String(spent%60).padStart(2,"0");
 const name=$("nm").value.trim()||"Ism kiritilmagan";
 const head=`📝 WRITING\n👤 ${name}\n📞 ${$("ph").value.trim()}\n⏱ Sarflangan vaqt: ${mm}:${ss}${timeUp?" (vaqt tugadi)":""}\n`+
  TASKS.map((t,i)=>`• ${t.name} — ${c[i]} so'z`).join("\n");
 const msgs=[head];
 areas.forEach((a,i)=>msgs.push(`${TASKS[i].name} — ${c[i]} so'z\n\n${a.value.trim()||"(bo'sh)"}`));
 return msgs}

async function sendTG(msgs){
 if(!TG_BOT_TOKEN||!TG_CHAT_IDS.length)throw new Error("Telegram sozlanmagan");
 for(const id of TG_CHAT_IDS){
  for(const text of msgs){
   const r=await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:id,text:text.slice(0,4000)})});
   if(!r.ok)throw new Error("Telegram xatosi: "+r.status)}}}

async function finish(timeUp){
 if(done)return;done=true;clearInterval(tick);$("warn").textContent="";
 areas.forEach(a=>a.disabled=true);$("nm").disabled=true;$("ph").disabled=true;$("fin").style.display="none";
 const msgs=buildMessages(timeUp);lastText=msgs.join("\n\n──────────\n\n");
 const r=$("res");r.style.display="block";
 r.innerHTML=`<p class="na">Yuborilmoqda...</p>`;
 try{
  await sendTG(msgs);
  try{localStorage.removeItem(DRAFT_KEY)}catch(e){}
  r.innerHTML=`${timeUp?`<p class="failed">Vaqt tugadi.</p>`:""}<p class="big">✅ Ishingiz yuborildi</p><p>Writing ishingiz o'qituvchiga Telegram orqali yuborildi. Ballni o'qituvchi tekshirib, sizga aytadi.</p>`;
 }catch(e){
  const share="https://t.me/share/url?url=%20&text="+encodeURIComponent(lastText);
  r.innerHTML=`<p class="failed">Avtomatik yuborib bo'lmadi (${e.message}).</p>
  <p>Ishingiz yo'qolmadi. Quyidagi tugmalardan biri bilan o'qituvchiga yuboring:</p>
  <div class="acts"><a class="btn" href="${share}" target="_blank" rel="noopener">Telegramda yuborish</a><button class="btn" onclick="copyText()">Nusxa olish</button></div>`;
 }
 r.scrollIntoView({behavior:"smooth"})}

function copyText(){
 const done_=()=>alert("Nusxa olindi. Telegramda o'qituvchiga joylashtiring.");
 if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(lastText).then(done_,()=>prompt("Nusxa oling:",lastText))}
 else prompt("Nusxa oling:",lastText)}

/* ===== TAYMER ===== */
function paint(){
 const left=Math.max(0,Math.round((endAt-Date.now())/1000));
 $("timer").textContent=String(Math.floor(left/60)).padStart(2,"0")+":"+String(left%60).padStart(2,"0");
 $("timerbar").classList.toggle("low",left<=300);
 if(left<=0)finish(true)}
function goHome(){location.href="mock.html"}

refresh();
endAt=Date.now()+TIME_SEC*1000;paint();tick=setInterval(paint,500);
