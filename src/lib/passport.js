const passport = require('passport'); // Passport: Authetication
const LocalStrategy = require('passport-local').Strategy; 
const bcrypt = require('./bcryptjs');
const db = require('../database');

passport.use('local-signin', new LocalStrategy({// Authentication
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true  
}, async (res, email, password, done) =>{
  const loginUser = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  if ( loginUser.length == 1){
    const user = loginUser[0];
    const validPassword = await bcrypt.matchPassword(password, user.password);
    if(validPassword){
      res.flash("green", "You entered")
      done(null, user);
    }else{
      res.flash("red", "Incorrect password")
      done(null, false);
      
    }} else {
      res.flash("red", "User does not exist, GO! to Signup")
      
      return done(null, false)
    }
  }
));

passport.use('local-signup', new LocalStrategy({ // Authentication
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},  async (res, email, password, done) => {
    const olduser = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (olduser.length == 1){
      res.flash("red", "The user's email is already in use")
      done(null, false);
    }else{
    const newUser = {email, password }; // disadvantage against mongodb for not having a scheme
    newUser.password = await bcrypt.encryptPassword(password);
    const result =  await db.query('INSERT INTO users set ?', [newUser]);
    res.flash("green", "the user has been created")
    newUser.id = result.insertId; //To serialize the user
    return done(null, newUser)
}}));

passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
passport.deserializeUser(async (id, done) => {
  const rows = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  done(null, rows[0]);
});

