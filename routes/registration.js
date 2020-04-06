const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
var fs = require('fs');


router.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false });


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


router.post('/users', urlencodedParser, (req, res) => {
    response = {
    ID:req.body.ID,
    full_name: req.body.full_name,
    address: req.body.address,
    usertype: req.body.usertype
    };

    users.user.push(response);
    let data = JSON.stringify(users, null, 2);  
    fs.writeFile('users_file.json', data, finished);
    console.log('Student_file.JSON is updated');
    function finished(err)
        {
            let msg = "";
            if(response.usertype === "student") {
                msg = "Thank you! You owe $10.";
            } 
            else  
            {
                if (response.usertype === "staff") {
                    msg = "Thank you! You owe $50.";
                } else {
                    msg = "Thank you! YOu owe $0.";
                }
            } 
            
            reply={
                ID:req.body.ID,
                full_name: req.body.full_name,
                address: req.body.address,
                usertype: req.body.usertype,
                status:"success",
                msg: msg
            }
            res.redirect('/info');
            console.log(reply);
        }; 
});


 

module.exports = router;