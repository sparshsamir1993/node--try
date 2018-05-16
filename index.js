const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require("./config/keys");
require("./models/Users");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());


require("./routes/authRoutes")(app); //require() returns a function, which immediately gets called with app as param, hence 2 sets of '()'
require("./routes/billingRoutes")(app);


if(process.env.NODE_ENV === 'production'){

    //to serve main.js & main.css
    app.use(express.static("client/build"));

    //this code will be executed only if above all app.use() fails.
    const path = require('path');
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })

     

}else{

}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
