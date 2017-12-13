const renderDonate = (req, res) => {
  res.render('donate');
};

const renderAbout = (req, res) => {
  res.render('about');
};

module.exports.Account = require('./Account.js');
module.exports.Character = require('./Character.js');
module.exports.renderDonate = renderDonate;
module.exports.renderAbout = renderAbout;
