const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./db/connect');
const motoBikesRoutes = require('./routes/motoBikes');
const carsRoutes = require('./routes/cars');
const Routes = require('./routes/index');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy
const cors = require('cors');
    
const port = 7000

// Required for secure cookies on Render
app.set('trust proxy', 1);

app
  .use(bodyParser.json())
  .use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // true in production
    httpOnly: true,
    sameSite: 'none'
  }
  }))
  // This is the basic express session initialization
  .use(passport.initialize())
  // Init passport for every route calls
  .use(passport.session())
  
  .use(cors({
  origin: 'https://cse341-webservices-1.onrender.com',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
  }))
  .use(express.static(path.join(__dirname, '../frontend')))
  .use('/motoBikes', motoBikesRoutes)
  .use('/cars', carsRoutes)
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile, {
    swaggerOptions: {
      withCredentials: true, // critical to include session cookie
      requestInterceptor: (req) => {
        req.credentials = 'include';
        return req;
    }
  }
}))

  .use('/', Routes)


passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    //User.findOrCreate({ githubId: profile.id }, function (err, user) {
      // Quick fix: just use the GitHub profile directly
      return done(null, profile);
  }
)); 

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

app.get('/', (req, res) =>{res.send(req.session.user !==undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged out')})

app.get('/auth/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', session: true}),
  (req, res) =>{
  console.log('GitHub login successful:', req.user);    
  req.session.user = req.user;
  res.redirect('/');   
  })

app.get('/check-login', (req, res) => {
  res.json({
    isAuthenticated: !!req.session.user,
    user: req.session.user || null
  });
});


process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});


