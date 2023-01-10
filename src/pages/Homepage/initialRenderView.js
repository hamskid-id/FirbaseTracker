import { FaBuffer, FaFolderPlus } from "react-icons/fa";
import { FaGlassCheers } from "react-icons/fa";
import { CreateNewBoard } from "../Mainpage/createNewBoard";

export const InitialRenderView =({ModalContent,setModalContent,userCredential})=>{

    return(
            <div className="row bg_currentColour reverse p-1">
                <div className="col-md-12 col-lg-7">
                    <div className=" p-4 initial_mobile">
                        <div className="buffer">
                            <FaBuffer color="dodgerblue" size="10rem"/>
                        </div>               
                        <div  className="d-flex justify-content-start p-3 align-items-center">
                            <span className="me-2">
                                <FaFolderPlus color="cornsilk"/>
                            </span>
                            <span className="cornsilk" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>setModalContent(<CreateNewBoard boardId={userCredential?.boardId} setModalContent={setModalContent}/>) }>
                                + Create New Board
                            </span>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 col-lg-5 px-4">
                    {
                        ModalContent &&
                            <div>
                                {ModalContent}
                            </div>
                    }
                </div>

            </div>
    )
}