import React, { useEffect } from 'react';
import '../App.css';
const teamTitle = {
    fontSize: "24px",
    fontWeight: "900"

}

const boxStyle = {
    border: "2px solid black",
    width: "300px",
    padding: "10px",
    margin: "15px",
    backgroundColor: "grey"
}

const bolded = {
    fontWeight: "900"
}
function TeamBox({ name, leader, members }) {
    const[mainLead, setMainLead] = React.useState("");

    useEffect(() => {
        console.log(leader);
        if (!leader.includes("undefined")) {
            setMainLead(leader);
        } 
    }, [leader]);

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
            <div>
                <span style={bolded}>Team Leader:</span> {" "}
                {mainLead}
            </div>
            <div style={bolded}>Members: </div>
            {memberList()}
        </div>
    );
}

export default TeamBox;