import "./Register.css"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading"
import { useAuth } from "../../context/authContext";
import { auth, storage } from "../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);


    const onsubmit = () => {
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;

                let photoURL = "";
                if (file) {
                    const storageRef = ref(storage, `profilePictures/${user.uid}`);
                    await uploadBytes(storageRef, file);
                    photoURL = await getDownloadURL(storageRef);
                }

                sendEmailVerification(auth.currentUser)

                updateProfile(user, {
                    displayName: name,
                    photoURL: photoURL,
                }).then(() => {
                    navigate("/")
                }).catch((error) => {
                    alert("Error updating profile:", error)
                });

            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage)
            });
    }

    if (loading) {
        return <Loading />
    }

    if (!loading) {
        return (
            <div className="register">
                <div className="box-form">
                    <div className="head">
                        <h3>Create a New Account</h3>
                    </div>

                    <div className="username">
                        <label>UserName</label>
                        <input
                            type="text"
                            placeholder="UserName"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="email">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Your Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="password">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Your Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="image">
                        <label>Your Image</label>
                        <input
                            type="file"
                            placeholder="Your Password"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>

                    <div className="submit" onClick={onsubmit}>
                        <button>Sign Up</button>
                    </div>

                    <div className="continue">
                        <p>Aleardy have an account? | <Link to="/login">Continue</Link></p>
                    </div>
                </div>
            </div>
        );
    }

}

export default Register;