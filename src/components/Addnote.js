import React ,  { useContext , useState } from 'react'


import NoteContext from "../context/notes/noteContext"
const Addnote = () => {
    const context = useContext(NoteContext);

    const {  addNote } = context;


    const [note , setNote] = useState({title:""  , description : "" , tag : ""});



    const handleChange = (e) =>{

     setNote({...note , [e.target.name]: e.target.value})


    }

    const onClick =(e)=>{
        e.preventDefault();
         addNote(note.title , note.description , note.tag);
         setNote({title: "", description: "", tag: ""})
    }
    



  return (
   <>
    <div className='container my-3'>
    <h2> Add a Note </h2>
     <form>
  <div className="form-group">
    <label for="title">title</label>
    <input name="title"  type="text" className="form-control" id="title" aria-describedby="emailHelp" placeholder="Enter title"  onChange={ handleChange } value={note.title} />
  
  </div>
  <div className="form-group">
    <label for="description">Description</label>
    <input type="text" className="form-control" id="description" name="description" value={note.description} placeholder="enter description"   onChange={handleChange}/>
  </div>
 
  <button type="submit" className="btn btn-primary"  onClick={onClick} >Submit</button>
</form>



         </div>

   </>
  )
}

export default Addnote