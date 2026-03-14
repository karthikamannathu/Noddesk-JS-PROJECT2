const toggleBtnMyNote = document.querySelector("#btn-notes");
const toggleBtnTrash = document.querySelector("#btn-trash");
const noteCardsLists = document.querySelector("#note-cards-list");
const noCards = document.querySelector(".no-notes");
const addNotesBtn = document.querySelector("#add-notes-btn");
const headSectionRight = document.querySelector(".head_section_right");
const noInputs = document.querySelector(".placeholder");
const inputPannel = document.querySelector("#inputs-condiner");
const noteWritePannel = document.querySelector(".notes-write-pannel");
const timeSave = document.querySelector(".save-time");
const cookiesStorageCount = document.querySelector("#storage_count");
const cookiesStorageGreen = document.querySelector(".greenbox");
const addTrashBtn = document.querySelector(".bi-trash3");
const addBookmarkBtn = document.querySelector('.bi-bookmark');
const trashCardsList = document.querySelector("#trash-cards-list");
const icons = document.querySelector('.icon');
const headButton = document.querySelector('.btn_flex');
const saveTime = document.querySelector('.save-time');
const inputPannelTitile = noteWritePannel.querySelector("#note-write-tittle");
const inputPannelContent = noteWritePannel.querySelector("#note-write-content");
const re_Store_Btn = document.querySelector('.restore') 


// varibles in global
let dateTimeSave = new Date();
let dateData = dateTimeSave.toLocaleDateString("en-US", {
  month: "short",
  day: "numeric",
});
let clickCount = 0;
let currentTime = null;
let currentCard = null;



// start Parogaram---------------------------------

toggleMyNoteDefault(); //Toggle MyNote button Default fun call
headSectionRight.style.display = "none";//Input pannel head section none
 
//  Events Actions//

toggleBtnMyNote.addEventListener("click", toggleBtnMyNoteActive);
toggleBtnTrash.addEventListener("click", toggleBtnTrashActive);
addNotesBtn.addEventListener("click", addNewNotes);// New note add  event
addTrashBtn.addEventListener("click", add_trash);//Trash add event
addBookmarkBtn.addEventListener("click", add_Bookmark);
re_Store_Btn.addEventListener("click",reStoreMyNote);


    


// Toggle mynote btn defult set function  //
async function toggleMyNoteDefault() {
  try {
    toggleBtnTrash.classList.replace("active", "in-active");
    toggleBtnMyNote.classList.add("active");
    noteCardsLists.style.display = "block";
    trashCardsList.style.display = "none";
      headButton.style.display = 'none'
      updateEmptyBlock(noteCardsLists);//set empty cards section blocks 
    
  } catch (error) {
    console.log(error);
  }
}


// MyNote Toggle button event function //
 async function toggleBtnMyNoteActive() {
try {
  
  currentCard = noteCardsLists.firstElementChild; //set first note card to selected currentCard 
   
  await toggleMyNoteDefault();

    // pannelUI();//Input pannel function call

} catch (error) {
  console.log(error)
  }
}



async function pannelUI(Card) {
  if (Card) {
    noInputs.style.display = "none";
    inputPannel.style.display = "block";
console.log(Card)
    // check if trash card
    if (Card.classList.contains("trash-card")) {
      headButton.style.display = "flex";
    } else {
      headButton.style.display = "none";
    }

    const title = Card.querySelector(".note_card_title").textContent.trim();

    // Title
    if (title === "Untitled Note") {
      inputPannelTitile.value = "";
      inputPannelTitile.placeholder = "Note Title";
    } else {
      inputPannelTitile.value = title;
    }

    const content = Card.querySelector(".note_card_content").textContent.trim();

    // Content
    if (content === "No content") {
      inputPannelContent.value = "";
      inputPannelContent.placeholder = "Start typing..";
    } else {
      inputPannelContent.value = content;
    }

  } else {
    inputPannel.style.display = "none";
  }
}



// New note add ------------- //
function addNewNotes() {
 headButton.style.display = 'none'
 addBookmarkBtn.style.background = "none";
Input_pannel();
create_note_Cards();
updateEmptyBlock(noteCardsLists);//update Empty block display none
   
}


// Notes Cards creations --------------//
 function create_note_Cards() {
  let card = create_cards_models({
    
    className: "note-card",
    dateData,
  });

  noteCardsLists.appendChild(card);//created card
  currentCard = card;
   
  setActiveCard();//set selected card 

}



// Set active card ------------------ //
function setActiveCard() {
 
currentCard.onclick = (e) => {
  const card = e.currentTarget;
  pannelUI(card);
};

}


// inputs pannel create
function Input_pannel() {
  headSectionRight.style.display = "flex";
 saveTime.style.display = "flex";
  
  if (!currentTime) {
    timeSave.innerHTML = `last save: never`;
  } else {
    ` saved  :${currentTime}`;
  }
  currentCard = noteCardsLists.firstElementChild;
  inputPassCard(inputPannel); //pannel input pass cards
}


//inputs pass to selected card
function inputPassCard(notePannel) {

  let  inputTitle = notePannel.querySelector("#note-write-tittle");
  let inputContent = notePannel.querySelector("#note-write-content");

  // clear previous passed  inputs
    inputTitle.value = '';
    inputContent.value = '';

   
  // Title inputs pass
  inputTitle.addEventListener("input", (e) => handleInput(e, "title"));
  // content inputs pass
  inputContent.addEventListener("input", async (e) =>
    handleInput(e, "content"),
  );
  
  const handleInput = async (e, type) => {
    currentTime = new Date().toLocaleTimeString();
    timeSave.innerHTML = ` saved  :${currentTime}`; //current time sets
    let value = await e.target.value.trim();
  
    if (type === "title") {
      currentCard.querySelector(".note_card_title").textContent =
        value || "Untitled Note"; //tilte input pass to card title
    } else {
      currentCard.querySelector(".note_card_content").textContent =
        value || "No content"; //tilte input pass to card title
    }
  
    await saveAllNotesInCookie(); //save All inputs notes in cookie

    cookiesflg();
   
  };

}// Mynote End

function add_bookmark(e){
  // let currentBookmarkIcon = event.target
  console.log(e.target)
}

//  cookies functions ----------------- //

const saveAllNotesInCookie = async () => {

  let card = currentCard;

  let cardData = {
    title: card.querySelector(".note_card_title").textContent,
    content: card.querySelector(".note_card_content").textContent,
    timestamp: currentTime,
  };

  let existingCookie = await cookieStore.get("notes");

  let notes = [];

  if (existingCookie) {
    notes = JSON.parse(atob(existingCookie.value));
  }

  notes.push(cardData);

  await cookieStore.set({
    name: "notes",
    value: btoa(JSON.stringify(notes))
  });

};

async function getCookiesTime(card) {
  const cookie = await cookieStore.get(card);
  if (cookie) {
    const data = JSON.parse(decodeURIComponent(cookie.value));

    return data.timestamp;
  }
};




// async function getCookiesSize() {

//   let cookies = await cookieStore.getAll();

//   let totalSize = 0;

//   cookies.forEach(c => {
//     let totalSize = JSON.parse(decodeURIComponent(c.value)).length
//      return totalSize;
//     // totalSize += new TextEncoder().encode(c.value).length;
//   });

//   // bytes
// }
async function cookiesflg() {
let cookie = await cookieStore.get("notes");

let size = 0;

if (cookie) {
  let decoded = JSON.parse(atob(cookie.value));
  size = new TextEncoder().encode(decoded).length;
  let sizeKB = (size / 1024).toFixed(2)
   cookiesStorageCount.innerHTML = sizeKB

  // clear old green bar
  cookiesStorageGreen.innerHTML = "";

  let colorDiv = document.createElement("div");
  cookiesStorageGreen.appendChild(colorDiv);

  // cookie max ≈ 4KB
  let percentage = (sizeKB / 4) * 100;

  colorDiv.style.width = percentage + "%";
  colorDiv.style.background = "green";
  colorDiv.style.height = "100%";
}

console.log((size / 1024).toFixed(2));
// if (cookie) {
//   let notes = JSON.parse(decodeURIComponent(cookie.value));
//   totalSize = notes.length;
// }
//   let sizeKB = (totalSize /1024)
// console.log((sizeKB).toFixed(2) )
  // cookies.forEach(c => {
  //   let cookieString = `${c.name}=${c.value}`;
  //   totalSize += new TextEncoder().encode(cookieString).length;
  // });

  // let totalKB = totalSize / 1024;

 
}




// Trash start ----------------     ////


function toggleBtnTrashActive() {
  try {
      toggleBtnMyNote.classList.replace("active", "in-active");
    toggleBtnTrash.classList.add("active");
    headSectionRight.style.display = "flex";
    noteCardsLists.style.display = "none";
    trashCardsList.style.display = "block";
   
    noInputs.style.display = "none";
    trashCardsList.innerHTML = "";
    inputPannel.style.display = "none";
    toggle_trash_note();
    updateEmptyBlock(trashCardsList);
    icons.style.display = 'none'
  } catch (error) {
    console.log(error);
  }
}




async function toggle_trash_note() {
  await create_trash_cards();
  currentCard = trashCardsList.firstElementChild; //set trash cards selected to first
  pannelUI();
 

}

 function create_trash_cards() {
  let data = JSON.parse(localStorage.getItem(`trash`)) || []; //get the trash data
  console.log(data, "currentTrashCard");

  data.forEach((element) => {
    // console.log(element)
    let cards = create_cards_models({
      //create trash cards
      id: element.id,
      className: "trash-card",
      title: element.title,
      content:element.content,
      dateData: element.dateData,
    });
    trashCardsList.appendChild(cards);
    currentCard = cards;
    
 setActiveCard();
 
   if( setActiveCard()){
   headButton.style.display = 'flex'
   }
    
    
  });
}

//  add_trash() from create_note_Cards() //
async function add_trash() {


let cardTitle = currentCard.querySelector(".note_card_title").textContent;
let cardContent = currentCard.querySelector(".note_card_content").textContent
console.log(cardContent !== 'No content' && cardTitle !== "Untitled Note" )
 if (cardContent !== 'No content' && cardTitle !== "Untitled Note"){
   clickCount++;
     await deleteCurrentCookie(currentCard);
     trashData = {
       id:  `card${clickCount}`,
       title: cardTitle, 
       content:cardContent ,
       dateData: currentCard.querySelector("#date").textContent,
     };
 
     try {
       let existingTrash = await JSON.parse(localStorage.getItem("trash"));
        if (!Array.isArray(existingTrash)) {
       existingTrash = [];//add new trash card then existingTarsh   will assign  empty array
     }
 
     // push the data // add data to same array
     existingTrash.push(trashData);
 
     // Save the full array back
     localStorage.setItem("trash", JSON.stringify(existingTrash));
 
     
      
     } catch (error) {
      console.log(error)
     }
 
     // If it's not an array (null or an old object), initialize it as an empty array
    
 
     currentCard.remove(); //active card in my-note is remove
      updateEmptyBlock(noteCardsLists)
     noInputs.style.display = "flex";
     inputPannel.style.display = "none";
     currentCard = "";
     currentCard = noteCardsLists.firstElementChild; //assign , when the currentcard  is last created card
     pannelUI();
   }
  
  else  {
  alert("You try to add an empty note!");
 }
 
 }

async function deleteCurrentCookie(cardsData) {
  console.log(cardsData,'cards data');
  await cookieStore.delete(cardsData);
}


function reStoreMyNote() {
  console.log(currentCard)
}



// creating  cards models for  trashs /notes cards //////
function create_cards_models({
  id,
  className,
  title = "Untitled Note",
  content = "No content",
  dateData,
}) {
  let card = document.createElement("div");
  if (id) card.id = id;
  card.className = className;
  card.innerHTML += `<div class = "note_flex">
                   <div class = "text_container">
                   <h3 class = "note_card_title">${title}</h3>
                   <p class = "note_card_content">${content}</p>
                    </div>
                   <div id="date">${dateData} <div>
                  
                   </div>`;
  return card;
}
function updateEmptyBlock(cardList) {
  
    const isNoteCardsListEmpty = cardList.firstChild !== null;
  noCards.style.display = isNoteCardsListEmpty ? 'none' : 'block';
  inputPannel.style.display = isNoteCardsListEmpty ? 'block' : 'none';
  noInputs.style.display = isNoteCardsListEmpty ? 'none' : 'block';
  headSectionRight.style.display = isNoteCardsListEmpty ? 'flex' : 'none';
  icons.style.display =  isNoteCardsListEmpty ? 'flex' : 'none';
}

function add_Bookmark(e) {
   if (e.currentTarget.style.background === "yellow") {
  e.currentTarget.style.background = "";
} else {
  e.currentTarget.style.background = "yellow";
}
   currentCard.classList.toggle("pinned");

  let dateSelection = currentCard.querySelector("#date");
  let dateDiv = currentCard.querySelector(".note_flex");

  let pinIcon = dateDiv.querySelector(".bi-pin");

  if (!pinIcon) {
    dateSelection.style.display = "none";

    dateDiv.insertAdjacentHTML("beforeend", `<i class="bi bi-pin"></i>`);
    pinIcon = dateDiv.querySelector(".bi-pin");

    pinIcon.style.display = "flex";
    
  } else {
    pinIcon.remove();
    dateSelection.style.display = "block";
  }
}


// reste the pannelUI setActive call


// 

// const cookies =  cookieStore.getAll() ;
// cookies.forEach(cookie  => {
//    cookieStore.delete(cookie.name)
// });

// const addNotesBtn = document.querySelector('#add-notes-btn');
// const toggleBtnMyNote = document.querySelector('#btn-notes');
// const toggleBtnTrash = document.querySelector('#btn-trash');
// const noNotes = document.querySelector('.no-notes');
// const noInputs = document.querySelector('.placeholder');
// const cardList =document.querySelector('.list_cards_section')
// const noteCardsLists = document.querySelector('#note-cards-list');
// const inputPannel = document.querySelector('#inputs-condiner');
// const noteWritePannel = document.querySelector('.notes-write-pannel');
// const addTrashBtn = document.querySelector('.bi-trash3');
// const addBookmarkBtn = document.querySelector('.bi-bookmark');
// const icons = document.querySelector('.icon');
// const  trashCardsList = document.querySelector('#trash-cards-list');
// const headSectionRight = document.querySelector('.head_section_right');
// const timeDiv = document.querySelector('.save-time');

//  let trashData = null;
// let currentTime = null;
// let currentCard = null;
// let currentTrashCard = null;
// let clickCount = 0;
// let dateTimeSave  = new Date()
// let dateData = dateTimeSave.toLocaleDateString('en-US',{
//    month: 'short',
//   day: 'numeric'
//  });

// toggle_my_note()

// toggleBtnMyNote.addEventListener('click',toggle_my_note);
// toggleBtnTrash.addEventListener('click',toggle_trash_note);

// noNotes.style.display = 'block';
// inputPannel.style.display ='none'

// async function toggle_my_note(){
// toggleBtnMyNote.classList.remove('in-active')
// toggleBtnMyNote.classList.add('active');//toogle myNote buttun active
// toggleBtnTrash.classList.remove('active');
// toggleBtnTrash.classList.add('in-active');

// trashCardsList.style.display = 'none';
// noteCardsLists.style.display = 'block';
// headSectionRight.style.display = 'none';

// noInputs.style.display = 'flex';
// sessionStorage.clear();
//   //  localStorage.clear();
// addNotesBtn.addEventListener('click' ,addNote);
// if (noteCardsLists.firstChild) {
//     create_note_write_pannel();
//      headSectionRight.style.display = 'flex';
//      currentCard  = noteCardsLists.firstChild
//     //  console.log(currentCard,"current card after")
//       const title = currentCard.querySelector('.note_card_title').textContent;
//       inputPannel.querySelector('#note-write-tittle').value =""
//       inputPannel.querySelector('#note-write-tittle').value = title === 'Untitled Note' ? '' : title;
// }

// };

// function addNote(){
// try {

//    create_note_Cards();
//  create_note_write_pannel();
//    saveTime();
//    }

//  catch (error) {
//    console.log(error)
//  }
// };

// // inputs pannel create
// function create_note_write_pannel(){
// noInputs.style.display ='none';
//  inputPannel.style.display ='block';
// inputPannel.innerHTML =  `<input id ="note-write-tittle" placeholder = " Note Title" class="input-text">
//                            <input id="note-write-content" placeholder ="  Start typing.." class="input-text">`;
//                              inputPassCard(inputPannel)//pannel input pass cards
//                                  timeDiv.innerHTML =`last save: never`;
// };

// // create new note card
// function create_note_Cards(){
//   headSectionRight.style.display = 'flex';
//    noNotes.style.display = 'none';//no-list-placeholder-div disable
//    clickCount++;
// let card = create_cards_models({
//   id :`card${clickCount}`,
//   className :'note-card',
//   dateData
// });
//  noteCardsLists.appendChild(card);
//  currentCard = card;
//  setActiveCard();
// addTrashBtn.addEventListener('click',add_trash);
// addBookmarkBtn.addEventListener('click',add_bookmark)

// };

// // writing inputs  at a time pass to the card

// function inputPassCard(notePannel){

//   let inputTitle = notePannel.querySelector('#note-write-tittle');
//   inputTitle.addEventListener('input',(e) =>{
//     currentTime = new Date().toLocaleTimeString();

//     timeDiv.innerHTML = ` save:${currentTime}`//current time sets

//     sessionStorage.setItem(`${currentCard.id}time`,JSON.stringify(currentTime)) //set time to localstorage.

//     // console.log(e.target.value.trim())
//     currentCard.querySelector('.note_card_title').textContent = e.target.value.trim();//tilte input pass to card title

//   })

// };

// // card Selection
// function setActiveCard(){

// currentCard.addEventListener('click', (e)=> {
//  noInputs.style.display = 'none';
//  inputPannel.style.display = 'block'
//    currentCard = e.target;
//     // console.log(currentCard,"current card in  selected")
//     //  inputPannel.style.display ='flex';
//   const inputPannelTitile = noteWritePannel.querySelector('#note-write-tittle');
//   const title = currentCard.querySelector('.note_card_title').textContent;
//  console.log(inputPannel,"inputPannel.value ")
//   inputPannelTitile.value = title === 'Untitled Note' ? '' : title;//selecetd card title pass the pannel title

//   let timeGet = JSON.parse(sessionStorage.getItem(`${currentCard.id}time`))
// //   console.log(currentCard.id,"timeGet")
//   timeDiv.innerHTML = timeGet ||'Never savetime';

// });
// };

// function saveTime() {
//   if (!currentTime) {
//     timeDiv.innerHTML = "Last saved: Never";
//   } else {
//    timeDiv.innerHTML = ` saved: ${currentTime}`;
//   }
// };

// // Trash function start

// function toggle_trash_note(){
//   toggleBtnMyNote.classList.remove('active')
//   toggleBtnMyNote.classList.add('in-active');//toogle Trash buttun active
//   toggleBtnTrash.classList.remove('in-active')
//   toggleBtnTrash.classList.add('active')
//   noteCardsLists.style.display ='none';
//   trashCardsList.style.display = 'block';
//   headSectionRight.style.display = 'none';
//  noInputs.style.display = 'flex';
//  trashCardsList.innerHTML = '';
//   // inputPannel.style.display ='none'
//   create_trash_cards();
// //  currentCard = trashCardsList.firstElementChild
//   // currentCard = trashCardsList;

// //  console.log(inputPannel)
//       //  const title = currentCard.querySelector('.note_card_title').textContent;
//       // inputPannel.querySelector('#note-write-tittle').value = title === 'Untitled Note' ? '' : title;

// };

// // add_trash() from create_note_Cards()
// async function add_trash(){
//   if (currentTime) {
// // console.log()
//   trashData = {
//       id :  currentCard.id,
//       title : currentCard.querySelector('.note_card_title').textContent,
//       dateData : currentCard.querySelector('#date').textContent
//      }

//     // console.log(currentTrashCard.querySelector('.note_card_title').textContent);
// let newNote = JSON.parse(localStorage.getItem(`trash`)) || []
//        newNote.push(trashData)
//       localStorage.setItem(`trash`,JSON.stringify(newNote));

//      noNotes.style.display = 'none';
//       // active card is store;

//    currentCard.remove();//active card in my-note is remove
//    noInputs.style.display = 'flex';
//    inputPannel.style.display = 'none';
//    currentCard = noteCardsLists.lastElementChild;   //assign , when the currentcard  is last created card

//   } else {
//     alert.error(" you try to add a empty note ! ")
//   }
// };

// async function create_trash_cards(){

//     data = JSON.parse(localStorage.getItem(`trash`)) || []//get the trash data
//   //  console.log(data,"currentTrashCard");

//   data.forEach(element => {

//   let cards = create_cards_models({
//     //create trash cards
//   id :element.id,
//   className:"trash-card",
//   title:element.title,
//  dateData: element.dateData

// })
// trashCardsList.appendChild(cards);
// currentCard = cards;
//  setActiveCard() ;

//  inputPannel.innerHTML =  `<input id ="note-write-tittle" class="input-text">
//                            <input id="note-write-content"  class="input-text">`;

//   });

// };

// function create_cards_models({
//   id,
//   className,
//    title = "Untitled Note",
//    content = "No content",
//     dateData
// })
//   {

//     let card = document.createElement('div');
//      if(id) card.id = id

// card.className = className;
// card.innerHTML += `<div class = "note_flex">
//                    <div class = "text_container">
//                    <h3 class = "note_card_title">${title}</h3>
//                    <p class = "note_card_content">${content}</p>
//                     </div>
//                    <div id="date">${dateData} <div>
//                    </div>`;
//     return card

//   };

// function add_bookmark(){

// }

// let  cardList =''

//  toggleBtnMyNote.classList.add('active');
//       toggleBtnTrash.classList.add('in-active')

//  addNotes.addEventListener('click',addNotesfun)
//  toggleBtnMyNoteTrue()
//    async function  addNotesfun(){
//    try {

// noNotes.style.display = 'none';
// noNotes.style.display = 'none';
// rightWriteNote.style.display = 'block';

// noteWrite.innerHTML =  `<input id ="note-write-tittle" placeholder = " Note Title" class="input-text">
//                        <input id="note-write-content" placeholder ="  Start typing.." class="input-text">`;
// // note left cards creation

// let cards = document.createElement('div');
// cards.className = 'note-cards';

// cards.innerHTML = `<h3 class = "note-card-title">Untiled Note</h3>
//                    <p class = "note-card-content">No content</p>`;
//  let currentCard = await noteCardsLists.appendChild(cards);

// const noteTitle = noteWrite.querySelector('#note-write-tittle');
// const noteContent = noteWrite.querySelector('#note-write-content');

// noteTitle.addEventListener('input', (event) => {
//    // cards Title textContent edit
// currentCard.querySelector('.note-card-title').textContent = event.target.value;
// });

// noteContent.addEventListener('input', (event) => {
//     // cards Content textContent edit
//    currentCard.querySelector(".note-card-content").textContent = event.target.value;
// });

//    } catch (error) {
//     console.log(error)
//    }
// };

//  function trashCards(list){
//   console.log(list)
// let carditems =  Array.from(list.querySelectorAll('.note-cards'));
// let listCard = carditems;
// console.log(listCard.forEach(item =>item.addEventListener('click',() => console.log(item))))
// // noteCardsLists.addEventListener('click',(e)=>console.log("clicked"))
// };

//  let card = cardList.querySelectorAll('.note-cards');
//  let list = Array.from(card);
//   console.log(list.map(element => element.addEventListener("click",(e)=>console.log(`element is${element.childElementCount}`,e.target))))

// toggleBtnTrash.addEventListener('click',(e) =>{
//   toggleBtnMyNote.classList.remove('active');
//   toggleBtnTrash.classList.add('active') ;
//  noteCardsLists.style.display = 'none';

// })

// toggleBtnMyNote.addEventListener('click',toggleBtnMyNoteTrue)

// trashCards(noteCardsLists)

// function toggleBtnMyNoteTrue(){
//      toggleBtnTrash.classList.remove('active');
//   toggleBtnMyNote.classList.add('active') ;
//    noteCardsLists.style.display = 'block';

// }
