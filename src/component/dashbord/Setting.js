import React, { useRef, useState } from "react";
import { storage,auth,db } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
const Setting = () => {
  const fileInputRef = useRef(null);
  // const [cName, setCName] = useState(localStorage.getItem("cName"));
  // const [email,setEmail]=useState(localStorage.getItem())

  const [email, setEmail] = useState(localStorage.getItem('email'));
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState(localStorage.getItem('cName'));
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(localStorage.getItem("photoURL"));

  const updateCompanyName=()=>{
  updateProfile(auth.currentUser,{
    displayName:displayName
  })
  .then(res=>{
   
    localStorage.setItem("cName",displayName)
    updateDoc(doc(db,"users",localStorage.getItem('uid')),{
          displayName:displayName
    })
    .then(res=>{
      window.location.reload();
    })
    
  })
  }
  const onSelectfile = (e) => {
    // const selected = e.target.files?.[0];
    // if (!selected) return;

    setFile(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const updateLogo = () => {
    const fileRef = ref(storage, localStorage.getItem("photoURL"));
    console.log(fileRef._location.path_);
    const storageRef = ref(storage, fileRef._location.path_);
    uploadBytesResumable(storageRef, file).then((result) => {
      window.location.reload();
      // getDownloadURL(storageRef)
      // .then(downloadURL=>{

      //   updateProfile(localStorage.getItem("uid"), {
      //     displayName: displayName,
      //     photoURL: downloadURL,
      //   });
      //   localStorage.getItem("photoURL", downloadURL);
      // })
    });
  };
  return (
    <div>
      <p>Setting</p>
      <div className="setting-wrapper">
        <div className=" profile-info update-cName flex  items-center gap-2.5">
          <img
            onClick={() => {
              fileInputRef.current.click();
            }}
            className="pro profile-info  h-[80px] w-[80px] rounded-full mr-2.5 "
            alt="profile-pic"
            src={imageUrl}
          />
          <input
            type="file"
            onChange={(e) => {
              onSelectfile(e);
            }}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
          {file && (
            <button 
              onClick={() => {
                updateLogo();
              }}
              className="  border"
              style={{width:'30%',padding:'10px', background:'hotpink'}}
            >
              Update Profile Pic
            </button>
          )}
        </div>
        <div className="update-cName">
          <input
            onChange={(e) => {
              setDisplayName(e.target.value);
            }}
            types="text"
            placeholder="company Name"
            value={displayName}
          />
          <button onClick={updateCompanyName}>Update Company Name</button>
          {/* <input types="text" placeholder="company Name" value={email} /> */}
        </div>
      </div>
    </div>
  );
};

export default Setting;
