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
let Dte =  null;
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
};


async function createCards(){
  Dte =Date.now()
  // console.log(Date.now())
  NotVisible(nocards)
  let card = document.createElement('div');
  card.className="card_flex flex-box";
  card.id = `${Date.now()}`;
 card.innerHTML = `
 <div class="card_text">
   <h1 id="card_title">Untitled Note</h2>
    <samp id="card_content">No Content</samp></div>
    <div id="card_date"></div>`
  await noteCardListContainer.appendChild(card);
  currentCard = card;
setActiveCard()
 createInputPannel();
   
}

inputPannel.addEventListener('input',(e) =>{
  currentTime = new Date().toLocaleTimeString();
  
  const cardTitle = currentCard.querySelector("#card_title");
  const cardContent = currentCard.querySelector("#card_content");
    inputPannel.querySelector('#timeView').textContent = null;
    inputPannel.querySelector('#timeView').textContent= `Time saved:${currentTime}`;

  if(e.target.id == "note-write-tittle")
   title = cardTitle.innerText = e.target.value.trim();
  else
    content = cardContent.textContent = e.target.value.trim();

 noteData = {
  id:Dte ,
  t:title,
  c:content,
  ts:currentTime,
  d:0,
  b:0
 }
 
});

function setActiveCard(){
currentCard.addEventListener('click',(e)=>{
  currentCardPannelView(e.target);
});
};

function currentCardPannelView(card){
 let cardTitle = card.querySelector("#card_title").textContent.trim() 
 let inputPannelTitle = inputTextCondiner.querySelector('#note-write-tittle');
  inputPannelTitle.value = cardTitle === 'Untitled Note'? "" : cardTitle;

}
   add_trash.addEventListener('click',()=>{
   noteData.d = 1;console.log(noteData.d)
  })
