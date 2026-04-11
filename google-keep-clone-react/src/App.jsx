import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Form from './components/Form/Form';
import Notes from './components/Notes/Notes';
import Modal from './components/Modal/Modal';
import './App.css'
import './ResponsiveApp.css'

const App = () => {
  // AI Assisted feature 1 - Dark mode
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : false;
  });

  // AI Assisted feature 2 - Reminder feature
  const [now, setNow] = useState(Date.now());

  // AI Assisted feature 2 - Reminder feature - Added to Sidebar
  const [currentView, setCurrentView] = useState("notes");

  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [selectedNote, setSelectedNote] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Local storage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // AI Assisted feature 1 - Dark mode - Theme: persist and apply class on body element
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // AI Assisted feature 2 - Reminder feature - due check timer
  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(Date.now());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);


  // Add note
  const addNote = (note) => {
      const newNote = {
        ...note,
        color: note.color ?? null   
      };

      setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  // Edit note 
  const editNote = (editedNote) => {
    setNotes((prevNotes) => {
        return prevNotes.map(note => {
            if (editedNote.id === note.id) {
                return {
                  ...note,
                  title: editedNote.title,
                  text: editedNote.text,
                  reminder: editedNote.reminder ?? "",
                  color: editedNote.color ?? null 
                };
            }
            return note;
        });
    });
  };

  // Delete note
  const deleteNote = (id) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => id !== note.id);
    });
  };

  // Toggle modal open and close
  const toggleModal = () => {
    setIsModalOpen(prevState => {
      return !prevState
    });
  };

  // Manual feature - Note color-coding/background change function
  const changeColor = (id, newColor) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === id
          ? {
            ...note,
            color: newColor || null
          }
          : note
      )
    );
  };

  // AI Assisted feature 1 - Dark mode - Toggle 
  const toggleTheme = () => {
    setDarkMode((prevState) => !prevState);
  };

  // AI Assisted feature 2 Reminder feature 
  const updateReminder = (id, reminder) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id
          ? { ...note, reminder }
          : note
      )
    );
  };

  // AI Assisted feature 2 - Reminder feature - Delete reminder
  const deleteReminder = (id) => {
    updateReminder(id, "");
  };

  // AI Assisted feature 2 - Reminder feature added to sidebar
  const displayedNotes = currentView === "reminders"
    ? notes
        .filter((note) => Boolean(note.reminder))
        .sort((a, b) => {
          const timeA = new Date(a.reminder).getTime();
          const timeB = new Date(b.reminder).getTime();
          const isDueA = timeA <= now ? 1 : 0;
          const isDueB = timeB <= now ? 1 : 0;

          if (isDueA !== isDueB) return isDueB - isDueA;
          return timeA - timeB;
        })
    : notes;
  
  return (
    <>
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} /> 
      <Sidebar currentView={currentView} setCurrentView={setCurrentView}  />
      <Form addNote={addNote} darkMode={darkMode}/>
      <Notes notes={displayedNotes} deleteNote={deleteNote} toggleModal={toggleModal} setSelectedNote={setSelectedNote} changeColor={changeColor} updateReminder={updateReminder} deleteReminder={deleteReminder} now={now} currentView={currentView} darkMode={darkMode}/>
      {isModalOpen && (
        <Modal isModalOpen={isModalOpen} selectedNote={selectedNote} toggleModal={toggleModal} editNote={editNote} darkMode={darkMode}/>
      )}
    </>
  )
}

export default App;

