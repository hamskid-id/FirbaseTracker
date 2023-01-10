import { useEffect, useState } from "react";
import { SetTaskStatus } from "./setTaskStatus";
import { useParams} from 'react-router-dom';
import {  collection, query, where,onSnapshot } from "firebase/firestore"; 
import { db } from "../../firebaseConfigue.js";
import jwtDecode from "jwt-decode";
import { NavBoardSide } from "./navBoardSide";
import { FaPlusCircle, FaRegEye} from "react-icons/fa";
import {Nav} from './nav';
import { MainFooter } from "../footer";
import { ProfileSection } from "../Profile";
import { AddMoreToSubTask } from "./addMoreToSubTasks";
import Spinner from "../../spinner/scaleLoader";

export const PlartFormLaunch =()=>{
    const [ModalContent, setModalContent] = useState('');
    const [userCredential, setUserCredentials] = useState();
    const user = jwtDecode(localStorage?.getItem("taskUser"));
    const [boardInformation, setBoardInformation] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [toggler, setToggler]= useState(false);
    const {name} = useParams();



    useEffect(()=>{
        const q = query(collection(db, "Users"), where("email", "==", user.email));
        let unsubscribe = onSnapshot(q,(querySnapshot)=>{
            querySnapshot.forEach((doc) => {
                setUserCredentials({...doc.data(),boardId:doc.id});
            }) 
        })
        return ()=>{unsubscribe()}
    },[]);

    useEffect(()=>{
        userCredential?.board?.forEach((bod)=>{
            if(bod.name === name){
                setBoardInformation(bod.tasks);
            }
        })
        setTimeout(()=>{
            setIsLoading(false);
        },[2000])
        console.log(userCredential)
    },[name,userCredential])
    
    
    if(isLoading){
        return(
            <>
                <Spinner/>
            </>
        )
    }
    return(
        <>
            <Nav userCredential={userCredential} setModalContent={setModalContent} setToggler={setToggler}/>
            <div className="row body_vh">
                <div className="col-md-4 col-lg-3 col-sm-12 nav_pills fit-h">
                    <NavBoardSide userCredential={ userCredential} setModalContent={ setModalContent}/>
                </div>
                <div className="col-md-8 col-lg-9 col-sm-12 black_bg">
                        <div>
                            <div className="row reverse pd-3 px-3">
                                <div className="col-lg-7 col-md-12">
                                    <div className="accordion bg_unset" id="accordionExample2">
                                        <div className="accordion-item bg_unset">
                                            <h2 className="accordion-header bg_none" id="headingTwo">
                                            <button className="accordion-button grey fw-light p-2 bg_none" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                                Boards collections
                                            </button>
                                            </h2>
                                            <div id="collapseTwo" className="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample2">
                                                <div className="accordion-body boardContentWrapper">
                                                    <div className="row  p-2">
                                                        {
                                                            boardInformation?.map((item,index)=>{
                                                                return(
                                                                        <div className="col-md-6 col-sm-6 col-xs-6" key={index}>
                                                                                <div  className="rounded action_container dropContainer">
                                                                                    <div className="shadow px-4 py-4 rounded my-3 bg_currentColour">
                                                                                        <h3 className="text-white fw-bold fs-5">{item.title}</h3>
                                                                                        <h3 className="sub-grey">{item.subtask.length} subtask available</h3>
                                                                                    </div>
                                                                                    <div className="rounded dropdownItem px-1 align-items-center p-1">
                                                                                        <div className="d-flex align-items-center">
                                                                                            <span className="border rounded px-1 m-1"  onClick={
                                                                                                    ()=>
                                                                                                        setModalContent(
                                                                                                            <SetTaskStatus
                                                                                                                boardId={userCredential?.boardId}
                                                                                                                boardName={name}
                                                                                                                board={userCredential?.board } 
                                                                                                                item={item}
                                                                                                                setModalContent={setModalContent}
                                                                                                                setBoardInformation={setBoardInformation}/>
                                                                                                    )}>
                                                                                                <FaRegEye color="wheat" size="1rem"/>
                                                                                            </span>
                                                                                            {/* <span className="wheat view ms-1">
                                                                                                view
                                                                                            </span> */}
                                                                                        </div>
                                                                                        <div className="d-flex align-items-center">
                                                                                            <span className="border rounded px-1 m-1" onClick={
                                                                                                    ()=>
                                                                                                        setModalContent(
                                                                                                            <AddMoreToSubTask
                                                                                                                boardId={userCredential?.boardId}
                                                                                                                boardName={name}
                                                                                                                board={userCredential?.board } 
                                                                                                                title={item?.title}
                                                                                                                setModalContent={setModalContent}
                                                                                                            />
                                                                                                    )}>
                                                                                                <FaPlusCircle color="wheat" size="1rem"/>
                                                                                            </span>
                                                                                        </div>
                                                                                       
                                                                                    </div>                                               
                                                                                </div>
                                                                        </div>
                                                                    )                                                        
                                                            })
                                                        }
                                                        {
                                                            boardInformation.length===0?<p className="text-white">{name} does not have any task yet, click on add new task to create a task</p>:null
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-5 col-md-12 pdx-4 hideOnTab">
                                    {
                                        ModalContent &&
                                            <div>
                                                {ModalContent}
                                            </div>
                                    }
                                </div>
                            </div>
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
               
                <MainFooter userCredential={userCredential} setModalContent={setModalContent} setToggler={setToggler}/>
            </div>
        </>
    )

}