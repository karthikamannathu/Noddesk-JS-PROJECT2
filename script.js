let addNoteBtn = document.querySelector("#add-notes-btn");
let noInput = document.querySelector(".placeholder");
let nocards =document.querySelector(".no-notes")
let inputPannel = document.querySelector(".notes-write-pannel");
let inputTextCondiner = document.querySelector(".input-condiner");
let add_trash = document.querySelector(".bi-trash3");
let noteList = document.querySelector("#note-cards-list");
let trashList = document.querySelector("#trash-cards-list");
let toggleMyNotes = document.querySelector("#btn-notes");
let toggleMyTrash = document.querySelector("#btn-trash");

  let currentTime = null;
let trashCard = null;
let currentCard = null
let title = null;
let content = null;
let dte 
let noteData={};


addNoteBtn.addEventListener("click",addNewNote);
toggleMyNotes.addEventListener('click',()=>{toggleViews(toggleMyNotes,toggleMyTrash,noteList,trashList)});
toggleMyTrash.addEventListener('click',() =>{toggleViews(toggleMyTrash,toggleMyNotes,trashList,noteList)});
 toggleViews(toggleMyNotes,toggleMyTrash,noteList,trashList)
 getTrashNote();
function NotVisible(element){
element.style.display = "none";
}
 
function vissible(element){
  element.style.display = "block";
}

function toggleViews(activeToggle,inActiveToggle,activeCardList,inActiveCardList){
activeToggle.classList.remove('in-active');
activeToggle.classList.add('active');
inActiveToggle.classList.remove('active');
inActiveToggle.classList.add('in-active');
vissible(activeCardList);
NotVisible(inActiveCardList);
console.log(activeCardList.lastElementChild,"activeCardList.lastElementChild")
if(activeCardList.firstElementChild != null){
 NotVisible(nocards); 
}else vissible(nocards)
}

async function addNewNote() {
 NotVisible(noInput)
  createCards()
}

function createInputPannel(){
inputTextCondiner.innerHTML =`<div id ="timeView" >Time saved:never</div>
        <input id ="note-write-tittle" 
        placeholder = " Note Title" class="input-text"> 
        <input id="note-write-content" 
        placeholder ="  Start typing.." class="input-text">`
        if(currentTime == null){
       inputPannel.querySelector('#timeView').textContent = 'Last Time saved:never';
        }else{
    inputPannel.querySelector('#timeView').textContent = null;
    inputPannel.querySelector('#timeView').innerText = `Last Time saved:${currentTime}`;
  }
};


async function createCards(){
   NotVisible(nocards);
  dte = Date.now();
  let card = await createcardsModel({dte,
title:"Untitled Note",
content:"No Content",
  })
  console.log(card)
  await noteList.appendChild(card);
  currentCard = card;
 createInputPannel();
//  console.log(dte,"create card")
}

inputPannel.addEventListener('input',(e) =>{
 try {
  currentTime = new Date().toLocaleTimeString();
  const cardTitle = currentCard.querySelector("#card_title");
  const cardContent = currentCard.querySelector("#card_content");
    inputPannel.querySelector('#timeView').textContent = null;
    inputPannel.querySelector('#timeView').textContent= `Time saved:${currentTime}`;
// console.log()
  if(e.target.id == "note-write-tittle")
   title = cardTitle.innerText = e.target.value.trim();
  else
    content = cardContent.textContent = e.target.value.trim();

 noteData =  {
  id:dte,
  t:title,
  c:content,
  ts:currentTime,
  d:0,
  b:0
 }
//  console.log(noteData)
 if(title === ''){
  console.error("title empty");
  
 }else cookiesSet(noteData)
 } catch (er) {
  console.error(er)
 } 
});

noteList.addEventListener('click',setActiveCard);
trashList.addEventListener('click',setActiveCard);


async function setActiveCard(e){
  console.log(e.target,"cardsss")
  currentCard = e.target;
  noteData.id = e.target.id;
  currentCardPannelView(e.target);
 let  getTime = await getObject(e.target.id,'ts');
  inputPannel.querySelector('#timeView').textContent = null;
if(getTime == null){
    inputPannel.querySelector('#timeView').textContent= `Last Time saved:${currentTime}`; 
}else  inputPannel.querySelector('#timeView').textContent = `Time saved:${getTime}`;
};

function currentCardPannelView(card){
  if(card!=null){
 let cardTitle = card.querySelector("#card_title").textContent.trim()
 let cardContent = card.querySelector("#card_content").textContent.trim();
 let inputPannelTitle = inputTextCondiner.querySelector('#note-write-tittle');
 let inputPannelContent = inputTextCondiner.querySelector('#note-write-content');
  inputPannelTitle.value = cardTitle === 'Untitled Note'? "" : cardTitle;
  inputPannelContent.value = cardContent === 'No Content'? "": cardContent;
     inputPannel.querySelector('#timeView').textContent = null;}
    
}

add_trash.addEventListener('click',async()=>{
  try{ 
 let cardId =currentCard.id
 noteData.id === cardId;
 noteData.d = 1;
 cookiesSet(noteData);
 trashList.appendChild(currentCard)
 currentCard = noteList.lastElementChild;
 currentCardPannelView(currentCard);
}
 catch(err){
console.log(err)
 }
  })

  async function cookiesSet(notesData) {
   try {
     const exisitingCookie = await cookieStore.get(notesData.id);
    let note = [];
    if(exisitingCookie){
       let note = JSON.parse(atob(exisitingCookie.value));
       note.t = notesData.t;
       note.c = notesData.c;
       note.ts = notesData.ts;
       note.d = notesData.d;
       note.b = notesData.b;
       await cookieStore.set({
        name:notesData.id,
        value:btoa(JSON.stringify(note)),
        expires:Date.now() + 1000 * 60 * 60 *24 *7
       }); 
    }else{
     cookieStore.set({
        name:notesData.id,
        value:btoa(JSON.stringify(notesData)),
        expires:Date.now() + 1000 * 60 * 60 * 24 *7
       });   
    } 
   } catch (err) {
    console.error(err)
   }
  }

 let getObject = async function cookieObject(id,obt) {
  const exisitingCookie = await cookieStore.get(id);
    let note = [];
   try {
    if(exisitingCookie){
       let note = JSON.parse(atob(exisitingCookie.value));
       return note[obt];}
        else return null;
   } catch (error) {
    }
  }

  async function getTrashNote(){
    try {
      let getAllCookies = [] 
      getAllCookies = await cookieStore.getAll();
        if(getAllCookies){
       let data = getAllCookies.map(data=>JSON.parse(atob(data.value)));
        
       let deleteNoteData = data.filter(data=>data.d===1)
      // console.log()
       let trash = deleteNoteData.forEach(async(el)=>{let trashcreate = await createcardsModel({dte:el.id, title:el.t, content:el.c})
      console.log(trashcreate);
     trashList.appendChild(trashcreate)})
     console.log(trash)
     }
        else return null;
   } catch (error) {
    }
  }

function createcardsModel({
    dte,
    title,
    content,
    time}){
 let card =  document.createElement('div');
  card.className = "card_flex flex-box";
 card.innerHTML = `
 <div class="card_text" id = "${dte}">
   <h1 id="card_title">${title}</h2>
    <samp id="card_content">${content}</samp></div>
    <div id="card_date"></div>`
    return card
  }
  // set active card is cureent card and set trash cards
// twomarrow tras update check