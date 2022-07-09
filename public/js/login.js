/* SIGN UP FORM HANDLING */
const signUpHandler = async (event) => {
  event.preventDefault();
  const su_username = document.querySelector('#signup-username').value.trim();
  const su_pwd = document.querySelector('#signup-pwd').value.trim();

  // todo: somekind of form validation

  // assume pass the validation
  if (su_username && su_pwd) {
    // fetch post user
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({
        su_username,
        su_pwd
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.replace('/dashboard')
    } else {
      alert(response.statusText)
    }

  } else {
    // user feedback: missing field
  }

  console.log(su_pwd, su_username)
}

document.querySelector('#signup-form').addEventListener('submit', signUpHandler);

/* LOGIN FORM HANDLING */
const loginHandler = async (event) => {
  event.preventDefault();
  const lg_username = document.querySelector('#login-username').value.trim();
  const lg_pwd = document.querySelector('#login-pwd').value.trim();

  // todo: need input validation
  //passing validation
  if (lg_username && lg_pwd) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        lg_username,
        lg_pwd
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      document.location.replace('/dashboard');

    } else {
      alert(response.statusText)
    }
  }
}

document.querySelector('#login-form').addEventListener('submit', loginHandler);