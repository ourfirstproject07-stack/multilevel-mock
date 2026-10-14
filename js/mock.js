// 2-sahifa: bo'limlar (tab) mantig'i
const tabsEl = document.getElementById('tabs');
const partEl = document.getElementById('part');
const keys = Object.keys(MOCK);

// Imtihoni tayyor bo'limlar: "Imtihonni boshlash" tugmasi shu sahifaga olib boradi
const READY = {
  listening: { page: 'listening.html', title: 'Listening — Test 10', text: 'Audio tinglang va savollarga javob bering.' },
  writing:   { page: 'writing.html',   title: 'Writing',            text: '60 daqiqa. Part 1 (Task 1.1, 1.2) va Part 2. Ishingiz o\'qituvchiga Telegram orqali yuboriladi.' },
  speaking:  { page: 'speaking.html',  title: 'Speaking — Test 1',  text: 'Part 1.1, 1.2, 2 va 3. Javobingiz yoziladi va o\'qituvchiga Telegram orqali yuboriladi.' },
  reading:   { page: 'reading.html',   title: 'Reading — Test 7',   text: '60 daqiqa. 5 ta part, 35 ta savol. Boshlaganingizda taymer ishga tushadi.' }
};

function showPart(key) {
  tabsEl.querySelectorAll('button').forEach(b =>
    b.classList.toggle('active', b.dataset.key === key));

  const r = READY[key];
  if (r) {
    partEl.innerHTML = '<div class="intro"><h3>' + r.title + '</h3>' +
      '<p>' + r.text + '</p>' +
      '<a class="btn" href="' + r.page + '">Imtihonni boshlash</a></div>';
    return;
  }

  partEl.innerHTML = '<div class="empty">' + MOCK[key].title +
    " savollari tez orada qo'shiladi.</div>";
}

keys.forEach(key => {
  const b = document.createElement('button');
  b.textContent = MOCK[key].title;
  b.dataset.key = key;
  b.addEventListener('click', () => showPart(key));
  tabsEl.appendChild(b);
});

showPart(keys[0]);
