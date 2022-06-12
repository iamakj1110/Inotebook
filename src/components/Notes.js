// import React from 'react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from "../context/notes/noteContext"
import NotesItem from './NotesItem';
import { useHistory } from 'react-router-dom';

const Notes = () => {
  const history = useHistory();
  const context = useContext(NoteContext);

  const { notes, getNotes, editNote } = context;

  const [enote, seteNote] = useState({ etitle: " ", edescription: " ", etag: " " })



  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log(token);
      getNotes()
    }
    else {
      history.push('/login')
    }
    // eslint-disable-next-line
  }, [])

  const ref = useRef(null);
  const updateNote = (currentNote) => {
    ref.current.click();
    seteNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
  }

  const handleChange = (e) => {
    seteNote({ ...enote, [e.target.name]: e.target.value })
  }


  const closeref = useRef(null);
  const updateModal = () => {
    console.log("updating note", enote)
    editNote(enote.id, enote.etitle, enote.edescription, enote.etag)
    closeref.current.click();
  }





  return (
    <>



      <button type="button" ref={ref} className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModalCenter">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Edite Notes</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">



              <div className='container my-3'>
                <h2> Add a Note </h2>
                <form>
                  <div className="form-group">
                    <label for="title">title</label>
                    <input name="etitle" value={enote.etitle} onChange={handleChange} type="text" className="form-control" id="title" aria-describedby="emailHelp" placeholder="Enter title" />

                  </div>
                  <div className="form-group">
                    <label for="description">Description</label>
                    <input type="text" name="edescription" value={enote.edescription} onChange={handleChange} className="form-control" id="description" placeholder="enter description" />
                  </div>

                </form>



              </div>
            </div>
            <div className="modal-footer">
              <button type="button" ref={closeref} className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" onClick={updateModal} className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>














      <div className='container '>
        <div className='row'>

          <h3 className='mt-5'> Your Notes</h3>

          {
            notes?.map((note) => {
              return <NotesItem key={note._id} note={note} updateNote={updateNote} />;
            })
          }
        </div>
      </div>


    </>
  )
}

export default Notes