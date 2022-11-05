import {useState} from 'react';
import React from 'react';
import Modal from "react-bootstrap/Modal";

const AddButton = () => {
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
      console.log(goal)
    }


    return (
      <>
      {/* Adds a popup that allows user to create a new goal */}
        <button id="addGoal" onClick={() => setShow(!show)}>
          Add Goal
        </button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create a new goal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div>
                <textarea id="goalAdd" type="text" placeholder='You can do it!' onKeyUp={addGoal}></textarea>
              </div>
              <div>
              <select className='dropDown' name="goals" id="goals" onChange={handleChange}>
                    <option value="1">Short-Term</option>
                    <option value="2">Long-Term</option>
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
                   .then(response => response)
                   .then(alert('Added goal, you got this!'))
                }}>Add Goal</button> 
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </>
    );
}


export default AddButton;