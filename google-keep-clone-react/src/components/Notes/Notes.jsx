import "./Notes.css";
import Note from "./Note";

const Notes = (props) => {
    const { notes, deleteNote, toggleModal, setSelectedNote, changeColor, updateReminder, deleteReminder, now, currentView, darkMode } = props;

    const isReminderView = currentView === "reminders";
    const emptyIcon = isReminderView ? "notifications" : "lightbulb";
    const emptyText = isReminderView ? "Notes with upcoming reminders appear here" : "Notes you add appear here";

    return (
        <div className="notes">
        {notes.length === 0 ? (
            <div className="empty-notes-area">
                <i className="material-icons-outlined">{emptyIcon}</i>
                <p>{emptyText}</p>
            </div>
         ) : (
            notes.map((note, index) => (
            <Note key={index} note={note} deleteNote={deleteNote} toggleModal={toggleModal} setSelectedNote={setSelectedNote} changeColor={changeColor} updateReminder={updateReminder} deleteReminder={deleteReminder} now={now} darkMode={darkMode} />
           ))
        )}  
        </div>
    )
}

export default Notes;

            