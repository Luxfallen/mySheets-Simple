const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.renderLogin);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.post('/changePass', mid.requiresSecure, mid.requiresLogin, controllers.Account.changePass);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/donate', mid.requiresSecure, controllers.renderDonate);
  app.get('/about', controllers.renderAbout);
  app.get('/app', mid.requiresLogin, mid.requiresSecure, controllers.Character.renderChar);
  app.post('/newChar', mid.requiresLogin, controllers.Character.makeChar);
  app.get('/getChar', mid.requiresLogin, controllers.Character.getChar);
  app.delete('/delChar', mid.requiresLogin, controllers.Character.delChar);
  app.post('/saveChar', mid.requiresLogin, mid.requiresSecure, controllers.Character.saveChar);
  app.get('/*', mid.requiresSecure, mid.requiresLogout, controllers.Account.renderLogin);
};

module.exports = router;
