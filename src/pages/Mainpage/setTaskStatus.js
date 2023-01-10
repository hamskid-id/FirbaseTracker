import { toast } from "react-toastify";
import {updateDoc, doc} from "firebase/firestore"; 
import { db } from "../../firebaseConfigue.js";
import { useEffect, useState } from "react";
import { deleteTask } from "./deleteTask.js";

export const SetTaskStatus =({
        boardId,
        boardName,
        board,
        item,
        setModalContent,
        setBoardInformation
    })=>{
        const [updatedBoard, setUpdatedBoard] = useState();
        const [updatedItem,setUpdatedItem] = useState();

        useEffect(()=>{
            const userRef = doc(db, "Users", boardId);
            if(updatedBoard){
                updateDoc(userRef, {
                    board: updatedBoard
                });
                toast("status updated successfully");
            } 
            if(updatedItem){
                updateDoc(userRef, {
                    board: updatedItem
                });
                toast("deleted successfully");
                setModalContent('');
            }
        },[updatedBoard,boardId,updatedItem,setModalContent]);

        return(
            <>
                <div className="modal-content bg bg-dark mmb-2">
                    <div className="modal-header border-none">
                        <h6 className="modal-title text-white" id="exampleModalLabel">Update Task Status</h6>
                        <button type="button" className="btn-close btn-white" data-bs-dismiss="modal" aria-label="Close" onClick={()=>setModalContent('')}></button>
                    </div>
                    <div className="modal-body">                    
                        <h6 className="text-white fw-bold fs-4">{item.title}</h6>
                        <h6 className="wheat border_bottom_wheat p-2">created on {item.date}</h6>
                        <ul className="d-flex flex-column ps-0">
                            {
                                item?.subtask?.map((info, index)=>{
                                    const {name, status} = info
                                    console.log(name)
                                    return(
                                        <li key={index} className="d-flex justify-content-between m-2 rounded p-2">
                                            <h3 className="text-white fs-5 break">{name}</h3>
                                            <div>
                                                <select className="rounded bg-dark grey p-2" onChange={(e)=>{
                                                    const handleChange = async()=>{
                                                        try{                                                       
                                                            const newArray = board.forEach((bod)=>{
                                                                if(bod.name === boardName && bod.tasks.length !==0){
                                                                    bod.tasks.forEach((task)=>{
                                                                        if(task.subtask.length !==0){
                                                                            task.subtask.forEach((item)=>{
                                                                                if(item.name ===  name){
                                                                                    task.lastUpdated = new Date()
                                                                                        .toLocaleString(
                                                                                        "en-US",
                                                                                        {
                                                                                            timeZone:
                                                                                                "Africa/Lagos"
                                                                                        }
                                                                                    )
                                                                                    item.status = e.target.value;                                                                          
                                                                                    setUpdatedBoard([...board])
                                                                                    return bod
                                                                                }
                                                                            })
                                                                        }
                                                                    })
                                                                }  else{
                                                                    return bod 
                                                                } 
                                                                        
                                                            })
                                                        }catch(err){
                                                            console.log(err);
                                                        }
                                                    }
                                                    handleChange()

                                                }}>
                                                    <option value={status}>{status}</option>
                                                    <option value="todo">todo</option>
                                                    <option value="doing">doing</option>
                                                    <option value="done">done</option>
                                                </select>
                                            </div>
                                        
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <h6 className="wheat p-2">Last Updated : {item.lastUpdated}</h6>
                        <button className="btn btn-sm btn-danger test-white" onClick={
                            ()=>
                                deleteTask(
                                    boardName,
                                    board,
                                    item.title,
                                    setUpdatedItem,
                                    setBoardInformation
                                )
                            }>
                            delete
                        </button>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={
                            ()=>
                                setModalContent('')
                            }>
                            Close
                        </button>
                    </div>
                </div>
            </>
        )
}