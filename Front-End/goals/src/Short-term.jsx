import React from "react";
import {BsCheck2Square} from 'react-icons/bs'
import {GiSwordAltar} from 'react-icons/gi'

//Creates the short term goal component
function ShortTerm(props) {
    //Allows the page to rerender on delete by sending the id information to the App
    const deleteId = () => {
        props.deleteGoal(props.goals.goal_id)
    }
    //Sends information to current goal function so it can be updated when icon is clicked
    const currentGoal = () => {
        props.updateCurrentGoal(props.goals)
    }
    //Only returns the goals that have the short term goal id
    return(
        props.goals.goal_type_id === 1 ?
        <li > <GiSwordAltar className="icon" onClick={currentGoal}/> {props.goals.goal} <BsCheck2Square className="icon" onClick={deleteId}/> </li> : null
    )
}

export default ShortTerm;