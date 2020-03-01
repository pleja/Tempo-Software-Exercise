import React, { useEffect } from 'react';
import MainData from "./components/form.js";
import './App.css';

const axios = require("axios");

const mainTitle = {
  fontSize: "30px",
  fontWeight: "900",
  margin: "10px"
}

function App() {

  //State
  const[users, setUsers] = React.useState([]);
  const[teams, setTeams] = React.useState([]);
  const[isReady, setIsReady] = React.useState(false);
  const[number, setNumber] = React.useState(0);
  const[total, setTotal] = React.useState(0);

  //API data acquisition
  useEffect(() => {
    let people = [];
    let teams = [];


    //recursive function to acquire each user first/last name. Creates user objects and packs into users list.
    const checkIndividual = (count, id) => {
      axios.get(`https://tempo-exercises.herokuapp.com/rest/v1/users/${id[count].userId}/`)
        .then((res) => {
          let user = {
            Id: id[count].userId,
            firstName: res.data.name.first,
            lastName: res.data.name.last,
            team: id[count].teamId
          }
          people.push(user);
          if (count < id.length - 1) {
            let num = count + 1;
            setNumber(count);
            checkIndividual(num, id);
          } else {
            checkTeams(people);
            return;
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }

    //called upon end of checkIndividual(). Pulls team data, packs into teams list.
    const checkTeams = (people) => {
      axios.get(`https://tempo-exercises.herokuapp.com/rest/v1/teams`)
        .then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            let team = {
              Id: res.data[i].id,
              name: res.data[i].name,
              leader: {},
              members: []
            }
            for (let j = 0; j < people.length; j++) {
              if (people[j].Id === res.data[i].teamLead) {
                team.leader = people[j];
              } else if (people[j].team === team.Id) {
                team.members.push(people[j]);
              }
              
            }
            teams.push(team);
          }
          let newUsers = people;
          for (let k = 0; k < newUsers.length; k++) {
            for (let ii = 0; ii < teams.length; ii++) {
              if (newUsers[k].team === teams[ii].Id) {
                newUsers[k].team = teams[ii].name;
              }
            }
          }

          setTeams(teams);
          setUsers(newUsers);
          setIsReady(true); //exits loading mode and enables rendering of data
        })
        .catch((err) => {
          console.log(err);
        })
    }

    //pulls initial list of users, then initiates a recursive function to update first and last names.
    axios.get("https://tempo-exercises.herokuapp.com/rest/v1/users")
      .then((response) => {
        setTotal(response.data.length);
        checkIndividual(0, response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Loading screen shows progress of recursive function.
  return (
    <div className="App">
      <div style={mainTitle}>Tempo Exercise App</div>
      {isReady ? 
        <div>
          <MainData users={users} teams={teams} />
        </div>
        :
        <div>
          <div>Data loading, please wait</div>
          <div>{number} / {total} </div>
        </div>
      }
      
    </div>
  );
}

export default App;
