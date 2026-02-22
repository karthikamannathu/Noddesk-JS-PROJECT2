

const addNotesBtn = document.querySelector('#add-notes-btn');
const toggleBtnMyNote = document.querySelector('#btn-notes');
const toggleBtnTrash = document.querySelector('#btn-trash');
const noNotes = document.querySelector('.no-notes');
const noInputs = document.querySelector('.placeholder');
const cardList =document.querySelector('.list_cards')
const noteCardsLists = document.querySelector('#note-cards-list');
const inputPannel = document.querySelector('#inputs-condiner');
const noteWritePannel = document.querySelector('.notes-write-pannel');
const addTrashBtn = document.querySelector('.bi-trash3');
const addBookmarkBtn = document.querySelector('.bi-bookmark');
const icons = document.querySelector('.icon');
const  trashCardsList = document.querySelector('#trash-cards-list');
const headSectionRight = document.querySelector('.head_section_right');
const timeDiv = document.querySelector('.save-time');


 let trashData = null;
let currentTime = null;
let currentCard = null;
let currentTrashCard = null;
let clickCount = 0;
let dateTimeSave  = new Date()
let dateData = dateTimeSave.toLocaleDateString('en-US',{
   month: 'short',
  day: 'numeric'
 });


toggle_my_note()


toggleBtnMyNote.addEventListener('click',toggle_my_note);
toggleBtnTrash.addEventListener('click',toggle_trash_note);

noNotes.style.display = 'block';


async function toggle_my_note(){
toggleBtnMyNote.classList.remove('in-active')
toggleBtnMyNote.classList.add('active');//toogle myNote buttun active
toggleBtnTrash.classList.remove('active')
toggleBtnTrash.classList.add('in-active')
trashCardsList.style.display = 'none';
noteCardsLists.style.display = 'block';
headSectionRight.style.display = 'none';

noInputs.style.display = 'flex';
sessionStorage.clear();
  //  localStorage.clear();
addNotesBtn.addEventListener('click' ,addNote);
if (currentCard) {
    create_note_write_pannel();
     headSectionRight.style.display = 'flex';
    
     currentCard  = noteCardsLists.firstChild
    //  console.log(currentCard,"current card after")
      const title = currentCard.querySelector('.note_card_title').textContent;
      inputPannel.querySelector('#note-write-tittle').value = title === 'Untitled Note' ? '' : title;
} 

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
noInputs.style.display ='none'
inputPannel.innerHTML =  `<input id ="note-write-tittle" placeholder = " Note Title" class="input-text"> 
                           <input id="note-write-content" placeholder ="  Start typing.." class="input-text">`; 
                             inputPassCard(inputPannel)//pannel input pass cards  
                                 timeDiv.innerHTML =`last save: never`;
};

// create new note card
function create_note_Cards(){
  headSectionRight.style.display = 'flex';
   noNotes.style.display = 'none';//no-list-placeholder-div disable
   clickCount++;
let card = create_cards_models({
  id :`card${clickCount}`,
  className :'note-card',
  dateData
});
 noteCardsLists.appendChild(card);
 currentCard = card;
 setActiveCard();
addTrashBtn.addEventListener('click',add_trash);

};

// writing inputs  at a time pass to the card

function inputPassCard(notePannel){
    
  let inputTitle = notePannel.querySelector('#note-write-tittle');
  inputTitle.addEventListener('input',(e) =>{
    currentTime = new Date().toLocaleTimeString();
    
    timeDiv.innerHTML = ` save:${currentTime}`//current time sets
    
    sessionStorage.setItem(`${currentCard.id}time`,JSON.stringify(currentTime)) //set time to localstorage.
    
    // console.log(e.target.value.trim())
    currentCard.querySelector('.note_card_title').textContent = e.target.value.trim();//tilte input pass to card title
    
  })

};


// card Selection 
function setActiveCard(){
 
currentCard.addEventListener('click', (e)=> {
   currentCard = e.target
    // console.log(currentCard,"current card in  selected") 
  const inputPannel = noteWritePannel.querySelector('#note-write-tittle');
  const title = currentCard.querySelector('.note_card_title').textContent;
  console.log(inputPannel,"inputPannel.value ")
  inputPannel.value = title === 'Untitled Note' ? '' : title;//selecetd card title pass the pannel title
 
  let timeGet = JSON.parse(sessionStorage.getItem(`${currentCard.id}time`))
//   console.log(currentCard.id,"timeGet")
  timeDiv.innerHTML = timeGet ||'Never savetime';

});
};

function saveTime() {
  if (!currentTime) {
    timeDiv.innerHTML = "Last saved: Never";
  } else {
   timeDiv.innerHTML = ` saved: ${currentTime}`;
  }
};
  

// Trash function start


function toggle_trash_note(){
  toggleBtnMyNote.classList.remove('active')
  toggleBtnMyNote.classList.add('in-active');//toogle Trash buttun active
  toggleBtnTrash.classList.remove('in-active')
  toggleBtnTrash.classList.add('active') 
  noteCardsLists.style.display ='none';
  trashCardsList.style.display = 'block';
  headSectionRight.style.display = 'none';
 noInputs.style.display = 'flex';
 trashCardsList.innerHTML = '';
  create_trash_cards();
 currentCard = trashCardsList.firstElementChild
  // currentCard = trashCardsList;
 console.log(inputPannel)
       const title = currentCard.querySelector('.note_card_title').textContent;
      inputPannel.querySelector('#note-write-tittle').value = title === 'Untitled Note' ? '' : title;
     
};
     
// add_trash() from create_note_Cards()
async function add_trash(){
  if (currentTime) {
// console.log()
  trashData = {
      id :  currentCard.id,
      title : currentCard.querySelector('.note_card_title').textContent,
      dateData : currentCard.querySelector('#date').textContent
     }

    
    // console.log(currentTrashCard.querySelector('.note_card_title').textContent);
let newNote = JSON.parse(localStorage.getItem(`trash`)) || []
       newNote.push(trashData)
      localStorage.setItem(`trash`,JSON.stringify(newNote));
    
     noNotes.style.display = 'none';
      // active card is store;
      
   currentCard.remove();//active card in my-note is remove
   let inputTitle = inputPannel.querySelector('#note-write-tittle');
   inputTitle.value = ''
   currentCard = noteCardsLists.lastElementChild;   //assign , when the currentcard  is last created card

  
  
  } else {
    alert.error(" you try to add a empty note ! ")
  }  
};
 

function create_trash_cards(){ 
    
    data = JSON.parse(localStorage.getItem(`trash`)) || []//get the trash data
  //  console.log(data,"currentTrashCard");

  data.forEach(element => {

  let cards = create_cards_models({
    //create trash cards    
  id :element.id,
  className:"trash-card",
  title:element.title,
 dateData: element.dateData

}) 
trashCardsList.appendChild(cards);
currentCard = cards;
 setActiveCard();
  });
    
     
    


};





function create_cards_models({
  id,
  className,
   title = "Untitled Note",
   content = "No content",
    dateData
})
  {


    let card = document.createElement('div');
     if(id) card.id = id
 
card.className = className;
card.innerHTML += `<div class = "note_flex">
                   <div class = "text_container">
                   <h3 class = "note_card_title">${title}</h3>
                   <p class = "note_card_content">${content}</p>
                    </div>
                   <div id="date">${dateData} <div>
                   </div>`;
    return card
 
  };





























































































































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

