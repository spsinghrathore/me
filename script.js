document.addEventListener('DOMContentLoaded', function() {
    // Handle splash screen form submission
    document.getElementById('profileForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting in the traditional way

        // Get the user input values
        const username = document.getElementById('username').value;
        const dob = document.getElementById('dobInput').value;
        const profileImage = document.getElementById('profileImage').files[0]; // Get the selected file

        // Create a FileReader to read the image
        const reader = new FileReader();
        reader.onload = function(e) {
            // Store the data in local storage
            localStorage.setItem('username', username);
            localStorage.setItem('profileImage', e.target.result); // Store the image as a data URL
            localStorage.setItem('dob', dob);

            // Hide the splash screen and show the main content
            document.getElementById('splashScreen').style.display = 'none';
            document.getElementById('mainContent').style.display = 'block';

            // Set the profile image and username in the main content
            document.getElementById('profileImg').src = e.target.result;
            document.getElementById('profileName').textContent = username;

            // Calculate and set the life bar
            updateLifeBar(dob);
        };
        reader.readAsDataURL(profileImage); // Read the file as a data URL
    });

    // Function to update the life bar based on date of birth
    function updateLifeBar(dob) {
        const dobDate = new Date(dob);
        const today = new Date();
        const age = today.getFullYear() - dobDate.getFullYear();
        const monthDiff = today.getMonth() - dobDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
            age--;
        }
        const lifeExpectancy = 80;
        const lifeLivedPercent = (age / lifeExpectancy) * 100;
        document.getElementById('lifeBar').style.width = lifeLivedPercent + '%';
        document.getElementById('percentageText').textContent = Math.round(lifeLivedPercent) + '%'; // Display percentage
    }

    // Check if user data exists and update main content if available
    if (localStorage.getItem('username') && localStorage.getItem('profileImage') && localStorage.getItem('dob')) {
        document.getElementById('splashScreen').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';

        // Set the profile image and username
        document.getElementById('profileImg').src = localStorage.getItem('profileImage');
        document.getElementById('profileName').textContent = localStorage.getItem('username');

        // Update the life bar with stored date of birth
        updateLifeBar(localStorage.getItem('dob'));
    }

    function updateLifeBar(dob) {
        const dobDate = new Date(dob);
        const today = new Date();
        const age = today.getFullYear() - dobDate.getFullYear();
        const monthDiff = today.getMonth() - dobDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
            age--;
        }
        const lifeExpectancy = 80;
        const lifeLivedPercent = (age / lifeExpectancy) * 100;
        const percentageText = document.getElementById('percentageText');
    
        document.getElementById('lifeBar').style.width = lifeLivedPercent + '%';
        percentageText.textContent = Math.round(lifeLivedPercent) + '%';
    
        // Hide the percentage text if the bar is fully filled
        if (lifeLivedPercent >= 100) {
            percentageText.style.display = 'none';
        } else {
            percentageText.style.display = 'block';
        }
    }
    
});
