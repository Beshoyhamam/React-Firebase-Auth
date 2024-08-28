import "./Home.css"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useEffect, useState } from "react";
import { deleteUser, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";

const Home = () => {
    const navigate = useNavigate();
    const { user, setLoading } = useAuth();
    const [showReauthForm, setShowReauthForm] = useState(false);
    const [showGoogleMessage, setShowGoogleMessage] = useState(false);
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    const delUser = async () => {
        if (user) {
            if (user.providerData.some(provider => provider.providerId === 'google.com')) {
                setShowGoogleMessage(true);
            } else {
                setShowReauthForm(true);
            }
        }
    };

    const handleReauthSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const credential = EmailAuthProvider.credential(user.email, password);
        if (await reauthenticateWithCredential(user, credential)) {
            try {
                await deleteUser(user);
                navigate("/login");
            } catch (error) {
                alert(error.message);
            }
        }
        setShowReauthForm(false);
    };

    if (showGoogleMessage) {
        return (
            <div className="home">
                <p style={{ textAlign: "center", maxWidth: "900px", lineHeight: "1.7" }}>
                    Sign in with Google does not support deleting the account directly. Please manage your account through Google Settings.
                </p>
            </div>
        );
    }

    if (showReauthForm) {
        return (
            <div className="home">
                <h2>Confirm Your Password</h2>
                <form onSubmit={handleReauthSubmit}>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                    <button type="submit">Confirm</button>
                </form>
                <button onClick={() => setShowReauthForm(false)}>Cancel</button>
            </div>
        );
    }

    if (user) {
        return (
            <>
                {user.emailVerified ?
                    <div className="home">
                        {user.photoURL &&
                            <div>
                                <img src={user.photoURL} alt={user.displayName} />
                            </div>
                        }
                        <p>
                            User Name : {user.displayName}
                        </p>
                        <p>
                            Email : {user.email}
                        </p>
                        <div className="submit">
                            <button onClick={delUser}>Delete Account</button>
                        </div>
                    </div> :

                    <div className="home">
                        <p>Please Check Your Email</p>
                    </div>
                }
            </>
        );
    }
}
export default Home;