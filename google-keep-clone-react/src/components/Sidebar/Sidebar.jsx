import "./Sidebar.css"

import { useState } from "react";

import notes from '../../assets/notes.svg';
import reminders from '../../assets/reminders.svg';
import editlables from '../../assets/editlabels.svg';
import archive from '../../assets/archive.svg';
import trash from '../../assets/trash.svg';

const Sidebar = ({ currentView, setCurrentView }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div id="sidebar" className={isExpanded ? "expanded" : ""} onMouseEnter={() => setIsExpanded(true)} onMouseLeave={() => setIsExpanded(false)}>
            {/* Sidebar Active item */}
            <div className={`sidebar-items ${currentView === "notes" ? "sidebar-active-item" : ""}`} onClick={() => setCurrentView("notes")}>
                <img className={currentView === "notes" ? "active" : ""} src={notes} alt="notes" />
                <span>Notes</span>
            </div>
            {/* AI Asssited feature 2 - Reminder feature added to sidebar */}
            <div className={`sidebar-items ${currentView === "reminders" ? "sidebar-active-item" : ""}`} onClick={() => setCurrentView("reminders")}>
                <img className={currentView === "reminders" ? "active" : ""} src={reminders} alt="reminders" />
                <span>Reminders</span>
            </div>
            <div className="sidebar-items">
                <img src={editlables} alt="edit-labels" />
                <span>Labels</span>
            </div>
            <div className="sidebar-items">
                <img src={archive} alt="archive" />
                <span>Archive</span>
            </div>
            <div className="sidebar-items">
                <img src={trash} alt="trash" />
                <span>Trash</span>
            </div>

        </div>
    )
}

export default Sidebar;