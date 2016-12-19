const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/User');

/**
 * this is a logic how to authentication a user
 */
const stategy = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    }, /*
        describe an information we use for authentication.
        It means, that userName we should get from 'email' field and password we should get from 'password' field
    */

    (email, password, done) => { //describe a proccess of authentication
        /**
         * Firstly we should get a user with a particual email
         * Secondly we should check whether his password is valid
         *
         * Afterwards we should call done(...) with 2 parameters: error (if we have an exception) and user (if we have one)
         * if we don't have a user with proper password, we should pass false as a second parameter
         */
        User.getUserByEmail(email)
            .then((user) => {
                console.log(user);
                
                if (user && user.isPasswordValid(password)) { 
                    done(null, user); //if everything is fine, we should call done callback without an error (1st param and with user data in 2nd parm)
                } else {
                    done(null, false); //pass false instead of user data because we don't have user data
                }
            })
            .catch((ex) => {
                done(ex);
            });
    });

passport.use(stategy); // passport should use a strategy we defined earlier

/**
 * There we describe how we should save information about a user into a session.
 * For our purpose, it's enough to save only user.id because we can extract all data by user.id.
 *
 *
 */
passport.serializeUser((user, done) => {
    done(null, user.id);
});

/**
 * There we describe how we restore information about a user by information we've saved into a session.
 * In our case, we have only user.id in the session. Therefore we should get all information about the user by id
 * and call done(...) with 2 parameters: error (if we have an exception) and user with user's data.
 *
 * When we call done(null, user), we'll have user in our req-object and we'll able to get information about the current user
 * from req.user
 */
passport.deserializeUser((id, done) => {
    User.getUserById(id)
        .then((user) => done(null, user))
        .catch((ex) => done(ex));
});

