var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var compiler = require('compilex');
var app = express();
var favicon = require('serve-favicon');
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

var option = {stats : true};
compiler.init(option);

var sessData;

app.post('/compilecode' , function (req , res ) {
  sessData = req.session;
    var code = req.body.code;
    var input = req.body.input;
    var inputRadio = req.body.inputRadio;
    var lang = req.body.lang;
		if((lang === "C") || (lang === "C++"))
    {
        if(inputRadio === "true")
        {
        	var envData = { OS : "linux" , cmd : "gcc"};
        	compiler.compileCPPWithInput(envData , code ,input , function (data) {
        		if(data.error)
        		{
        			res.send(data.error);
        		}
        		else
        		{
        			res.send(data.output);
        		}
        	});
	   }
	   else
	   {
	   	var envData = { OS : "linux" , cmd : "gcc"};
        	compiler.compileCPP(envData , code , function (data) {
        	if(data.error)
        	{
        		res.send(data.error);
        	}
        	else
        	{
        		res.send(data.output);
        	}

            });
	   }
    }
    if( lang === "Python")
    {
        if(inputRadio === "true")
        {
            var envData = { OS : "linux"};
            compiler.compilePythonWithInput(envData , code , input , function(data){
                res.send(data);
            });
        }
        else
        {
            var envData = { OS : "linux"};
            compiler.compilePython(envData , code , function(data){
                res.send(data);
            });
        }
    }
    if( lang === "Java")
    {
        if(inputRadio === "true")
        {
            var envData = { OS : "linux"};
            compiler.compileJavaWithInput(envData , code , input , function(data){
                res.send(data);
            });
        }
        else
        {
            var envData = { OS : "linux"};
            compiler.compileJava(envData , code , function(data){
                res.send(data);
            });
        }
    }
});

compiler.flush(function(){
    console.log('All temporary files flushed !');
    });

app.get('/fullStat' , function(req , res ){
  sessData = req.session;
    compiler.fullStat(function(data){
        res.send(data);
    });
});

// app.listen(3030);


const server = require("http").Server(app);
const { v4: uuidv4 } = require("uuid");
app.set("view engine", "ejs");
const io = require("socket.io")(server, {
  cors: {
    origin: '*'
  }
});
const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true,
});
require('socket.io-client')('ws://localhost', { transports: ['websocket'], rejectUnauthorized: false });
app.use("/peerjs", peerServer);

var	mongoose = require("mongoose"),
	passport = require("passport"),
	bodyParser = require("body-parser"),
	LocalStrategy = require("passport-local"),
	passportLocalMongoose =
		require("passport-local-mongoose"),
	User = require("./models/user");

mongoose.connect("mongodb://localhost/auth_demo_app");

app.use(require("express-session")({
	secret: "Rusty is a dog",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(favicon(path.join(__dirname, 'public', 'images','favicon.ico')));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function (req, res) {
  sessData = req.session;
	res.render("login");
});

app.get("/register", function (req, res) {
  sessData = req.session;
	res.render("register");
});

app.post("/register", function (req, res) {
  sessData = req.session;
	var username = req.body.username
	var password = req.body.password
	User.register(new User({ username: username }),
			password, function (err, user) {
		if (err) {
			console.log(err);
			return res.render("register");
		}

		passport.authenticate("local")(
			req, res, function () {
			res.render("login");
		});
	});
});

app.get("/login", function (req, res) {
  sessData = req.session;
	res.render("login");
});


app.get("/home", (req, res) => {
  res.redirect(`/home${uuidv4()}`);
});

app.get("/home:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

app.post("/login", passport.authenticate("local", {
	successRedirect: "/home",
	failureRedirect: "/login"
}), function (req, res) {
  sessData = req.session;
  sessData.user = req.body.username;
  var dataToClient = {'name':"sessData.user"};
  var JSONdata = JSON.stringify(dataToClient);
  res.send(JSONdata);
});

app.get("/logout", function (req, res) {
  sessData = req.session;
  req.session.destroy(function(err) {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
	req.logout();
	res.redirect("/");
});

function isLoggedIn(req, res, next) {
  sessData = req.session;
	if (req.isAuthenticated()) return next();
	res.redirect("/login");
}

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId, userName) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);
  });
	socket.on('message', (msg) => {
			socket.broadcast.emit('message', msg)
	});
});

function onConnection(socket){
  socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
}

io.on('connection', onConnection);

server.listen(process.env.PORT || 3030);
