import React, { useEffect } from 'react';
import '../App.css';
const axios = require("axios");

function MainData({ users, teams }) {
  

  

  return (
    <div >
      <input></input>
      <button>Submit</button>
      <div>
        <input type="radio" id="team" name="search" value="team"></input>
        <label for="team">Team</label>
        <input type="radio" id="user" name="search" value="user"></input>
        <label for="user">User</label>
      </div>
      
      
    </div>
  );
}

export default MainData;
