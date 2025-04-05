import { db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";

export const saveUserProfile = async (userId, data) => {
  try {
    await setDoc(doc(db, "users", userId), data);
  } catch (error) {
    console.error("Error saving user profile:", error);
  }
};