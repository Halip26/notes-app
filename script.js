const addTitle = document.getElementById("addTitle");
const addText = document.getElementById("addText");
const addNoteButton = document.getElementById("addNote");
const notesDiv = document.getElementById("notes");

// Get notes from localStorage or return empty array
const getNotes = () => JSON.parse(localStorage.getItem("notes")) || [];

// Save notes to localStorage
const saveNotes = (notes) =>
  localStorage.setItem("notes", JSON.stringify(notes));

// Render notes to the DOM
const showNotes = () => {
  const notes = getNotes();
  notesDiv.innerHTML = notes
    .map(
      (note, i) => `
        <div class="note">
            <button class="deleteNote" data-index="${i}">Delete</button>
            <span class="title"><strong style="font-size: 20px;">${
              note.title || "Note"
            }</strong></span>
            <div class="text">${note.text}</div>
        </div>
    `
    )
    .join("");
};

// Add a new note
const addNote = () => {
  const title = addTitle.value.trim();
  const text = addText.value.trim();
  if (!text) {
    alert("Add your note");
    return;
  }
  const notes = getNotes();
  notes.push({ title, text });
  saveNotes(notes);
  addTitle.value = "";
  addText.value = "";
  showNotes();
};

// Delete a note
const deleteNote = (index) => {
  const notes = getNotes();
  notes.splice(index, 1);
  saveNotes(notes);
  showNotes();
};

// Event listeners
addNoteButton.addEventListener("click", addNote);
notesDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteNote")) {
    deleteNote(Number(e.target.dataset.index));
  }
});

// Initial render
showNotes();
