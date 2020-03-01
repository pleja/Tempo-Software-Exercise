import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
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
    const[showMembers, setShowMembers] = React.useState(false);
    
    //sets leader prop to state, leaves state at default if "undefined" is included (this is a bug fix)
    useEffect(() => {
        console.log(leader);
        if (!leader.includes("undefined")) {
            setMainLead(leader);
        } 
    }, [leader]);

    //maps members prop to JSX. Alphabetizes by last name.
    const memberList = () => {
        let count = 1;
        let sortedMembers = members;
        sortedMembers.sort((a,b) => a.lastName.localeCompare(b.lastName));
        const items = sortedMembers.map(member => {
            count++;
            return(
            <div key={count}> {member.firstName} {member.lastName}</div>
            )
        });
        return items;
    }

    //toggle to show members. This is an attempt to keep the UI clean.
    const showUsers = () => {
        setShowMembers(!showMembers);
    }

    return (
        <div style={boxStyle}>
            <div style={teamTitle} >{name}</div>
            <div>
                <span style={bolded}>Team Leader:</span> {" "}
                {mainLead}
            </div>
            <div style={bolded}>Members ({members.length}): </div>
            <Button variant="dark" onClick={showUsers} >View Members</Button>
            {showMembers ? memberList() : " "}
        </div>
    );
}

export default TeamBox;