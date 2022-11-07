import {useState} from 'react';
import React from 'react';
import Modal from "react-bootstrap/Modal";
import sunrise from './sunrise.mp3';
import useSound from 'use-sound';
import swal from 'sweetalert'


const AddButton = (props) => {

  //Creates a play function that allows the sunrise mp3 to play
    const [play] = useSound(sunrise, {volume: .10})
  // 7-10 Handles the state for the Modal box, allows user to open it and then hide it when closed
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    // 13-15 Gets the id value form the drop down bar, 1 is for short-term (the default), 2 is for longterm
    const [id, setId] = useState(1);
    const handleChange = (e) => {
      setId(e.target.value)
    }
    //Sets up a state that allows the goal to be created by accessing the information from the input bar
    const [goal, setGoal] = useState('')

    const addGoal = (event) => {
      let text = event.target.value
      setGoal(text)
    }

    //Makes it so the page doesn't refresh when the form is submitted
    const onSubmit = (e) => {
      e.preventDefault()
    }


    return (
      <>
      {/* Adds a popup that allows user to create a new goal */}
        <button id="addGoal" onClick={() => {
          play()
          setShow(!show)
        }}>
          New Quest
        </button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Quest</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={onSubmit}>
              <div>
                <textarea id="goalText" type="text" placeholder='Time to explore!' onKeyUp={addGoal}></textarea>
              </div>
              <div className="inputs">
              <select className='dropDown' name="goals" id="goals" onChange={handleChange}>
                    <option value="1">Side Quest</option>
                    <option value="2">Main Quest</option>
                </select> 
                <button className='addGoal' onClick={() => {
                  //Creates the goal using the information put into the input bar and the dropdown
                   fetch(`http://localhost:8001/api/create/${id}`, {
                      method: 'POST',
                      headers: {
                        'content-type': 'application/json'
                      },
                      body: JSON.stringify({
                        goal: goal,
                        goal_type_id: `${id}`
                      })
                   })
                   .then(response => response.json())
                   .then(response => props.setData([...props.goals, response[0]]))
                   .then(setId(1))
                   .then(
                    swal('Created Quest, good luck Adventurer!')
                  )
                  .then(handleClose)
                }}>Add Quest</button> 
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </>
    );
}


export default AddButton;