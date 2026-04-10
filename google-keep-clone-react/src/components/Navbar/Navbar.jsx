import "./Navbar.css";
import search from '../../assets/search.svg';
import profile from '../../assets/profile.png';

const Navbar = ({ darkMode, toggleTheme }) => {
    return (
        <nav>

            {/* <!-- Main menu and logo --> */}
            <div className="logo-area">
                <div className="main-menu tooltip">
                    <i className="material-icons hover">menu</i>
                    <span className="tooltip-text">Main menu</span>
                </div>
                <img src="https://www.gstatic.com/images/branding/product/2x/keep_2020q4_48dp.png" alt="logo" />
                <div className="tooltip">
                    <span className="logo-text">Keep</span>
                    <span className="tooltip-text">Keep</span>
                </div>
            </div>

            {/* <!-- Center nav section --> */}
            <div className="nav-center">

                {/* <!-- Search bar --> */}
                <div className="search">
                    <form className="search-bar">
                        <button><img src={search} alt="search" /></button>
                        <input type="text" placeholder="Search" />
                    </form>
                </div>
            
                {/* <!-- Actions area --> */}
                <div className="actions-area">
                    <div className="tooltip">
                        <i className="material-icons-outlined hover">refresh</i>
                        <span className="tooltip-text">refresh</span>
                    </div>
                    <div className="tooltip">
                        <i className="material-icons-outlined hover">view_agenda</i>
                        <span className="tooltip-text">List view</span>
                    </div>
                    <div className="tooltip">
                        <i className="material-icons-outlined hover">settings</i>
                        <span className="tooltip-text">settings</span>
                    </div>
                    {/* Darkmode */}
                    <div className="tooltip">
                        <button
                            type="button"
                            className="theme-toggle-btn"
                            onClick={toggleTheme}
                            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            <i className="material-icons-outlined hover">
                                {darkMode ? "light_mode" : "dark_mode"}
                            </i>
                        </button>
                        <span className="tooltip-text">{darkMode ? "Light mode" : "Dark mode"}</span>
                    </div>
                </div>

            </div>

            {/* <!-- Google apps and profile area --> */}
            <div className="profile-area">
                <div className="tooltip">
                    <i className="material-icons hover">apps</i>
                    <span className="tooltip-text">Google apps</span>
                </div>
                <a href="">
                    <img src={profile} alt="profile" />
                </a>
            </div>

        </nav>
    )
}

export default Navbar;