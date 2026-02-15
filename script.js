const addNotesBtn = document.querySelector('#add-notes-btn');
const btnNotes = document.querySelector('#btn-notes');
const btnTrash = document.querySelector('#btn-trash');
const noNotesList = document.querySelector('.no-notes');
const noNotes = document.querySelector('.placeholder');
const listCards = document.querySelector('.list-notes-cards')
let noteWritePannel = document.querySelector('.notes-write-pannel');
let cardText= null;
let inputWorked = false;
let clickCount =0;
  toggle_my_note();


async function toggle_my_note(){
btnNotes.classList.add('active');//toogle myNote buttun active
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
   noNotesList.style.display = 'none';//no-list-placeholder-div disable
   create_note_Cards();

   noNotes.style.display = 'none';
   create_note_write_pannel()
   
   }
   
 catch (error) {
   console.log(error)
 }
};


function create_note_write_pannel(){
noteWritePannel.innerHTML =  `<input id ="note-write-tittle" placeholder = " Note Title" class="input-text"> 
                           <input id="note-write-content" placeholder ="  Start typing.." class="input-text">`; 
                           inputPassCard(noteWritePannel)                 
}

async function create_note_Cards(){
   clickCount++;
let card = document.createElement('div');
card.className = 'note-cards';
card.id =`card${clickCount}`;
card.innerHTML = `<h3 class = "note-card-title">Untitled Note</h3>
                   <p class = "note-card-content">No content</p>`;
 await listCards.appendChild(card);
 setActiveCard(card);

}








 

//    noteTitle.value = cardText.innerText ;
//   noteContent.value = cardText.innerText ;


// }
// else{
//      noteTitle.value = activeCard.querySelector('.note-card-title').innerText ;
//   noteContent.value = activeCard.querySelector('.note-card-content').innerText ;
// }
// const noteTitle = noteWritePannel.querySelector('#note-write-tittle');
// const noteContent = noteWritePannel.querySelector('#note-write-content');
//   console.log(noteTitle.getAttribute('placeholder')) 
//  if (noteTitle.value == '')return;
//     noteTitle.value = card.querySelector('.note-card-title').innerText ;
//   noteContent.value = card.querySelector('.note-card-content').innerText ;
   // console.log(noteTitle.value,"else")

// noteTitle.addEventListener('input', (event) => {
//    // cards Title textContent edit
// e.target.querySelector('.note-card-title').textContent = event.target.value;

// });

// noteContent.addEventListener('input', (event) => {
//     // cards Content textContent edit
//    // cards Title textContent edit
// e.target.querySelector(".note-card-content").textContent = event.target.value;
// });
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

