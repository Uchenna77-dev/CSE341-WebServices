const express = require('express');
const router = express.Router();
const passport = require('passport');
const {isAuthenticated} = require('../middleware/authenticator');

// Redirect /login to GitHub auth
router.get('/login', (req, res) => {
  if (req.session.user) {
    res.send('✅ You are already logged in.');
  } else {
    // Redirect to GitHub for login
    res.redirect('/auth/github');
    // ❌ Don't send anything else after res.redirect
  }
});

// GitHub OAuth entry point
router.get('/auth/github', passport.authenticate('github'));

// GitHub OAuth callback
router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login', session: true }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  }
);

// Logout route
router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) return next(err);
    req.session.destroy();
    res.redirect('/');
  });
});

router.get('/protected', isAuthenticated, (req, res) => {
  res.json({ message: `Welcome ${req.session.user.displayName}` });
});

module.exports = router;
