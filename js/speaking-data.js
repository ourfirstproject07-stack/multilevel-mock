/* SPEAKING SAVOLLARI. Yangi test qo'shish: SPEAKING_TESTS massiviga yangi {title, parts} qo'shing.
   Rasm qo'yish: pics ichida {src:"../img/sp1-a.jpg", alt:"tavsif"}; src bo'sh bo'lsa alt matn ko'rsatiladi. */
const SPEAKING_CONFIG = {
  lang: "en-US",
  aiEndpoint: ""   // ixtiyoriy: AI tahlil qiluvchi server manzili (README/javobga qarang). Bo'sh bo'lsa ishlatilmaydi.
};
// prep = tayyorlanish (soniya), ans = javob berish (soniya). Imtihon qoidasiga qarab o'zgartiring.
const TIMING = {
  "1.1": { prep: 3,  ans: 30 },   // No preparation (3 soniya savolni o'qish uchun)
  "1.2": { prep: 3,  ans: 30 },   // No preparation
  "2":   { prep: 60, ans: 120 },  // 1 minute preparation, 2 minutes
  "3":   { prep: 60, ans: 120 }   // 1 minute preparation, 2 minutes
};
// Mikrofonni tekshirish savoli (baholanmaydi, Telegramga yuborilmaydi)
const MIC_CHECK = { q: "Tell me about yourself.", ans: 25 };
/* ===== IMTIHON SAVOLLARI (test) =====
   Namunaviy javoblar (B2/C1) bo'limidagi savollar boshqa: ular pastdagi SPEAKING_SAMPLES da. */
const SPEAKING_TESTS = [{
  title: "Speaking — Test 1",
  parts: {
    "1.1": { info: "Part 1.1 — Answer the questions. (30 seconds each, no preparation)", items: [
      { q: "Do you work or are you a student?" },
      { q: "Describe your hometown." },
      { q: "Where do you go in your free time?" }
    ]},
    "1.2": { info: "Part 1.2 — Look at the pictures and answer the questions. (30 seconds each, no preparation)",
      pics: [{ src: "../img/sp-1-2-a.jpg", alt: "Picture 1: a man driving a car." }, { src: "../img/sp-1-2-b.jpg", alt: "Picture 2: people travelling on a crowded bus." }],
      items: [
      { q: "Describe these images." },
      { q: "What are some of the advantages of driving a car?" },
      { q: "Why do some people prefer to use public transportation?" }
    ]},
    "2": { info: "Part 2 — You have 1 minute to prepare and 2 minutes to speak.",
      pics: [{ src: "../img/sp-2.jpg", alt: "Picture: a man sitting at a laptop and thinking." }],
      items: [
      { q: "Questions:\n1. Describe a time when you faced a challenge.\n2. How did this challenge impact your life?\n3. Do you think challenges are important for humans?" }
    ]},
    "3": { info: "Part 3 — Discuss the statement. You have 1 minute to prepare and 2 minutes to speak.",
      items: [
      { q: "Humans have no moral right to do experiments on animals.\n\nFor:\n- Animals are a form of life.\n- Using them is unethical.\n- Animals are also a part of society.\n\nAgainst:\n- It is better to experiment on them.\n- Humanity cannot be checked on these tests.\n- Using them is more efficient and affordable." }
    ]}
  }
}];

/* ===== NAMUNAVIY JAVOBLAR (B2 / C1) — imtihon savollaridan alohida ===== */
const SPEAKING_SAMPLES = [{
  title: "Speaking — Test 1",
  parts: {
    "1.1": { info: "Part 1.1 — Answer the questions.", items: [
      { q: "Tell me about your hometown. What do you like about living there?",
        b2: "I come from Tashkent, which is the capital of Uzbekistan. What I like most is that there is always something to do, from visiting museums to meeting friends in parks. Also, public transport is quite convenient, so getting around is easy. The only drawback is that it can be crowded and noisy at rush hour.",
        c1: "I was born and raised in Tashkent, a city that blends modern life with a rich history. What appeals to me most is its energy: there's always something going on, whether it's a concert or a new cafe opening. Admittedly, the traffic can be exhausting, but the sense of community more than makes up for it." },
      { q: "What do you usually do in your free time?",
        b2: "In my free time I enjoy reading novels and watching films in English because it helps me improve my language. At weekends I usually meet my friends and we play football or go for a walk. Sometimes I just relax at home, especially after a busy week.",
        c1: "Whenever I have spare time, I try to unwind by reading or exercising. Lately I've taken up running, which clears my head after a demanding week. On weekends I like catching up with friends over dinner, as it's a great way to recharge." },
      { q: "What was the last film or series you watched, and did you enjoy it?",
        b2: "Recently I watched a series about space exploration. I really enjoyed it because the story was exciting and the visual effects were impressive. It also taught me some interesting facts about science, so I would definitely recommend it to my friends.",
        c1: "I recently finished a documentary series about space exploration, and I found it absolutely captivating. Not only were the visuals stunning, but it also made me reflect on how small our planet is. I'd certainly recommend it to anyone with even a passing interest in science." }
    ]},
    "1.2": { info: "Part 1.2 — Look at the two pictures and answer the questions.",
      pics: [{ src: "", alt: "Picture 1: a student studying alone in a quiet library." }, { src: "", alt: "Picture 2: a group of students working together around a table in a classroom." }],
      items: [
      { q: "Please describe the two pictures.",
        b2: "In the first picture, a young man is studying alone in a library. It looks quiet and he seems concentrated on his book. In the second picture, there is a group of students sitting around a table. They are talking and sharing ideas, and they look cheerful. The main difference is that one person works independently, while the others cooperate.",
        c1: "The first picture shows a student immersed in his books in what appears to be a peaceful library, whereas the second depicts a lively group discussing something around a table. The contrast is striking: the former suggests solitary concentration, the latter collaboration and an exchange of ideas." },
      { q: "What are the advantages of studying in each situation?",
        b2: "Studying alone helps you concentrate because nobody distracts you, and you can study at your own pace. On the other hand, studying in a group is useful because you can ask questions, learn from others' ideas, and stay motivated. Both ways have clear benefits.",
        c1: "Working alone allows for deep focus and the freedom to set your own pace. Group study, in contrast, exposes you to different perspectives and lets you clarify doubts immediately. Each approach therefore serves a different purpose, depending on the task at hand." },
      { q: "Which way of studying do you think is more effective for learning a language, and why?",
        b2: "I believe studying with others is more effective for learning a language, because you need to speak to improve. When you practise with classmates, you can correct each other's mistakes and gain confidence. However, I also think self-study is important for vocabulary and grammar.",
        c1: "In my view, learning a language is inherently social, so group study has the edge: speaking practice and instant feedback are hard to replicate alone. That said, the best results come from combining it with individual revision, particularly for vocabulary and grammar." }
    ]},
    "2": { info: "Part 2 — Talk about the topic. You have 1 minute to prepare and 2 minutes to speak.",
      pics: [{ src: "", alt: "Picture: a teenager with headphones using a language-learning app on a phone." }],
      items: [
      { q: "Talk about the importance of learning foreign languages. In your talk, mention: why people learn foreign languages; how technology helps language learning; what problems learners face.",
        b2: "Learning foreign languages is very important nowadays. Firstly, people learn languages to find better jobs, study abroad, or communicate with people from other countries. Knowing English, for example, opens many doors in business and science. Secondly, technology has made learning much easier. There are apps, online courses, and videos that allow us to study anywhere, as shown in the picture. We can listen to native speakers and practise every day. However, learners also face problems. Many people lack motivation, or they are afraid of making mistakes, so they do not speak enough. Others find grammar and pronunciation difficult. In my opinion, the best solution is to practise regularly and not to be afraid of mistakes. To sum up, languages are a valuable skill, and with today's technology everyone has the chance to learn.",
        c1: "In an increasingly globalised world, mastering foreign languages has become far more than a pleasant hobby. People learn them for a range of reasons: to advance their careers, to study abroad, or simply to understand other cultures from the inside. Technology has transformed this process. As the picture shows, a learner can now practise anywhere with an app, listen to authentic speech, and receive instant feedback, which was unthinkable a generation ago. Nevertheless, challenges remain. Many learners struggle to stay motivated once the initial enthusiasm fades, and fear of making mistakes often prevents them from speaking, which is precisely what they need to do most. Pronunciation and idiomatic expression also take years to refine. In my view, consistency matters more than intensity: a little practice every day, combined with real conversation, will always outperform occasional marathon sessions. Ultimately, a new language gives you a new way of thinking." }
    ]},
    "3": { info: "Part 3 — Discuss the statement. Give arguments for and against. You have 1 minute to prepare and 2 minutes to speak.",
      items: [
      { q: "Some people think that working from home is better than working in an office. Give arguments for and against this statement.",
        b2: "Many people believe that working from home is better, and there are good reasons for this. Firstly, you save time and money because you do not need to travel to work. Secondly, you can organise your day more flexibly and spend more time with your family. However, there are also disadvantages. Working alone can feel lonely, and it is sometimes difficult to separate work from private life. Also, in an office it is easier to communicate with colleagues and solve problems quickly. In my opinion, the best option is a mixture of both, for example two or three days at home and the rest in the office. This way, people enjoy flexibility but still keep contact with their team.",
        c1: "Proponents of remote work point out, quite rightly, that it eliminates tiring commutes and gives employees greater control over their schedules, which often boosts both productivity and well-being. Moreover, companies can save considerably on office costs. Yet the picture is not entirely rosy. Working from home can lead to isolation, and the line between professional and private life tends to blur, making burnout more likely. Furthermore, spontaneous collaboration, which often sparks the best ideas, is hard to replicate through a screen. On balance, I would argue that a hybrid model offers the best of both worlds: it preserves flexibility while maintaining the human connection that teams need to thrive." }
    ]}
  }
}];
