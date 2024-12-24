import { Link } from "react-router-dom";
import { styles } from "../styles";

function Header() {

    const handleNavToHome = () => {
        window.scrollTo(0, 0);
    }

    return ( 
        <nav className={`${styles.paddingX} w-full flex py-5 items-center fixed top-0 z-20 bg-primary`}>
            <div className="w-full flex mx-auto justify-between items-center max-7xl">
                <Link 
                to="/" 
                className="text-white font-black text-2xl"
                onClick={handleNavToHome}
                >
                    Logo
                </Link>
            </div>
        </nav>
     );
}

export default Header;