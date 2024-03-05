document.addEventListener('DOMContentLoaded', function () {
    // Add to Cart functionality
    const addToCartButtons = document.querySelectorAll('.product-card .btn-primary');
  
    addToCartButtons.forEach(button => {
      button.addEventListener('click', function (event) {
        event.preventDefault();
  
    
  
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('.card-title a').textContent;
        const productPrice = productCard.querySelector('.price').textContent;
  
        console.log(`Added to Cart: ${productName} - ${productPrice}`);
      });
    });
  

    const addToWishlistButtons = document.querySelectorAll('.product-card [aria-label="Add to Whishlist"]');
  
    addToWishlistButtons.forEach(button => {
      button.addEventListener('click', function (event) {
        event.preventDefault();

        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('.card-title a').textContent;
  
        console.log(`Added to Wishlist: ${productName}`);
      });
    });
  });
  