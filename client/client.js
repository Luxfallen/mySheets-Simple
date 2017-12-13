/* eslint-disable */

/**---------------------------- ATTN -----------------------------------
 * This still is not fully operational, and further edits must be made.
 * Ctrl+F the word 'EDIT' to find such situations.
 * Testing must go on thereafter
 * ---------------------------------------------------------------------
 */

// Helper Methods
//region
const handleError = (message) => {
  $('#errorMessage').text(message);
  $('#displayMessage').animate({ left: 'toggle' }, 500);
};

const redirect = (response) => {
  $('#displayMessage').animate({ left: 'hide' }, 500);
  window.location = response.redirect;
};

const sendAjax = (type, action, data, success) => {
  $.ajax({
    cache: false,
    type,
    url: action,
    data,
    dataType: 'json',
    success,
    error: (xhr, status, error) => {
      console.log(xhr);
      const messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    },
  });
};
//endregion

// Donate
//region
const DonateWindow = (props) => {
  return (
    <div id="donateWindow">
      <h3>Tired of ads?</h3>
      <p>More donations means less ads and more improvements to the app!</p>
      <label htmlFor="donation">Your Donation:</label>
      <input id="donation" type="text" name="donation" placeholder="$x.xx"/>
      <input id="donate" type="button" value="Donate" onClick={handleDonate}/>
    </div>
  );
};

const createDonateWindow = () => {
  document.querySelector('#genChar').innerHTML = '';
  document.querySelector('#charList').innerHTML = '';
  ReactDOM.render(
    <DonateWindow />,
    document.querySelector('#content')
  );
};

const handleDonate = (e) => {
  let num = document.querySelector('#donation').value;
  num = num.split("");
  if (num[0] !== '$') {
    handleError('Please use the format $x.xx');
    return;
  }
  if (!num) { console.log('error: '+num); return; }
  let parsedValue = num[1];
  for (let i = 2; i<num.length; i++) {
    parsedValue += num[i];
  }
  parsedValue = parseFloat(parsedValue);
  handleError(`Thank you for donating $${parsedValue}!`);
};
//endregion

// About
//region
const AboutWindow = (props) => {
  return (
    <div id="documentation">
      <h1>Documentation</h1>
      <h3>Purpose</h3>
      <p>
        The site is intended to be a tool for tabletop role-playing games and contructing maps for them. 
        The idea initially came from a personal need for a neat and free way to make a blueprint for a 
        specific building in a Dungeons & Dragons campaign.
      </p>
      <p>
        The initial idea seems to have been overscoped,
        especially considering that the idea was simplified even further in an attempt to meet the deadline. 
        As it stands, the site is capable of creating "blueprints" which users can draw on using HTML Canvas. 
        Rather than storing coordinates as initially planned, I was recommended to save the canvas as an image, 
        and then load the image back in when a user wanted to continue developing. However, there seems to be 
        an issue when dealing with canvas.toDataURL that I did not anticipate, which ate up a good deal of time 
        and is still not resolved, so the user cannot load "blueprints" that they have previously worked on. 
        I hope to rectify this error and restructure a good deal of the app in future development. 
      </p>
      <h3>Profitability</h3>
      <p>
        Everyone hates ads, but they are likely a substantial source of income and support for a good deal of websites. 
        It is with that in mind that I intended to make the app have advertisements on the right side of the screen. 
        Later on, I thought about how a good deal of projects, especially webcomics, are funded by both ads and donations. 
        With this in mind, I created the "Donate" page. At the moment, it doesn't do anything with the information it's 
        presented and does not prompt individuals for personal information, as the site has nowhere near enough security 
        to warrant that.
      </p>
      <h3>Templating</h3>
      <p>
        A combination of express and handlebars was used in order to create usable pages. However, they only account for
        the script links, navigation, and a very limited skeleton (a couple empty sections).
      </p>
      <h3>Use of MVC</h3>
      <p>
        The Model-View-Controller pattern was used to generate accounts and "blueprints" that belonged to individual accounts. 
        The pattern also enabled an efficient use of MongoDB.
      </p>
      <h3>Use of MongoDB</h3>
      <p>
        Account information and blueprints are saved to MongoDB for safe keeping. Accounts consist of username, password, the 
        date the account was established, and information necessary to decrypt and verify passwords, which are not only hashed, but 
        also encrypted to add a stronger layer of security. Each blueprint stored has a name, owner ID, and a string value that 
        was used in order to store the outcome of canvas.toDataURL() to be used when the canvas were to be loaded in.
      </p>
      <h3>Above & Beyond</h3>
      <p>
        Express and handlebars helped a good deal, but most elements are generated with React. 
        Although the initial "Above & Beyond" was intended to be an efficient storage of "blueprint" 
        information via bitpacking, inexperience on my part led to a few problems eating too much time.
      </p>
    </div>
  )
};

const createAboutWindow = () => {
  document.querySelector('#genChar').innerHTML = '';
  document.querySelector('#charList').innerHTML = '';
  ReactDOM.render(
    <AboutWindow />,
    document.querySelector('#content')
  );
};
//endregion

/* // EDIT
// EncounterCalculator
const CalcWindow = () => {
  
};

const createCalcWindow = () => {
  document.querySelector('#genChar').innerHTML = '';
  document.querySelector('#charList').innerHTML = '';
  ReactDOM.render(
    <CalcWindow />,
    document.querySelector('#content')
  );
};

const handleCalc = () => {

}; */

// React (Character)
//region
const CharForm = (props) => {
  return (
    <form id="charForm" name="charForm" onSubmit={handleNewChar} action="/newChar" method="POST" className="form">
      <label htmlFor="name">Name: </label>
      <input id="name" type="text" name="name" placeholder="Name"/><br/>
      <label htmlFor="level">Level: </label>
      <input id="level" type="number" name="level" placeholder="0" min="1" max="25"/><br/>
      <label htmlFor="class">Class: </label>
      <input id="class" type="text" name="class" placeholder="Fighter (Champion)" /><br/>
      <label htmlFor="str">STR: </label>
      <input class="stat" type="number" name="stat" placeholder="10" min="1" max="30"/><br/>
      <label htmlFor="dex">DEX: </label>
      <input class="stat" type="number" name="stat" placeholder="10" min="1" max="30"/><br/>
      <label htmlFor="con">CON: </label>
      <input class="stat" type="number" name="stat" placeholder="10" min="1" max="30"/><br/>
      <label htmlFor="int">INT: </label>
      <input class="stat" type="number" name="stat" placeholder="10" min="1" max="30"/><br/>
      <label htmlFor="wis">WIS: </label>
      <input class="stat" type="number" name="stat" placeholder="10" min="1" max="30"/><br/>
      <label htmlFor="cha">CHA: </label>
      <input class="stat" type="number" name="stat" placeholder="10" min="1" max="30"/><br/>
      <label htmlFor="health">Max Health: </label>
      <input class="health" id="health" type="number" name="health" placeholder="0" min="1" /><br/>
      <input type="hidden" id="csrf" name="_csrf" value={props.csrf}/>
      <input className="formSubmit" type="submit" value="+ Character"/>
    </form>
  );
};

// Need inventory block
const CharData = (props) => {
  return (
    /*
    <div id="charData" data-all={JSON.stringify(props.character)}>
      <h1>{props.character.name}</h1>
      <h2>(Level {props.character.level}) {props.character.class}</h2>
      <ul id="statBlock">
        <li className='stat'>STR: {props.character.stats[0]}
          <button type="button" onClick={()=>{
            const locale = document.querySelector('#charData');
            let data = JSON.parse(locale.getAttribute('data-all'));
            data.stats[0]++;
            locale.setAttribute('data-all', JSON.stringify(data));
            saveChar()
          }}>+</button>
        </li>
        <li className='stat'>DEX: {props.character.stats[1]}</li>
        <li className='stat'>CON: {props.character.stats[2]}</li>
        <li className='stat'>INT: {props.character.stats[3]}</li>
        <li className='stat'>WIS: {props.character.stats[4]}</li>
        <li className='stat'>CHA: {props.character.stats[5]}</li>
      </ul>
      <ul id="healthBlock">
        <li>Temporary HP: {props.character.health[1]}</li>
        <li>Current HP: {props.character.health[0]}</li>
        <li>Max HP: {props.character.health[2]}</li>
      </ul>
      <ul id="inventoryBlock">
      </ul>
      <button type="button" onClick={saveChar} data-key={props.character._id}>Save Changes</button>
    </div>
    */
  <form id="charData" name="charData" onSubmit={saveChar} action="/saveChar" method="POST" className="form" data-all={JSON.stringify(props.character)}>
    <h1>{props.character.name}</h1>
      <h2>{props.character.class}</h2>
    <label htmlFor="level">Level: </label>
    <input id="level" type="number" name="level" placeholder="0" min="1" max="25" 
      defaultValue={props.character.level}/><br/>
    <label htmlFor="str">STR: </label>
    <input class="stat" type="number" name="stat" placeholder="10" min="1" max="30"
      defaultValue={props.character.stats[0]}/><br/>
    <label htmlFor="dex">DEX: </label>
    <input class="stat" type="number" name="stat" placeholder="10" min="1" max="30"
      defaultValue={props.character.stats[1]}/><br/>
    <label htmlFor="con">CON: </label>
    <input class="stat" type="number" name="stat" placeholder="10" min="1" max="30"
      defaultValue={props.character.stats[2]}/><br/>
    <label htmlFor="int">INT: </label>
    <input class="stat" type="number" name="stat" placeholder="10" min="1" max="30"
      defaultValue={props.character.stats[3]}/><br/>
    <label htmlFor="wis">WIS: </label>
    <input class="stat" type="number" name="stat" placeholder="10" min="1" max="30"
      defaultValue={props.character.stats[4]}/><br/>
    <label htmlFor="cha">CHA: </label>
    <input class="stat" type="number" name="stat" placeholder="10" min="1" max="30"
      defaultValue={props.character.stats[5]}/><br/>
    <label htmlFor="health">Current HP: </label>
    <input class="health" id="health" type="number" name="health" placeholder="0" min="1" 
      defaultValue={props.character.health[0]}/><br/>
    <label htmlFor="health">Temporary HP: </label>
    <input class="health" id="health" type="number" name="health" placeholder="0" min="0" 
      defaultValue={props.character.health[1]}/><br/>
    <label htmlFor="health">Max HP: </label>
    <input class="health" id="health" type="number" name="health" placeholder="0" min="1" 
      defaultValue={props.character.health[2]}/><br/>
    <input type="hidden" id="csrf" name="_csrf" value={props.csrf}/>
    <input type="hidden" name="_id" value={props.character._id}/>
    <input className="formSubmit" type="submit" value="Update"/>
  </form>
  );
};

const CharList = (props) => {
  if (props.characters.length === 0) {
    <div class="listItem" data-key='null'>
      <h3 class="emptyItem">No Characters</h3>
    </div>
  }
  const charItems = props.characters.map((character) => {
    return (
      <div class="listItem" data-key={character._id}>
        <h1 class="delChar" onClick={handleCharDel}> X </h1>
        <h2 class="name" data-all={JSON.stringify(character)} onClick={handleChar}>{character.name}</h2>
        <h3 class="lvlClass">({character.level}) {character.class}</h3>
      </div>
    );
  });
  return (
    <div className="list">
      <button type="button" onClick={(e) => createCharForm(document.querySelector('#genChar').getAttribute('csrf'), e)}>New Character</button>
      {charItems}
    </div>
  );
};

const createCharForm = (csrf) => {
  ReactDOM.render(
    <CharForm csrf={csrf} />,
    document.querySelector('#genChar')
  );
};

const createCharData = (csrf, character) => {
  ReactDOM.render(
    <CharData csrf={csrf} character={character} />,
    document.querySelector('#genChar')
  );
};

const createCharList = (characters) => {
  ReactDOM.render(
    <CharList characters={characters} />,
    document.querySelector('#charList')
  );
};

//endregion

// Character Handling
//region
const loadChar = (csrf) => {
  sendAjax('GET', '/getChar', null, (data) => {
    createCharList(data.characters);
    if(data.characters.length < 1) {
      createCharForm(csrf);
    }
  });
};

const handleNewChar = (e) => {
  e.preventDefault();
  $("#displayMessage").animate({left:'hide'}, 500);  
  sendAjax('POST', document.querySelector("#charForm").getAttribute("action"), $('#charForm').serialize(), () => {
    loadChar(document.querySelector('#genChar').getAttribute('csrf'));
  });
  return false;
};

const saveChar = (e) => {
  e.preventDefault();
  let obj = document.querySelector('#charData').getAttribute('data-all');
  obj = JSON.parse(obj);
  obj._csrf = document.querySelector('#genChar').getAttribute('csrf');
  obj = JSON.stringify(obj);
  sendAjax('POST', '/saveChar', $('#charData').serialize(), (msg) => {
    if (!msg.redirect) {
      handleError(JSON.stringify(msg));
    }
    console.log('fire');
    loadChar(document.querySelector('#genChar').getAttribute('csrf'));
  });
};

const handleChar = (e) => {
  let key = e.target.parentElement.getAttribute('data-key');
  let token = document.querySelector('#genChar').getAttribute('csrf');
  let char = JSON.parse(e.target.getAttribute('data-all'));
  createCharData(token, char);
};

const handleCharDel = (e) => {
  const key = JSON.stringify(e.target.parentElement.getAttribute('data-key'));
  const token = `_csrf=${document.querySelector('#genChar').getAttribute('csrf')}`;
  const obj = `_id=${key}&${token}`;
  sendAjax('DELETE', '/delChar', obj, (msg) => {
    console.dir(msg);
  });
  //e.target.parentElement.hidden = true;
  loadChar(document.querySelector('#genChar').getAttribute('csrf'));
};
//endregion

// React (Login)
//region
const LoginWindow = (props) => {
  return (
    <form id="loginForm" name="loginForm" onSubmit={handleLogin} action="/login" method="POST" class="form">
      <label htmlFor="username">Username: </label>
      <input id="user" type="text" name="username" placeholder="Username"/>
      <br/>
      <label htmlFor="pass">Password: </label>
      <input id="pass" type="password" name="pass" placeholder="Password"/>
      <input type="hidden" name="_csrf" value={props.csrf}/>
      <br/>
      <input className="formSubmit" type="submit" value="Log In"/>
    </form>
  );
};

const SignupWindow = (props) => {
  return (
    <form id="signupForm" name="signupForm" onSubmit={handleSignup} action="/signup" method="POST" className="form">
      <label htmlFor="username">Username: </label>
      <input id="user" type="text" name="username" placeholder="Username"/>
      <br/>
      <label htmlFor="pass1">Password: </label>
      <input id="pass1" type="password" name="pass1" placeholder="Password"/>
      <br/>
      <label htmlFor="pass2">Confirm Password: </label>
      <input id="pass2" type="password" name="pass2" placeholder="Confirm Password"/>
      <input type="hidden" name="_csrf" value={props.csrf}/>
      <br/>
      <input className="formSubmit" type="submit" value="Sign Up"/>
    </form>
  );
};

const ChangePassWindow = (props) => {
  return (
    <form id="changePassForm" name="changePassForm" onSubmit={handleChangePass} action="/changePass" method="POST" className="form">
    <label htmlFor="pass">Old Password: </label>
    <input id="pass" type="password" name="pass" placeholder="Old Password"/>
    <label htmlFor="diffPass1">New Password: </label>
    <input id="diffPass1" type="password" name="diffPass1" placeholder="New Password"/>
    <label htmlFor="diffPass2">Confirm Password: </label>
    <input id="diffPass2" type="password" name="diffPass2" placeholder="Confirm Password"/>
    <input type="hidden" name="_csrf" value={props.csrf}/>
    <input className="formSubmit" type="submit" value="Change it!"/>
  </form>
  );
}

const createLoginWindow = (csrf) => {
  ReactDOM.render(
    <LoginWindow csrf={csrf} />,
    document.querySelector('#content')
  );
}

const createSignupWindow = (csrf) => {
  ReactDOM.render(
    <SignupWindow csrf={csrf} />,
    document.querySelector('#content')
  );
}

const createChangePassWindow = (csrf) => {
  ReactDOM.render(
    <ChangePassWindow csrf={csrf} />,
    document.querySelector('#content')
  );
}
//endregion

// Login & Prep
//region
const handleLogin = (e) => {
  e.preventDefault();
  $('#displayMessage').animate({ left: 'hide' }, 500);
  if ($('#user').val() === '' || $('#pass').val() === '') {
    handleError('Username and password are required');
    return false;
  }
  sendAjax('POST', document.querySelector('#loginForm').getAttribute('action'),
    $('#loginForm').serialize(), redirect);
  return false;
};

const handleSignup = (e) => {
  e.preventDefault();
  $('displayMessage').animate({ left: 'hide' }, 500);

  // check passwords
  if (document.querySelector('#user').value === '' ||
  document.querySelector('#pass1').value === '' ||
  document.querySelector('#pass2').value === '') {
    handleError('Please fill in all fields');
    return false;
  }

  if (document.querySelector('#pass1').value !== document.querySelector('#pass2').value) {
    //console.log(document.querySelector('#pass1').value + "," + document.querySelector('#pass2').value);
    handleError('Passwords do not match');
    return false;
  }

  sendAjax('POST', document.querySelector('#signupForm').getAttribute('action'),
    $('#signupForm').serialize(), redirect);
  return false;
};

const handleChangePass = (e) => {
  e.preventDefault();
  $('displayMessage').animate({ left: 'hide' }, 500);

  // Check passwords
  if (document.querySelector('#pass').value === '' ||
  document.querySelector('#diffPass1').value === '' ||
  document.querySelector('#diffPass2').value === '') {
    handleError('Please fill in all fields');
    return false;
  }

  if (document.querySelector('#diffPass1').value !== document.querySelector('#diffPass2').value) {
    handleError('Your new passwords do not match');
    return false;
  }

  // Cannot check password / password match on client-side~!

  sendAjax('POST', document.querySelector('#changePassForm').getAttribute('action'),
    $('#changePassForm').serialize(), redirect);
  return false;
};

const setup = (csrf) => {
  const charApp = document.querySelector('#genChar');
  const loginButton = document.querySelector('#loginButton');
  const signupButton = document.querySelector('#signupButton');
  const changePassButton = document.querySelector('#changePassButton');
  const aboutButton = document.querySelector('#aboutButton');
  const donateButton = document.querySelector('#donateButton');
  const charButton = document.querySelector('#charButton');

  if (changePassButton) {
    changePassButton.addEventListener('click', (e) => {
      e.preventDefault();
      createChangePassWindow(csrf);
      return false;
    });
  }
  
  if (signupButton) {
    signupButton.addEventListener('click', (e) => {
      e.preventDefault();
      createSignupWindow(csrf);
      return false;
    });
  }

  if (loginButton) {
    loginButton.addEventListener('click', (e) => {
      e.preventDefault();
      createLoginWindow(csrf);
      return false;
    });
    createLoginWindow(csrf);
  }

  if (aboutButton) {
    aboutButton.addEventListener('click', (e) => {
      e.preventDefault();
      createAboutWindow();
      return false;
    })
  }

  if (charApp) {
    loadChar(csrf);
    charApp.setAttribute('csrf', csrf);
  }

  if (donateButton) {
    donateButton.addEventListener('click', (e) => {
      e.preventDefault();
      createDonateWindow();
      return false;
    });
  }

  if (charButton) {
    charButton.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector('#content').innerHTML = '';
      loadChar(csrf);
    })
  }
};

const getToken = () => {
  sendAjax('GET', '/getToken', null, (result) => {
    setup(result.csrfToken);
  });
};
//endregion

window.onload = () => {
  handleError('Later!');
  getToken();
};
