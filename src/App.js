import React, { useEffect } from 'react';
import MainData from "./components/form.js";
import './App.css';
const axios = require("axios");

function App() {
  const[users, setUsers] = React.useState([]);
  const[teams, setTeams] = React.useState([{}]);
  const[isReady, setIsReady] = React.useState(false);

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
            checkIndividual(num, id);
          } else {
            setUsers(people);
            checkTeams()
            return;
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }

    const checkTeams = () => {
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

          setTeams(teams);
          setIsReady(true);
          console.log(teams);
        })
        .catch((err) => {
          console.log(err);
        })
    }

    axios.get("https://tempo-exercises.herokuapp.com/rest/v1/users")
      .then((response) => {
        console.log(response);
        checkIndividual(0, response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      {isReady ? 
        <div>
          ready <MainData />
        </div>
        :
        <div><MainData />Data loading, please wait</div>
      }
      
    </div>
  );
}

export default App;
