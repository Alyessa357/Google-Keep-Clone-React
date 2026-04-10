import React, { useState, useRef, useEffect } from "react";

const Note = (props) => {
    const { toggleModal, note, setSelectedNote, changeColor, now, updateReminder, deleteReminder, darkMode} = props;
    const [isHover, setIsHover] = useState(false);

    const [showPalette, setShowPalette] = useState(false);
    const [showReminderPicker, setShowReminderPicker] = useState(false);
    const paletteRef = useRef(null);
    const reminderRef = useRef(null);

    const noteClickHandler = () => {
        toggleModal();
        setSelectedNote(note);
    };

    // hover over effect
    const hoverOverHandler = () => {
        setIsHover(true);
    };

    // hover out effect
    const hoverOutHandler = () => {
        setIsHover(false);
    };

    // Delete note 
    const deleteHandler = (e) => {
        e.stopPropagation(); 
        props.deleteNote(note.id)
    };

    // Handle outside click 
    useEffect(() => {
        const handleClickOutside = (e) => {

            // Manual feature - Color-coding/background color change palette
            if (paletteRef.current && !paletteRef.current.contains(e.target)) {
            setShowPalette(false);
            }
            //  AI Assisted feature 2 - Reminder feature
            if (reminderRef.current && !reminderRef.current.contains(e.target)) {
                setShowReminderPicker(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // AI Assisted feature 2 - Reminder feature
    const isReminderDue = note.reminder ? new Date(note.reminder).getTime() <= now : false;

    const formatReminder = (reminderDate) => {
        if (!reminderDate) return "";
        const parsedDate = new Date(reminderDate);
        if (Number.isNaN(parsedDate.getTime())) return "";
        return parsedDate.toLocaleString([], {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    return (
        <div className={`note ${isReminderDue ? "due-reminder" : ""}`} id={note.id} onClick={noteClickHandler} onMouseOver={hoverOverHandler} onMouseOut={hoverOutHandler} style={{ backgroundColor: note.color ? note.color : (darkMode ? "#303134" : "#ffffff") }}>
            {isHover && (
                <i className="material-icons check-circle">check_circle</i>
            )}
            {isHover && (
                <i className="material-icons-outlined hover push-pin">push_pin</i>
            )}

            <div className="title">{note.title}</div>
            <div className="text">{note.text}</div>

            {/* AI Assisted feature 2 - Reminder feature - Display in note */}
            {note.reminder && (
                <div className={`reminder-chip ${isReminderDue ? "reminder-due" : ""}`}>
                    <i className="material-icons-outlined small-icon">add_alert</i>
                    <span>{formatReminder(note.reminder)}</span>
                    <button
                        type="button"
                        className="reminder-chip-delete"
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteReminder(note.id);
                        }}
                        aria-label="Delete reminder"
                        title="Delete reminder"
                    >
                        close
                    </button>
                </div>
            )}

            {isHover && (
                <div className="note-footer action-icons">

                        {/* Manual feauture - Color-coding/background color change palette action icon */}
                        <div className="tooltip" ref={paletteRef}>
                            <i className="material-icons-outlined hover small-icon note-footer-small-icon"
                               onClick={(e) => {
                                e.stopPropagation(); // prevent modal
                                setShowPalette(prev => !prev);
                                }}
                            >
                                palette
                            </i>
                            {/* Color palette */}
                            {showPalette && (
                                <div className="color-palette">
                                    {[
                                        {value: null, label: "default" },
                                        {value: "#f28b82"}, 
                                        {value: "#fbbc04"}, 
                                        {value: "#ccc255"}, 
                                        {value: "#64a779"},
                                        {value: "#669bbc"}, 
                                        {value: "#ac66bc"},
                                        {value: "#284255"},
                                        {value: "#7e2918"}, 
                                    ].map(item => (
                                        <span
                                            key={item.value ?? "default"}
                                            className="color-circle"
                                            style={{ 
                                                backgroundColor: item.value === null ? (darkMode ? "#303134" : "#ffffff") : item.value,
                                                border: item.value === null ? "2px dashed gray" : "1px solid #ddd" 
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                changeColor(note.id, item.value);
                                                setShowPalette(false); 
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                            <span className="tooltip-text">Background options</span>
                        </div>

                        {/* AI Assisted feature 2 - Reminder feature - Add reminder action icon */}
                        <div className="tooltip">
                            <i className="material-icons-outlined hover small-icon note-footer-small-icon"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowReminderPicker((prevState) => !prevState);
                                }}
                            >
                                add_alert
                            </i>
                            <span className="tooltip-text">Remind me</span>
                        </div>

                        <div className="tooltip">
                            <i className="material-icons-outlined hover small-icon note-footer-small-icon">person_add_alt</i>
                            <span className="tooltip-text">Collaborator</span>
                        </div>
                        <div className="tooltip">
                            <i className="material-icons-outlined hover small-icon note-footer-small-icon">image</i>
                            <span className="tooltip-text">Add image</span>
                        </div>
                        {/* Delete note action icon*/}
                        <div className="tooltip" onClick={deleteHandler}>
                            <i className="material-icons-outlined hover small-icon note-footer-small-icon">archive</i>
                            <span className="tooltip-text">Archive</span>
                        </div>
                        <div className="tooltip">
                            <i className="material-icons-outlined hover small-icon note-footer-small-icon">more_vert</i>
                            <span className="tooltip-text">More</span>
                        </div>
                </div>
            )}
            
            {/* AI Assisted feature 2 - Reminder feature - date/time picker and delete button*/}
            {showReminderPicker && (
                <div
                    className="note-reminder-picker"
                    ref={reminderRef}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="note-reminder-controls">
                        <input
                            type="datetime-local"
                            className="reminder-input"
                            value={note.reminder || ""}
                            onChange={(e) => updateReminder(note.id, e.target.value)}
                        />
                        <button
                            type="button"
                            className="clear-reminder-btn"
                            onClick={() => deleteReminder(note.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Note;

