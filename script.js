const addNotes = document.querySelector('#add-notes-btn');
const noNotesList = document.querySelector('.no-notes');
const noNotes = document.querySelector('.placeholder');
const rightWriteNote = document.querySelector('.write-note');
const noteCards = document.querySelector('#note-cards');

addNotes.addEventListener('click',addNotesfun)


function addNotesfun(){
noNotesList.style.display = 'none';
noNotes.style.display = 'none';
rightWriteNote.style.display = 'block'
noteCards.style.display = 'block'
}

// tomrrow create each cards and get input same tim