const createWelcomeSection = () => {
    // Select the parent element where the section will be appended
    const welcomeSection = document.getElementById('welcome');
  
    // Create the container for the image and bio
    const container = document.createElement('div');
    container.classList.add('d-flex', 'flex-column', 'align-items-center', 'p-3', 'rounded'); // Bootstrap classes for vertical layout
    // container.style.backgroundColor = '#f8f9fa'; // Optional: Light background color
  
    // Create and append the big "Hello" heading
    const helloHeading = document.createElement('h1');
    helloHeading.textContent = ''; // Big greeting
    helloHeading.classList.add('display-4', 'mb-4'); // Bootstrap class for large text and spacing
    container.appendChild(helloHeading);
  
    // Create and append the image
    const img = document.createElement('img');
    // only use this for when you deploy onto github
    img.src = 'https://AlexYu84.github.io/personal-web/images/image0.jpg';
    // Use this for local repos
    // img.src = '/images/image0.jpg'; // Replace with the actual path to your image
    img.alt = 'an image of me!';
    img.classList.add('img-fluid', 'rounded-circle', 'mb-3'); // Bootstrap classes for rounded corners and spacing
    img.style.width = '150px'; // Optional: Set image width
    container.appendChild(img);
  
    // Create and append the bio container
    const bioContainer = document.createElement('div');
    bioContainer.classList.add('text-center');
    bioContainer.style.maxWidth = '500px'; // Constrain the width of the bio text
    bioContainer.style.margin = '0 auto'; // Center-align the container
  
    // Create and append the bio text
    const bio = document.createElement('p');
    bio.innerHTML = `
            <strong>Hello! My name is Alex Yu. </strong>
            I am a first year graduate student at PSU
            studying Computer Science. Computers are my life and I love doing all things
            related to it. I also have way too many hobbies ranging from music, working 
            on cars, building keyboards, gaming, you name it.
    `;
    bio.classList.add('text-center', 'mb-0'); // Bootstrap class to center-align text
    bioContainer.appendChild(bio);
  
    // Append the bio container to the main container
    container.appendChild(bioContainer);
  
    // Append the main container to the "welcome" section
    welcomeSection.appendChild(container);
  };
  
  // Run the function after the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', createWelcomeSection);
  
  
  // Function to fetch data from the API
  const fetchData = async (url) => {
    try {
        const response = await fetch(url); // Retrieve data from the API
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Parse the JSON response
        return data; // Return the parsed data
    } catch (error) {
        console.error('Error fetching data:', error);
        return null; // Return null in case of an error
    }
};

document.getElementById('subject').addEventListener('change', function() {
    const otherSubjectContainer = document.getElementById('otherSubjectContainer');
    if (this.value === 'other') {
        otherSubjectContainer.style.display = 'block'; // Show the "Other" input box
    } else {
        otherSubjectContainer.style.display = 'none'; // Hide the "Other" input box
        document.getElementById('otherSubject').value = ''; // Clear the input
    }
});

emailjs.init("tZxeEWp4QuURfX7fX"); // Replace with your actual user ID from EmailJS
document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Collect form data
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value,
    };

    console.log(formData); // Log data for verification

    // Example integration with EmailJS
    emailjs.send("service_s43qj8e", "template_yaehtkv", {
        name: formData.name,          // Map fields to template variables
        email: formData.email,
        phone: formData.phone,
        subject:formData.subject,
        message: formData.message,
      })
        .then(function(response) {
        alert("Email sent successfully!");
        console.log('SUCCESS!', response.status, response.text);
        document.getElementById('userForm').reset();
      }, function(error) {
        alert("Failed to send email. Please try again.");
        console.log('FAILED...', error);
      });
});
  
// Select the toggle button and add an event listener
document.getElementById('themeToggle').addEventListener('click', function() {
    // Toggle the dark theme class on the body element
    document.body.classList.toggle('dark-theme');
    // Save the user's preference to localStorage
    const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
  });
  
  // Apply the saved theme on page load
  window.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme') || 'light'; // Default to light
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
    }
});

document.getElementById('projectSearch').addEventListener('input', function() {
    const searchValue = this.value.toLowerCase();
    const cards = document.querySelectorAll('#projectContainer .card');

    cards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        // Check if the search value matches the card title
        if (title.includes(searchValue)) {
            card.parentElement.style.display = 'block'; // Show matching card
        } else {
            card.parentElement.style.display = 'none'; // Hide non-matching card
        }
    });
});
