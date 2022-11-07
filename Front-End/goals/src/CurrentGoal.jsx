// Create current goal tracker
// Ideas: add dependancy on goal dt for current_goal and then on delete Cascade
// - Make a ternary that if there isnt a current goal it shows A message relaying that
// - Add an icon to all tasks that lets you set the current task when clicked
import { useEffect, useState } from "react";

function CurrentGoal(props) {
    const noGoal = 'No current quest, click sword to track new quest.'
    return (
        <div className="currentGoal" >
            <h3>Active Quest:</h3>
            {console.log(props.activeGoal)}
            <p >{props.activeGoal ? props.trackGoal.goal : noGoal}</p>
        </div>
    )
}

export default CurrentGoal;