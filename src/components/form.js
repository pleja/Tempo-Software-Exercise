import React, { useEffect } from 'react';
import TeamBox from "./teamBox.js";
import UserBox from "./userBox.js"
import '../App.css';
const axios = require("axios");

const space = {
  margin: "10px"
}

function MainData({ users, teams }) {
  const[isTeamSearch, setIsTeamSearch] = React.useState(true);
  const[searchMsg, setSearchMsg] = React.useState("Change to User");
  const[teamText, setTeamText] = React.useState("");
  const[name, setName] = React.useState("");
  
  

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

  const updateName = (e) => {
    setName(e.target.value);
  }

  const showTeams = () => {
    if (teamText === "") {
      const teamList = teams.map(team => {
        let fullName = `${team.leader.firstName} ${team.leader.lastName}`;
        return(
          <TeamBox key={team.Id} name={team.name} leader={fullName} members={team.members} />
        );
      });
      return teamList;
    } else if (teamText.length > 0) {
      let listOfSearched = [];
      for (let i = 0; i<teams.length; i++) {
        if (teams[i].name.includes(teamText)) {
          listOfSearched.push(teams[i]);
        }
      }
      const teamList = listOfSearched.map(team => {
        let fullName = `${team.leader.firstName} ${team.leader.lastName}`;
        return(
          <TeamBox key={team.Id} name={team.name} leader={fullName} members={team.members} />
        );
      });
      return teamList;
    }
    
  }

  const showUsers = () => {
    if (name === "") {
      const userList = users.map(user => {
        let fullName = `${user.firstName} ${user.lastName}`;
        return(
          <UserBox key={user.Id} name={fullName} team={user.team} />
        );
      });
      return userList;
    } else if (name.length > 0) {
      let listOfSearched = [];
      for (let i = 0; i < users.length; i++) {
        let usersName = `${users[i].firstName} ${users[i].lastName}`;
        if (usersName.includes(name)) {
          listOfSearched.push(users[i]);
        }
      }
      const userList = listOfSearched.map(user => {
        let fullName = `${user.firstName} ${user.lastName}`;
        return(
          <UserBox key={user.Id} name={fullName} team={user.team} />
        );
      });
      return userList;
    }
  }
  return (
    <div >
      
      <div>
        {isTeamSearch ? 
        <div style={space}>  
          <h2 style={space}> Viewing Teams</h2>
          <span style={space}>Enter Team:</span>
          <input onChange={updateTeam} label="Enter Team Name" value={teamText} />
        </div>
        :
        <div style={space}>
          <div style={space}> Viewing Teams</div> 
          <span style={space}>Enter Name:</span> 
          <input onChange={updateName} label="Enter First Name" value={name} />
        </div>}
      </div>
      <button onClick={changeSearch}>{searchMsg}</button>
      <div className="boxes">
        {isTeamSearch ? showTeams() : showUsers()}
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