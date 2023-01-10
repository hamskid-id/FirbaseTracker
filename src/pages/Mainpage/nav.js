import { useNavigate, useParams } from "react-router-dom"
import LetteredAvatar from 'react-lettered-avatar';
import { FaFirefoxBrowser} from "react-icons/fa";
import { AddNewtask } from "./addNewtask"
import { ProfileSection } from "../Profile";
import { getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";

export const Nav =({userCredential,setModalContent,setToggler})=>{
    const {name} = useParams()
    const navigate = useNavigate();
    const handleLogOut=()=>{
        const auth = getAuth();
        signOut(auth).then(() => {
            localStorage?.removeItem("taskUser");
            navigate("/");
            alert("loggged Out")
        }).catch((error) => {
            alert(error);
        }); 
   
    }
    return(
        
        <div className="row nav-5 header">
            <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 nav_nav_pills zIndex">
                <div className="d-flex justify-content-start p-3 align-items-center zIndex">
                    <span className="me-2">
                        <FaFirefoxBrowser size="2rem" color="dodgerblue"/>
                    </span>
                    <span className="fs-2 fw-bold text-white" onClick={()=> navigate('/dashboard')}>
                        Kanban
                    </span> 
                    <div className=" shift-right authWrapper">
                        <LetteredAvatar
                            name={userCredential?.firstName + " " + userCredential?.lastName}
                            size={45}
                            color="#fff"
                            backgroundColor="rgb(55,55,22)"
                        />
                         <div className="authDropdown">
                            <h6 className="text-white" onClick={handleLogOut}>Log Out</h6>
                        </div>
                    </div> 
                </div>
            </div>
            <div  className="col-lg-9 col-md-8 col-sm-12 col-xs-12 nav_bg hideOnMobile">
                <div>
                    <div className="d-flex flex-row align-items-center justify-content-between p-3 head">
                        <span className="d-flex align-items-center authContainer ml-auto">
                            <button
                                className="btn dodgerblueBg rounded btn-md me-2"
                                data-bs-toggle="modal" data-bs-target="#exampleModal"
                                onClick={
                                    ()=>
                                        setModalContent(
                                            <AddNewtask
                                                boardId={userCredential?.boardId}
                                                boardName={name}
                                                board={userCredential?.board}
                                                setModalContent={setModalContent}
                                    />) }
                                >
                                + Add New Task
                            </button>
                            
                            <div className="authWrapper" onClick={
                                ()=>
                                    setModalContent(
                                        <ProfileSection setModalContent={setModalContent} setToggler={setToggler} boardId={userCredential?.boardId} userCredential={userCredential}/>
                                    )
                                }>
                                <LetteredAvatar
                                    name={userCredential?.firstName + " " + userCredential?.lastName}
                                    size={45}
                                    color="#fff"
                                    backgroundColor="rgb(55,55,22)"
                                    
                                />
                                 <div className="authDropdown">
                                    <h6 className="text-white" onClick={handleLogOut}>Log Out</h6>
                                </div>
                            </div>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}