document.addEventListener('DOMContentLoaded', function () {
    var addToCartButtons = document.querySelectorAll('.btn.btn-primary');
    var addToWishlistButtons = document.querySelectorAll('.product-btn');
    var purchaseButton = document.querySelector('.panel-btn');
    var removeItemButtons = document.querySelectorAll('.item-close-btn');
    var quantityInputs = document.querySelectorAll('.item-quantity');

    addToCartButtons.forEach(function (button) {
        button.addEventListener('click', addToCart);
    });

    addToWishlistButtons.forEach(function (button) {
        button.addEventListener('click', addToWishlist);
    });

    purchaseButton.addEventListener('click', purchase);

    removeItemButtons.forEach(function (button) {
        button.addEventListener('click', removeItemButton);
    });

    quantityInputs.forEach(function(input) {
        input.addEventListener('input', updatequantity);
    });

    updateCart(); 
});

function purchase(event) {
    var pbutton = event.target;
    var parentLink = pbutton.parentElement;
    var confirmed = window.confirm('DO YOU WANT TO PROCEED WITH THE ORDER?');

    if (confirmed && parentLink.tagName === 'A') {
        parentLink.href = './cart.html';
        window.location.href = parentLink.href;
    }
}

function removeItemButton(event) {
    var buttonClick = event.target;
    var parentElement = buttonClick.closest('.panel-item'); 
    var confirmed = window.confirm('Do You Want To Remove Element From Cart');
    if (confirmed) {
        var inputElement = parentElement.querySelector('.item-quantity');
        var quantity = parseInt(inputElement.value);
        if (quantity > 1) {
            inputElement.value = quantity - 1;
        } else {
            parentElement.remove();
        }
        updateCart();
    }
}

function updatequantity(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCart();
}

function addToCart(event) {
    var button = event.target;
    var productCard = button.closest('.product-card');
    console.log('Product Card:', productCard);
    var titleElement = productCard.querySelector('.card-title');
    console.log('Title Element:', titleElement);
    var payElement = productCard.querySelector('.price');
    console.log('Pay Element:', payElement);
    var imageElement = productCard.querySelector('.card-banner img');
    console.log('Image Element:', imageElement);

    if (!titleElement || !payElement || !imageElement) {
        console.error('Required elements not found');
        return;
    }

    var title = titleElement.innerText;
    var pay = parseFloat(payElement.textContent.match(/\d+\.\d+/)); // Extracting numeric value from payElement
    var imageSrc = imageElement.src;

    var cartItems = document.querySelectorAll('[data-side-panel="cart"] .panel-item');
    var itemAlreadyInCart = false;
    cartItems.forEach(function (cartItem) {
        var cartTitle = cartItem.querySelector('.item-title').innerText;
        if (cartTitle === title) {
            itemAlreadyInCart = true;
            var confirmed = window.confirm('This item is already in your cart. Do you want to add it again?');
            if (confirmed) {
                var inputElement = cartItem.querySelector('.item-quantity');
                var quantity = parseInt(inputElement.value) + 1;
                inputElement.value = quantity;
                updateCart();
            }
        }
    });

    if (!itemAlreadyInCart) {
        addItemToCart(title, pay, imageSrc);
    }
}

function addItemToCart(title, pay, imageSrc) {
    var cartRow = document.createElement('li');
    cartRow.classList.add('panel-item');
    var cartItemList = document.querySelector('[data-side-panel="cart"] .panel-list');

    var cartRowContent = `
    <div class="panel-card">
        <figure class="item-banner">
            <img src="${imageSrc}" width="46" height="46" loading="lazy">
        </figure>
        <div>
            <p class="item-title">${title}</p>
            <input type="number" class="item-quantity" value="1">
            <div class="price">${pay}</div> 
        </div>
        <button class="item-close-btn" aria-label="Remove item">
            <ion-icon name="close-outline"></ion-icon>
        </button>
    </div>`;

    cartRow.innerHTML = cartRowContent;
    cartItemList.appendChild(cartRow);

    cartRow.querySelector('.item-close-btn').addEventListener('click', removeItemButton);
    updateCart();
}

function addToWishlist(event) {
    var button = event.target;
    var productCard = button.closest('.product-card');
    var titleElement = productCard.querySelector('.card-title');
    var payElement = productCard.querySelector('.price');
    var imageElement = productCard.querySelector('.card-banner img');
    var title = titleElement.innerText;
    var pay = payElement.innerText;
    var imageSrc = imageElement.src;

    var wishItems = document.querySelectorAll('[data-side-panel="whishlist"] .panel-item');
    var itemAlreadyInWishlist = false;
    
    wishItems.forEach(function (wishItem) {
        var wishTitle = wishItem.querySelector('.item-title').innerText;
        if (wishTitle === title) {
            itemAlreadyInWishlist = true;
            alert('This item is already in your wishlist.');
        }
    });

    if (!itemAlreadyInWishlist) {
        addItemToWishlistPanel(title, pay, imageSrc);
        alert('Item added to wishlist.');
    }
}

function addItemToWishlistPanel(title, pay, imageSrc) {
    var payNumeric = parseFloat(pay.replace(/[^\d.]/g, '').replace(/^\.|\.+$/g, ""));
     var wishRow = document.createElement('li');
    wishRow.classList.add('panel-item');

    var wishItemList = document.querySelector('[data-side-panel="whishlist"] .panel-list');

    var wishRowContent = `
    <div class="panel-card">
        <figure class="item-banner">
            <img src="${imageSrc}" width="46" height="46" loading="lazy">
        </figure>
        <div>
            <p class="item-title">${title}</p>
            <span class="price">${pay}</span>
            <button class="btn btn-primary">Add to Cart</button>
        </div>
        <button class="item-close-btn" aria-label="Remove item">
            <ion-icon name="close-outline"></ion-icon>
        </button>
    </div>`;

    wishRow.innerHTML = wishRowContent;

    wishRow.querySelector('.item-close-btn').addEventListener('click', removeItemButton );

    wishItemList.appendChild(wishRow);
   
    var addToCartButton = wishRow.querySelector('.btn.btn-primary');
    addToCartButton.addEventListener('click', function() {
        var cartItems = document.querySelectorAll('[data-side-panel="cart"] .panel-item');
        var itemAlreadyInCart = false;
        cartItems.forEach(function (cartItem) {
            var cartTitle = cartItem.querySelector('.item-title').innerText;
            if (cartTitle === title) {
                itemAlreadyInCart = true;
                var confirmed = window.confirm('This item is already in your cart. Do you want to add it again?');
                if (confirmed) {
                    var inputElement = cartItem.querySelector('.item-quantity');
                    var quantity = parseInt(inputElement.value) + 1;
                    inputElement.value = quantity;
                    updateCart();
                }
            }
        });

        if (!itemAlreadyInCart) {
            addItemToCart(title, payNumeric, imageSrc); // Use payNumeric instead of pay
            var alertMessage = 'The item "' + title + '" has been added to your cart.';
            alert(alertMessage);
            wishRow.remove();
            updateCart();
        }
    });
}


function updateCart() {
    var cartItems = document.querySelectorAll('[data-side-panel="cart"] .panel-item');
    var subtotal = 0;
    cartItems.forEach(function (cartItem) {
        var priceElement = cartItem.querySelector('.price');
        var quantityElement = cartItem.querySelector('.item-quantity');
        console.log(priceElement, quantityElement); // Log priceElement and quantityElement to debug
        var price = parseFloat(priceElement.textContent);
        var quantity = parseInt(quantityElement.value);
        subtotal += price * quantity;
    });

    var subtotalElement = document.querySelector('.subtotal');
    if (subtotalElement) {
        subtotalElement.textContent = 'Subtotal      R.s  ' + subtotal.toFixed(2);
    }
}
