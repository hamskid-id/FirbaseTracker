import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { app } from "../../firebaseConfigue.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import Spinner from "../../spinner/scaleLoader.js";


export const SignIn =()=>{
    const auth = getAuth(app);
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState();
    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage?.getItem("taskUser")){
            navigate('/dashboard');
        }

    },[])

    const submitHandler=({email, password})=>{
        setIsLoading(true)
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            localStorage.setItem("taskUser", user.accessToken);
            toast("sign in successfull");
            navigate("/dashboard")
          })
          .catch((error) => {
            setErrorMessage(error.message);
            setIsLoading(false);
          });
       
    }
    if(isLoading){
        return(
            <>
                <Spinner/>
            </>
        )
    }
    return(
        <>
            <div className="bg_currentColour auth_container" style={{height:"100vh"}}>
                <form className="authForm shadow rounded" onSubmit={handleSubmit(submitHandler)}>
                    <p className="text-center wheat">Log In</p>
                    <div className="d-flex flex-column">
                        <label className="wheat" htmlFor="email">
                           Email
                        </label>
                        <input type="email" name="email" className="w-100 p-1  auth_bg-none rounded text-white" autoFocus {...register('email', {required:'Please enter your email',
                            pattern: {
                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                                message: "Enter valid email address"
                            }})}/>
                            {errors.email && (<p className="text-danger ">{errors.email.message}</p>)}
                    </div>
                    <div className="d-flex flex-column">
                        <label className="wheat" htmlFor="password">
                           Password
                        </label>
                        <input type="password" name="password" className="w-100 p-1  auth_bg-none rounded text-white" {...register('password', {required:'Please enter your password',
                            minLength: {
                                value: 6,
                                message: "password must be more than five characters"
                            }})}/>
                            {errors.password && (<p className="text-danger ">{errors.password.message}</p>)}
                    </div>
                    {errorMessage && <p className="text-danger">{errorMessage}</p>}
                    <button className="btn btn-success mt-3">submit</button>
                    <p className="text-white my-2 me-1">Dont have an account?
                        <Link to="/auth/signUp">
                            Sign Up
                        </Link>
                    </p>
                </form>
                
            </div>
        </>
    )
}