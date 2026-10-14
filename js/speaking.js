/* SPEAKING: imtihon oqimi, audio yozish, taxminiy tahlil, namunaviy javoblar */
const CFG = SPEAKING_CONFIG, $ = id => document.getElementById(id);
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
const ORDER = ["1.1", "1.2", "2", "3"];
let student = "", phone = "", T, steps = [], ci = 0, stream, tick, left, mr, rc, chunks, base, cu, gaps, lastT, t0, talking, out = [];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const fm = s => String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
const clamp = x => Math.max(0, Math.min(1, x));
function beep(f = 880) { try { const c = new (window.AudioContext || window.webkitAudioContext)(), o = c.createOscillator(); o.frequency.value = f; o.connect(c.destination); o.start(); o.stop(c.currentTime + .25) } catch (e) {} }
function clean() { clearInterval(tick); if (stream) stream.getTracks().forEach(t => t.stop()); stream = null }
function goHome() { clean(); location.href = "mock.html" }

/* ---------- Boshlang'ich ekran ---------- */
$("tsel").innerHTML = SPEAKING_TESTS.map((t, i) => `<option value="${i}">${esc(t.title)}</option>`).join("");
$("ssel").innerHTML = '<option value="all">Barcha partlar</option>' + ORDER.map(p => `<option value="${p}">Part ${p}</option>`).join("");
$("srnote").textContent = SR ? "Javobingiz yoziladi va matnga aylantirilib tahlil qilinadi (Chrome tavsiya etiladi, internet kerak)."
  : "Diqqat: bu brauzer nutqni matnga aylantirmaydi, faqat audio yoziladi. Avtomatik tahlil uchun Chrome'dan foydalaning.";
const pics = ps => ps && ps.length ? `<div class="pics">${ps.map(p => `<div class="pic">${p.src ? `<img src="${esc(p.src)}" alt="${esc(p.alt)}">` : "[Rasm] " + esc(p.alt)}</div>`).join("")}</div>` : "";
const mdl = it => `<details><summary>B2 javob</summary><p>${esc(it.b2)}</p></details><details><summary>C1 javob</summary><p>${esc(it.c1)}</p></details>`;
function toggleModels() {
  const m = $("models"); m.hidden = !m.hidden; if (m.hidden) return;
  const P = SPEAKING_SAMPLES[0].parts;
  m.innerHTML = "<h2>Namunaviy javoblar</h2>" + ORDER.filter(p => P[p]).map(p => `<h3>Part ${p}</h3>` + pics(P[p].pics) +
    P[p].items.map(it => `<div class="q"><b>${esc(it.q)}</b>${mdl(it)}</div>`).join("")).join("");
}

/* ---------- Imtihon oqimi ---------- */
function buildSteps(scope) {
  const s = []; ORDER.forEach(p => { if (scope !== "all" && scope !== p) return; const d = T.parts[p]; if (!d) return;
    d.items.forEach((it, i) => s.push({ p, info: d.info, pics: d.pics, it, ...TIMING[p] })) }); return s;
}
async function start() {
  student = $("snm").value.trim();
  phone = $("sph").value.trim();
  if (!student) { $("msg").textContent = "Avval ism va familiyangizni yozing."; return }
  if (phone.replace(/\D/g, "").length < 9) { $("msg").textContent = "Telefon raqamingizni to'liq yozing (natijani sizga yuborish uchun)."; return }
  $("msg").textContent = "";
  T = SPEAKING_TESTS[+$("tsel").value]; steps = buildSteps($("ssel").value);
  if (!steps.length) { $("msg").textContent = "Bu partda savollar hali yo'q."; return }
  try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }) }
  catch (e) { $("msg").textContent = "Mikrofonga ruxsat berilmadi. Brauzer sozlamasida ruxsat bering yoki sahifani to'g'ridan-to'g'ri brauzerda oching."; return }
  out = []; ci = 0; $("start").hidden = true; $("res").hidden = true; $("exam").hidden = false; micCheck();
}
/* ---------- Mikrofonni tekshirish (baholanmaydi) ---------- */
function micCheck() {
  clearInterval(tick); $("go").hidden = false; $("go").disabled = false; $("pg").style.width = "0%";
  $("hd").textContent = "Mikrofonni tekshirish (baholanmaydi)";
  $("info").textContent = "Imtihondan oldin mikrofoningiz ishlayotganini tekshiring: quyidagi savolga 20–25 soniya javob bering, so'ng o'z ovozingizni eshitasiz.";
  $("qt").textContent = MIC_CHECK.q; $("pc").innerHTML = ""; left = MIC_CHECK.ans; $("ph").textContent = "Tayyor bo'lsangiz, yozishni boshlang"; $("tm").textContent = fm(left);
  $("go").textContent = "Yozishni boshlash"; $("go").onclick = micRec;
}
function micRec() {
  left = MIC_CHECK.ans; startRec(); paint(true); $("go").textContent = "Javobni tugatdim"; $("go").onclick = micDone;
  clearInterval(tick); tick = setInterval(() => { left--; if (left <= 0) micDone(); else paint(true) }, 1000);
}
async function micDone() {
  clearInterval(tick); $("go").hidden = true; $("ph").textContent = "Yozuv eshitilmoqda..."; $("tm").textContent = "00:00";
  const r = await stopRec(); $("ph").textContent = "";
  const heard = SR ? (r.text ? `<div class="tr">${esc(r.text)}</div>` : '<p class="bad">Matn aniqlanmadi. Mikrofon ovozi past bo\'lishi mumkin: mikrofonga yaqinroq gapiring yoki sozlamalarni tekshiring.</p>') : "";
  $("pc").innerHTML = `<p><b>Ovozingiz shunday yozildi:</b></p><audio controls src="${r.url}"></audio>${heard}
  <p class="note">Ovozingiz aniq eshitilsa, imtihonni boshlang. Eshitilmasa, qayta yozing.</p>
  <div class="row"><button class="btn" onclick="micOk()">Ovoz eshitilyapti, imtihonni boshlash</button><button class="btn ghost" onclick="micCheck()">Qayta yozish</button></div>`;
}
function micOk() { $("go").hidden = false; ci = 0; show(); }

function paint(talk) { $("ph").innerHTML = talk ? '<span class="rec"></span> Gapiring, yozilmoqda' : "Tayyorlanish"; $("tm").textContent = fm(Math.max(left, 0)) }
function show() {
  const s = steps[ci]; $("hd").textContent = `Part ${s.p} · Savol ${ci + 1}/${steps.length}`; $("pg").style.width = ci / steps.length * 100 + "%";
  $("info").textContent = s.info; $("qt").textContent = s.it.q; $("pc").innerHTML = pics(s.pics);
  left = s.prep; paint(false); $("go").disabled = false; $("go").textContent = "Tayyorman, boshlash"; $("go").onclick = beginTalk;
  clearInterval(tick); tick = setInterval(() => { left--; if (left <= 0) beginTalk(); else paint(false) }, 1000);
}
function beginTalk() {
  clearInterval(tick); beep(); left = steps[ci].ans; startRec(); paint(true);
  $("go").textContent = "Javobni tugatdim"; $("go").onclick = endTalk;
  tick = setInterval(() => { left--; if (left <= 0) endTalk(); else paint(true) }, 1000);
}
async function endTalk() {
  clearInterval(tick); $("go").disabled = true; beep(520);
  const r = await stopRec(); out.push({ s: steps[ci], ...r }); ci++; ci < steps.length ? show() : finish();
}
function startRec() {
  chunks = []; base = ""; cu = ""; gaps = 0; lastT = Date.now(); t0 = Date.now(); talking = true;
  mr = new MediaRecorder(stream); mr.ondataavailable = e => e.data.size && chunks.push(e.data); mr.start();
  if (SR) {
    rc = new SR(); rc.lang = CFG.lang; rc.continuous = true; rc.interimResults = true;
    rc.onresult = e => { let f = ""; for (let i = 0; i < e.results.length; i++) f += e.results[i][0].transcript + " "; cu = f.trim(); const n = Date.now(); if (n - lastT > 2500) gaps++; lastT = n };
    rc.onend = () => { base += " " + cu; cu = ""; if (talking) try { rc.start() } catch (e) {} };
    try { rc.start() } catch (e) {}
  }
}
function stopRec() {
  talking = false; try { rc && rc.stop() } catch (e) {}
  return new Promise(res => { mr.onstop = () => setTimeout(() => {
    const blob = new Blob(chunks, { type: mr.mimeType || "audio/webm" });
    res({ blob, url: URL.createObjectURL(blob), text: (base + " " + cu).replace(/\s+/g, " ").trim(), sec: Math.max(1, Math.round((Date.now() - t0) / 1000)), gaps });
  }, 500); mr.stop() });
}

/* ---------- Taxminiy tahlil (qoidalar asosida, rasmiy baho emas) ---------- */
const FILL = /\b(um+|uh+|er+|erm|hmm+)\b/gi;
const CONN = /\b(however|although|moreover|furthermore|nevertheless|whereas|despite|in addition|as a result|consequently|on the other hand|in contrast|for instance|for example|in my opinion|in my view|not only|apart from|even though|therefore|overall|on balance|admittedly)\b/gi;
const SUB = /\b(which|who|whom|whose|if|would|could|might|because|while|since|unless|so that)\b/gi;
const RULES = [
  [/\b(he|she|it) (don't|have|go|do|are|were)\b/i, "he/she/it dan keyin fe'l shakli noto'g'ri (he goes, he doesn't)"],
  [/\b(i|you|we|they) (is|has|was)\b/i, "ega va fe'l mos emas (I am, we have, you were)"],
  [/\bam agree\b/i, "'I am agree' emas, 'I agree'"],
  [/\bmore (better|easier|bigger|cheaper|faster|worse|harder)\b/i, "qiyosiy darajada 'more' va -er birga ishlatilmaydi"],
  [/\b(didn't|did not|doesn't|don't) (went|saw|had|ate|took|got|came|made)\b/i, "did/didn't dan keyin fe'lning asosiy shakli ishlatiladi"],
  [/\b(peoples|informations?|advices|furnitures|knowledges)\b/i, "noto'g'ri ko'plik (people, information, advice)"],
  [/\bdiscuss about\b/i, "'discuss about' emas, 'discuss'"], [/\bgo to home\b/i, "'go home' (to kerak emas)"],
  [/\bdepends? from\b/i, "'depend on'"], [/\bmarried with\b/i, "'married to'"], [/\bi have \d+ years\b/i, "'I am ... years old'"],
  [/\ba (?!uni|use|eur|one|usu)[aeiou]\w*/i, "unli tovush oldidan 'an' kerak"], [/\ban (?![aeiouh])\w+/i, "undosh oldidan 'a' kerak"]
];
function analyze(t, sec, g, ans) {
  const w = t.toLowerCase().match(/[a-z']+/g) || [], n = w.length; if (n < 5) return { n, empty: true, score: 0, errs: [] };
  const wpm = Math.round(n / sec * 60), fill = (t.match(FILL) || []).length, conn = (t.match(CONN) || []).length, sub = (t.match(SUB) || []).length;
  const ttr = new Set(w).size / n, lg = w.filter(x => x.length >= 7).length / n;
  const errs = RULES.filter(r => r[0].test(t)).map(r => r[1]);
  const ne = RULES.reduce((a, r) => a + (t.match(new RegExp(r[0].source, "gi")) || []).length, 0);
  const c = {
    flu: clamp(clamp((wpm - 50) / 60) - Math.min(.3, fill / n * 3) - Math.min(.2, g * .04)),
    len: clamp(n / (ans * 1.5)),
    lex: clamp((ttr - .4) / .35) * .6 + clamp(lg / .25) * .4,
    cx: clamp((conn * 2 + sub) / (n / 12)),
    acc: clamp(1 - ne / (n / 25))
  };
  return { n, wpm, fill, conn, errs, c, score: 100 * (.25 * c.flu + .25 * c.len + .2 * c.lex + .15 * c.cx + .15 * c.acc) };
}
const level = t => t >= 65 ? "C1" : t >= 51 ? "B2" : t >= 38 ? "B1" : "B1 dan past";
const NAMES = { flu: "Ravonlik", len: "Javob to'liqligi", lex: "Lug'at boyligi", cx: "Grammatik murakkablik", acc: "Grammatik aniqlik" };
const TIPS = { flu: "to'xtamasdan, 'um/uh' siz gapirishni mashq qiling", len: "ajratilgan vaqtni to'liq ishlating, fikrni misol bilan kengaytiring",
  lex: "sinonimlar va aniqroq so'zlardan foydalaning", cx: "however, although, which kabi bog'lovchilar va murakkab gaplarni ko'proq ishlating", acc: "pastdagi grammatik xatolarni takrorlab to'g'rilang" };
const fmt = x => Math.round(x * 10) / 10;

/* ---------- Natijalar ---------- */
function finish() {
  clean(); $("exam").hidden = true; $("res").hidden = false;
  const A = out.map(o => ({ ...o, a: SR ? analyze(o.text, o.sec, o.gaps, o.s.ans) : null }));
  const ok = A.filter(o => o.a && !o.a.empty); let h = '<div class="part"><h2>Natija</h2>';
  if (ok.length) {
    const W = ok.reduce((s, o) => s + o.s.ans, 0), avg = ok.reduce((s, o) => s + o.a.score * o.s.ans, 0) / W, t75 = avg / 100 * 75;
    const comp = k => ok.reduce((s, o) => s + o.a.c[k] * o.s.ans, 0) / W * 100;
    const weak = Object.keys(NAMES).sort((x, y) => comp(x) - comp(y)).slice(0, 2);
    h += `<p class="big">Taxminiy natija: ${fmt(t75)} / 75 · <span class="lv">${level(t75)}</span></p>
    <table class="comp">${Object.keys(NAMES).map(k => `<tr><td>${NAMES[k]}</td><td style="width:45%"><i style="width:${Math.round(comp(k))}%"></i></td><td>${Math.round(comp(k))}%</td></tr>`).join("")}</table>
    <p><b>Nimani yaxshilash kerak:</b> ${weak.map(k => NAMES[k] + " — " + TIPS[k]).join("; ")}.</p>
    <p class="note">Bu avtomatik, taxminiy baho: nutq matnga aylantirilib so'zlar soni, tezlik, lug'at, bog'lovchilar va tipik xatolar bo'yicha hisoblanadi. Nutqni tanish dasturi ba'zi xatolar va to'xtashlarni "to'g'rilab" yuborishi mumkin. Rasmiy baho o'rnini bosmaydi, audioni ustozga ham ko'rsating.</p>`;
  } else h += `<p>${SR ? "Matn aniqlanmadi: javoblar juda qisqa yoki mikrofon ovozi past edi." : "Brauzer nutqni matnga aylantirmaydi, shuning uchun tahlil qilinmadi. Audiolarni eshitib, ustozingizga yuboring."}</p>`;
  h += '</div><div id="ai"></div><div class="part"><h2>Javoblaringiz</h2>';
  A.forEach((o, i) => {
    const a = o.a;
    h += `<div class="ans"><h3>Part ${o.s.p} · ${esc(o.s.it.q)}</h3>
    <audio controls src="${o.url}"></audio> <a href="${o.url}" download="speaking-${i + 1}.webm">Yuklab olish</a>
    ${a ? `<div class="tr">${o.text ? esc(o.text) : "<i>Matn aniqlanmadi</i>"}</div>` : ""}
    ${a && !a.empty ? `<div class="met">${a.n} so'z · ${a.wpm} so'z/daqiqa · to'ldiruvchi so'zlar: ${a.fill} · bog'lovchilar: ${a.conn} · uzun pauzalar: ${o.gaps}</div>
    ${a.errs.length ? `<ul class="errs">${a.errs.map(e => `<li>${esc(e)}</li>`).join("")}</ul>` : '<div class="met good">Tipik grammatik xato topilmadi</div>'}` : ""}</div>`;
  });
  $("res").innerHTML = '<div class="part" id="tgs"><p class="note">Natija o\'qituvchiga yuborilmoqda...</p></div>' + h + '</div><div class="row"><button class="btn" onclick="location.reload()">Qayta topshirish</button></div>';
  window.scrollTo(0, 0); sendSpeaking(A); if (CFG.aiEndpoint) aiAssess(A);
}
/* Ixtiyoriy: AI tahlil. Server POST {test, answers:[{part,question,transcript,seconds}]} qabul qilib
   {score75, level, summary, errors:[{said, fix, why}]} qaytaradi. */
async function aiAssess(A) {
  const box = $("ai"); box.innerHTML = '<div class="part"><p class="note">AI tahlil qilinmoqda...</p></div>';
  try {
    const r = await fetch(CFG.aiEndpoint, { method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ test: T.title, answers: A.map(o => ({ part: o.s.p, question: o.s.it.q, transcript: o.text, seconds: o.sec })) }) });
    const d = await r.json();
    box.innerHTML = `<div class="part"><h2>AI tahlil</h2><p class="big">${fmt(d.score75)} / 75 · <span class="lv">${esc(d.level)}</span></p><p>${esc(d.summary)}</p>
    <ul class="errs">${(d.errors || []).map(e => `<li>"${esc(e.said)}" → <b>${esc(e.fix)}</b> (${esc(e.why)})</li>`).join("")}</ul></div>`;
  } catch (e) { box.innerHTML = '<div class="part"><p class="bad">AI tahlil serveriga ulanib bo\'lmadi.</p></div>' }
}

/* ---------- Telegramga yuborish (config.js dagi bot orqali) ---------- */
const API = m => `https://api.telegram.org/bot${TG_BOT_TOKEN}/${m}`;
async function tgText(chat, text) {
  const r = await fetch(API("sendMessage"), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ chat_id: chat, text: text.slice(0, 4000) }) });
  if (!r.ok) throw new Error("Telegram xatosi: " + r.status);
}
async function tgFile(chat, blob, name, caption) {
  const fd = new FormData(); fd.append("chat_id", chat); fd.append("caption", caption.slice(0, 900)); fd.append("document", blob, name);
  const r = await fetch(API("sendDocument"), { method: "POST", body: fd });
  if (!r.ok) throw new Error("Telegram xatosi (audio): " + r.status);
}
function overall(A) {
  const ok = A.filter(o => o.a && !o.a.empty); if (!ok.length) return null;
  const W = ok.reduce((s, o) => s + o.s.ans, 0), t75 = ok.reduce((s, o) => s + o.a.score * o.s.ans, 0) / W / 100 * 75;
  return { t75, lv: level(t75) };
}
function buildSpeakingMessages(A) {
  const ov = overall(A), spent = A.reduce((s, o) => s + o.sec, 0);
  const head = `🎤 ${T.title}\n👤 ${student}\n📞 ${phone}\n⏱ Jami gapirgan vaqt: ${fm(spent)}\n` +
    (ov ? `📊 Avtomatik taxminiy natija: ${fmt(ov.t75)} / 75 · ${ov.lv}\n(rasmiy baho emas — audioni eshitib ball qo'ying)` : `📊 Avtomatik tahlil yo'q (matn aniqlanmadi yoki brauzer nutqni matnga aylantirmaydi). Audiolarni eshiting.`);
  const items = A.map((o, i) => {
    const a = o.a; let t = `Part ${o.s.p} · Savol ${i + 1}/${A.length}\n${o.s.it.q}\n`;
    if (a && !a.empty) {
      t += `\n${a.n} so'z · ${a.wpm} so'z/daq · to'ldiruvchi: ${a.fill} · bog'lovchi: ${a.conn} · uzun pauza: ${o.gaps}\n`;
      if (a.errs.length) t += `Xatolar: ${a.errs.join("; ")}\n`;
    }
    t += `\nMatn: ${o.text || "(aniqlanmadi)"}`;
    const ext = (o.blob.type.match(/(webm|ogg|mp4|mpeg|wav)/) || [, "webm"])[1].replace("mp4", "m4a");
    return { text: t, blob: o.blob, name: `speaking-${i + 1}-part${o.s.p}.${ext}`, cap: `Part ${o.s.p} · Savol ${i + 1} · ${student} · ${phone}` };
  });
  return { head, items };
}
async function sendSpeaking(A) {
  const box = $("tgs"), M = buildSpeakingMessages(A);
  try {
    if (typeof TG_BOT_TOKEN === "undefined" || !TG_BOT_TOKEN || !TG_CHAT_IDS.length) throw new Error("Telegram sozlanmagan");
    for (const id of TG_CHAT_IDS) {
      await tgText(id, M.head);
      for (const it of M.items) { await tgText(id, it.text); await tgFile(id, it.blob, it.name, it.cap); }
    }
    box.innerHTML = '<h2 class="sent">✅ Natijangiz yuborildi</h2><p>Javoblaringiz, matn va audio fayllar o\'qituvchiga Telegram orqali yuborildi.</p>';
  } catch (e) {
    box.innerHTML = `<p class="bad">Avtomatik yuborib bo'lmadi (${esc(e.message)}).</p><p class="note">Audio fayllar pastda, "Yuklab olish" orqali saqlab, o'qituvchiga yuboring.</p>`;
  }
}
