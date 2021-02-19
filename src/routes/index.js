const router = require("express").Router(); // object that facilitates the creation of routes
const passport =require("passport") // Passport: Authetication 
const {isAuthenticated, isNotAuthenticated} = require("../lib/authenticated"); 
 
router.get("/", (req, res)=>{
    res.render("index");
});

router.get("/signin", isNotAuthenticated, (req, res)=>{
    res.render("signin");
});

router.post("/signin", isNotAuthenticated, (req, res, next) =>{ passport.authenticate("local-signin", {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
}) (req, res, next) });

router.get("/signup", isNotAuthenticated, (req, res)=>{
    res.render("signup");
});

router.post("/signup", isNotAuthenticated, passport.authenticate("local-signup", {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
}));


router.get("/profile", isAuthenticated,  (req, res)=>{
    res.render("profile");
});

router.get("/logout" ,isAuthenticated,  (req, res)=>{
    req.logOut();
    req.flash("green", "You exited section successfully");
    res.redirect("signin");
});


module.exports = router;