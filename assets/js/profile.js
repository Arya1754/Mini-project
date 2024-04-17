document.getElementById('upload-btn').addEventListener('click', function() {
    var fileInput = document.getElementById('image');
    var file = fileInput.files[0];
    
    if (!file) {
        alert('Please select an image file.');
        return;
    }

    var reader = new FileReader();

    reader.onload = function(e) {
        var imgElement = document.createElement('img');
        imgElement.src = e.target.result;
        imgElement.alt = 'Uploaded Image';

        var profilePictureDiv = document.getElementById('profile-picture');
        profilePictureDiv.innerHTML = '';
        profilePictureDiv.appendChild(imgElement);
    };

    reader.readAsDataURL(file);
    
});
