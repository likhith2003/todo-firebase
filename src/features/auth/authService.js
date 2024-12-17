import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig.js";


// Register user function using Firebase
const register = async (userData) => {
  const { email, password } = userData;
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Optionally, you could store additional user information here
  const userPayload = { email: user.email, uid: user.uid };

  localStorage.setItem("user", JSON.stringify(userPayload));
  return userPayload;
};

// Login user function using Firebase
const login = async (userData) => {
  const { email, password } = userData;
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  const userPayload = { email: user.email, uid: user.uid };

  localStorage.setItem("user", JSON.stringify(userPayload));
  return userPayload;
};

// Logout user function using Firebase
const logout = async () => {
  await signOut(auth);
  localStorage.removeItem("user");
};

export default { register, login, logout };
