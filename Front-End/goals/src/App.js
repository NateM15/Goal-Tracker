import React, { useState, useEffect } from 'react';
import CurrentGoal from './CurrentGoal';
import ShortTerm from './Short-term';
import LongTerm from './Long-term';
import AddButton from './AddButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import useSound from 'use-sound';
import victory from './victory.mp3'




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
  //Creates a function that plays the mp3 sound when called, currently it is used when a goal is completed
  const [play] = useSound(victory)
  
  //Delete the goal on completion
  //Creates a function that deletes the goal where the check mark is clicked
  const deleteGoal = (idInput) => {
    console.log(data)
    let id = idInput
    fetch(`http://localhost:8001/api/delete/${id}`, {
        method: 'DELETE'})
        .then(() => {
          play()
          alert('Great job on completing your goal!')
        })
        .then( setData(data.filter(data => data.goal_id !== id)))
        .then(setActiveGoal(false))
        .then(console.log('Delete active goal:', activeGoal))
        .catch(error => console.log(error))
  }

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
      <h1>TRACK YOUR GOALS!</h1>
      <AddButton />
      {trackGoal.map(info => <CurrentGoal key={info.id} trackGoal={info} activeGoal={activeGoal}/>)}
      <div id="container">
        <div id="shortTerm">
          <ul> 
            <h2>Short-Term</h2>
            {data.map(data => <ShortTerm key={data.goal_id} goals={data} updateCurrentGoal={updateCurrentGoal} deleteGoal={deleteGoal}/>)} 
          </ul>
        </div>
        <div id="longTerm">
          <ul> 
            <h2>Long-Term</h2>
            {data.map(data => <LongTerm key={data.goal_id} goals={data} updateCurrentGoal={updateCurrentGoal} deleteGoal={deleteGoal}/>)}
          </ul>
        </div>
        </div>
    </div>
  )
}

export default App;