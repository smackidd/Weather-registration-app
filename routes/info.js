const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
var fs = require('fs');

router.use(bodyParser.json());

console.log('hello');



router.get('/', (req, res) => {
    var exists = fs.existsSync('users_file.json');
    if (exists) {
        // Read the file
        console.log('loading registration file');
        var mydata = fs.readFileSync('users_file.json', 'utf8');
        // Parse it  back to object
        users = JSON.parse(mydata);
        console.log(users);
    } else {
        // Otherwise start with blank array obect
        //-----
        console.log('Created new object')
        var users = {user:[]};
    }
    html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="/routes/info.js"></script>
        <title>User Info</title>
    </head>
    <body>
        <table>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Type</th>
            </tr>`;
    console.log(users);        
    users.user.forEach((person) => {
        html += `<tr>
            <td>${person.ID}</td>
            <td>${person.full_name}</td>
            <td>${person.address}</td>
            <td>${person.usertype}</td>
        </tr>`;
    });
    html += `</body>
    </html>`
    res.send(html);
});

module.exports = router;