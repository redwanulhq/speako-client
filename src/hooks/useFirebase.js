import { useEffect, useState } from "react";
import initializeAuthentication from "../Firebase/Firebase.init";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";

initializeAuthentication();
const useFirebase = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const createAccountWithEmailPassword = (auth, email, password) => {
        setIsLoading(false);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const loginWithEmailPassword = (auth, email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signInUsingGoogle = () => {
        setIsLoading(true);
        return signInWithPopup(auth, googleProvider);
    };
    const logOut = () => {
        setIsLoading(true);
        signOut(auth)
            .then(() => {
                setUser({});
            })
            .finally(() => setIsLoading(false));
    };
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
            setIsLoading(false);
        });
    }, []);

    return {
        user,
        error,
        signInUsingGoogle,
        logOut,
        setUser,
        createAccountWithEmailPassword,
        loginWithEmailPassword,
        auth,
        setIsLoading,
        isLoading,
        updateProfile,
        setError,
    };
};
export default useFirebase;
