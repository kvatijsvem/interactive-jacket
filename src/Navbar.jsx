import { Link } from "react-router-dom";
import logo from './Assets/logo.svg';

const Navbar = () => {
    return (
        <nav className="navbar">
            <img className="logo" src={logo} alt="Logo" />
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </div>
        </nav>
    );
}

export default Navbar;