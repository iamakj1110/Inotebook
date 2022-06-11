import React from 'react'
import { useContext } from 'react';
import NoteContext from '../context/notes/noteContext';
const NotesItem = (props) => {
  const context = useContext(NoteContext);

  const {  deleteNote , editNote } = context;

  const removeItem =()=>{
     
       
        deleteNote(props.note._id);

  }



  return (
       <>
      




      <div className='col-md-3'>
      <div className="card bg-light mb-3" style={{"maxWidth": 400} }>
  <div className="card-header">{props.note.tag}</div>
  <div className="card-body">
    <h5 className="card-title">{props.note.title}</h5>
    <p className="card-text">{props.note.description} <i class="fa-light fa-trash-can"></i></p>
    <i onClick={removeItem} className="far fa-trash-alt"></i>
    <i  onClick={()=>{props.updateNote(props.note)}}    className="far fa-edit mx-2" ></i>
 
    
  </div>

</div>
</div>
      </>
  )
}

export default NotesItem