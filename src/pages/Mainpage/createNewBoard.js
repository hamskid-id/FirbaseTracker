import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {updateDoc, arrayUnion,doc} from "firebase/firestore"; 
import { db } from "../../firebaseConfigue.js";


export const CreateNewBoard =({boardId,setModalContent})=>{
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const CreateBoard = async(boardname, description)=>{
        try{
            const userRef = doc(db, "Users", boardId);
            await updateDoc(userRef, {
                board: arrayUnion({
                    name:boardname,
                    description:description,
                    tasks:[]
                })
            });
            toast("board successfully created");
        }catch(err){
            console.log(err);
        }
    }

    const submitHandler=({boardname, description})=>{
        CreateBoard(boardname, description);
    }

    return(
        <>
            <div className="modal-content bg bg-dark mmb-2">
                <div className="modal-header border-none">
                    <h5 className="modal-title text-white" id="exampleModalLabel">Create New Board</h5>
                    <button type="button" className="btn-close btn-white" data-bs-dismiss="modal" aria-label="Close" onClick={()=>setModalContent('')}></button>
                </div>
                <div className="modal-body  ">
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <div className="d-flex flex-column align-items-start mx-2 mb-2 mt-2">
                            <label className="text-white fw-bold " htmlFor="boardname">Board Name</label>
                            <input className="grey w-100 p-1 rounded shadow bg bg-dark" name="boardname" placeholder="e.g coffee board" {...register('boardname', {required:'Please enter a name',
                               })}/>
                               {errors.boardname && (<p className="text-danger ">{errors.boardname.message}</p>)}
                        </div>
                        <div className="d-flex flex-column align-items-start mx-2 mb-2 mt-2">
                            <label className="text-white fw-bold " htmlFor="description">Description</label>
                            <input className="grey w-100 p-1 rounded shadow bg bg-dark" name="description" placeholder="e.g take coffee brake"{...register('description', {required:'Please enter description',
                               })}/>
                               {errors.description && (<p className="text-danger ">{errors.description.message}</p>)}
                        </div>
                        <button className="btn btn-success btn-primary btn-md w-100">+ Create Board</button>
                    </form>
                    
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>setModalContent('')}>Close</button>
                </div>
            </div>
        </>
    )
}