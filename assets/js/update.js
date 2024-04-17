document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("update-profile-form").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission
        
        // Ask for confirmation
        var confirmed = window.confirm('DO YOU WANT TO UPDATE YOUR PROFILE?');
        
        // If confirmed, redirect to the profile page
        if (confirmed) {
            window.location.href = './profile.html';
        }
    });
});
