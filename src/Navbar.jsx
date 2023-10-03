import { Link } from "react-router-dom";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseConfig";
import { useState } from "react";

const Navbar = () => {

    const [logoUrl, setLogoUrl] = useState(null);

    getDownloadURL(ref(storage, 'Dever logo 1.svg'))
        .then((url) => {
            setLogoUrl(url);
        });

    return (
        <nav className="navbar">
            {logoUrl ? <img className="logo" src={logoUrl} alt="Logo" /> : <div></div>}
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </div>
        </nav>
    );
}

export default Navbar;