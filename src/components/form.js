import React from 'react';
import TeamBox from "./teamBox.js";
import UserBox from "./userBox.js";
import Button from 'react-bootstrap/Button';

import '../App.css';


const space = {
  margin: "10px"
}

//Component which organize data and switches between Team and User view
function MainData({ users, teams }) {

  //state
  const[isTeamSearch, setIsTeamSearch] = React.useState(true);
  const[searchMsg, setSearchMsg] = React.useState("Change to User");
  const[teamText, setTeamText] = React.useState("");
  const[name, setName] = React.useState("");
  
  
  //click function to toggle between Team and User view
  const changeSearch = () => {
    setIsTeamSearch(!isTeamSearch);
    if(isTeamSearch) {
      setSearchMsg("Change to Team");
    } else {
      setSearchMsg("Change to User");
    }
  }

  //updates Team search term
  const updateTeam = (e) => {
    setTeamText(e.target.value);
  }

  //updates user search term
  const updateName = (e) => {
    setName(e.target.value);
  }

  //maps list of Teams from props, and renders a TeamBox component for each. 
  //If text is entered to search, the list is shortened to only map matches.
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

  //maps list of Users from props, and renders UserBox components.
  //if text is entered to search, the list mapped is shortened.
  //alphabetized by last name.
  const showUsers = () => {
    let sortedUsers = users;
    sortedUsers.sort((a,b) => a.lastName.localeCompare(b.lastName));
    if (name === "") {
      const userList = sortedUsers.map(user => {
        let fullName = `${user.firstName} ${user.lastName}`;
        return(
          <UserBox key={user.Id} name={fullName} team={user.team} />
        );
      });
      return userList;
    } else if (name.length > 0) {
      let listOfSearched = [];
      for (let i = 0; i < sortedUsers.length; i++) {
        let usersName = `${sortedUsers[i].firstName} ${sortedUsers[i].lastName}`;
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
          <div>Enter Team Name</div>
          <input onChange={updateTeam} type="text" value={teamText} />
        </div>
        :
        <div style={space}>
          <h2 style={space}> Viewing Teams</h2>  
          <div>Enter User Name</div>
          <input onChange={updateName} type="text" value={name} />
        </div>}
      </div>
      <Button variant="dark" onClick={changeSearch}>{searchMsg}</Button>
      <div className="boxes">
        {isTeamSearch ? showTeams() : showUsers()}
      </div>
    </div>
  );
}

export default MainData;

