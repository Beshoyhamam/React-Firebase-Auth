import { signOut } from "firebase/auth";
import { useAuth } from "../../context/authcontext";
import "./Header.css"
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";

const Header = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log("Logged out successfully");
                navigate("/login");
            })
            .catch((error) => {
                console.log("Error logging out:", error.message);
            });
    };

    return (
        <>
            <div className="header">
                {user ? <button onClick={handleLogout}>Logout</button> :
                    <>
                        <Link to="/login">Login</Link> |
                        <Link to="/register">Register New Account</Link>
                    </>
                }
            </div>
        </>
    );
}

export default Header;