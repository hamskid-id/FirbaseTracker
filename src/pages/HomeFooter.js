import { FaHouseUser, FaSmile } from "react-icons/fa"
import { useNavigate } from "react-router-dom";

export const  HomeFooter =({setToggler})=>{
    const navigate = useNavigate();
    return(
        <>
            <div className="footer zIndex">
                <span className="d-flex flex-column align-items-center" onClick={
                        ()=>navigate("/dashboard")
                    }>
                    <FaHouseUser
                        color="black"
                        size="1rem"/>
                    <h6 className="text-black mt-1">Home</h6>
                </span>
                <span className="d-flex flex-column align-items-center"  onClick={()=>{
                        setToggler(true);
                    }}>
                    <FaSmile
                    color="wheat" size="1rem"/>
                    <h6 className="text-white mt-1">
                    You</h6>
                </span>
            </div>
        </>
    )
}