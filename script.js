document.addEventListener('DOMContentLoaded', () => {
    const notesList = document.getElementById('notes-list');
    const createNoteBtn = document.getElementById('create-note-btn');
    const noteTitleInput = document.getElementById('note-title-input');
    const noteContentInput = document.getElementById('note-content-input');
    const saveNoteBtn = document.getElementById('save-note-btn');
    const deleteNoteBtn = document.getElementById('delete-note-btn');

    let notes = [];
    let selectedNoteId = null;

    const renderNotes = () => {
        notesList.innerHTML = '';
        notes.forEach(note => {
            const li = document.createElement('li');
            li.textContent = note.title;
            li.dataset.id = note.id;
            notesList.appendChild(li);
        });
    };

    const displayNote = (note) => {
        if (note) {
            noteTitleInput.value = note.title;
            noteContentInput.value = note.content;
            selectedNoteId = note.id;
        } else {
            noteTitleInput.value = '';
            noteContentInput.value = '';
            selectedNoteId = null;
        }
    };

    const createNote = () => {
        const newNote = {
            id: Date.now(),
            title: 'New Note',
            content: ''
        };
        notes.push(newNote);
        renderNotes();
        displayNote(newNote);
    };

    const saveNote = () => {
        if (selectedNoteId) {
            const note = notes.find(note => note.id === selectedNoteId);
            if (note) {
                note.title = noteTitleInput.value;
                note.content = noteContentInput.value;
                renderNotes();
            }
        }
    };

    const deleteNote = () => {
        if (selectedNoteId) {
            notes = notes.filter(note => note.id !== selectedNoteId);
            renderNotes();
            displayNote(null);
        }
    };

    createNoteBtn.addEventListener('click', createNote);
    saveNoteBtn.addEventListener('click', saveNote);
    deleteNoteBtn.addEventListener('click', deleteNote);

    notesList.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            const noteId = parseInt(e.target.dataset.id);
            const note = notes.find(note => note.id === noteId);
            displayNote(note);
        }
    });

    // Initial render
    renderNotes();
});