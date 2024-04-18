/*
Task:                App.js
Assigned to:         Admin
Date assigned:       20th July 2024
Due date:            20th July 2024
Task complete?       Yes
Task description:    Create an html file called api.js
*/

import React, { useState, useEffect, usefetch } from "react";
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {

  // Below is use useEffect to fetch my json data.
  const [fetchJSON, setFetchJSON] = useState([]);

  useEffect(() => {
    display();
  }, [])

  const display = () => {

    fetch("http://localhost:3500/api")
    .then((res) => res.json())
    .then((resp) => {
      console.log(resp);
      setFetchJSON(resp);
    });
  };

  //------------------------------------------------------------------------------
  // Below I am using a put request to send the username to my backend.
  const [word, setWord] = useState("");

  const sendWord = () => {

    // Below I am creating the array that will be added to my json file.
    const arr = { "word": word};

    fetch("http://localhost:3500/add", {
      method: "PUT",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(arr)
    })
    .then(response => response.json());
  }

  

  return(
    <div>
      <div>
        <h1> Welcome to my fullstack webpage! </h1>
      </div>

      <div>
        <h3> To search for a user on github enter their username below: </h3>

        <form >
          <input type="text" id="Username" name="Username" placeholder="Username: " value={word} onChange={(e) => setWord(e.target.value)} /><br/>
          <button type="submit" onClick={sendWord} > Search </button>
        </form>
      </div>

      <div>
        <h3> User information displayed below: </h3>
        {fetchJSON.map(data =>
        <p> Username: {data.username} <br/>
        Repos: {data.repos} <br/>
        Bio: {data.bio} <br/>
        Profile picture url: {data.pfp}
        <br/><br/>
        <h3> Repo information displayed below: </h3>
        Repo ID: {data.repoID} <br/>
        latest commit: {data.newCom} <br/>
        Creation date: {data.cDate} <br/>
        Description {data.descrip} 
        </p>
        )}
      </div>

      

    </div>
  )


  

}

export default App;
