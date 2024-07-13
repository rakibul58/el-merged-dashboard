import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import axios from "axios";
import toast from "react-hot-toast";
import app from "../firebase/firebase.config";
import { generateToken } from "../utils/generateToken";


export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //Logout
  const logOut = () => {
    setLoading(true);

    return signOut(auth);
  };

  const devicelogOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const forgotPassword = () => {
    sendPasswordResetEmail(auth, auth.currentUser.email)
      .then(() => {
        toast.success("A Password Reset Link has been sent to your email.");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // sign in with email and password
  const signIn = async (email, password) => {
    setLoading(true);
    const newToken = await generateToken({
      isProviderLogin: false,
      email,
      password,
    });
    localStorage.setItem("token", newToken);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Login with provider
  const providerLogin = (provider) => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      },
      []
    );

    return () => {
      unsubscribe();
    };
  }, [user?.email]);

  useEffect(() => {
    axios
     // .get(`${config.serverless_api}/api/v1/users?email=${user?.email}`)
      .get(`http://localhost:5000/api/v1/user/${user?.email}`)
      .then((user) => {
        setUserInfo(user?.data.data);
      })
      .catch((error) => console.error(error));
  }, [user?.email, userInfo?.email]);

  const authInfo = {
    user,
    userInfo,
    setUserInfo,
    createUser,
    loading,
    logOut,
    signIn,
    providerLogin,
    devicelogOut,
    forgotPassword,
    setUser,
    auth,
    setLoading,
  };

  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
