const addNotes = document.querySelector('#add-notes-btn');
const noNotesList = document.querySelector('.no-notes');
const noNotes = document.querySelector('.placeholder');
const writeNote = document.querySelector('.notes-write-pannel');
const noteCards = document.querySelector('#note-cards');

addNotes.addEventListener('click',addNotesfun)


function addNotesfun(){
noNotesList.style.display = 'none';
noNotes.style.display = 'none';
writeNote.innerHTML =`<ul class = "write-note">
<input id ="note-write-tittle" placeholder=" Note Title"> 
<input id="note-write-desc" placeholder ="Start typing..">
</ul>`
noteCards.style.display = 'block'
}

