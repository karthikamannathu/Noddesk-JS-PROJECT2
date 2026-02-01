const addNotes = document.querySelector('#add-notes-btn');
const noNotesList = document.querySelector('.no-notes');
const noNotes = document.querySelector('.placeholder');
const rightWriteNote = document.querySelector('.write-note');

const listCards = document.querySelector('.list-notes-cards')


const noteWrite = document.querySelector('.write-note');


addNotes.addEventListener('click',addNotesfun)

function addNotesfun(){
noNotesList.style.display = 'none';
noNotes.style.display = 'none';
rightWriteNote.style.display = 'block';
const totalClicks = performance.eventCounts.get('click');

noteWrite.innerHTML =  `<input id ="note-write-tittle" placeholder = " Note Title" class="input-text"> 
                        <input id="note-write-content" placeholder ="  Start typing.." class="input-text">`;
//    const cards = document.createElement('div');
//          cards.className = 'note-cards' 
 let cards = document.createElement('div');
 cards.className = 'note-cards';

cards.innerHTML = `<h3 class="note-card-title">Untiled Note</h3>
                       <p class ="note-card-content">No content</p>`;
listCards.appendChild(cards)

const noteTitle = document.querySelector('#note-write-tittle');
const noteContent = document.querySelector('#note-write-content');
const cardTitle = document.querySelector(".note-card-title");
const noteCards = document.querySelector('.note-cards');        
 const cardContent = document.querySelector(".note-card-content");
noteTitle.addEventListener('input', (event) => {
noteCards.querySelector('.note-card-title').textContent = event.target.value;
    //    cardTitle.textContent = 

});


noteContent.addEventListener('input', (event) => {
        cardContent.textContent = event.target.value;
  
});
};


function createCards() {
   
}
// tomarrow fix the list card creation for each time note write
