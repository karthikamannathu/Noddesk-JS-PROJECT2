

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


NotVisible(restoreDelBtn);
NotVisible(trashbookmarkIcon);

// ---toggle btn  funs----/

// 1.activeToggles set---
function toggleViews(activeToggle,inActiveToggle,activeCardList,inActiveCardList){
activeToggle.classList.remove('in-active');
activeToggle.classList.add('active');
inActiveToggle.classList.remove('active');
inActiveToggle.classList.add('in-active');
visible(activeCardList,"flex");
NotVisible(inActiveCardList);
if(activeCardList.firstElementChild != null){
 NotVisible(nocards); 
}else visible(nocards,"block")
}

toggleViews(toggleMyNotes,toggleMyTrash,noteList,trashList)//defualt mynotetoggle btn set


// 2.Toggle events
//mynote event-----
toggleMyNotes.addEventListener('click',myNoteToggle);

 function myNoteToggle(){
toggleViews(toggleMyNotes,toggleMyTrash,noteList,trashList);
    NotVisible(coverDiv);
inputTextCondiner.classList.remove('style-ponter');
 NotVisible(pannelHeadSection);
 NotVisible(restoreDelBtn);
currentCard = noteList.lastElementChild;
currentCardPannelView(currentCard);
if(!currentCard){
  createInputPannel()
}else{
  setActiveCard(currentCard)
}

 }
getTrashNote();//trash fun call global 
             //-----Trash event-----
toggleMyTrash.addEventListener('click',()=>{ 
 toggleViews(toggleMyTrash,toggleMyNotes,trashList,noteList);
visible(coverDiv,"flex");
NotVisible(pannelHeadSection);
// console.log("currentcard ",currentCard)
 NotVisible(trashbookmarkIcon)
 inputTextCondiner.classList.add('style-ponter')
 
 if(trashList.lastElementChild){
  setActiveCard(trashList.lastChild)
}
});


// --- New note creations-----//

//1. note add event----/
addNoteBtn.addEventListener("click",addNewNote);

async function addNewNote() {
 NotVisible(noInput);
  myNoteToggle()
visible(pannelHeadSection,"flex")
visible(trashbookmarkIcon,"flex");
  createCards();
}

// 2.create UI pannel New-----/
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
    timeView.innerText = `Last saved:${currentTime}`;
  }
};

//3.Create new note card---//
async function createCards(){
   NotVisible(nocards);
   
  dataId = Date.now();
    let card = await createcardsModel({dataId})
   await noteList.append(card);
   currentCard = card;
    
   setActiveCard(card)
   createInputPannel();

}

 //4.input pass event----//
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
      content = cardContent.textContent = e.target.value.trim();
    };


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
  dt:currentDate
 };
 
 if(title === ''){
  alert("enter title");
 } else cookiesSet(noteData);

   await cookieFlags();
 
 } catch (er) {
  console.error(er)
 } 
});

noteList.addEventListener('click',(e)=>setActiveCard(e.target));
trashList.addEventListener('click',(e)=>setActiveCard(e.target));



async function setActiveCard(card){
  add_bookmark.classList.remove("active-bookmark");
   document.querySelectorAll('.card_flex').forEach(el => {
    el.classList.add('cards-inactive');
    el.classList.remove('card-active');
  });
  // Add active class only to selected card
  card.classList.replace('cards-inactive','card-active');
  currentCard = card 
visible(inputTextCondiner,'block')
  noteData.id = currentCard.querySelector(".card_text").id;
  let  getTime = await getObject(currentCard.querySelector(".card_text").id,'ts');
 // set the timeView/
 console.log("getTime",getTime)
  timeView.textContent= '';
  currentTime = getTime;//  trash add time update
  // if card pass time check ------//
if(getTime == null){
    timeView.textContent = `Last saved:${currentTime}`;
}else {
   timeView.textContent = `saved:${getTime}`;}
currentCardPannelView(card);
//  console.log(currentCard.querySelector('.card_text'),"current")
if(card){
visible(pannelHeadSection,"flex")
// console.log(card.parentElement,"from set active")
  if(card?.parentElement.id == "note-cards-list" ){
  visible(trashbookmarkIcon,"flex");
    NotVisible(restoreDelBtn);
  }else{
    visible(restoreDelBtn,"flex");
    NotVisible(trashbookmarkIcon);

  }
}
}

 function currentCardPannelView(card){
   let inputPannelTitle = inputTextCondiner.querySelector('#note-write-tittle');
 let inputPannelContent = inputTextCondiner.querySelector('#note-write-content');
 if(!inputPannelTitle || !card){
  createInputPannel();
 inputPannelTitle = inputTextCondiner.querySelector('#note-write-tittle');
  inputPannelContent = inputTextCondiner.querySelector('#note-write-content');
 }
else{
  let cardTitle = card.querySelector("#card_title").textContent.trim();
 let cardContent = card.querySelector("#card_content").textContent.trim();



  inputPannelTitle.value = cardTitle === 'Untitled Note'? "" : cardTitle;
  inputPannelContent.value = cardContent === 'No Content'? "": cardContent;}

};

add_trash.addEventListener('click',async()=>{
  try{ 
    
 let cardId = await currentCard.querySelector(".card_text").id;
 let title = await currentCard.querySelector('#card_title').textContent;
 let content = await currentCard.querySelector('#card_content').textContent;
 noteData.id = cardId;
noteData.t=title || "Untitled Note" ,
noteData.c = content || "No Content",
  noteData.d = 1;
 noteData.ts = currentTime;
 console.log(noteData)
 await cookiesSet(noteData);
 trashList.appendChild(currentCard);
if(noteList.lastChild){
setActiveCard(noteList.lastElementChild);
 currentCardPannelView(noteList.lastElementChild);
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

    restoreDelBtn.addEventListener("click",(e)=> {
  console.log(e.target.className,"clicked..")
  if(e.target.className == 'restore btn'){
     noteData.d = 0;
 cookiesSet(noteData);
 console.log(currentCard,"current")
    noteList.appendChild(currentCard)
    currentCard = trashList.firstElementChild
    currentCardPannelView(currentCard)

  } else{
  alert("delete permently")
console.log(currentCard)
const cardId = currentCard.querySelector('.card_text')?.id
cookieStore.delete({name:cardId})
currentCard.remove ()
  }
})

 searchInput.addEventListener("input",(e)=>{
  const searchTerm = searchInput.value.trim().toLowerCase()
const data = document.querySelectorAll(".card_text");
 data.forEach((el) => {
  const card = el.closest(".card_flex");
  if (el.textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
    card.style.display = "";

    setActiveCard(card);
  } else {
    card.style.display = "none";
  }
});
      
  })

// ----Cookies set---//
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
    console.error(error)
    }
  }



  async function getTrashNote(){
    try {
      let getAllCookies = [] 
      getAllCookies = await cookieStore.getAll();
        if(getAllCookies){
      let data = getAllCookies.map(data=>JSON.parse(atob(data.value)));
        
      let deleteNoteData = data.filter(data=>data.d===1)
        console.log(data)
      let trash = deleteNoteData.forEach(async(value)=>{
        let trashcreate = await createcardsModel({
        dataId:value.id,title:value.t,content:value.c,date:value.dt})
      
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
    date }){
 let card =  document.createElement('div');
  card.className = "card_flex flex-box";
 card.innerHTML = `
 <div class="card_text" id = "${dataId}">
   <h1 id="card_title">${title}</h2>
    <samp id="card_content">${content}</samp></div>
    <div id="card_date"style = "pointer-events:none">${date}</div>`
   
    return card
  }



async   function cookieFlags(){  
let currentcookise = document.cookie.length;

 let cookieSize =(( currentcookise)/1024).toFixed(2);

 cookiesStorageCount.innerHTML = `${cookieSize}kb`
  // clear old green bar
 cookiesStorageGreen.innerHTML = ''

  let colorDiv = document.createElement("div");
   colorDiv.style.width = `${2+cookieSize}%`
  console.log( colorDiv.style.width," colorDiv.style.width")
  colorDiv.style.background = "green";
  colorDiv.style.height = "100%";
  cookiesStorageGreen.appendChild(colorDiv);
}
 
function dateSet(){

}

//---- vissibility functions-------

// notvisible---
function NotVisible(element){
element.style.display = "none";
}
 //visible fun---
function visible(element,style){
  if(element){
  element.style.display = style;}
}



// words functions create and display change  // active cards foucuse styleing
