import React from 'react';
import '../App.css';
const teamTitle = {
    fontSize: "24px",

}

const boxStyle = {
    border: "2px solid black",
    width: "300px",
    padding: "10px",
    margin: "15px",
    backgroundColor: "grey"
}
function TeamBox({ name, leader, members }) {

    const memberList = () => {
        let count = 1;
        const items = members.map(member => {
            count++;
            return(
            <div key={count}> {member.firstName} {member.lastName}</div>
            )
        });
        return items;
    }

    return (
        <div style={boxStyle}>
            <div style={teamTitle} >{name}</div>
            <div>Team Leader: <span>{leader}</span></div>
            <div>Members: </div>
            {memberList()}
        </div>
    );
}

export default TeamBox;