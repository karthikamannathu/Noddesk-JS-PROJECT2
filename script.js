const addNotesBtn = document.querySelector('#add-notes-btn');
const btnNotes = document.querySelector('#btn-notes');
const btnTrash = document.querySelector('#btn-trash');
const noNotesList = document.querySelector('.no-notes');
const noNotes = document.querySelector('.placeholder');
const rightWriteNote = document.querySelector('.write-note');
const listCards = document.querySelector('.list-notes-cards')
const noteWritePannel = document.querySelector('.write-note');



  toggle_my_note()
function toggle_my_note(){
btnNotes.classList.add('active');//toogle myNote buttun active
btnTrash.classList.add('in-active')

addNotesBtn.addEventListener('click' ,addNotes);
};





function addNotes(){
noNotesList.style.display = 'none';//no-list-placeholder-div disable
noNotes.style.display = 'none';
rightWriteNote.style.display = 'block';
noteWritePannel.innerHTML =  `<input id ="note-write-tittle" placeholder = " Note Title" class="input-text"> 
                        <input id="note-write-content" placeholder ="  Start typing.." class="input-text">`;
create_note_Cards()
};


function create_note_Cards(){

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

