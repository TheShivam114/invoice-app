import React, { useRef, useState } from "react";
import "../Login/login.css";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, storage } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const fileInputRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading,setLoading]=useState(false);
  const navigate = useNavigate();

  const onSelectfile = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setImageUrl(URL.createObjectURL(selected));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true)
    if (!email || !password || !displayName || !file) {
      setError("All fields including logo are required.");
      return;
    }

    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
        
      const timestamp = Date.now();
      const storageRef = ref(
        storage,
        `logos/${newUser.user.uid}_${timestamp}_${file.name}`
      );
      const metadata = { contentType: file.type };

      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const pct = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${pct.toFixed(0)}% done`);
        },
        (err) => {
          console.error("Upload failed:", err);
          setError(`Logo upload error: ${err.message}`);
        },
        async () => {
          const downloadedUrl = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("DownloadURL:", downloadedUrl);

          // update profile
          await updateProfile(newUser.user, {
            displayName,
            photoURL: downloadedUrl,
          });

          // add to Firestore
          await setDoc(doc(db, "users", newUser.user.uid), {
            uid: newUser.user.uid,
            displayName,
            email,
            photoURL: downloadedUrl,
          });

          // localStorage
          localStorage.setItem("cName", displayName);
          localStorage.setItem("photoURL", downloadedUrl);
          localStorage.setItem("email", email);
          localStorage.setItem("uid", newUser.user.uid);

          navigate("/dashbord");
          setLoading(false)
        }
      );
    } catch (err) {
      console.error("Sign-up error:", err);
      setError(err.message);
      setLoading(err)
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-boxes login-left"></div>
        <div className="login-boxes login-right">
          <h2 className="login-heading">Create Your Account</h2>
          <form onSubmit={submitHandler}>
            <input
              required
              type="email"
              placeholder="Email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              required
              type="text"
              placeholder="Company Name"
              className="login-input"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <input
              required
              type="password"
              placeholder="Password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              required
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={(e) => {
                onSelectfile(e);
              }}
            />
            <input
              required
              type="button"
              className="login-input"
              value={file ? file.name : "Select Your Logo"}
              onClick={() => fileInputRef.current.click()}
            />
            {imageUrl != null && (
              <img className="image-preview" src={imageUrl} alt="preview" />
            )}
            <button
              type="submit"
              className="login-input login-btn"
              value="Register"
            >
              {" "}
              {isLoading && <i class="fa-solid fa-spinner fa-spin-pulse"></i>}
              Submit{" "}
            </button>

            {error && <p className="error-text">{error}</p>}
          </form>
          <Link to="/login" className="register-link">
            Login With Your Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
