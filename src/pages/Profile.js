import { useState } from "react";
import { storage,db } from '../firebaseConfigue';
import {updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { toast } from "react-toastify";

export const ProfileSection = ({setModalContent,setToggler,userCredential,boardId}) =>{
    const [progressBar, setProgressBar] = useState();
    const userRef = doc(db, "Users", boardId);
    const handleChange =(e)=>{
        
        const storageRef = ref(storage, 'images');
        const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgressBar(progress);
                console.log('Upload is ' + progress + '% done');
                }, 
                (error) => {
                   console.log(error)
                }, 
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                        updateDoc(userRef, {
                           profile:downloadURL
                        }).then(()=>{
                            toast.success('profile upload successfull');
                            setProgressBar(null);
                        }).catch((error)=>{
                            toast.error('something went wrong',error)
                        })
                    });
                }
            );
    }

    return(
        <>
        <div className="modal-content bg bg-dark">
            <div className="modal-header border-none">
                <h5 className="modal-title text-white" id="exampleModalLabel">ProFile</h5>
                <button type="button" className="btn-close btn-white" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{
                    setToggler(false);
                    setModalContent('')}
                }   ></button>
            </div>
            <div className="modal-body  ">
                <div className="profileRelative">
                    <div>                       
                        {
                            userCredential?.profile?
                            <img width="100%" src={userCredential.profile} alt="object not found"/>
                            :
                            <img width="100%" src="https://res.cloudinary.com/hamskid/image/upload/v1669936036/Mask_group_afrsbg.png" alt="object not found"/>
                        }                      
                    </div>
                    <div className="d-flex moveUp justify-content-start">
                        <span className="text-white fw-bold fs-4">{ userCredential?.firstName +" "+  userCredential?.lastName }</span>
                    </div>
                </div>
                <div className="bg bg-white p-3">
                    <div className="mb-2">
                            <button className="btn btn-white border border-dark fw-bold btn-md text-black">
                                <label htmlFor="profile">Edit profile Picture</label>
                            </button>                       
                        <input name="profile" id="profile" type="file" accept="image/*"  onChange={handleChange}/>
                    </div>
                    <div>
                        {
                            progressBar &&(
                                <h6 className="text-black fw-bold">{'Upload is ' + progressBar + '% done'}</h6>
                            )
                        }
                    </div>
                   <div className="d-flex flex-column">
                        <h6 className="fw-bold">Local Time</h6>
                        <h6>{
                            new Date()
                                    .toLocaleString(
                                    "en-US",
                                    {
                                        timeZone:
                                            "Africa/Lagos"
                                    }
                                )
                            }
                        </h6>
                    </div>
                   <div className="d-flex flex-column">
                        <h6 className="fw-bold">Email</h6>
                        <h6>{userCredential?.email}</h6>
                   </div>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>{
                    setToggler(false);
                    setModalContent('')}
                }>Close</button>
            </div>
        </div>
    </>
    )
}