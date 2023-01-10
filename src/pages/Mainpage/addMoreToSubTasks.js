import { toast } from "react-toastify";
import {updateDoc, doc} from "firebase/firestore"; 
import { db } from "../../firebaseConfigue.js";
import { useState } from "react";

export const AddMoreToSubTask =(
        {
            boardId,
            boardName,
            board,
            setModalContent,
            title
        }
    )=>{
    const [subTasks, setSubTasks] = useState([]);
    const [showPrompt, setPrompt] = useState(false);
    const [formValue, setFormValue]= useState({
            name:"",
            status:"To do"
        }
    )
    
    const AddNewSubTask = async(title, list)=>{
        try{

            const userRef = doc(db, "Users", boardId);
            const newArray = board.map((bod)=>{
                if(bod.name === boardName){
                    if(bod.tasks.length !==0){
                        bod.tasks.forEach((task)=>{
                            if(task.title === title){
                                task.subtask.push(...list)
                                task.lastUpdated = new Date()
                                .toLocaleString(
                                    "en-US",
                                    {
                                        timeZone:
                                            "Africa/Lagos"
                                    }
                                )
                            }
                        })
                    }else{
                        bod.tasks.push({
                            title:title,
                            subtask:list,
                            date: new Date()
                                .toLocaleString(
                                "en-US",
                                {
                                    timeZone:
                                        "Africa/Lagos"
                                }
                            ),
                            lastUpdated:'no update has being made since creation'
                            
                        })
                    }
                    return{
                        ...bod,
                        tasks:bod.tasks
                    }
                }else{
                    return bod
                }  
                //     bod.tasks.push({
                //         title:title,
                //         subtask:list,
                //         date: new Date()
                //             .toLocaleString(
                //             "en-US",
                //             {
                //                 timeZone:
                //                     "Africa/Lagos"
                //             }
                //         ),
                //         lastUpdated:'no update has being made since creation'
                        
                //     })
                //     return{
                //         ...bod,
                //         tasks:bod.tasks
                //     }
                // }else{
                //     return bod
                // }               
            })
            await
                updateDoc(userRef, {
                    board: newArray
                });
           
            toast("added successfully");
            setFormValue(
                {
                    name:"",
                    status:"To do"
                }
            );
            setSubTasks([]);
        }catch(err){
            console.log(err);
        }
    }

  const handleSubmit = () => {
    AddNewSubTask(title, subTasks)
    console.log("submitted");
  }

  const PushContentToArray=(e)=>{
    if(e.key === 'Enter'){
        if(subTasks.length !==0){
            let Duplicate = false;
            subTasks.forEach((item)=>{
                if(item.name === formValue.name){
                    Duplicate = true;
                }
            })
            if(Duplicate){
                toast.error("item already exist")
            }else{
                setSubTasks(
                    [...subTasks,
                        formValue
                    ]
                )
            }
        }else{
            setSubTasks(
                [...subTasks,
                    formValue
                ]
            )
        }
        setFormValue(
            {...formValue,
                name:""
            }
        )
    }
  }

  const removeFromList =(e)=>{
    const newList = subTasks.filter((task)=>task.name !== e.name)
    setSubTasks(newList);

  }

    return(
        <>
            <div className="modal-content bg bg-dark mmb-2">
                <div className="modal-header border-none">
                    <h5 className="modal-title text-white" id="exampleModalLabel">Add More task to the list</h5>
                    <button type="button" className="btn-close btn-white" data-bs-dismiss="modal" aria-label="Close"  onClick={()=>setModalContent('')}></button>
                </div>
                <div className="modal-body  ">
                    <div>
                        <div className="d-flex flex-column align-items-start mx-2 mb-2 mt-2">
                            <p className="text-white fw-bold">{title}</p>
                        </div>
                        <div className="d-flex flex-column align-items-start mx-2 mb-2">
                            <label htmlFor="subtask" className="text-white fw-bold ">Subtask</label>
                            {
                                subTasks?.map((task, index)=>{
                                    const {name} = task
                                    return(
                                        <div className="p-2 rounded border text-white d-flex justify-content-between w-75 m-2" key={index}>
                                            <span>
                                                {name}
                                            </span>
                                            <span onClick={()=>removeFromList({name})}>
                                                <img 
                                                    src="https://res.cloudinary.com/hamskid/image/upload/v1670603040/close-svgrepo-com_1_ie1sje.svg"
                                                    alt="object not found"
                                                    />
                                            </span>
                                        </div>
                                        
                                    )
                                })
                            }
                            <div className="w-100">
                                <input className="grey w-100 p-1 rounded shadow bg bg-dark" name="subtask" placeholder="e.g Drink coffee and smile" onFocus={()=>setPrompt((prev)=>!prev)} onKeyDown={PushContentToArray} value={formValue.name} onChange={(e)=>setFormValue({...formValue, name:e.target.value})}/>
                                {showPrompt && <span className="text-primary propmtText">After entering the name,hit the tab button to add the task to the list</span>}
                            </div>
                        </div>
                        <button className="btn btn-success btn-primary btn-md w-100" onClick={handleSubmit}>Create Task</button>

                    </div>
                    
                </div>
                <div className="modal-footer">
                    <button className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>setModalContent('')}>Close</button>
                </div>
            </div>
        </>
    )
}