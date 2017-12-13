'use strict';

/* eslint-disable */

/**---------------------------- ATTN -----------------------------------
 * This still is not fully operational, and further edits must be made.
 * Ctrl+F the word 'EDIT' to find such situations.
 * Testing must go on thereafter
 * ---------------------------------------------------------------------
 */

// Helper Methods
//region
var handleError = function handleError(message) {
  $('#errorMessage').text(message);
  $('#displayMessage').animate({ left: 'toggle' }, 500);
};

var redirect = function redirect(response) {
  $('#displayMessage').animate({ left: 'hide' }, 500);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: 'json',
    success: success,
    error: function error(xhr, status, _error) {
      console.log(xhr);
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
//endregion

// Donate
//region
var DonateWindow = function DonateWindow(props) {
  return React.createElement(
    'div',
    { id: 'donateWindow' },
    React.createElement(
      'h3',
      null,
      'Tired of ads?'
    ),
    React.createElement(
      'p',
      null,
      'More donations means less ads and more improvements to the app!'
    ),
    React.createElement(
      'label',
      { htmlFor: 'donation' },
      'Your Donation:'
    ),
    React.createElement('input', { id: 'donation', type: 'text', name: 'donation', placeholder: '$x.xx' }),
    React.createElement('input', { id: 'donate', type: 'button', value: 'Donate', onClick: handleDonate })
  );
};

var createDonateWindow = function createDonateWindow() {
  ReactDOM.render(React.createElement(DonateWindow, null), document.querySelector('#content'));
};

var handleDonate = function handleDonate(e) {
  var num = document.querySelector('#donation').value;
  num = num.split("");
  if (num[0] !== '$') {
    handleError('Please use the format $x.xx');
    return;
  }
  if (!num) {
    console.log('error: ' + num);return;
  }
  var parsedValue = num[1];
  for (var i = 2; i < num.length; i++) {
    parsedValue += num[i];
  }
  parsedValue = parseFloat(parsedValue);
  handleError('Thank you for donating $' + parsedValue + '!');
};
//endregion

// About
//region
var AboutWindow = function AboutWindow(props) {
  return React.createElement(
    'div',
    { id: 'documentation' },
    React.createElement(
      'h1',
      null,
      'Documentation'
    ),
    React.createElement(
      'h3',
      null,
      'Purpose'
    ),
    React.createElement(
      'p',
      null,
      'The site is intended to be a tool for tabletop role-playing games and contructing maps for them. The idea initially came from a personal need for a neat and free way to make a blueprint for a specific building in a Dungeons & Dragons campaign.'
    ),
    React.createElement(
      'p',
      null,
      'The initial idea seems to have been overscoped, especially considering that the idea was simplified even further in an attempt to meet the deadline. As it stands, the site is capable of creating "blueprints" which users can draw on using HTML Canvas. Rather than storing coordinates as initially planned, I was recommended to save the canvas as an image, and then load the image back in when a user wanted to continue developing. However, there seems to be an issue when dealing with canvas.toDataURL that I did not anticipate, which ate up a good deal of time and is still not resolved, so the user cannot load "blueprints" that they have previously worked on. I hope to rectify this error and restructure a good deal of the app in future development.'
    ),
    React.createElement(
      'h3',
      null,
      'Profitability'
    ),
    React.createElement(
      'p',
      null,
      'Everyone hates ads, but they are likely a substantial source of income and support for a good deal of websites. It is with that in mind that I intended to make the app have advertisements on the right side of the screen. Later on, I thought about how a good deal of projects, especially webcomics, are funded by both ads and donations. With this in mind, I created the "Donate" page. At the moment, it doesn\'t do anything with the information it\'s presented and does not prompt individuals for personal information, as the site has nowhere near enough security to warrant that.'
    ),
    React.createElement(
      'h3',
      null,
      'Templating'
    ),
    React.createElement(
      'p',
      null,
      'A combination of express and handlebars was used in order to create usable pages. However, they only account for the script links, navigation, and a very limited skeleton (a couple empty sections).'
    ),
    React.createElement(
      'h3',
      null,
      'Use of MVC'
    ),
    React.createElement(
      'p',
      null,
      'The Model-View-Controller pattern was used to generate accounts and "blueprints" that belonged to individual accounts. The pattern also enabled an efficient use of MongoDB.'
    ),
    React.createElement(
      'h3',
      null,
      'Use of MongoDB'
    ),
    React.createElement(
      'p',
      null,
      'Account information and blueprints are saved to MongoDB for safe keeping. Accounts consist of username, password, the date the account was established, and information necessary to decrypt and verify passwords, which are not only hashed, but also encrypted to add a stronger layer of security. Each blueprint stored has a name, owner ID, and a string value that was used in order to store the outcome of canvas.toDataURL() to be used when the canvas were to be loaded in.'
    ),
    React.createElement(
      'h3',
      null,
      'Above & Beyond'
    ),
    React.createElement(
      'p',
      null,
      'Express and handlebars helped a good deal, but most elements are generated with React. Although the initial "Above & Beyond" was intended to be an efficient storage of "blueprint" information via bitpacking, inexperience on my part led to a few problems eating too much time.'
    )
  );
};

var createAboutWindow = function createAboutWindow() {
  ReactDOM.render(React.createElement(AboutWindow, null), document.querySelector('#content'));
};
//endregion

// EDIT
// EncounterCalculator
var CalcWindow = function CalcWindow() {};

var createCalcWindow = function createCalcWindow() {
  ReactDOM.render(React.createElement(CalcWindow, null), document.querySelector('#content'));
};

var handleCalc = function handleCalc() {};

// React (Character)
//region
var CharForm = function CharForm(props) {
  return React.createElement(
    'form',
    { id: 'charForm', name: 'charForm', onSubmit: handleNewChar, action: '/newChar', method: 'POST', className: 'form' },
    React.createElement(
      'label',
      { htmlFor: 'charName' },
      'Name: '
    ),
    React.createElement('input', { id: 'charName', type: 'text', name: 'charName', placeholder: 'Name' }),
    React.createElement('br', null),
    React.createElement(
      'label',
      { htmlFor: 'level' },
      'Level: '
    ),
    React.createElement('input', { id: 'level', type: 'number', name: 'level', placeholder: '0', min: '1', max: '25' }),
    React.createElement('br', null),
    React.createElement(
      'label',
      { htmlFor: 'class' },
      'Class: '
    ),
    React.createElement('input', { id: 'class', type: 'text', name: 'class', placeholder: 'Fighter (Champion)' }),
    React.createElement('br', null),
    React.createElement(
      'label',
      { htmlFor: 'str' },
      'STR: '
    ),
    React.createElement('input', { className: 'stat', type: 'number', name: 'str', placeholder: '10', min: '1', max: '30' }),
    React.createElement('br', null),
    React.createElement(
      'label',
      { htmlFor: 'dex' },
      'DEX: '
    ),
    React.createElement('input', { className: 'stat', type: 'number', name: 'dex', placeholder: '10', min: '1', max: '30' }),
    React.createElement('br', null),
    React.createElement(
      'label',
      { htmlFor: 'con' },
      'CON: '
    ),
    React.createElement('input', { className: 'stat', type: 'number', name: 'con', placeholder: '10', min: '1', max: '30' }),
    React.createElement('br', null),
    React.createElement(
      'label',
      { htmlFor: 'int' },
      'INT: '
    ),
    React.createElement('input', { className: 'stat', type: 'number', name: 'int', placeholder: '10', min: '1', max: '30' }),
    React.createElement('br', null),
    React.createElement(
      'label',
      { htmlFor: 'wis' },
      'WIS: '
    ),
    React.createElement('input', { className: 'stat', type: 'number', name: 'wis', placeholder: '10', min: '1', max: '30' }),
    React.createElement('br', null),
    React.createElement(
      'label',
      { htmlFor: 'cha' },
      'CHA: '
    ),
    React.createElement('input', { className: 'stat', type: 'number', name: 'cha', placeholder: '10', min: '1', max: '30' }),
    React.createElement('br', null),
    React.createElement(
      'label',
      { htmlFor: 'maxHealth' },
      'Max Health: '
    ),
    React.createElement('input', { className: 'health', type: 'number', name: 'maxHealth', placeholder: '0', min: '1' }),
    React.createElement('br', null),
    React.createElement('input', { type: 'hidden', name: '_csrf', value: props.csrf }),
    React.createElement('input', { className: 'formSubmit', type: 'submit', value: '+ Character' })
  );
};

// Need inventory block
// Need save button
// Need buttons to edit values
var CharData = function CharData(props) {
  return React.createElement(
    'div',
    { id: 'charData' },
    React.createElement(
      'h1',
      null,
      props.character.name
    ),
    React.createElement(
      'h2',
      null,
      props.character.level,
      ', ',
      props.character.class
    ),
    React.createElement(
      'ul',
      { id: 'statBlock' },
      React.createElement(
        'li',
        { className: 'stat' },
        'STR: ',
        props.character.stats[0]
      ),
      React.createElement(
        'li',
        { className: 'stat' },
        'DEX: ',
        props.character.stats[1]
      ),
      React.createElement(
        'li',
        { className: 'stat' },
        'CON: ',
        props.character.stats[2]
      ),
      React.createElement(
        'li',
        { className: 'stat' },
        'INT: ',
        props.character.stats[3]
      ),
      React.createElement(
        'li',
        { className: 'stat' },
        'WIS: ',
        props.character.stats[4]
      ),
      React.createElement(
        'li',
        { className: 'stat' },
        'CHA: ',
        props.character.stats[5]
      )
    ),
    React.createElement(
      'ul',
      { id: 'healthBlock' },
      React.createElement(
        'li',
        null,
        'Temporary HP: ',
        props.character.health[1]
      ),
      React.createElement(
        'li',
        null,
        'Current HP: ',
        props.character.health[0]
      ),
      React.createElement(
        'li',
        null,
        'Max HP: ',
        props.character.health[2]
      )
    ),
    React.createElement('ul', { id: 'inventoryBlock' })
  );
};

var CharList = function CharList(props) {
  if (props.characters.length === 0) {
    React.createElement(
      'div',
      { 'class': 'listItem', 'data-key': 'null' },
      React.createElement(
        'h3',
        { 'class': 'emptyItem' },
        'No Characters'
      )
    );
  }
  var charItems = props.characters.map(function (character) {
    return React.createElement(
      'div',
      { 'class': 'listItem', 'data-key': character._id, onClick: handleChar },
      React.createElement(
        'h1',
        { 'class': 'delChar', onClick: handleCharDel },
        ' X '
      ),
      React.createElement(
        'h2',
        { 'class': 'name' },
        character.name
      ),
      React.createElement(
        'h3',
        { 'class': 'lvlClass' },
        '(',
        character.level,
        ') ',
        character.class
      ),
      React.createElement('var', {
        'data-all': JSON.stringify(character),
        style: 'visibility:\'hidden\''
      })
    );
  });
  return React.createElement(
    'div',
    { className: 'list' },
    charItems
  );
};

var createCharForm = function createCharForm(csrf) {
  ReactDOM.render(React.createElement(CharForm, { csrf: csrf }), document.querySelector('#genChar'));
};

var createCharData = function createCharData(csrf, character) {
  ReactDOM.render(React.createElement(CharData, { csrf: csrf, character: character }), document.querySelector('#genChar'));
};

var createCharList = function createCharList(characters) {
  ReactDOM.render(React.createElement(CharList, { characters: characters }), document.querySelector('#list'));
};

//endregion

// Character Handling
//region
var loadChar = function loadChar() {
  sendAjax('GET', '/getChar', null, function (data) {
    ReactDOM.render(React.createElement(CharList, { characters: data.characters }), document.querySelector("#charList"));
  });
};

var handleNewChar = function handleNewChar(e) {
  e.preventDefault();
  $("#displayMessage").animate({ left: 'hide' }, 500);

  if (document.querySelector('#charName').value === '') {
    handleError("Your character needs a name");
    return false;
  }

  var inputHealth = document.querySelector('#maxHealth').value;
  var tempForm = document.querySelector('#charForm');

  var formResult = {
    name: document.querySelector('#charName').value,
    level: document.querySelector('#level').value,
    class: document.querySelector('#class').value,
    stats: document.querySelectorAll('.stat').value,
    health: [inputHealth, 0, inputHealth],
    inventory: []
  };
  // Check for alternative to .serialize()
  sendAjax('POST', document.querySelector("#charForm").getAttribute("action"), formResult.serialize(), function () {
    loadChar();
  });
  return false;
};

// Check for alternative to .serialize()
var saveChar = function saveChar(e) {
  var key = e.target.getAttribute('data-key');
  var token = $('#csrf').serialize();
  var obj = '_id=' + key + '&' + token + '&';
  sendAjax('POST', '/save', $('#charData').serialize(), function (msg) {
    handleError(msg);
  });
};

// EDIT
// 
var handleChar = function handleChar(e) {
  if (e.target !== 'div') {
    e.target = e.target.parentElement;
  }
  var key = e.target.getAttribute('data-key');
  var char = JSON.parse(e.target.getAttribute('data-all'));
  ReactDOM.render(React.createElement(BlueprintCanvas, { myKey: key }), document.querySelector("#draw"));

  var canvas = document.querySelector('#bpRearCanvas');
  var ctx = canvas.getContext("2d");
  var dataURL = e.target.getAttribute('data-walls');
  if (dataURL) {
    var img = new Image();
    img.src = dataURL;
    ctx.drawImage(img, 0, 0);
  } else {
    ctx.fillStyle = "#00F";
    ctx.fillRect(0, 0, 800, 500);
  }
};

var handleCharDel = function handleCharDel(e) {
  var key = JSON.stringify(e.target.parentElement.getAttribute('data-key'));
  var token = $('#csrf').serialize();
  var obj = '_id=' + key + '&' + token;
  sendAjax('DELETE', '/delChar', obj, function (msg) {
    console.dir(msg);
  });
  e.target.parentElement.hidden = true;
  loadChar();
};
//endregion

// React (Login)
//region
var LoginWindow = function LoginWindow(props) {
  return React.createElement(
    'form',
    { id: 'loginForm', name: 'loginForm', onSubmit: handleLogin, action: '/login', method: 'POST', 'class': 'form' },
    React.createElement(
      'label',
      { htmlFor: 'username' },
      'Username: '
    ),
    React.createElement('input', { id: 'user', type: 'text', name: 'username', placeholder: 'Username' }),
    React.createElement('br', null),
    React.createElement(
      'label',
      { htmlFor: 'pass' },
      'Password: '
    ),
    React.createElement('input', { id: 'pass', type: 'password', name: 'pass', placeholder: 'Password' }),
    React.createElement('input', { type: 'hidden', name: '_csrf', value: props.csrf }),
    React.createElement('br', null),
    React.createElement('input', { className: 'formSubmit', type: 'submit', value: 'Log In' })
  );
};

var SignupWindow = function SignupWindow(props) {
  return React.createElement(
    'form',
    { id: 'signupForm', name: 'signupForm', onSubmit: handleSignup, action: '/signup', method: 'POST', className: 'form' },
    React.createElement(
      'label',
      { htmlFor: 'username' },
      'Username: '
    ),
    React.createElement('input', { id: 'user', type: 'text', name: 'username', placeholder: 'Username' }),
    React.createElement('br', null),
    React.createElement(
      'label',
      { htmlFor: 'pass1' },
      'Password: '
    ),
    React.createElement('input', { id: 'pass1', type: 'password', name: 'pass1', placeholder: 'Password' }),
    React.createElement('br', null),
    React.createElement(
      'label',
      { htmlFor: 'pass2' },
      'Confirm Password: '
    ),
    React.createElement('input', { id: 'pass2', type: 'password', name: 'pass2', placeholder: 'Confirm Password' }),
    React.createElement('input', { type: 'hidden', name: '_csrf', value: props.csrf }),
    React.createElement('br', null),
    React.createElement('input', { className: 'formSubmit', type: 'submit', value: 'Sign Up' })
  );
};

var ChangePassWindow = function ChangePassWindow(props) {
  return React.createElement(
    'form',
    { id: 'changePassForm', name: 'changePassForm', onSubmit: handleChangePass, action: '/changePass', method: 'POST', className: 'form' },
    React.createElement(
      'label',
      { htmlFor: 'pass' },
      'Old Password: '
    ),
    React.createElement('input', { id: 'pass', type: 'password', name: 'pass', placeholder: 'Old Password' }),
    React.createElement(
      'label',
      { htmlFor: 'diffPass1' },
      'New Password: '
    ),
    React.createElement('input', { id: 'diffPass1', type: 'password', name: 'diffPass1', placeholder: 'New Password' }),
    React.createElement(
      'label',
      { htmlFor: 'diffPass2' },
      'Confirm Password: '
    ),
    React.createElement('input', { id: 'diffPass2', type: 'password', name: 'diffPass2', placeholder: 'Confirm Password' }),
    React.createElement('input', { type: 'hidden', name: '_csrf', value: props.csrf }),
    React.createElement('input', { className: 'formSubmit', type: 'submit', value: 'Change it!' })
  );
};

var createLoginWindow = function createLoginWindow(csrf) {
  ReactDOM.render(React.createElement(LoginWindow, { csrf: csrf }), document.querySelector('#content'));
};

var createSignupWindow = function createSignupWindow(csrf) {
  ReactDOM.render(React.createElement(SignupWindow, { csrf: csrf }), document.querySelector('#content'));
};

var createChangePassWindow = function createChangePassWindow(csrf) {
  ReactDOM.render(React.createElement(ChangePassWindow, { csrf: csrf }), document.querySelector('#content'));
};
//endregion

// Login & Prep
//region
var handleLogin = function handleLogin(e) {
  e.preventDefault();
  $('#displayMessage').animate({ left: 'hide' }, 500);
  if ($('#user').val() === '' || $('#pass').val() === '') {
    handleError('Username and password are required');
    return false;
  }
  sendAjax('POST', document.querySelector('#loginForm').getAttribute('action'), $('#loginForm').serialize(), redirect);
  return false;
};

var handleSignup = function handleSignup(e) {
  e.preventDefault();
  $('displayMessage').animate({ left: 'hide' }, 500);

  // check passwords
  if (document.querySelector('#user').value === '' || document.querySelector('#pass1').value === '' || document.querySelector('#pass2').value === '') {
    handleError('Please fill in all fields');
    return false;
  }

  if (document.querySelector('#pass1').value !== document.querySelector('#pass2').value) {
    //console.log(document.querySelector('#pass1').value + "," + document.querySelector('#pass2').value);
    handleError('Passwords do not match');
    return false;
  }

  sendAjax('POST', document.querySelector('#signupForm').getAttribute('action'), $('#signupForm').serialize(), redirect);
  return false;
};

var handleChangePass = function handleChangePass(e) {
  e.preventDefault();
  $('displayMessage').animate({ left: 'hide' }, 500);

  // Check passwords
  if (document.querySelector('#pass').value === '' || document.querySelector('#diffPass1').value === '' || document.querySelector('#diffPass2').value === '') {
    handleError('Please fill in all fields');
    return false;
  }

  if (document.querySelector('#diffPass1').value !== document.querySelector('#diffPass2').value) {
    handleError('Your new passwords do not match');
    return false;
  }

  // Cannot check password / password match on client-side~!

  sendAjax('POST', document.querySelector('#changePassForm').getAttribute('action'), $('#changePassForm').serialize(), redirect);
  return false;
};

var setup = function setup(csrf) {
  var loginButton = document.querySelector('#loginButton');
  var signupButton = document.querySelector('#signupButton');
  var changePassButton = document.querySelector('#changePassButton');
  var aboutButton = document.querySelector('#aboutButton');
  var donateButton = document.querySelector('#donateButton');

  if (changePassButton) {
    changePassButton.addEventListener('click', function (e) {
      e.preventDefault();
      createChangePassWindow(csrf);
      return false;
    });
  }

  if (signupButton) {
    signupButton.addEventListener('click', function (e) {
      e.preventDefault();
      createSignupWindow(csrf);
      return false;
    });
  }

  if (loginButton) {
    loginButton.addEventListener('click', function (e) {
      e.preventDefault();
      createLoginWindow(csrf);
      return false;
    });
    createLoginWindow(csrf);
  }

  if (aboutButton) {
    aboutButton.addEventListener('click', function (e) {
      e.preventDefault();
      createAboutWindow();
      return false;
    });
  }

  if (donateButton) {
    donateButton.addEventListener('click', function (e) {
      e.preventDefault();
      createDonateWindow();
      return false;
    });
  }
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};
//endregion

window.onload = function () {
  handleError('Later!');
  getToken();
};