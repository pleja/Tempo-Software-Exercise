import React, { useEffect } from 'react';
import '../App.css';
const axios = require("axios");

function MainData({ users, teams }) {
  const[isTeamSearch, setIsTeamSearch] = React.useState(true);
  const[searchMsg, setSearchMsg] = React.useState("Change to User");
  const[teamText, setTeamText] = React.useState("");
  const[firstName, setFirstName] = React.useState("");
  const[lastName, setLastName] = React.useState("");
  

  const changeSearch = () => {
    setIsTeamSearch(!isTeamSearch);
    if(isTeamSearch) {
      setSearchMsg("Change to User");
    } else {
      setSearchMsg("Change to Team");
    }
  }

  const updateTeam = (e) => {
    setTeamText(e.target.value);
  }

  const updateFirst = (e) => {
    setFirstName(e.target.value);
  }

  const updateLast = (e) => {
    setLastName(e.target.value);
  }
  
  const searchTeam = () => {
    console.log(teamText);
  }

  const searchUser = () => {
    console.log(`${firstName} ${lastName}`);
  }
  return (
    <div >
      <button onClick={changeSearch}>{searchMsg}</button>
      <div>
        {isTeamSearch ? 
        <div>
          <input onChange={updateTeam} label="Enter Team Name" value={teamText}></input>
          <button onClick={searchTeam}>Search</button>
        </div>
        :
        <div>
          <input onChange={updateFirst} label="Enter First Name" value={firstName}></input><br/>
          <input onChange={updateLast} label="Enter Last Name" value={lastName}></input>
          <button onClick={searchUser}>Search</button>
        </div>}
      </div>
      
      
      
    </div>
  );
}

export default MainData;

/* <div>
        <input onClick={changeToTeam} type="radio" id="team" name="search" value="team"></input>
        <label for="team">Team</label>
        <input type="radio" id="user" name="search" value="user"></input>
        <label for="user">User</label>
      </div> */