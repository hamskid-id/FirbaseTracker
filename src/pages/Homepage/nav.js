import { useNavigate} from "react-router-dom"
import LetteredAvatar from 'react-lettered-avatar';
import { FaFirefoxBrowser } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";

export const Nav =({userCredential})=>{
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
            <div className="col-md-3 col-sm-12 col-xs-12 zIndex">
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
                            <h4 className="text-white" onClick={handleLogOut}>Log Out</h4>
                        </div>
                    </div> 
                </div>

            </div>
            <div  className="col-md-9 col-sm-12 col-xs-12 hideOnMobile">
                <div className="p-3 d-flex justify-content-end authWrapper">
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
    )
}