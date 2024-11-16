document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent default form submission

  const form = e.target;
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  let valid = true;

  // Clear previous error messages
  document.getElementById('nameError').textContent = '';
  document.getElementById('emailError').textContent = '';
  document.getElementById('messageError').textContent = '';

  // Validate Name
  if (name === '') {
    document.getElementById('nameError').textContent = 'Name is required.';
    valid = false;
  }

  // Validate Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === '') {
    document.getElementById('emailError').textContent = 'Email is required.';
    valid = false;
  } else if (!emailRegex.test(email)) {
    document.getElementById('emailError').textContent = 'Please enter a valid email address.';
    valid = false;
  }

  // Validate Message
  if (message === '') {
    document.getElementById('messageError').textContent = 'Message is required.';
    valid = false;
  }

  if (valid) {
    // Send the form if all fields are valid
    fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        // Show the modal if submission is successful
        var myModal = new bootstrap.Modal(document.getElementById('submitModal'));
        myModal.show();

        // Clear all input fields after submission
        form.reset();
      } else {
        // Handle the error (optional)
        alert('Something went wrong. Please try again.');
      }
    }).catch(error => {
      // Handle the error (optional)
      alert('There was an error sending your message.');
    });
  }
});