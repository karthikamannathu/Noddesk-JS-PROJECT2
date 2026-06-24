let addNoteBtn = document.querySelector("#add-notes-btn");
let noInput = document.querySelector(".placeholder");
let nocards = document.querySelector(".no-notes");
let inputPannel = document.querySelector(".notes-write-pannel");
let inputTextCondiner = document.querySelector(".input-condiner");
let add_trash = document.querySelector(".bi-trash3");
let add_bookmark = document.querySelector(".bi-bookmark");
let noteList = document.querySelector("#note-cards-list");
let trashList = document.querySelector("#trash-cards-list");
let toggleMyNotes = document.querySelector("#btn-notes");
let toggleMyTrash = document.querySelector("#btn-trash");
let coverDiv = document.querySelector(".input_cover");
let timeView = document.querySelector(".save-time");
let restoreDelBtn = document.querySelector("#btns");
let searchInput = document.querySelector("#search-input");
let trashbookmarkIcon = document.querySelector(".icon");
let pannelHeadSection = document.querySelector(".head_section_right");
let cookiesStorageCount = document.querySelector("#storage_count");
let cookiesStorageGreen = document.querySelector(".greenbox");
let wordsView = document.querySelector(".words-view");
let rightHedSelection = document.querySelector(".head_section_right");

let currentTime = null;
let currentCard = null;
let title = null;
let content = null;
let dataId;
let noteData = {};

let currentDate = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
}).format(Date.now());

NotVisible(rightHedSelection);

// ---toggle btn  funs----/

// 1.activeToggles set---
function toggleViews(
  activeToggle,
  inActiveToggle,
  activeCardList,
  inActiveCardList,
) {
  activeToggle.classList.remove("in-active");
  activeToggle.classList.add("active");
  inActiveToggle.classList.remove("active");
  inActiveToggle.classList.add("in-active");
  visible(activeCardList, "flex");
  NotVisible(inActiveCardList);
  if (activeCardList.firstElementChild != null) {
    NotVisible(nocards);
  } else visible(nocards, "block");
}

toggleViews(toggleMyNotes, toggleMyTrash, noteList, trashList); //defualt mynotetoggle btn set

// 2.Toggle events
//mynote event-----
toggleMyNotes.addEventListener("click", myNoteToggle);

function myNoteToggle() {
  toggleViews(toggleMyNotes, toggleMyTrash, noteList, trashList);
  NotVisible(coverDiv);
  inputTextCondiner.classList.remove("style-ponter");
  NotVisible(pannelHeadSection);
  NotVisible(restoreDelBtn);
  currentCard = noteList.lastElementChild;
  currentCardPannelView(currentCard);
  if (!currentCard) {
    visible(noInput, "flex");
    NotVisible(inputTextCondiner);
  } else {
    setActiveCard(currentCard);
  }
}
getTrashNote(); //trash fun call global
//-----Trash event-----
toggleMyTrash.addEventListener("click", () => {
  toggleMyTrash.style.color = "rgb(157, 6, 6);";
  toggleViews(toggleMyTrash, toggleMyNotes, trashList, noteList);
  visible(coverDiv, "flex");
  NotVisible(pannelHeadSection);
  // "currentcard ",currentCard)
  NotVisible(trashbookmarkIcon);
  inputTextCondiner.classList.add("style-ponter");
});

// --- New note creations-----//

//1. note add event----/
addNoteBtn.addEventListener("click", addNewNote);

async function addNewNote() {
  NotVisible(noInput);
  myNoteToggle();
  visible(pannelHeadSection, "flex");
  visible(trashbookmarkIcon, "flex");
  createCards();
}

// 2.create UI pannel New-----/
function createInputPannel() {
  NotVisible(noInput);
  inputTextCondiner.innerHTML = `
        <input id ="note-write-tittle" 
        placeholder = " Note Title" class="input-text"> 
        <input id="note-write-content" 
        placeholder ="  Start typing.." class="input-text">`;
 
   
}

//3.Create new note card---//
 function createCards() {
  NotVisible(nocards);

  dataId = Date.now();
  let card =  createcardsModel({ dataId });
  noteList.append(card);
  currentCard = card;

  setActiveCard(card);
  createInputPannel();
}

//4.-----           Input pass event----//
inputPannel.addEventListener("input", async (e) => {
  try {
    visible(wordsView, "flex");
    currentTime = new Date().toLocaleTimeString();
    const cardTitle = currentCard.querySelector("#card_title");
    const cardContent = currentCard.querySelector("#card_content");
    timeView.textContent = "";
    timeView.textContent = `saved:${currentTime}`;

    if (e.target.id == "note-write-tittle") {
      title = cardTitle.textContent = e.target.value.trim();
    } else {
      content = cardContent.textContent = e.target.value.trim();
    }

    noteData = getNoteData(currentCard)
    if (title === "") {
      alert("enter title");
    } else cookiesSet(noteData);

    await cookieFlags();
    const wordsCount = `${title || ""} ${content || ""}`
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;
    wordsView.innerHTML = `words ${wordsCount}`;
  } catch (er) {
    console.error(er);
  }
});

noteList.addEventListener("click", (e) => {
  const card = e.target.closest(".card_flex");
  if (card) setActiveCard(card);
});

trashList.addEventListener("click", (e) => {
  const card = e.target.closest(".card_flex");
  if (card) setActiveCard(card);
});

async function setActiveCard(card) {
  NotVisible(noInput);
  if (!card) return;

  add_bookmark.classList.remove("active-bookmark");

 document.querySelectorAll(".card_flex").forEach(el =>
  el.classList.toggle("card-active", el === card)
 );


  card.classList.remove("cards-inactive");
  card.classList.add("card-active");

  currentCard = card;
  visible(inputTextCondiner, "block");
  noteData.id = getCardId(card)
  let getTime = await getObject(
    currentCard.querySelector(".card_text").id,
    "ts",
  );
  // set the timeView/

  timeView.textContent = "";
 //  trash add time update

  // if card pass time check ------//
  
  timeView.textContent = getTime ?`saved:${getTime}`: currentTime ? ` saved:${currentTime}`: `Last saved:never`
 
  currentCardPannelView(card); //pannel UI

  if (card) {
    visible(pannelHeadSection, "flex");
    if (card?.parentElement?.id == "note-cards-list") {
      visible(trashbookmarkIcon, "flex");
      NotVisible(restoreDelBtn);
    } else {
      visible(restoreDelBtn, "flex");
      NotVisible(trashbookmarkIcon);
    }
  }
}

function currentCardPannelView(card) {
  let inputPannelTitle = inputTextCondiner.querySelector("#note-write-tittle");
  let inputPannelContent = inputTextCondiner.querySelector(
    "#note-write-content",
  );
  if (!inputPannelTitle || !card) {
    createInputPannel();
    inputPannelTitle = inputTextCondiner.querySelector("#note-write-tittle");
    inputPannelContent = inputTextCondiner.querySelector("#note-write-content");
  } else {
    let cardTitle = card.querySelector("#card_title").textContent.trim();
    let cardContent = card.querySelector("#card_content").textContent.trim();

    inputPannelTitle.value = cardTitle === "Untitled Note" ? "" : cardTitle;
    inputPannelContent.value = cardContent === "No Content" ? "" : cardContent;

    if (card.querySelector("i")) {
      add_bookmark.style.background = " yellow";
    } else {
      add_bookmark.style.background = " none";
    }
  }

  const wordsCount =
    `${inputPannelTitle.value || ""} ${inputPannelContent.value || ""}`
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;
  wordsView.innerHTML = `words ${wordsCount}`;
}

add_trash.addEventListener("click", async () => {
  try {
    let cardId = await getCardId(currentCard)
    let title = await currentCard.querySelector("#card_title").textContent;
    let content = await currentCard.querySelector("#card_content").textContent;
   noteData = {
  ...getNoteData(currentCard),
  d: 1
};

    await cookiesSet(noteData);
    trashList.appendChild(currentCard);
    if (noteList.lastChild) {
      setActiveCard(noteList.lastElementChild);
      NotVisible(inputTextCondiner);
      visible(noInput, "flex");
    }
  } catch (err) {
    console.log(err);
  }
});

add_bookmark.addEventListener("click", async (e) => {
  
  // noteData ={... getNoteData(currentCard),
  // b : 1}
  // await cookiesSet(noteData);
  // e.target.style.background = "yellow";
  // currentCard.querySelector("#card_date").innerText = "";
  // currentCard
  //   .querySelector("#card_date")
  //   .insertAdjacentHTML("beforeend", `<i class="bi bi-pin" width=40px></i>`);


  isBookmarked = await getObject(getCardId(currentCard),"b");
  noteData = {...getNoteData(currentCard),
    b : isBookmarked ? 0 : 1
  };
  await cookiesSet(noteData);
   const dateEl = currentCard.querySelector("#card_date");

  if (noteData.b) {
    e.target.style.background = "yellow";

    dateEl.innerHTML =
      '<i class="bi bi-pin"></i>';
  } else {
    e.target.style.background = "none";

    dateEl.textContent = currentDate;
  }
});

restoreDelBtn.addEventListener("click", async (e) => {
  if (e.target.className == "restore btn") {
    noteData.d = 0;
    cookiesSet(noteData);

    noteList.appendChild(currentCard);
    currentCard = trashList.firstElementChild;
    currentCardPannelView(currentCard);
  } else {
    alert("Delete Permently");

    const cardId = currentCard.querySelector(".card_text")?.id;
    cookieStore.delete({ name: cardId });
    await cookieFlags();
    currentCard.remove();

    if (trashList.lastChild) {
      setActiveCard(trashList.lastChild);
    }
  }
});

searchInput.addEventListener("input", (e) => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const data = noteList.querySelectorAll(".card_text");
  
  let firstMatch;
  
  data.forEach((el) => {
    const card = el.closest(".card_flex");
const found = el.textContent.toLowerCase().includes(searchTerm )
card.style.display = found ? "":"none";
  firstMatch ??= found ? card : null;
  });
 firstMatch && setActiveCard(firstMatch)

})

// ----Cookies set---//
async function cookiesSet(notesData) {
 
  const existing = await cookieStore.get(notesData.id);

  let note = existing ? JSON.parse(atob(existing.value)) : {};
  Object.assign(note, notesData);

  cookieStore.set({
    name: notesData.id,
    value: btoa(JSON.stringify(note)),
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
  });
}

async function getObject(id, key) {
  try {
    const cookie = await cookieStore.get(id);

    if (!cookie) return null;

    const note = JSON.parse(atob(cookie.value));

    return note[key];
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function getTrashNote() {
  try {
    let getAllCookies = [];
    getAllCookies = await cookieStore.getAll();
    if (getAllCookies) {
      let data = getAllCookies.map((data) => JSON.parse(atob(data.value)));

      let deleteNoteData = data.filter((data) => data.d === 1);

      let trash = deleteNoteData.forEach(async (value) => {
        let trashcreate = await createcardsModel({
          dataId: value.id,
          title: value.t,
          content: value.c,
          date: value.dt,
        });

        trashList.appendChild(trashcreate);
      });
    } else return null;
  } catch (error) {}
}

function createcardsModel({
  dataId,
  title = "Untitled Note",
  content = "No Content",
}) {
  let card = document.createElement("div");
  card.className = "card_flex flex-box";
  card.innerHTML = `
 <div class="card_text" id = "${dataId}">
   <h1 id="card_title">${title}</h2>
    <samp id="card_content">${content}</samp></div>
    <div id="card_date"style = "pointer-events:none">${currentDate}</div>`;

  return card;
}

// ----cookie storege UI---
async function cookieFlags() {
  let Cookieslength = document.cookie.length;

  let cookieSize = (Cookieslength / 1024).toFixed(2);

  cookiesStorageCount.innerHTML = `${cookieSize}kb`;
  // clear old green bar
  cookiesStorageGreen.replaceChildren();

  let colorDiv = document.createElement("div");
  colorDiv.className = "greenDiv";
  colorDiv.style.width = `${8 * cookieSize}%`;

  cookiesStorageGreen.appendChild(colorDiv);
}

let getCardId  = card =>card?.querySelector(".card_text")?.id;


function getNoteData(card){
  return{
    id:getCardId(card),
   t: card.querySelector("#card_title").textContent || "Untitled Note",
    c: card.querySelector("#card_content").textContent || "No Content",
    ts: currentTime,
    d: 0,
    b: 0,
    dt: currentDate
  }

}
//---- vissibility functions-------
// const hide = el => el && (el.style.display = "none");

// const show = (el,display="block") =>
//   el && (el.style.display = display);
// notvisible---
function NotVisible(element) {
  element.style.display = "none";
}
//visible fun---
function visible(element, style) {
  if (element) {
    element.style.display = style;
  }
}
