

const addNotesBtn = document.querySelector('#add-notes-btn');
const toggleBtnMyNote = document.querySelector('#btn-notes');
const toggleBtnTrash = document.querySelector('#btn-trash');
const noNotesList = document.querySelector('.no-notes');
const noNotes = document.querySelector('.placeholder');
const cardList =document.querySelector('.list_cards')
const noteCardsLists = document.querySelector('#note-cards-list');
let noteWritePannel = document.querySelector('.notes-write-pannel');
let addTrashBtn = document.querySelector('.bi-trash3');
let headSectionRight = document.querySelector('.head_section_right');

let currentTime = null;
let currentCard = null;
let currentTrashCard = null;
const timeDiv = document.querySelector('.save-time');
let dateTimeSave  = new Date()
let dateData = dateTimeSave.toLocaleDateString('en-US',{
   month: 'short',
  day: 'numeric'
 });
let clickCount = 0;

toggle_my_note()

toggleBtnMyNote.addEventListener('click',toggle_my_note);
toggleBtnTrash.addEventListener('click',tashNote);




async function toggle_my_note(){
toggleBtnMyNote.classList.remove('in-active')
toggleBtnMyNote.classList.add('active');//toogle myNote buttun active
toggleBtnTrash.classList.remove('active')
toggleBtnTrash.classList.add('in-active')
noteCardsLists.style.display = 'block';
headSectionRight.style.display = 'flex';
localStorage.clear();

await addNotesBtn.addEventListener('click' ,addNote);

};


function addNote(){
try {

   create_note_Cards();
   create_note_write_pannel();
   saveTime();
   }
   
 catch (error) {
   console.log(error)
 }
};

// inputs pannel create
function create_note_write_pannel(){
    noNotes.style.display = 'none';

noteWritePannel.innerHTML =  `<input id ="note-write-tittle" placeholder = " Note Title" class="input-text"> 
                           <input id="note-write-content" placeholder ="  Start typing.." class="input-text">`; 
                             inputPassCard(noteWritePannel)//pannel input pass cards  
                                 timeDiv.innerHTML =`last save: never`  ;
                                 
                                  
}

// create new note card
function create_note_Cards(){
   noNotesList.style.display = 'none';//no-list-placeholder-div disable
   clickCount++;
let card = document.createElement('div');
card.className = 'note_cards';
card.id =`card${clickCount}`;
card.innerHTML = `<div class = "note_flex">
                   <div class = "text_container">
                   <h3 class = "note_card_title">Untitled Note</h3>
                   <p class = "note_card_content">No content</p>
                    </div>
                   <div id="date">${dateData} <div>
                  
                   </div>`;
 noteCardsLists.appendChild(card);
 currentCard = card;
 setActiveCard();
addTrashBtn.addEventListener('click',add_trash);

}

// writing inputs  at a time pass to the card

function inputPassCard(noteWritePannel){
    
  let inputTitle = noteWritePannel.querySelector('#note-write-tittle')
   
  inputTitle.addEventListener('input',(e) =>{
   currentTime = new Date().toLocaleTimeString();
   
    timeDiv.innerHTML = ` save:${currentTime}`//current time sets
  
   localStorage.setItem(`${currentCard.id}time`,JSON.stringify(currentTime)) //set time to localstorage.
 
  currentCard.querySelector('.note_card_title').textContent = e.target.value.trim();//tilte input pass to card title

  })

}


// card Selection 
function setActiveCard(){
 
currentCard.addEventListener('click', e => {
   currentCard = e.target
    // console.log(currentCard,"current card in  selected") 
  const inputPannel = noteWritePannel.querySelector('#note-write-tittle');
  const title = e.currentTarget.querySelector('.note_card_title').textContent;
  inputPannel.value = title === 'Untitled Note' ? '' : title;//selecetd card title pass the pannel title
 
  let timeGet = JSON.parse(localStorage.getItem(`${currentCard.id}time`))
//   console.log(currentCard.id,"timeGet")
  timeDiv.innerHTML = timeGet;

 

});
}



// Trash function start


function tashNote(){
  toggleBtnMyNote.classList.remove('active')
  toggleBtnMyNote.classList.add('in-active');//toogle Trash buttun active
  toggleBtnTrash.classList.remove('in-active')
  toggleBtnTrash.classList.add('active') 
noteCardsLists.style.display = 'none';
 


headSectionRight.style.display = 'none';
//  noNotes.style.display = 'flex';
//  add_trash_notes()
}

function saveTime() {
  if (!currentTime) {
    timeDiv.innerHTML = "Last saved: Never";
  } else {
   timeDiv.innerHTML = ` saved: ${currentTime}`;
  }
}

   
   
   
     



function add_trash(){
// console.log(currentCard,"clicked trash")
currentTrashCard = currentCard;// active card is store
 currentCard.remove();//active card in my-note is remove
 currentCard = noteCardsLists.lastElementChild;//assign , when the currentcard  is last created card



}
 



































































































































// let  cardList =''


//  toggleBtnMyNote.classList.add('active');
//       toggleBtnTrash.classList.add('in-active')

//  addNotes.addEventListener('click',addNotesfun)
//  toggleBtnMyNoteTrue()
//    async function  addNotesfun(){
//    try {
     

// noNotesList.style.display = 'none';
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

