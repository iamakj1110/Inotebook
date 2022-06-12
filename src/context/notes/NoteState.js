import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {



  const notesinitial = [
    {
      "_id": "6205f2965420f079737d11b1",
      "user": "6203f3f2a2f177f0d9353a8a",
      "title": "Data structure",
      "description": "learning dsa min 3 hour",
      "tag": "study",
      "date": "2022-02-11T05:22:30.515Z",
      "__v": 0
    },


  ]
  const [notes, setnotes] = useState(notesinitial);

  // get notes from database------------------------------

  const getNotes = async () => {
    console.log(localStorage.getItem('token'));
    const response = await fetch("http://localhost:5000/api/notes/getnotes", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },

    });
    console.log(
      response
    );
    const json = await response.json();
    console.log(json);
    setnotes(json);
  }




  // Add a note------------------------------

  const addNote = async (title, description, tag) => {
    const response = await fetch("http://localhost:5000/api/notes/addnote", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')

      },
      body: JSON.stringify({ title, description, tag })



    });
    const note = await response.json();
    console.log(response.body);
    console.log(response);



    setnotes(notes.concat(note))
  }



  // Delete a Note--------------------------------------------

  const deleteNote = async (id1) => {


    const response = await fetch(`http://localhost:5000/api/notes/deletenotes/${id1}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')

      }

    });
    const json = response.json();
    const arr = notes.filter(x => x._id !== id1);
    setnotes(arr);

  }



  // Edite a Note------------------------------------------------

  const editNote = async (id2, title, description, tag) => {

    const response = await fetch(`http://localhost:5000/api/notes/updatenotes/${id2}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')

      },

      body: JSON.stringify({ title, description, tag })
    });

    const json = await response.json();
    let newNotes = JSON.parse(JSON.stringify(notes))

    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id2) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setnotes(newNotes);
  }










return (
  <NoteContext.Provider value={{ notes, setnotes, addNote, deleteNote, editNote, getNotes }}>
    {props.children}
  </NoteContext.Provider>

)


}
export default NoteState;