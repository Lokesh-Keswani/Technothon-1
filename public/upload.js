import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYr4WCFQoUOPQN9y770m0399uiS8uwlBU",
  authDomain: "technothos-firebase.firebaseapp.com",
  projectId: "technothos-firebase",
  storageBucket: "technothos-firebase.appspot.com",
  messagingSenderId: "805996864605",
  appId: "1:805996864605:web:b6abc9b90f46cdcc03d9b4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app, "gs://technothos-firebase.appspot.com");

document.addEventListener("DOMContentLoaded", function () {
  const notesForm = document.getElementById("notesForm");
  const notesFileInput = document.getElementById("notes-file");

  notesForm.addEventListener("submit", async function (event) {
    event.preventDefault(); // Stop the form from submitting immediately
    event.stopPropagation();

    const file = notesFileInput.files[0];
    if (!file) {
      console.log("No file selected");
      return;
    }

    const randomString = Math.random().toString(36).substring(2, 15);

    // Upload file to Firebase Storage
    const storageRef = ref(storage, "notes/" + `${file.name}-${randomString}`);
    try {
      const snapshot = await uploadBytes(storageRef, file);
      console.log("Uploaded a blob or file!", snapshot);
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
        // Add the URL to a hidden input in the form
        const urlInput = document.createElement("input");
        urlInput.type = "hidden";
        urlInput.name = "fileUrl";
        urlInput.value = downloadURL;
        notesForm.appendChild(urlInput);

        // Continue with the form submission
        notesForm.submit();
      });
    } catch (error) {
      console.error("Upload failed", error);
    }
  });
});
