import { useEffect, useState } from "react";
import {  collection, query, where,onSnapshot } from "firebase/firestore"; 
import { db } from "../../firebaseConfigue.js";
import jwtDecode from "jwt-decode";
import { InitialRenderView } from "./initialRenderView";
import { Nav } from "./nav";
import { HomeFooter } from "../HomeFooter.js";
import { ProfileSection } from "../Profile.js";
import { HomeNavBoardSide } from "./navBoardSIde.js";
import Spinner from "../../spinner/scaleLoader.js";
export const PlartFormHome =()=>{
    const [ModalContent, setModalContent] = useState('');
    const [userCredential, setUserCredentials] = useState();
    const user = jwtDecode(localStorage?.getItem("taskUser"));
    const [toggler, setToggler]= useState(false);
    const [isLoading, setIsLoading] = useState(true);
    console.log(user.email);

    useEffect(()=>{
        const q = query(collection(db, "Users"), where("email", "==", user.email));
        let unsubscribe = onSnapshot(q,(querySnapshot)=>{
            querySnapshot.forEach((doc) => {
                console.log(doc.data());
                setUserCredentials({...doc.data(),boardId:doc.id});
            }) 
        })
        setTimeout(()=>{
            setIsLoading(false);
        },[2000])
        
        return ()=>{unsubscribe()}
    },[user.email]);

    if(isLoading){
        return(
            <>
                <Spinner/>
            </>
        )
    }
    return(
        <>
            <Nav userCredential={userCredential}/>
            <div className="row body_vh">
                <div className="col-md-3 bg_currentColour fit-h px-3 mb-3">
                    <HomeNavBoardSide userCredential={ userCredential} setModalContent={ setModalContent}/>
                </div>
                <div  className="col-md-9 black_bg nav_pills_left">
                    <InitialRenderView ModalContent={ModalContent} userCredential={ userCredential} setModalContent={ setModalContent}/>
                </div>
            </div>
             {   
                toggler &&
                (
                    <div className="profileLoader">
                        <ProfileSection setModalContent={setModalContent} setToggler={setToggler} userCredential={userCredential} boardId={userCredential?.boardId}/>
                    </div>
                )   
            }
            <HomeFooter setToggler={setToggler}/>
        </>
    )

}