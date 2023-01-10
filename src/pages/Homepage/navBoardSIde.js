import { FaFirefoxBrowser } from "react-icons/fa";
import { FaBuffer } from "react-icons/fa";
import { Link } from "react-router-dom";

export const HomeNavBoardSide =({userCredential,setModalContent})=>{
    return(
        <div className="bg_currentColour">
            <div className="accordion" id="accordionExample">
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
                                    return(
                                        <Link to={`/board/${name}`}  className=" d-flex justify-content-start p-3 align-items-center" key={index} onClick={()=>setModalContent('')}>
                                            <span className="me-2">
                                                <FaBuffer color="white"/>
                                            </span>
                                            <span className="grey backgroundUnset">
                                                {name}
                                            </span>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}