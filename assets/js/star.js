document.addEventListener('DOMContentLoaded', function () {
    const stars = document.querySelectorAll('.stars input');
    const reviewText = document.getElementById('reviewText');
    const submitReviewBtn = document.getElementById('submitReview');

    submitReviewBtn.addEventListener('click', function() {
        const rating = getRating();
        const review = reviewText.value.trim();

        if (rating === 0) {
            alert('Please select a rating.');
            return;
        }

        if (review === '') {
            alert('Please write your review.');
            return;
        }

        // Here, you can submit the rating and review to your backend or perform any other action
        alert('Rating: ' + rating + ', Review: ' + review);
        // Clear the form after submission
        resetForm();
    });

    function getRating() {
        let rating = 0;
        stars.forEach(function(star) {
            if (star.checked) {
                rating = parseInt(star.value);
            }
        });
        return rating;
    }

    function resetForm() {
        stars.forEach(function(star) {
            star.checked = false;
        });
        reviewText.value = '';
    }
});
