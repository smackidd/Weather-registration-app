const express = require('express');
const app = express();
const path = require('path');


var bodyParser = require('body-parser');








app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', require('./routes/registration'));
app.use('/info', require('./routes/info'));





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));