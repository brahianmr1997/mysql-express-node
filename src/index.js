// Libraries and frameworks
const express = require("express"); // back end web application framework for Node.js
const exphbs = require("express-handlebars"); // handlebars is a template engine. Delete when using vue
const path = require("path"); // facilitates the use of project routes
const morgan = require("morgan"); // show server requests step 1 of 2
const passport = require("passport"); // Passport: Authetication step 1 of 4
const session = require("express-session"); // create user sections // save dates of users through a session
const MySQLStore = require('express-mysql-session')(session); // Save user sections
const flash = require("connect-flash"); // helps to view messages by popup windows

// Initialization
const app = express();
require("./lib/passport"); // Passport: Authetication step 2 of 4

// Settings
app.set("views", path.join(__dirname, "views"));  //Template engine, Delete when using vue
app.engine(".hbs", exphbs({  //configuration of what types of files we are going to use for the views
  defaultLayout: "main", //main file name
  layoutsDir: path.join(app.get("views"), "layouts"), // src/views/layouts
  partialsDir: path.join(app.get("views"), "partials"), // src/views/partials
  extname: ".hbs",
/*   runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true
  }    */
}));; // Template engine, Delete when using vue
app.set("view engine", ".hbs");; // Template engine, Delete when using vue
app.set("port", process.env.PORT || 3000); //if there is a port available: use it, else port 3000

// Middlewares // functions to be executed before they reach the server
app.use(morgan("dev")); // show server requests 

app.use(express.urlencoded({extended: false})); // allows to receive data from the client (Email and password),  false is to not send images
app.use(session({
    secret: 'mysql-express-node',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore({host: "localhost",
                          user: "root", 
                          password: "dino", 
                          database: "mysql_express_node"})
  }));
app.use(flash());
app.use(passport.initialize()); // Passport: Authetication step 3 of 4
app.use(passport.session()); // Passport: Authetication step 4 0f 4

/* {host: "bjejr7uuy1tzzwwiucvn-mysql.services.clever-cloud.com",
                          user: "u9xxcgsytdiymemv", 
                          password: "i9nwyc96UpKXDSZO7Vrv", 
                          database: "bjejr7uuy1tzzwwiucvn"} */

// Global Variables
app.use((req, res, next)=>{
  app.locals.green = req.flash("green"); // green popup messages
  app.locals.red = req.flash("red"); // red popup messages
  app.locals.user = req.user;
  next();
});

// Routes
app.use(require("./routes/index.js"));

// Static files

// Static files
app.use(express.static(path.join(__dirname, "public")));


// Server is listening
app.listen(app.get("port"), () => {
    console.log("Server on port", app.get("port"));
});