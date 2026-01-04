const loginText = document.querySelector('.title-text .login');
const loginForm = document.querySelector('form.login');
const loginBtn = document.querySelector('label.login');
const signupBtn = document.querySelector('label.signup');
const signupLink = document.querySelector('form .signup-link a');
signupBtn.onclick = () => {
  loginForm.style.marginLeft = '-50%';
  loginText.style.marginLeft = '-50%';
};
loginBtn.onclick = () => {
  loginForm.style.marginLeft = '0%';
  loginText.style.marginLeft = '0%';
};
signupLink.onclick = () => {
  signupBtn.click();
  return false;
};
////////////////////////////////////////////////////////
//Validation logic

const emailSignup = document.querySelector('.email_signup');
const passwordSignup = document.querySelector('.password_signup');
const confirmPassword = document.querySelector('.confirm_password');
const signupForm = document.querySelector('form.signup');
const errorMessage = document.querySelector('.error-mssge');
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
signupForm.addEventListener('submit', async e => {
  e.preventDefault();
  const emailText = emailSignup.value;
  const password = passwordSignup.value;
  const confirmPwd = confirmPassword.value;
  let messages = [];
  if (!emailPattern.test(emailText)) {
    messages.push('Enter Valid Email');
  }
  if (password.length < 6) {
    messages.push('Password is too Short');
  }
  if (password !== confirmPwd) {
    messages.push('Passwords are not Matching');
  }
  if (messages.length > 0) {
    return (errorMessage.textContent = messages[0]);
  }
  try {
    const username = emailText.split('@')[0];
    const response = await fetch('/user/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email: emailText, password }),
    });
    const data = await response.json();
    if (!data.success) {
      errorMessage.textContent = data.message;
      errorMessage.style.color = 'red';
    } else {
      errorMessage.textContent = data.message;
      errorMessage.style.color = 'green';
      setTimeout(() => {
        loginBtn.click();
      }, 2000);
    }
  } catch (error) {
    console.log(`Error in js Data Submision ${error.message}`);
  }
});
///////////////////////
const emailLogin = document.querySelector('.email_input');
const passwordLogin = document.querySelector('.password_input');
const errorLogin = document.querySelector('.error-login');
loginForm.addEventListener('submit', async e => {
  e.preventDefault();
  const emailText = emailLogin.value;
  const password = passwordLogin.value;
  let messages = [];
  if (!emailPattern.test(emailText)) {
    messages.push('Enter Valid Email');
  }
  if (messages.length > 0) {
    return (errorLogin.textContent = messages[0]);
  }
  try {
    const response = await fetch('/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: emailText, password }),
    });
    const data = await response.json();
    if (!data.success) {
      errorLogin.textContent = data.message;
    } else {
      window.location.href = data.redirectUrl;
    }
  } catch (error) {
    console.log(`Error in Login js ${error.message}`);
  }
});
