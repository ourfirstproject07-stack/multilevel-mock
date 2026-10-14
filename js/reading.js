// READING (Test 7): savollar, javoblar kaliti, taymer va baholash
const $=id=>document.getElementById(id);
const LET="ABCDEFGHIJK";

/* ===== JAVOBLAR KALITI ===== */
const KEY={
1:"notes",2:"pitch",3:"musical",4:"musicians",5:"absolute",6:"talent",
7:"D",8:"G",9:"B",10:"E",11:"C",12:"A",13:"H",14:"I",
15:"D",16:"H",17:"I",18:"F",19:"K",20:"A",
21:"D",22:"B",23:"C",24:"B",25:"D",26:"A",27:"B",28:"B",29:"C",
30:"hundred",31:"pedals",32:"toys",33:"overseas",34:"hollow steel tubes",35:"axle"};

/* ===== BALL TIZIMI (partlar bo'yicha): a..b savollar, w = bitta savol bali ===== */
// Ball jadvali 100 ballikdan 75 ballik shkalaga o'tkazilgan (x 0.75). Jami = 75
const PARTS=[{n:1,w:1.5,a:1,b:6},{n:2,w:1.5,a:7,b:14},{n:3,w:2.25,a:15,b:20},{n:4,w:2.25,a:21,b:29},{n:5,w:3.375,a:30,b:35}];
const TIME_SEC=60*60;

const CAFES={A:"Macs",B:"BurgerBasement",C:"Pancake Paradise",D:"SunshineCafé",E:"GreenDreams",F:"Quick&Cool",G:"Tilly’s Tea-Shop",H:"Giovanni’s",I:"Take a Tumble",J:"Pasta della Piazza",K:"The Noodle Bar"};
const HEADS={A:"Growing Coffee",B:"Problems with Manufacture",C:"Processing the Bean",D:"First Contact",E:"Arabian Coffee",F:"Coffee Varieties",G:"Modern Coffee",H:"The Spread of Coffee",I:"Consuming Coffee",J:"Climates for Coffee",K:"The Coffee Plant"};
const TFNG={A:"True",B:"False",C:"Not Given"};

/* ===== PART 1 ===== */
const T1=[
`The uncanny, if sometimes distracting, ability to name a solitary note out of the blue, without any other {1} for reference, is a prized musical talent - and a scientific mystery. Musicians with perfect pitch - or, as many researchers prefer to call it, absolute {2} - can often play pieces by ear, and many can transcribe music brilliantly. That’s because they perceive the position of a note in the {3} stave - its pitch - as clearly as the fact that they heard it. Hearing and naming the pitch go hand in hand.`,
`By contrast, most {4} follow not the notes, but the relationship between them. They may easily recognise two notes as being a certain number of tones apart, but could name the higher note as an E only if they are told the lower one is a C, for example. This is relative pitch. Useful, but much less mysterious.`,
`For centuries, absolute pitch has been thought of as the preserve of the musical elite. Some estimates suggest that maybe fewer than 1 in 2,000 people possess it. But a growing number of studies, from speech experiments to brain scans, are now suggesting that a knack for {5} pitch may be far more common, and more varied, than previously thought. ‘Absolute pitch is not an all or nothing feature,’ says Marvin, a music theorist at the University of Rochester in New York state. Some researchers even claim that we could all develop the skill, regardless of our musical {6}. And their work may finally settle a decades-old debate about whether absolute pitch depends on melodious genes - or early music lessons.`];

/* ===== PART 2 ===== */
const S2=[
[7,`You have just started college. You need a good café near campus where you can hang out with your friends. You’ll be spending a lot of time in the library, so you want a café with a nice terrace. It must be inexpensive and serve great sandwiches.`],
[8,`You are 14. On Saturdays, you have to wait an hour for a train home after your violin lesson. You want to spend that time in a quiet café close to the station where you can read your book while enjoying tea and delicious cake.`],
[9,`Karl and Omar are best friends. They’re trying to find a new café that they can go to after school every day. They want a place with a good atmosphere. They both enjoy loud music! They also like cheap fast-food.`],
[10,`You are a fan of healthy food. You don’t eat meat, and don’t mind paying a little more for organic fruit and vegetables. You want to find an independent café near the beach. You don’t like restaurant chains.`],
[11,`Linda and Amelia are cousins. They’re looking for a great café where they can meet every Sunday for a chat. They love to eat sweet things! Linda and Amelia are both very stylish, so they want a place that’s really cool.`],
[12,`You have an hour to wait before your train leaves. You would like somewhere that serves quality, fast food. You need somewhere you can get to the station quickly.`],
[13,`Jon and his wife Debbie are celebrating their 20th wedding anniversary and would like to have a nice romantic meal somewhere not too busy. They love going on holiday to Italy.`],
[14,`Marie and her husband Harry want to take their young son for a meal. It would be good if there was something for him to do as he has a lot of energy!`]];
const R2={
A:`I went to Macs, just opposite the entrance to the station last night. My friends had the fried chicken and I had pizza. We were all really happy with our meal. The food was at our table in ten minutes and it tasted great.`,
B:`Although it’s in a basement, this brilliant café is bright and exciting. Lights of many different colours hang from the ceiling, and everyone sings along with the pop and rock songs. It’s not a quiet place, but it’s fun. You won’t believe the low cost of the chips and burgers!`,
C:`The latest café in town is Pancake Paradise, and everyone is talking about it. This is where all the fashionable people like to be seen, and to see each other. Enjoy the original art on the walls while you wait for your tasty pile of pancakes served with ice cream or honey.`,
D:`This is a wonderful new café which, so far, is very popular with young people. It’s just a short walk from the college and others a wide choice of soups and sandwiches at very reasonable prices. The best thing about the Sunshine Café is its outdoor seating area. Here you can have some fun in the sun.`,
E:`Everything served in this busy seaside café is vegetarian and all natural. Try the carrot and spinach juice with one of the amazing salads. The prices are high, but definitely worth it. Green Dreams is owned and run by a local family who make everything fresh daily.`,
F:`As the name suggests, this is where you should come if you want quick food in a cool place. Quick & Cool only opens at the weekends, but it fills up fast so get there early! Enjoy hip hop on the loud speakers and order some spicy chicken wings. You won’t wait long at Quick&Cool!`,
G:`This is the perfect place to get away from the noise of the city. It’s conveniently located between the museum and the railway station, and serves the best baked goods in town. They play gentle classical music there. You can choose from 20 types of tea and relax.`,
H:`This place is hidden away on the back streets of town. A tiny place with only five or six candlelit tables but with a wonderful atmosphere. Italian music plays softly in the background making you feel as if you’ve been transported to Florence or Rome.`,
I:`We had our grandchildren for the day and were lucky enough to find the new ‘Take aTumble’ in town. Lots of activities for young children who can climb, slide or swim. They serve simple, cheap lunches that saved us the bother of finding somewhere else to eat.`,
J:`Whether it’s a romantic meal for two or a memorable night with friends, Pasta della Piazza is the place to go. We enjoyed a fantastic night out with lovely Italian food and sang along and danced thanks to their regular pianist. You need to reserve to be sure of a table.`,
K:`This is what fast food should be like. From delicious Japanese soups to hot Thai main meals. Eat in or takeaway. They’re very popular with locals and if you’re eating at a table it can take a while to get served. They charge 10% delivery for takeaways.`};

/* ===== PART 3 ===== */
const P3=[
`Coffee was first discovered in Eastern Africa in an area we know today as Ethiopia. A popular legend refers to a goat herder by the name of Kaldi, who observed his goats acting unusually friskily after eating berries from a bush. Curious about this phenomenon, Kaldi tried eating the berries himself. He found that these berries gave him renewed energy.`,
`The news of this energy laden fruit quickly moved throughout the region. Coffee berries were transported from Ethiopia to the Arabian Peninsula, and were first cultivated in what today is the country of Yemen. Coffee remained a secret in Arabia before spreading to Turkey and then to the European continent by means of Venetian trade merchants.`,
`Coffee was first eaten as a food though later people in Arabia would make a drink out of boiling the beans for its narcotic effects and medicinal value. Coffee for a time was known as Arabian wine to Muslims who were banned from alcohol by Islam. It was not until after coffee had been eaten as a food product, a wine and a medicine that it was discovered, probably by complete accident in Turkey, that by roasting the beans a delicious drink could be made. The roasted beans were first crushed and then boiled in water, creating a crude version of the beverage we enjoy today. The first coffee houses were opened in Europe in the 17th Century and in 1675, the Viennese established the habit of refining the brew by filtering out the grounds, sweetening it, and adding a dash of milk.`,
`If you were to explore the planet for coffee, you would find about 60 species of coffee plants growing wild in Africa, Malaysia, and other regions. But only about ten of them are actually cultivated. Of these ten, two species are responsible for almost all the coffee produced in the world: Coffea Arabica and CoffeaCanephora (usually known as Robusta). Because of ecological differences existing among the various coffee producing countries, both types have undergone many mutations and now exist in many sub-species.`,
`Although wild plants can reach 10 - 12 metres in height, the plantation one reaches a height of around four metres. This makes the harvest and flowering easier, and cultivation more economical. The flowers are white and sweet-scented like the Spanish jasmine. Flowers give way to a red, darkish berry. At first sight, the fruit is like a big cherry both in size and in colour. The berry is coated with a thin, red film (epicarp) containing a white, sugary mucilaginous flesh (mesocarp). Inside the pulp there are the seeds in the form of two beans coupled at their flat surface. Beans are in turn coated with a kind of resistant, golden yellow parchment, (called endocarp). When peeled, the real bean appears with another very thin silvery film. The bean is bluish green verging on bronze, and is at the most 11 millimetres long and 8 millimetres wide.`,
`Coffee plants need special conditions to give a satisfactory crop. The climate needs to be hot-wet or hot temperate, between the Tropic of Cancer and the Tropic of Capricorn, with frequent rains and temperatures varying from 15 to 25 Degrees C. The soil should be deep, hard, permeable, well irrigated, with well-drained subsoil. The best lands are the hilly ones or from just-tilled woods. The perfect altitude is between 600 and 1200 metres, though some varieties thrive at 2000-2200 metres. Cultivation aimed at protecting the plants at every stage of growth is needed. Sowing should be in sheltered nurseries from which, after about six months, the seedlings should be moved to plantations in the rainy season where they are usually alternated with other plants to shield them from wind and excessive sunlight. Only when the plant is five years old can it be counted upon to give a regular yield. This is between 400 grams and two kilos of arabica beans for each plant, and 600 grams and two kilos for robusta beans.`];

/* ===== PART 4 ===== */
const A4=[
`I peer over his shoulder at his laptop screen to see the math problem the fifth-grader is pondering. It's a trigonometry problem. Carpenter, a serious-feced ten-year-old, pauses for a second, fidgets, then clicks on “0 degrees.” The computer tells him that he's correct. “It took a while for me to work it out,” he admits sheepishly. The software then generates another problem, followed by another, until eventually he's done ten in a row.`,
`Last November, his teacher, Kami Thordarson, began using Khan Academy in her class. It is an educational website on which students can watch some 2,400 videos. The videos are anything but sophisticated. At seven to 14 minutes long, they consist of a voiceover by the site's founder, Salman Khan, chattily describing a mathematical concept or explaining how to solve a problem, while his hand-scribbled formulas and diagrams appear on-screen. As a student, you can review a video as many times as you want, scrolling back several times over puzzling parts and fast-forwarding through the boring bits you already know. Once you've mastered a video, you can move on to the next one.`,
`Initially, Thordarson thought Khan Academy would merely be a helpful supplement to her normal instruction. But it quickly became far more than that. She is now on her way to “flipping” the way her class works. This involves replacing some of her lectures with Khan's videos, which students can watch at home. Then in class, they focus on working on the problem areas together. The idea is to invert the normal rhythms of school, so that lectures are viewed in the children's own time and homework is done at school. It sounds weird, Thordarson admits, but this reversal makes sense when you think about it. It is when they are doing homework that students are really grappling with a subject and are most likely to want someone to talk to. And Khan Academy provides teachers with a dashboard application that lets them see the instant a student gets stuck.`,
`For years, teachers like Thordarson have complained about the frustrations of teaching to the “middle” of the class. They stand at the whiteboard trying to get 25 or more students to learn at the same pace. Advanced students get bored and tune out, lagging ones get lost and tune out, and pretty soon half the class is not paying attention. Since the rise of personal computers in the 1980s, educators have hoped that technology could save the day by offering lessons tailored to each child. Schools have spent millions of dollars on sophisticated classroom technology, but the effort has been in vain. The one-to-one instruction it requires is, after all, prohibitively expensive. What country can afford such a luxury?`,
`Khan never intended to overhaul the school curricula and he doesn't have a consistent, comprehensive plan for doing so. Nevertheless, some of his fans believe that he has stumbled onto the solution to education's middle-of-the-class mediocrity. Most notable among them is Bill Gates, whose foundation has invested $1.5 million in Khan's site. Students have pointed out that Khan is particularly good at explaining all the hidden, small steps in math problems—steps that teachers often gloss over. He has an uncanny ability to inhabit the mind of someone who doesn't already understand something.`,
`However, not all educators are enamoured with Khan and his site. Gary Stager, a longtime educational consultant and advocate of laptops in classrooms,, thinks Khan Academy is not innovative at all. The videos and software modules, he contends, are just a high-tech version of the outdated teaching techniques—lecturing and drilling. Schools have become “joyless test-prep factories,” he says, and Khan Academy caters to this dismal trend.`,
`As Sylvia Martinez, president of an organization focusing on technology in the classroom, puts it, “The things they're doing are really just rote.” Flipping the classroom isn't an entirely new idea, Martinez says, and she doubts that it would work for the majority of pupils: “I'm sorry, but if they can't understand the lecture in a classroom, they're not going to grasp it better when it's done through a video at home.”`,
`Another limitation of Khan's site is that the drilling software can only handle questions where the answers are unambiguously right or wrong, like math or chemistry; Khan has relatively few videos on messier, grey-area subjects like history. Khan and Gates admit there is no easy way to automate the teaching of writing—even though it is just as critical as math.`,
`Even if Khan is truly liberating students to advance at their own pace, it is not clear that schools will be able to cope. The very concept of grade levels implies groups of students moving along together at an even pace. So what happens when, using Khan Academy, you wind up with a ten-year- old who has already mastered high-school physics? Khan's programmer, Ben Kamens, has heard from teachers who have seen Khan Academy presentations and loved the idea but wondered whether they could modify it “to stop students from becoming this advanced.”`,
`Khan's success has injected him into the heated wars over school reform. Reformers today, by and large, believe student success should be carefully tested, with teachers and principals receiving better pay if their students advance more quickly. In essence, Khan doesn't want to change the way institutions teach; he wants to change how people learn, whether they're in a private school or a public school—or for that matter, whether they're a student or an adult trying to self-educate in Ohio, Brazil, Russia, or India. One member of Khan's staff is spearheading a drive to translate the videos into ten major languages. It's classic start-up logic: do something novel, do it with speed, and the people who love it will find you.`];
const Q4=[
[21,`What do you learn about the student in the first paragraph?`,[`He has not used the maths software before.`,`He did not expect his answer to the problem to be correct.`,`He was not initially doing the right maths problem.`,`He did not immediately know how to solve the maths problem.`]],
[22,`What does the writer say about the content of the Khan Academy videos?`,[`They have been produced in a professional manner.`,`They include a mix of verbal and visual features.`,`Some of the maths problems are too easy.`,`Some of the explanations are too brief.`]],
[23,`What does this reversal refer to in line 40?`,[`going back to spending fewer hours in school`,`students being asked to explain answers to teachers`,`swapping the activities done in the class and at home`,`the sudden improvement in students’ maths performance`]],
[24,`What does the writer say about teaching to the ‘middle’ of the class?`,[`Teachers become too concerned about weaker students.`,`Technology has not until now provided a solution to the problem.`,`Educators have been unwilling to deal with the issues.`,`Students in this category quickly become bored.`]],
[25,`Students praise Khan’s videos because they`,[`show the extent of his mathematical knowledge.`,`deal with a huge range of maths problems.`,`provide teaching at different ability levels.`,`cover details that are often omitted in class.`]]];
const TF4=[
[26,`Thordarson's first impressions of how she would use Khan Academy turned out to be wrong.`],
[27,`Khan wished to completely change the way courses are taught in schools.`],
[28,`School grade levels are based on the idea of students progressing at different rates.`],
[29,`Some principals have invited Khan into their schools to address students.`]];

/* ===== PART 5 ===== */
const A5=[
`The bicycle was not invented by one individual or in one country. It took nearly 100 years and many individuals for the modern bicycle to be born. By the end of those 100 years, bicycles had revolutionized the way people travel from place to place.`,
`Bicycles first appeared in Scotland in the early 1800s, and were called velocipedes. These early bicycles had two wheels, but they had no pedals. The rider sat on a pillow and walked his feet along the ground to move his velocipede forward.`,
`Soon a French inventor added pedals to the front wheel. Instead of walking their vehicles, riders used their feet to run the pedals. However, pedaling was hard because velocipedes were very heavy. The framework was made of solid steel tubes and the wooden wheels were covered with steel. Even so, velocipedes were popular among rich young men, who raced them in Paris parks.`,
`Because of the velocipedes were so hard to ride, no one thought about using them for transportation. People didn’t ride velocipedes to the market or to their jobs. Instead, people thought velocipedes were just toys.`,
`Around 1870, American manufacturers saw that velocipedes were very popular overseas. They began building velocipedes, too, but with one difference. They made the frameworks from hollow steel tubes. This alteration made velocipedes much lighter, but riders still had to work hard to pedal just a short distance. In addition, roads were bumpy so steering was difficult. In fact, most riders preferred indoor tracks where they could rent a velocipede for a small fee and take riding lessons.`,
`Subsequent changes by British engineers altered the wheels to make pedaling more efficient. They saw that when a rider turned the pedals once, the front wheel turned once. If the front wheel was small, the bicycle traveled just a small distance with each turn. They reasoned that if the front wheel were larger, the bicycle would travel a greater distance. So they designed a bicycle with a giant front wheel. They made the rear wheel small. Its primary purpose was to help the rider balance. Balancing was hard because the rider had to sit high above the giant front wheel in order to reach the pedals.`,
`This meant he was in danger of falling off the bicycle and injuring himself if he lost his balance. Despite this inherent danger, “high wheelers” became very popular in England.`,
`American manufacturers once again tried to design a better bicycle. Their goal was to make a safer bicycle. They substituted a small wheel for the giant front wheel and put the driving mechanism in a r larger rear to wheel. It would be impossible for a rider to pedal the rear wheel, so engineers designed a system of foot levers. By pressing first the right one and then the left, the rider moved a long metal bar up and down. This bar turned the rear axle1. This axle turned the rear wheel and the bicycle minimized the dangers inherent in bicycle riding, more and more people began using bicycles in their daily activities.`,
`The British altered the design one last time. They made the two wheels equal in size and created a mechanism that uses a chain to turn the rear wheel. With this final change, the modern bicycle was born.`,
`Subsequent improvements, such as brakes, rubber tires, and lights were added to make bicycles more comfortable to ride. By 1900, bicycle riding had become very popular with men and women of all ages. Bicycles revolutionized the way people worldwide ride bicycles for transportation, enjoyment, sport, and exercise.`];
const T5=`In the invention of the bicycle took part not only one individual or the country, but the world in general during the {30} years. This invention was firstly found in Scotland in the first decades of 1800, and was known as velocipedes. They were not resembled to today’s bicycles and had two wheels, but they had no {31}. The rider sat on a pillow and walked his feet along the ground in order to move his velocipede forward. Soon, a French inventor added pedals to the front wheel. However, because of their difficulty in riding, nobody used them in a daily life, and they were accepted as {32}. Around 1870, manufacturers in America found that this invention is popular {33}, but within the difference: frameworks were made from {34}, what makes them much lighter. Soon, the British inventors found the method which can make pedaling more efficient- to turn pedals one by one. They designed a bicycle with a giant front wheel. However, as the rider had to sit high above the giant front wheel it was too difficult to keep the balance. The safer bicycle was invented by Americans. They designed the rear {35}, which minimized the danger of falling and injuring. At last, the British changed the design one last time and added two wheels equal in size and the mechanism that induce a chain to turn the rear wheel. By this there was invented the example of the modern bicycle.`;

/* ===== QURILISH ===== */
let QS=[],done=false,endAt=0,tick=null;
const inp=n=>`<input type="text" data-n="${n}" aria-label="Savol ${n}" autocomplete="off" autocapitalize="off" spellcheck="false">`;
const sel=n=>`<select data-n="${n}" aria-label="Savol ${n}"><option value="">—</option>${LET.split("").map(c=>`<option>${c}</option>`).join("")}</select>`;
const radios=(n,items)=>items.map(([v,t])=>`<label class="opt"><input type="radio" name="q${n}" data-n="${n}" value="${v}">${t}</label>`).join("");
function gap(n){QS.push(n);return `<span class="gap" id="r${n}"><b class="gn">${n}</b>${inp(n)}<span class="fb"></span></span>`}
const fill=t=>t.replace(/\{(\d+)\}/g,(m,n)=>gap(+n));
function qrow(n,html){QS.push(n);return `<div class="q" id="r${n}"><b class="num">${n}.</b>${html}<span class="fb"></span></div>`}

function build(){QS=[];let h="";
// Part 1
h+=`<div class="part"><h2>Part 1</h2><p class="ins">Read the text. Fill in each gap with ONE word. You must use a word which is somewhere in the rest of the text.</p><div class="pass">${T1.map(p=>`<p>${fill(p)}</p>`).join("")}</div></div>`;
// Part 2
h+=`<div class="part"><h2>Part 2 — Questions 7–14</h2><p class="ins">The people below all want to go to a restaurant or café. There are some restaurant reviews. Decide which restaurant or café would be the most suitable for the people below.</p>`;
h+=S2.map(([n,t])=>qrow(n,`${t} ${sel(n)}`)).join("");
h+=`<div class="box" style="margin-top:18px"><h3>OUR TOP CAFÉS</h3>${Object.keys(R2).map(k=>`<p class="cafe"><b>${k}. ${CAFES[k]}</b><br>${R2[k]}</p>`).join("")}</div></div>`;
// Part 3
h+=`<div class="part"><h2>Part 3 — Questions 15–20</h2><p class="ins">Read the text and choose the correct heading for each paragraph from the list of headings below. There are more headings than paragraphs, so you will not use all of them. You cannot use any heading more than once.</p><div class="box"><h3>List of headings</h3>${Object.keys(HEADS).map(k=>`${k}. ${HEADS[k]}`).join("<br>")}</div>`;
h+=P3.map((t,i)=>qrow(15+i,`Paragraph ${i+1} ${sel(15+i)}<p class="ptext">${t}</p>`)).join("")+`</div>`;
// Part 4
h+=`<div class="part"><h2>Part 4 — Questions 21–29</h2><p class="ins">Read the following text for questions 21–29.</p><p><b>The new way to be a fifth-grader</b></p><div class="pass">${A4.map(p=>`<p>${p}</p>`).join("")}</div>`;
h+=`<p class="ins" style="margin-top:14px"><b>Questions 21–25</b> — Choose the correct letter, A, B, C or D.</p>`;
h+=Q4.map(([n,q,o])=>qrow(n,`<b>${q}</b>`+radios(n,o.map((x,i)=>["ABCD"[i],`${"ABCD"[i]}. ${x}`])))).join("");
h+=`<p class="ins" style="margin-top:14px"><b>Questions 26–29</b> — Do the following statements agree with the claims of the writer in the reading passage?</p>`;
h+=TF4.map(([n,q])=>qrow(n,`<b>${q}</b>`+radios(n,[["A","A) True"],["B","B) False"],["C","C) Not Given"]]))).join("")+`</div>`;
// Part 5
h+=`<div class="part"><h2>Part 5 — Questions 30–35</h2><p class="ins">The History of Bicycles</p><div class="pass">${A5.map(p=>`<p>${p}</p>`).join("")}</div><p class="ins" style="margin-top:14px"><b>Questions 30–35</b> — Complete the sentences. Choose NO MORE THAN THREE WORDS from the passage for each answer.</p><div class="pass"><p>${fill(T5)}</p></div></div>`;
QS.sort((a,b)=>a-b);$("parts").innerHTML=h}

/* ===== JAVOBLAR ===== */
const norm=s=>String(s).toLowerCase().replace(/\s+/g," ").trim();
function val(n){const e=document.querySelector(`[data-n="${n}"]`);if(!e)return"";if(e.type==="radio"){const c=document.querySelector(`input[name="q${n}"]:checked`);return c?c.value:""}return e.value.trim()}
function disp(n){const k=KEY[n];
if(n>=7&&n<=14)return `${k} — ${CAFES[k]}`;
if(n>=15&&n<=20)return `${k} — ${HEADS[k]}`;
if(n>=26&&n<=29)return `${k}) ${TFNG[k]}`;
return k}
const answered=()=>QS.filter(n=>val(n)!=="").length;
function updateBtn(){const all=answered()===QS.length;$("fin").classList.toggle("on",all);$("fin").setAttribute("aria-disabled",all?"false":"true");if(all)$("warn").textContent=""}
document.addEventListener("input",()=>{if(!done)updateBtn()});
document.addEventListener("change",()=>{if(!done)updateBtn()});

function tryFinish(){if(done)return;
const left=QS.length-answered();
if(left>0){$("warn").textContent=`Test yakunlanmagan. Javob berilmagan savollar: ${left} ta.`;return}
finish(false)}

const fmt=x=>(Math.round(x*100)/100).toString();
const level=t=>t>=65?"C1":t>=51?"B2":t>=38?"B1":"B1 dan past";

function finish(timeUp){if(done)return;done=true;clearInterval(tick);$("warn").textContent="";
const ok={};
QS.forEach(n=>{const u=val(n);const good=norm(u)===norm(KEY[n]);ok[n]=good;
const row=$("r"+n),fb=row.querySelector(".fb");
row.classList.add(good?"ok":"no");
if(row.querySelector('input[type="radio"]')){
  row.querySelectorAll(".opt").forEach(l=>{const v=l.querySelector("input").value;
    if(v===u)l.classList.add(good?"ok":"no")})}
fb.className="fb "+(good?"good":"wrong");
fb.textContent=good?"✓ To'g'ri":`✗ Sizniki: ${u||"—"} · To'g'ri javob: ${disp(n)}`});
document.querySelectorAll("input,select").forEach(e=>e.disabled=true);
$("fin").style.display="none";
let total=0,rows="";
PARTS.forEach(p=>{let c=0,cnt=p.b-p.a+1;for(let n=p.a;n<=p.b;n++)if(ok[n])c++;
const pts=c*p.w;total+=pts;
rows+=`<tr><td>Part ${p.n}</td><td>${c} / ${cnt}</td><td>${fmt(pts)} / ${fmt(cnt*p.w)}</td></tr>`});
const r=$("res");r.style.display="block";
r.innerHTML=`${timeUp?`<p class="wrong" style="margin:0 0 10px;font-family:'Trebuchet MS',sans-serif"><b>Vaqt tugadi.</b> Javob berilmaganlar xato hisoblandi.</p>`:""}
<p class="big">Natija: ${fmt(total)} / 75 · <span class="lv">${level(total)}</span></p>
<table><tr><th>Part</th><th>To'g'ri</th><th>Ball</th></tr>${rows}<tr><th>Jami</th><th>${Object.values(ok).filter(Boolean).length} / ${QS.length}</th><th>${fmt(total)} / 75</th></tr></table>
<p class="na" style="font-family:'Trebuchet MS',sans-serif;font-size:14px;margin:6px 0 14px">Daraja: B1 — 38–50, B2 — 51–64, C1 — 65–75 ball. Baho 75 ballik shkalada.</p>
<button class="btn" onclick="location.reload()">Qayta boshlash</button>`;
r.scrollIntoView({behavior:"smooth"})}

/* ===== TAYMER (60 daqiqa) ===== */
function paint(){const left=Math.max(0,Math.round((endAt-Date.now())/1000));
const m=String(Math.floor(left/60)).padStart(2,"0"),s=String(left%60).padStart(2,"0");
$("timer").textContent=`${m}:${s}`;
$("timerbar").classList.toggle("low",left<=300);
if(left<=0)finish(true)}
function startTimer(){endAt=Date.now()+TIME_SEC*1000;paint();tick=setInterval(paint,500)}

function goHome(){location.href="mock.html"}
build();startTimer();
