// src/utils/uploadImage.js
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

// Function to upload an image to Firebase Storage
const uploadImage = async (file) => {
  if (!file) return null;

  const storageRef = ref(storage, `images/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      null, // We can track upload progress if needed
      (error) => reject(error), // Handle error
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(resolve); // Get download URL
      }
    );
  });
};

export default uploadImage;
