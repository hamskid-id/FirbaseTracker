import { FaHouseUser, FaPlusCircle, FaSmile } from "react-icons/fa"
import { useNavigate, useParams } from "react-router-dom"
import { AddNewtask } from "./Mainpage/addNewtask";

export const  MainFooter =({ setModalContent, userCredential, setToggler})=>{
    const {name} = useParams();
    const navigate = useNavigate();
    return(
        <>
            <div className="footer zIndex">
                <span className="d-flex flex-column align-items-center" onClick={
                        ()=>navigate("/dashboard")
                    }>
                    <FaHouseUser
                        color="wheat"
                        size="1rem"/>
                    <h6 className="text-white mt-1">Home</h6>
                </span>
                <span className="d-flex flex-column align-items-center"
                    onClick={
                        ()=>
                            setModalContent(
                                <AddNewtask
                                    boardId={userCredential?.boardId}
                                    boardName={name}
                                    board={userCredential?.board}
                                    setModalContent={setModalContent}
                                />
                            )  
                        }
                    >
                    <FaPlusCircle
                        color="wheat"
                        size="1rem"
                    />
                    <h6 className="text-white mt-1">Add Tasks</h6>
                </span>
                <span className="d-flex flex-column align-items-center"
                    onClick={()=>{
                        setToggler(true);
                    }}>
                    <FaSmile
                    color="wheat" size="1rem"/>
                    <h6 className="text-white mt-1">You</h6>
                </span>
            </div>
        </>
    )
}