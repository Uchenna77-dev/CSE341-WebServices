const path = require('path');

const indexRoute = (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/index.html'));
};

module.exports = {
    indexRoute
};