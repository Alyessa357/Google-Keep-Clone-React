
import React, { useState, useRef, useEffect } from "react";
import "./Form.css";
import { uid } from 'uid';

const Form = (props) => {
    const { edit, selectedNote, toggleModal, darkMode } = props;
    const [title, setTitle] = useState((edit && selectedNote.title) || "");
    const [text, setText] = useState((edit && selectedNote.text) || "");
    const [isActiveForm, setIsActiveForm] = useState(edit);

    // Manual feature - Color-coding/background color change on note
    const [color, setColor] = useState(null);
    const [showPalette, setShowPalette] = useState(false);
    const paletteRef = useRef(null);

    // AI Assisted feature 2 - Reminder feature
    const [reminder, setReminder] = useState((edit && selectedNote.reminder) || "");
    const [showReminderPicker, setShowReminderPicker] = useState(Boolean((edit && selectedNote.reminder) || ""));

    // change active form title
    const titleChangeHandler = (event) => {
        setTitle(event.target.value)
        setIsActiveForm(true);
    };

    // Change active form text
    const textChangeHandler = (event) => {
        setText(event.target.value)
        setIsActiveForm(true);
    };

    // submit form
    const submitFormHandler = (event) => {
        event.preventDefault();

        if(!edit) {
             // add data to note array 
            props.addNote({
               id: uid(),
               title,
               text,
               color: color || null,
               reminder,
           });
            setIsActiveForm(false);
        } else {
            props.editNote({
                id: selectedNote.id,
                title,
                text,
                color: color || null,
                reminder
            })
            toggleModal()
        }

        setTitle("");
        setText("");
        setColor(null);
        setReminder("");
        setShowReminderPicker(false);
    };

    // Toggle between inactive and active form
    const formClickHandler = () => {
        setIsActiveForm(true);
    };

    // Manual feature - Color-coding/background color change on note - outside click
    useEffect(() => {
    const handleClickOutside = (e) => {
        if (paletteRef.current && !paletteRef.current.contains(e.target)) {
            setShowPalette(false);
        }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
    }, []);


    return (
        <div className="form-container">
        
            {<form onSubmit={submitFormHandler} className={isActiveForm ? "active-form" : "inactive-form"} id="note-input" onClick={formClickHandler} style={{ backgroundColor: color ? color : (darkMode ? "#303134" : "#ffffff") }} > 

                {isActiveForm && (
                    <i className="material-icons-outlined hover push-pin">push_pin</i>
                )}
                {isActiveForm && (
                    <input onChange={titleChangeHandler} value={title} className="note-title" type="text" placeholder="Title" style={{ backgroundColor: color ? color : (darkMode ? "#303134" : "#ffffff") }} />
                )}

                <input onChange={textChangeHandler} value={text} className="note-text active-text" type="text" placeholder="Take a note..." style={{ backgroundColor: color ? color : (darkMode ? "#303134" : "#ffffff") }} />

                {isActiveForm ? (
                    <div className="note-input-actions-footer">
                        <div className="action-icons">
                            <div className="tooltip">
                                <i className="material-icons-outlined hover small-icon">text_format</i>
                                <span className="tooltip-text">Formatting options</span>
                            </div>

                            {/* Manual feature - color-coding/background color change palette action icon */}
                            <div className="tooltip" ref={paletteRef}>
                                <i className="material-icons-outlined hover small-icon"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowPalette(prev => !prev);
                                    }}
                                >
                                    palette
                                </i>
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
                                                key={item.value || "default"}
                                            className="color-circle"
                                            style={{ 
                                                backgroundColor: item.value || (darkMode ? "#303134" : "#ffffff"),
                                                border: item.value === null ? "2px dashed gray" : "1px solid #ddd"
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setColor(item.value);
                                                setShowPalette(false);
                                            }}
                                                title={item.label || ""}
                                            />
                                        ))}
                                    </div>
                                )}
                                <span className="tooltip-text">Background options</span>
                            </div>

                            {/* AI Assisted feature 2 - Reminder feature action icon */}
                            <div className="tooltip">
                                <i className="material-icons-outlined hover small-icon"
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
                                <i className="material-icons-outlined hover small-icon">person_add_alt</i>
                                <span className="tooltip-text">Collaborator</span>
                            </div>
                            <div className="tooltip">
                                <i className="material-icons-outlined hover small-icon">image</i>
                                <span className="tooltip-text">Add image</span>
                            </div>
                            <div className="tooltip">
                                <i className="material-icons-outlined hover small-icon">archive</i>
                                <span className="tooltip-text">Archive</span>
                            </div>
                            <div className="tooltip">
                                <i className="material-icons-outlined hover small-icon">more_vert</i>
                                <span className="tooltip-text">More</span>
                            </div>
                            <div className="tooltip">
                                <i className="material-icons-outlined hover small-icon">undo</i>
                                <span className="tooltip-text">Undo</span>
                            </div>
                            <div className="tooltip">
                                <i className="material-icons-outlined hover small-icon">redo</i>
                                <span className="tooltip-text">Redo</span>
                            </div>
                        </div>
                        <button type="submit" className="close-btn">Close</button>
                    </div>
                ) : (
                <div className="note-input-actions">
                    <div className="tooltip">
                     <i className="material-icons-outlined hover">check_box</i>
                     <span className="tooltip-text">New list</span>
                    </div>
                    <div className="tooltip">
                     <i className="material-icons-outlined hover">brush</i>
                     <span className="tooltip-text">New note with drawing</span>
                    </div>
                    <div className="tooltip">                     
                     <i className="material-icons-outlined hover">image</i>
                     <span className="tooltip-text">New note with image</span>
                    </div>
                </div>
                )}

                {/* AI Assisted feature 2 - Reminder feature - date/time picker + delete button*/}
                {isActiveForm && showReminderPicker && (
                    <div className="reminder-picker-row">
                        <div className="form-reminder-controls">
                            <input
                                type="datetime-local"
                                className="reminder-input"
                                value={reminder}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => setReminder(e.target.value)}
                            />
                            <button
                                type="button"
                                className="form-clear-reminder-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setReminder("");
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )}

            </form>}
            
        </div>
    )
}

export default Form;

 