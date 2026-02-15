const addNotesBtn = document.querySelector('#add-notes-btn');
const btnNotes = document.querySelector('#btn-notes');
const btnTrash = document.querySelector('#btn-trash');
const noNotesList = document.querySelector('.no-notes');
const noNotes = document.querySelector('.placeholder');
const listCards = document.querySelector('.list-notes-cards')
let noteWritePannel = document.querySelector('.notes-write-pannel');

let clickCount =0;
 ;

btnNotes.addEventListener('click',toggle_my_note)
async function toggle_my_note(){
   btnNotes.classList.remove()
btnNotes.classList.add('active');//toogle myNote buttun active
btnTrash.classList.remove()
btnTrash.classList.add('in-active')

await addNotesBtn.addEventListener('click' ,addNote);

try {
  
//  console.log(listCards.forEach(item => {console.log(item)}))
   // carditems.forEach(item => {
   //  item.addEventListener('click', () => {
   //    console.log(item);
   // })})
   // console.log(carditems)
} catch (error) {
   console.log(error)
}

};


function addNote(){
try {
   create_note_Cards();
   create_note_write_pannel();
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
}

// create new note card
function create_note_Cards(){
   noNotesList.style.display = 'none';//no-list-placeholder-div disable
   clickCount++;
let card = document.createElement('div');
card.className = 'note-cards';
card.id =`card${clickCount}`;
card.innerHTML = `<h3 class = "note-card-title">Untitled Note</h3>
                   <p class = "note-card-content">No content</p>`;
 listCards.appendChild(card);
 currentCard = card;
 setActiveCard();


}

// writing inputs  at a time pass to the card


// card Selection 
function setActiveCard(){
 
currentCard.addEventListener('click', e => {
   currentCard = e.target
   console.log(currentCard,"current card in  selected") 
  const inputPannel = noteWritePannel.querySelector('#note-write-tittle');
  const title = e.currentTarget.querySelector('.note-card-title').textContent;
  inputPannel.value = title === 'Untitled Note' ? '' : title;//selecetd card title pass the pannel title

});
}


function inputPassCard(noteWritePannel){
    
  let inputTitle = noteWritePannel.querySelector('#note-write-tittle')
  inputTitle.addEventListener('input',(e) =>{
   console.log(currentCard,"current card in  tittle input pass") 
  currentCard.querySelector('.note-card-title').textContent = e.target.value.trim();//tilte input pass to card title
  }
)}





// Trash function start

btnTrash.addEventListener("click",tashNote)

function tashNote(){
   btnNotes.classList.remove()
  btnNotes.classList.add('in-active');//toogle Trash buttun active
  btnTrash.classList.remove()
btnTrash.classList.add('active') 
}




 



































































































































// let  cardList =''


//  btnNotes.classList.add('active');
//       btnTrash.classList.add('in-active')

//  addNotes.addEventListener('click',addNotesfun)
//  btnNotesTrue()
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
//  let currentCard = await listCards.appendChild(cards);


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
// // listCards.addEventListener('click',(e)=>console.log("clicked"))
// };

//  let card = cardList.querySelectorAll('.note-cards');
//  let list = Array.from(card);
//   console.log(list.map(element => element.addEventListener("click",(e)=>console.log(`element is${element.childElementCount}`,e.target))))              

// btnTrash.addEventListener('click',(e) =>{
//   btnNotes.classList.remove('active');
//   btnTrash.classList.add('active') ;
//  listCards.style.display = 'none';


// })

// btnNotes.addEventListener('click',btnNotesTrue)

// trashCards(listCards)

// function btnNotesTrue(){
//      btnTrash.classList.remove('active');
//   btnNotes.classList.add('active') ;
//    listCards.style.display = 'block';
    
    
   // }

