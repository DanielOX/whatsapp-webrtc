const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

// Route Imports
const users = require("./routes/api/users");
const conversations = require('./routes/api/conversations');
const messages = require('./routes/api/messages');
const friends = require('./routes/api/friends')


// Socket.io import

const Socket = require('socket.io')

// Socket.io Controller

const SocketController = require('./controller/SocketController')



const app = express();



// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true, useFindAndModify: false }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/conversations", conversations)
app.use("/api/messages", messages)
app.use("/api/friends", friends)

const port = process.env.PORT || 5000;

const server = app.listen(port, () => console.log(`Server up and running on port ${port} !`));
const io = Socket(server);



io.on('connection', SocketController)