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
  const[users, setUsers] = React.useState([]);
  const[teams, setTeams] = React.useState([]);
  const[isReady, setIsReady] = React.useState(false);
  const[number, setNumber] = React.useState(0);
  const[total, setTotal] = React.useState(0);

  useEffect(() => {
    let people = [];
    let teams = [];

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
          setIsReady(true);
          console.log(teams);
          console.log(newUsers);
        })
        .catch((err) => {
          console.log(err);
        })
    }

    axios.get("https://tempo-exercises.herokuapp.com/rest/v1/users")
      .then((response) => {
        console.log(response);
        setTotal(response.data.length);
        checkIndividual(0, response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
