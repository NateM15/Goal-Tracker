import React, { useState, useEffect } from 'react';
import CurrentGoal from './CurrentGoal';
import ShortTerm from './Short-term';
import LongTerm from './Long-term';
import AddButton from './AddButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import useSound from 'use-sound';
import victory from './victory.mp3';
import swal from 'sweetalert';




function App() {
  //Creates a state to put the fetch data
  const [data, setData] = useState([]);
  //Fetches the data from goal database then sets data to the information and uses it to pass down to short-term and long-term components
  useEffect(() => {
    fetch('http://localhost:8001/api/goals')
    .then(result => result.json())
    .then(result => setData(result))
  },[])

  //Play sound
  //Creates a function that plays the mp3 sound when called, used when goal is created and completed
  const [play] = useSound(victory, {volume: .05, interrupt: true})


  //Delete the goal on completion
  //Creates a function that deletes the goal where the check mark is clicked
  const deleteGoal = (idInput) => {
    let id = idInput.goal_id
    fetch(`http://localhost:8001/api/delete/${id}`, {
        method: 'DELETE'})
        .then(() => {
          play()
          swal('Quest completed, great job Adventurer!')
        })
        .then( setData(data.filter(data => data.goal_id !== id)))
        //Checks to see if the tracked goal is the same as the deleted goal, if it is then it displays the no current goal 
        .then( trackGoal[0].goal === idInput.goal ? 
            setActiveGoal(false) : null)
        .catch(error => console.log(error))
  }

  //Tracks active goal state to update and show the current goal or display no goal message
  const [activeGoal, setActiveGoal] = useState()

  //Sets a state that allows the current goal to be tracked
  const [trackGoal, setTrackGoal] = useState([])

  //Get current goal
  //Fetches the data from current goal to be passed down to the current goal component to be used
    useEffect(() => {
      fetch('http://localhost:8001/api/current-goal')
      .then(result => result.json())
      .then(result => setTrackGoal(result))
  }, [])

  //Update current goal
  //Handles the update on the current goal, used to set which one it is by updating the current goal database
  const updateCurrentGoal = (goalInfo) => {
    console.log(goalInfo)
    fetch('http://localhost:8001/api/update', {
      method: 'PATCH',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        goal: `${goalInfo.goal}`
      })
    })
    .then(response => response)
    .then(console.log('Set current goal'))
    .then(() => {
      setTrackGoal([goalInfo])
      setActiveGoal(true)
    })
  }

  //Sets up the app/components to be rendered and passes down props to the other components
  return(
    <div id="page">
      <h1>Quest Log</h1>
      {/* Accesses the add button component */}
      <AddButton goals={data} setData={setData} activeGoal={activeGoal} setActiveGoal={setActiveGoal}/>
      {/* Maps the track goal info and passes it to Current Goal component */}
      {trackGoal.map(info => <CurrentGoal key={info.id} trackGoal={info} data={data} setActiveGoal={setActiveGoal} activeGoal={activeGoal}/>)}
      <div id="container">
        <div id="shortTerm">
          <ul> 
            <h2>Side Quests</h2>
            {data.map(data => <ShortTerm key={data.goal_id} goals={data} updateCurrentGoal={updateCurrentGoal} deleteGoal={deleteGoal}/>)} 
          </ul>
        </div>
        <div id="longTerm">
          <ul> 
            <h2>Main Quests</h2>
            {data.map(data => <LongTerm key={data.goal_id} goals={data} updateCurrentGoal={updateCurrentGoal} deleteGoal={deleteGoal}/>)}
          </ul>
        </div>
        </div>
    </div>
  )
}

export default App;
