
export const deleteTask =(
    boardName,
    board,
    itemToDelete,
    setUpdatedItem,
    setBoardInformation
    )=>{
    const newArray = board.forEach((bod)=>{
        if(bod.name === boardName){
            bod.tasks =  bod.tasks.filter((task)=> task.title !== itemToDelete)
            setUpdatedItem(board);
            setBoardInformation(bod.tasks);
        }
        return bod;              
    })
}