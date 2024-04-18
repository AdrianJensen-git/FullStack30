/*
Task:                api.js
Assigned to:         Admin
Date assigned:       20th July 2024
Due date:            20th July 2024
Task complete?       Yes
Task description:    Create an html file called api.js
*/

const fs = require('fs')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const Axios = require('axios');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

const port = process.env.PORT || 3500;


//-----------------------------------------------------
//Below is my function that returns my json file.
function getUser(){
    try {
        const content = fs.readFileSync('users.json')
        return JSON.parse(content)
    }catch (e) { 
        fs.writeFileSync('users.json', '[]')
        return []
    }
}


//------------------------------------------------------------------------------
// Below allows me to display my json file.
app.get('/api', (req, res) => {
    const display2 = getUser();
    res.send(display2);
});


//------------------------------------------------------------------------------
// Below I am using a put reuqest to handle the data from my frontend.
app.put("/search", (req, res) => {
    const wordInput = req.body.word;

    // Below the function fetches the corrisponding data.
    function search() {

        fetch(`https://api.github.com/users/${wordInput}`)
        .then(res => res.json())
        .then((result) => {
            const userName = result.login;
            const repos = result.public_repos;
            const bio = result.bio;
            const pfp = result.avatar_url;

            fetch(`https://api.github.com/users/${user}/repos`)
            .then(res => res.json())
            .then((result) => {
            const repoID = result.pop().id
            const lastCommit = result.pop().updated_at;
            const creationDate = result.pop().created_at;
            const desc = result.pop().description;
            
            // After the data has been fetched I write it to the json file.
            const userJSON = getUser()
            userJSON.forEach((newInput) => {
                newInput.username = userName;
                newInput.repos = repos;
                newInput.bio = bio;
                newInput.pfp = pfp;

                newInput.repoID = repoID;
                newInput.newCom = lastCommit;
                newInput.cdate = creationDate;
                newInput.descrip = desc;

                fs.writeFileSync('users.json', JSON.stringify(userJSON))
            })
            
            
        })
        
        })

    }
    search();


    //console.log(wordInput);
})

app.listen(port, () => console.log(`Listening on port ${port}`));