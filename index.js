var express = require('express'),
  app = express(),
  session = require('express-session'),
  passport = require('passport'),
  GithubStrategy = require('passport-github2').Strategy,
  bodyParser = require('body-parser'),
  cors = require('cors'),
  githubApi = require('github'),
  github = new githubApi({
    version: '3.0.0'
  }),
  port = 9012;

app.use(express.static(__dirname + '/public'));
app.use(session({
  secret: 'i made a huge mistake',
  saveUninitialized: true,
  resave: false
}));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(user, done){
  done(null, user);
});

passport.deserializeUser(function(user, done){
  done(null, user);
});

passport.use(new GithubStrategy({
  clientID: '0567ff2cad14e0f19e91',
  clientSecret: '13071f52e63237a9c192826ec3f6a862e98e7101',
  callbackURL: 'http://localhost:9012/auth/github/callback'
}, function(accessToken, refreshToken, profile, done){
  return done(null, profile);
}))

// authentication endpoints
app.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));
app.get('/auth/github/callback', passport.authenticate('github', {
  failureRedirect: '/#/'}), function(req, res){
    res.redirect('/#/home');
})

app.get('/api/github/following', function(req, res){
  github.user.getFollowingFromUser({
    user: req.user.username
  }, function(err, response){
    if(err) {
      res.status(500).json(err);
    } else {
      res.json(response);
    };
  });
});

app.listen(port, function(){
  console.log('listening on port:', port);
});
