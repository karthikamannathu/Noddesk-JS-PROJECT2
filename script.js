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


// varibles in global
let dateTimeSave = new Date();
let dateData = dateTimeSave.toLocaleDateString("en-US", {
  month: "short",
  day: "numeric",
});
let clickCount = 0;
let currentTime = null;
let currentCard = null;



// start Parogaram

toggleMyNoteDefault(); //Toggle MyNote button Default fun call
headSectionRight.style.display = "none";//Input pannel head section none
 
//  Events Actions

toggleBtnMyNote.addEventListener("click", toggleBtnMyNoteActive);
toggleBtnTrash.addEventListener("click", toggleBtnTrashActive);
addNotesBtn.addEventListener("click", addNewNotes);// New note add  event
addTrashBtn.addEventListener("click", add_trash);//Trash add event
addBookmarkBtn.addEventListener("click",async(e) =>{

  e.target.style.background = "yellow";
  let dateSelection = currentCard.querySelector('#date');
  let dateDiv = currentCard.querySelector('.note_flex');
//  console.log(pinIcon)
  dateSelection.style.display = 'none';
  dateDiv.innerHTML +=  `<i class="bi bi-pin"></i>`;
 let pinIcon = dateDiv.querySelector('.bi-pin')
  pinIcon.style.display = 'flex';
  pinIcon.style.background = 'yellow';
  
  
});//BookMark add event


    


// Toggle mynote btn defult set function
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


// MyNote Toggle button event function
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

  const title = Card.querySelector(".note_card_title").textContent.trim();
  console.log(title);

  // Title
  if (title === "Untitled Note") {
    inputPannelTitile.value = '';
    inputPannelTitile.placeholder = "Note Title";
  } else {
    inputPannelTitile.value = title;
  }

  // Content
  const content = Card.querySelector(".note_card_content").textContent.trim();

  if (content === "No content") {
    inputPannelContent.value = '';
    inputPannelContent.placeholder = "Start typing..";
  } else {
    inputPannelContent.value = content; // ✅ fixed
  }

}else{
 
   inputPannel.style.display = "none";
 }
}



// New note add
function addNewNotes() {
 headButton.style.display = 'none'
 addBookmarkBtn.style.background = "none";
Input_pannel();
create_note_Cards();
updateEmptyBlock(noteCardsLists);//update Empty block display none
   
}


// Notes Cards creations
 function create_note_Cards() {

  clickCount++;

  let card = create_cards_models({
    id: `card${clickCount}`,
    className: "note-card",
    dateData,
  });

  noteCardsLists.appendChild(card);//created card
  currentCard = card;
   
  setActiveCard();//set selected card 
 

}



// Set active card //
function setActiveCard() {
  currentCard.addEventListener("click", (e) => {
    currentCard = e.target; 
    pannelUI(currentCard)
  });
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

// set cookies

const saveAllNotesInCookie = async () => {
 

  let card = currentCard;
  let cardData = {
    title: card.querySelector(".note_card_title").textContent,
    content: card.querySelector(".note_card_content").textContent,
    timestamp: currentTime,
  };
 
  await cookieStore.set({
    name: card.id,
    value: encodeURIComponent(JSON.stringify(cardData)),
  });
};
async function getCookiesTime(card) {
  const cookie = await cookieStore.get(card.id);
  if (cookie) {
    const data = JSON.parse(decodeURIComponent(cookie.value));

    return data.timestamp;
  }
}

async function cookiesflg() {
  let cookieData = await cookieStore.getAll();
  let totalSize = cookieData.reduce((acc, cookies) => {
    return acc + cookies.value.length;
  }, 0);

  let totalKB = totalSize / 1024;

  cookiesStorageCount.innerHTML = `${totalKB.toFixed(2)}KB`;

  // clear old green bar
  cookiesStorageGreen.innerHTML = "";
  let colorDiv = document.createElement("div");
  cookiesStorageGreen.appendChild(colorDiv);

  let percentage = (totalKB / 4) * 100;
  colorDiv.style.width = percentage + "%";
  colorDiv.style.background = `green`;
  colorDiv.style.height = "auto";
}




// Trash start


function toggleBtnTrashActive() {
  try {
      toggleBtnMyNote.classList.replace("active", "in-active");
    toggleBtnTrash.classList.add("active");
    headSectionRight.style.display = "flex";
    noteCardsLists.style.display = "none";
    trashCardsList.style.display = "block";
     headButton.style.display = 'flex'
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

async function create_trash_cards() {
  let data = JSON.parse(localStorage.getItem(`trash`)) || []; //get the trash data
  console.log(data, "currentTrashCard");

  data.forEach((element) => {
    // console.log(element)
    let cards = create_cards_models({
      //create trash cards
      id: element.id,
      className: "trash-card",
      title: element.title,
      dateData: element.dateData,
    });
    trashCardsList.appendChild(cards);
    currentCard = cards;
    setActiveCard();
    
  });
}

//  add_trash() from create_note_Cards()
async function add_trash() {


let cardTitle = currentCard.querySelector(".note_card_title").textContent;
let cardContent = currentCard.querySelector(".note_card_content").textContent
console.log(cardContent !== 'No content' && cardTitle !== "Untitled Note" )
 if (cardContent !== 'No content' && cardTitle !== "Untitled Note"){
     await deleteCurrentCookie(currentCard.id);
     trashData = {
       id: currentCard.id,
       title: cardTitle, 
       content:cardContent ,
       dateData: currentCard.querySelector("#date").textContent,
     };
 
     // console.log(currentTrashCard.querySelector('.note_card_title').textContent);
     let existingTrash = JSON.parse(localStorage.getItem("trash"));
 
     // If it's not an array (null or an old object), initialize it as an empty array
     if (!Array.isArray(existingTrash)) {
       existingTrash = [];
     }
 
     // push the data // add data to same array
     existingTrash.push(trashData);
 
     // Save the full array back
     localStorage.setItem("trash", JSON.stringify(existingTrash));
 
     
 
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
  console.log(cardsData);
  await cookieStore.delete(cardsData);
}






// creating  cards models for  trashs /notes cards
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
  console.log(noInputs.style.display )
    const isNoteCardsListEmpty = cardList.firstChild !== null;
  noCards.style.display = isNoteCardsListEmpty ? 'none' : 'block';
  inputPannel.style.display = isNoteCardsListEmpty ? 'block' : 'none';
  noInputs.style.display = isNoteCardsListEmpty ? 'none' : 'block';
  headSectionRight.style.display = isNoteCardsListEmpty ? 'flex' : 'none';
  icons.style.display =  isNoteCardsListEmpty ? 'flex' : 'none';
}







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
