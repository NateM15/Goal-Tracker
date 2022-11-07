import React from "react";
import {BsCheck2Square} from 'react-icons/bs'
import {GiSwordAltar} from 'react-icons/gi'


//Creates the long term goals component
function LongTerm(props) {
    //Allows the page to repopulate on delete
    const deleteId = () => {
        props.deleteGoal(props.goals.goal_id)
    }
    //Sends back information so current goal can be updated on icon click
    const currentGoal = () => {
        props.updateCurrentGoal(props.goals)
    }
    //Only sends the goals that have the long term goal id
    return(
        props.goals.goal_type_id === 2 ?
        <li> <GiSwordAltar className="icon" onClick={currentGoal}/> {props.goals.goal} <BsCheck2Square className="icon" onClick={deleteId}/></li> : null
    )
}

export default LongTerm;