import { useForm } from "react-hook-form";
import { app, db } from "../../firebaseConfigue.js";
import { collection, addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword  } from "firebase/auth";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Spinner from "../../spinner/scaleLoader.js";

export const SignUp =()=>{
      const auth = getAuth(app);
      const navigate = useNavigate();
      const { register, handleSubmit, formState: { errors } } = useForm();
      const [errorMessage, setErrorMessage] = useState();
      const [isLoading, setIsLoading] =useState(false)

      const createUser = async(firstname,lastname,email)=>{
        try {
                const docRef = await addDoc(collection(db, "Users"), {
                firstName: firstname,
                lastName: lastname,
                email: email,
                board:[]
                });
                console.log("Document written with ID: ", docRef.id);
               
          } catch (e) {
                console.error("Error adding document: ", e);
          }
      }

      const submitHandler=({firstname,lastname,email,password})=>{
        setIsLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            toast("signUp successfull")
            console.log(user)
            createUser(firstname,lastname,email);
            localStorage.setItem("taskUser", user.accessToken);
            navigate("/dashboard")
        })
        .catch((error) => {
            setErrorMessage(error.message);
            setIsLoading(false)
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
                    <p className="text-center wheat">Register</p>
                    <div className="d-flex flex-column">
                        <label className="wheat" htmlFor="firstname">
                            First Name
                        </label>
                        <input type="text" name="firstname" className="w-100 p-1 text-white auth_bg-none rounded grey"  {...register('firstname', {required:'Please enter your First Name',
                            })}/>
                            {errors.firstname && (<p className="text-danger ">{errors.firstname.message}</p>)}
                    </div>
                    <div className="d-flex flex-column">
                        <label className="wheat" htmlFor="lastname">
                           Last Name
                        </label>
                        <input type="text" name="lastname" className="w-100 p-1 text-white  auth_bg-none rounded" {...register('lastname', {required:'Please enter your Last Name',
                            })}/>
                            {errors.lastname && (<p className="text-danger ">{errors.lastname.message}</p>)}
                    </div>
                    <div className="d-flex flex-column">
                        <label className="wheat" htmlFor="email">
                           Email
                        </label>
                        <input type="email" name="email" className="w-100 p-1 text-white  auth_bg-none rounded" autoFocus {...register('email', {required:'Please enter your email',
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
                        <input type="password" name="password" className="w-100 p-1 text-white  auth_bg-none rounded" {...register('password', {required:'Please enter your password',
                            minLength: {
                                value: 6,
                                message: "password must be more than five characters"
                            }})}/>
                            {errors.password && (<p className="text-danger ">{errors.password.message}</p>)}
                    </div>
                    {errorMessage && <p className="text-danger">{errorMessage}</p>}
                    <button className="btn btn-success mt-3">submit</button>
                    <p className="text-white my-2 me-1">Already have an account?
                    <Link to="/">
                        Sign in
                    </Link>
                </p>
                </form>
                
            </div>
        </>
    )
}