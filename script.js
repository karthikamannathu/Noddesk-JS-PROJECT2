const addNotes = document.querySelector('#add-notes-btn');
const noNotesList = document.querySelector('.no-notes');
const noNotes = document.querySelector('.placeholder');
const rightWriteNote = document.querySelector('.write-note');
const noteCards = document.querySelector('#note-cards');

const cardTitle = document.querySelector(".note-card-title");
const cardContent = document.querySelector(".note-card-content");
const noteWrite = document.querySelector('.write-note');


addNotes.addEventListener('click',addNotesfun)


function addNotesfun(){
noNotesList.style.display = 'none';
noNotes.style.display = 'none';
rightWriteNote.style.display = 'block'
noteCards.style.display = 'block';
noteWrite.innerHTML =  `<input id ="note-write-tittle" placeholder=" Note Title" class="input-text"> 
                <input id="note-write-content" placeholder ="  Start typing.." class="input-text">`;
    const noteTitle = document.querySelector('#note-write-tittle');
const noteContent = document.querySelector('#note-write-content');
noteTitle.addEventListener('keyup', (event) => {
  
        event.preventDefault()
        let title = event.target.value
         // Stops the page from refreshing
          cardTitle.innerHTML = '';
    cardTitle.textContent = title;
  
});
noteContent.addEventListener('keyup', (event) => {
  event.preventDefault()
        let content = event.target.value
         // Stops the page from refreshing
    cardContent.innerHTML = '';
    cardContent.textContent = content;
  
});
};



// tomarrow fix the write pannel inputs append
