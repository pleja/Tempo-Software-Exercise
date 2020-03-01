import React from 'react';
import '../App.css';
const Name = {
    fontSize: "24px",

}

const boxStyle = {
    border: "2px solid black",
    width: "300px",
    padding: "10px",
    margin: "15px",
    backgroundColor: "grey"
}
function UserBox({ name, team }) {

    return (
        <div style={boxStyle} >
            <div style={Name} >{name}</div>
            <div>Team: <span>{team}</span></div>
        </div>
    );
}

export default UserBox;