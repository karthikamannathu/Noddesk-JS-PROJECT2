const addNotes = document.querySelector('#add-notes-btn');
const btnNotes = document.querySelector('#btn-notes');
const btnTrash = document.querySelector('#btn-trash');
const noNotesList = document.querySelector('.no-notes');
const noNotes = document.querySelector('.placeholder');
const rightWriteNote = document.querySelector('.write-note');
const listCards = document.querySelector('.list-notes-cards')
const noteWrite = document.querySelector('.write-note');



btnNotes.classList.add('active')
btnTrash.classList.add('in-active')

// if(btnNotes.classList.add('active')){
   
// }

 addNotes.addEventListener('click',addNotesfun)

  function addNotesfun(){
noNotesList.style.display = 'none';
noNotes.style.display = 'none';
rightWriteNote.style.display = 'block';
// const totalClicks = performance.eventCounts.get('click');

noteWrite.innerHTML =  `<input id ="note-write-tittle" placeholder = " Note Title" class="input-text"> 
                        <input id="note-write-content" placeholder ="  Start typing.." class="input-text">`;
// note left cards creation

 let cards = document.createElement('div');
 cards.className = 'note-cards';
cards.innerHTML = `<h3 class="note-card-title">Untiled Note</h3>
                    <p class ="note-card-content">No content</p>`;
let currentCard = listCards.appendChild(cards)
                     
const noteTitle = noteWrite.querySelector('#note-write-tittle');
const noteContent = noteWrite.querySelector('#note-write-content');


noteTitle.addEventListener('input', (event) => {
    // cards Title textContent edit
currentCard.querySelector('.note-card-title').textContent = event.target.value;
});


noteContent.addEventListener('input', (event) => {
     // cards Content textContent edit
    currentCard.querySelector(".note-card-content").textContent = event.target.value;
});
};

btnTrash.addEventListener('click',() =>{
  btnNotes.classList.remove('active');
  btnTrash.classList.add('active') ;
     listCards.style.display = 'none';
})

btnNotes.addEventListener('click',()=>{
     btnTrash.classList.remove('active');
  btnNotes.classList.add('active') ;
 

})

// 
