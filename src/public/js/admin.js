document.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.getElementById('login-name');
  const passwordInput = document.getElementById('login-pass');
  const loginForm = document.querySelector('.login-form');
  const errorMessage = document.querySelector('.error-mssge');

  console.log('admiiiiin jsloaded');

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  loginForm.addEventListener('submit', async e => {
    e.preventDefault();
    const emailText = emailInput.value;
    const password = passwordInput.value;
    let messages = [];
    if (!emailPattern.test(emailText)) {
      messages.push('Enter Valid Email');
    }
    if (messages.length > 0) {
      return (errorMessage.textContent = messages[0]);
    }
    console.log(emailText, password);

    try {
      const response = await fetch('/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailText, password }),
      });
      const data = await response.json();
      if (!data.success) {
        console.log(data.message);

        return (errorMessage.textContent = data.message);
      } else {
        window.location.href = data.redirectUrl;
      }
    } catch (error) {
      console.log(`Error in admin js ${error.message}`);
    }
  });

  ///////////////////
});
