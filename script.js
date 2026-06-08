

let addNoteBtn = document.querySelector("#add-notes-btn");
let noInput = document.querySelector(".placeholder");
let nocards =document.querySelector(".no-notes");
let inputPannel = document.querySelector(".notes-write-pannel");
let inputTextCondiner = document.querySelector(".input-condiner");
let add_trash = document.querySelector(".bi-trash3");
let add_bookmark = document.querySelector(".bi-bookmark");
let noteList = document.querySelector("#note-cards-list");
let trashList = document.querySelector("#trash-cards-list");
let toggleMyNotes = document.querySelector("#btn-notes");
let toggleMyTrash = document.querySelector("#btn-trash");
let coverDiv = document.querySelector(".input_cover");
let timeView = document.querySelector('.save-time');
let restoreDelBtn = document.querySelector('#btns');
let searchInput = document.querySelector('#search-input');
let searchBtn = document.querySelector('#search-btn-id');
let trashbookmarkIcon = document.querySelector('.icon');
let pannelHeadSection = document.querySelector(".head_section_right");
let cookiesStorageCount = document.querySelector("#storage_count");
let cookiesStorageGreen = document.querySelector(".greenbox");
let wordsView = document.querySelector(".words-view");

let currentTime = null;
let trashCard = null;
let currentCard = null
let title = null;
let content = null;
let dataId;
let cont = 0;
let noteData={};
let allListItems = []
  let currentDate = new Intl.DateTimeFormat('en-US',{ day:'numeric',month:'short'}).format(Date.now());

console.log(currentCard)
NotVisible(restoreDelBtn);
NotVisible(trashbookmarkIcon);
addNoteBtn.addEventListener("click",addNewNote);

toggleMyNotes.addEventListener('click',myNoteToggle);

toggleMyTrash.addEventListener('click',()=>{
 toggleViews(toggleMyTrash,toggleMyNotes,trashList,noteList);
  vissible(coverDiv,"flex")
NotVisible(pannelHeadSection);
console.log("current ",currentCard)
 NotVisible(trashbookmarkIcon)

});

 toggleViews(toggleMyNotes,toggleMyTrash,noteList,trashList)
 getTrashNote();
 
 function myNoteToggle(){
toggleViews(toggleMyNotes,toggleMyTrash,noteList,trashList);
    NotVisible(coverDiv);
 NotVisible(pannelHeadSection);
 NotVisible(restoreDelBtn);
currentCard = noteList.firstElementChild;
// currentCard.style.background = "aquamarine";
// scale: 1.03;
currentCardPannelView(currentCard);
if(!currentCard){
  createInputPannel()
}

 }
 
function NotVisible(element){
element.style.display = "none";
}
 
function vissible(element,style){
  if(element){
  element.style.display = style;}
}


function toggleViews(activeToggle,inActiveToggle,activeCardList,inActiveCardList){
activeToggle.classList.remove('in-active');
activeToggle.classList.add('active');
inActiveToggle.classList.remove('active');
inActiveToggle.classList.add('in-active');
vissible(activeCardList,"flex");
NotVisible(inActiveCardList);
if(activeCardList.firstElementChild != null){
 NotVisible(nocards); 
}else vissible(nocards,"block")
}
async function addNewNote() {
 NotVisible(noInput);
  myNoteToggle()
 vissible(pannelHeadSection,"flex")
 vissible(trashbookmarkIcon,"flex");

  createCards();
}

function createInputPannel(){
  NotVisible(noInput)
inputTextCondiner.innerHTML =`
        <input id ="note-write-tittle" 
        placeholder = " Note Title" class="input-text"> 
        <input id="note-write-content" 
        placeholder ="  Start typing.." class="input-text">`
        if(currentTime == null){
      timeView.textContent = 'Last saved:never';
        }else{
    timeView.textContent = null;
    timeView.innerText = ` saved:${currentTime}`;
  }
};

 function trashFun(){
 
};
async function createCards(e){
   NotVisible(nocards);
  dataId = Date.now();
    let card = await createcardsModel({dataId})
    
   await noteList.append(card);
   noteList.lastChild.classList.add('cards-hover-effect'); 
  currentCard = card;
 createInputPannel();
 

//  console.log(dataId,"create card")
}

inputPannel.addEventListener('input',async (e) =>{
 try {
  currentTime = new Date().toLocaleTimeString();
  const cardTitle = currentCard.querySelector("#card_title");
  const cardContent = currentCard.querySelector("#card_content");
 timeView.textContent ='';
  timeView.textContent= `saved:${currentTime}`;
  if(e.target.id == "note-write-tittle")
 {  title = cardTitle.textContent = e.target.value.trim(); }   
  else
    {
      content = cardContent.textContent = e.target.value.trim();}


 let wordsCount = (title || "").replace(/\s/g, "").length +
                   (content || "").replace(/\s/g, "").length;
                   wordsView.textContent = `${wordsCount} words`
 
 noteData =  {
  id:dataId,
  t:title || "Untitled Note" ,
  c:content || "No Content",
  ts:currentTime,
  d:0,
  b:0,
  md:currentDate
 }
 
 if(title === ''){
  console.error("title empty");
  
 }else cookiesSet(noteData);

   await cookieFlags();
 
 } catch (er) {
  console.error(er)
 } 
});

noteList.addEventListener('click',setActiveCard);
trashList.addEventListener('click',setActiveCard);

async function setActiveCard(e){
vissible(inputTextCondiner,'block')
  currentCard = e.target?.closest(".card_flex");
  
  noteData.id = e.target.id;
  let parent = currentCard?.parentElement;
  currentCardPannelView(e.target);
  let  getTime = await getObject(e.target.id,'ts');
 // set the timeView/
  timeView.textContent= '';
  // if card pass time check ------//
if(getTime == null){
   timeView.textContent = ` saved:${currentTime}`; 
}else  timeView.textContent = `saved:${getTime}`;
if(parent){
  vissible(pannelHeadSection,"flex")
  if(parent.id == "note-cards-list" ){
    vissible(trashbookmarkIcon,"flex");
    NotVisible(restoreDelBtn);
  }else{
    vissible(restoreDelBtn,"flex");
    NotVisible(trashbookmarkIcon);
    restoreDelBtn.addEventListener("click",(e)=>{
  console.log(e.target.className,"clicked..")
  if(e.target.className == 'restore btn'){
     noteData.d = 0;
 cookiesSet(noteData);
    noteList.appendChild(currentCard)
    currentCard = trashList.firstElementChild
    currentCardPannelView(currentCard)
  } else{
  alert("delete permently")
console.log(currentCard.querySelector('.card_text').id)
const cardId = currentCard.querySelector('.card_text')?.id
cookieStore.delete({name:cardId})
currentCard = '';
  }
})
  }
}
}
 


 function currentCardPannelView(card){

  if(card){
 let cardTitle = card.querySelector("#card_title").textContent.trim();
 let cardContent = card.querySelector("#card_content").textContent.trim();
 let inputPannelTitle = inputTextCondiner.querySelector('#note-write-tittle');
 let inputPannelContent = inputTextCondiner.querySelector('#note-write-content');
 if(!inputPannelTitle){
  createInputPannel();
 inputPannelTitle = inputTextCondiner.querySelector('#note-write-tittle');
  inputPannelContent = inputTextCondiner.querySelector('#note-write-content');
 }
  inputPannelTitle.value = cardTitle === 'Untitled Note'? "" : cardTitle;
  inputPannelContent.value = cardContent === 'No Content'? "": cardContent;
}
};

add_trash.addEventListener('click',async()=>{
  try{  
 let cardId = await currentCard.querySelector(".card_text").id
 noteData.id = cardId;
 noteData.d = 1;
 await cookiesSet(noteData);
 trashList.appendChild(currentCard);
 if(!noteList.lastElementChild){
 currentCard = noteList.lastElementChild;
 currentCardPannelView(currentCard);
}
}
 catch(err){
console.log(err)
 }
  });

add_bookmark.addEventListener('click',async(e)=>{
  
 let cardId = await currentCard.querySelector(".card_text").id
 console.log(currentCard.querySelector(".card_text").id)
 noteData.id = cardId;
 noteData.b = 1;
 await cookiesSet(noteData);
 e.target.classList.add("active-bookmark");
 currentCard.querySelector('#card_date').innerText ="";
 currentCard.querySelector('#card_date').insertAdjacentHTML("beforeend", `<i class="bi bi-pin" width=40px></i>`);
 console.log(currentCard)
});
  async function cookiesSet(notesData) {
 
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
      
      let trash = deleteNoteData.forEach(async(value)=>{
        let trashcreate = await createcardsModel({
        dataId:value.id,title:value.t,content:value.c,d:value.md})

       trashList.appendChild(trashcreate)})
    }
        else return null;
   } catch (error) {
    }
  }

function createcardsModel({
    dataId,
    title = "Untitled Note",
   content = "No Content",
    d = currentDate}){
 let card =  document.createElement('div');
  card.className = "card_flex flex-box";
 card.innerHTML = `
 <div class="card_text" id = "${dataId}">
   <h1 id="card_title">${title}</h2>
    <samp id="card_content">${content}</samp></div>
    <div id="card_date"style = "pointer-events:none">${d}</div>`
    return card
  }

 searchInput.addEventListener("input",(e)=>{
  const searchTerm = searchInput.value.trim().toLowerCase()
const data = document.querySelectorAll(".card_text");
 data.forEach((el) => {
  const card = el.closest(".card_flex");
  if (el.textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
    card.style.display = "";
  } else {
    card.style.display = "none";
  }
});
      
  })

async   function cookieFlags(){
   let datas = await cookieStore.getAll().length
let currentcookise =  document.cookie.length;
 let cookieSize = Math.round(datas = (await cookieStore.getAll()).length 
+(currentcookise)/1025);


 cookiesStorageCount.innerHTML = cookieSize
  // clear old green bar
 cookiesStorageGreen.innerHTML =''

  let colorDiv = document.createElement("div");
  colorDiv.style.width = cookieSize + "%";
  colorDiv.style.background = "green";
  colorDiv.style.height = "100%";
  cookiesStorageGreen.appendChild(colorDiv);
}
 
// words functions create and display change  // active cards foucuse styleing
