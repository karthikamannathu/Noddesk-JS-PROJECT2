let addNoteBtn = document.querySelector("#add-notes-btn");
let noInput = document.querySelector(".placeholder");
let nocards =document.querySelector(".no-notes")
let inputPannel = document.querySelector(".notes-write-pannel");
let inputTextCondiner = document.querySelector(".input-condiner");
let noteCardListContainer = document.querySelector("#note-cards-list");
let add_trash = document.querySelector(".bi-trash3");
  let currentTime = null;

allNoteData= {};
let currentCard = null
let title = null;
let content = null;
let dte 
let noteData;
addNoteBtn.addEventListener("click",addNewNote);

function NotVisible(element){
element.style.display = "none";
}

function vissible(element){
  element.style.display = "block";
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
    inputPannel.querySelector('#timeView').innerText = `Last Time saved:${currentTime}`;}
     console.log(dte,"dte from creteinput")
};


async function createCards(){
  dte = Date.now();
  NotVisible(nocards)
  let card = document.createElement('div');
  card.className="card_flex flex-box";
 card.innerHTML = `
 <div class="card_text" id = "${dte}">
   <h1 id="card_title">Untitled Note</h2>
    <samp id="card_content">No Content</samp></div>
    <div id="card_date"></div>`
  await noteCardListContainer.appendChild(card);
  currentCard = card;
 setActiveCard()
 createInputPannel();
 console.log(dte,"create card")
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
 console.log(noteData)
 if(title === ''){
  console.error("title empty");
  
 }else cookiesSet(noteData)
 } catch (er) {
  console.error(er)
 } 
});

function setActiveCard(){
currentCard.addEventListener('click',(e)=>{
  noteData.id = e.target.id;
  currentCardPannelView(e.target);
  console.log(e.target.id);
  getTime(e.target.id)

  // console.log(noteData)
  // cookiesSet(n)
});
};

function currentCardPannelView(card){
 let cardTitle = card.querySelector("#card_title").textContent.trim()
 let cardContent = card.querySelector("#card_content").textContent.trim();
 let inputPannelTitle = inputTextCondiner.querySelector('#note-write-tittle');
 let inputPannelContent = inputTextCondiner.querySelector('#note-write-content');
  inputPannelTitle.value = cardTitle === 'Untitled Note'? "" : cardTitle;
  inputPannelContent.value = cardContent === 'No Content'? "": cardContent;
     inputPannel.querySelector('#timeView').textContent = null;
    
}
   add_trash.addEventListener('click',()=>{
   noteData.d = 1;console.log(noteData.d)
  })

  async function cookiesSet(notesData) {
   try {
     const exisitingCookie = await cookieStore.get(notesData.id);
    let note = [];
    if(exisitingCookie){
       let note = JSON.parse(atob(exisitingCookie.value));
       console.log("notes",exisitingCookie)
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
     console.log("exit cookies notes")
   } catch (err) {
    console.error(err)
   }
  }

 let getTime = async function cookieTime(id) {
  const exisitingCookie = await cookieStore.get(id);
    let note = [];
    if(exisitingCookie){
       let note = JSON.parse(atob(exisitingCookie.value));
       inputPannel.querySelector('#timeView').textContent= `Time saved:${note.ts}`}
      else {`Last Time saved:${currentTime}`} ;
      }
 
