import { FaBuffer } from "react-icons/fa";
import { FaFolderPlus } from "react-icons/fa";
import { Link, useParams} from "react-router-dom";
import { CreateNewBoard } from "./createNewBoard";

export const NavBoardSide =({userCredential,setModalContent})=>{
    const boardname = useParams();

    return(
        <div className="py-3 px-3">
            {/* <div className="grey fw-light p-2">
                ALL BOARDS ({userCredential?.board?.length})
            </div> */}
             <div className="accordion bg_unset" id="accordionExample">
                <div className="accordion-item bg_unset">
                    <h2 className="accordion-header bg_none" id="headingOne">
                    <button className="accordion-button grey fw-light p-2 bg_none" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        ALL BOARDS ({userCredential?.board?.length})
                    </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                        {
                            userCredential?.board?.map((board, index)=>{
                                const {name} = board;
                                if(boardname.name === name){
                                    return(
                                        <div to={`/board/${name}`}  className=" d-flex justify-content-start p-3 align-items-center" key={index}>
                                            <span className="me-2">
                                                <FaBuffer color="dodgerblue"/>
                                            </span>
                                            <span className="dodgerblue backgroundUnset">
                                                {name}
                                            </span>
                                        </div>
                                    )
                                }else{
                                    return(
                                        <Link to={`/board/${name}`}  className="d-flex justify-content-start p-3 align-items-center text-none" key={index} onClick={()=>setModalContent('')}>
                                            <span className="me-2">
                                                <FaBuffer color="grey"/>
                                            </span>
                                            <span className="grey backgroundUnset">
                                                {name}
                                            </span>
                                        </Link>
                                    )
                                }
                            })
                        }
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
                </div>
            </div>
        </div>
    )
}