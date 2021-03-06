const models = require('../models');
const Character = models.Character;

const renderCharacter = (request, response) => {
  Character.CharacterModel.findByOwner(request.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return response.status(400).json({ error: 'An error occurred' });
    }
    return response.render('app', { csrfToken: request.csrfToken(), characters: docs });
  });
};

const makeCharacter = (request, response) => {
  if (!request.body.name) {
    return response.status(400).json({ error: 'Characters need names' });
  }
  const charInfo = {
    name: request.body.name,
    level: request.body.level,
    class: request.body.class,
    stats: request.body.stat,
    health: [request.body.health, 0, request.body.health],
    inventory: request.body.inventory,
    owner: request.session.account._id,
  };
  const newChar = new Character.CharacterModel(charInfo);
  const savePromise = newChar.save();

  savePromise.then(() => response.json({ redirect: '/' }));
  savePromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return response.status(400).json({ error: 'Character already exists' });
    }
    return response.status(400).json({ error: 'An error occurred' });
  });
  return savePromise;
};

const getCharacters = (request, response) => {
  const req = request;
  const res = response;
  return Character.CharacterModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    return res.json({ characters: docs });
  });
};

const deleteCharacter = (request, response) => {
  const req = request;
  const res = response;
  Character.CharacterModel.findByIdAndRemove(JSON.parse(req.body._id), (err) => {
    if (err) {
      console.log(err);
      if (err.code === 503) {
        return res.status(503).json({ error: 'Too many requests' });
      }
      return res.status(400).json({ error: 'An error occurred' });
    }
    return false;
  });
};

const saveCharacter = (request, response) => {
  const req = request;
  const res = response;
  return Character.CharacterModel.findById(req.body._id, (err, doc) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error has occurred' });
    }
    const newData = doc;
    const { level, stat, health } = req.body;
    newData.level = level;
    newData.stats = stat;
    newData.health = health;
    const savePromise = newData.save();
    savePromise.then(() => res.status(202).json({ redirect: '/' }));
    savePromise.catch((error) => {
      console.log(error);
      return res.status(400).json({ error: 'An error has occurred' });
    });
    return savePromise;
  });
};

module.exports = {
  renderChar: renderCharacter,
  makeChar: makeCharacter,
  getChar: getCharacters,
  delChar: deleteCharacter,
  saveChar: saveCharacter,
};
