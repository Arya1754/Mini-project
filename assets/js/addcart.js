document.addEventListener('DOMContentLoaded', function () {
    var addToCartButtons = document.querySelectorAll('.btn.btn-primary');
    var addToWishlistButtons = document.querySelectorAll('.product-btn');
    var purchaseButton = document.querySelector('.panel-btn');
    var removeItemButtons = document.querySelectorAll('.item-close-btn');

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
    updateCart();
});

function purchase(event) {
    var pbutton = event.target;
    var parentLink = pbutton.parentElement;
    var confirmed = window.confirm('DO YOU WANT TO PROCEED WITH THE ORDER?');

    if (confirmed && parentLink.tagName === 'A') {
        // Update the href of the parent link
        parentLink.href = 'last.html';

        // Open the link
        window.location.href = parentLink.href;
    }
}

function removeItemButton(event) {
    var buttonClick = event.target;
    var parentElement = buttonClick.parentElement.parentElement.parentElement;
    var confirmed = window.confirm('Do You Want To Remove Element From Cart');
    if (confirmed) {
        parentElement.remove();
        updateCart();
    }
}

function addToCart(event) {
    var button = event.target;
    var productCard = button.closest('.product-card'); // Find the closest parent with class "product-card"
    var titleElement = productCard.querySelector('.card-title');
    var payElement = productCard.querySelector('.price');
    var imageElement = productCard.querySelector('.card-banner img');

    if (!titleElement || !payElement || !imageElement) {
        console.error('Required elements not found');
        return;
    }

    var title = titleElement.innerText;
    var pay = payElement.innerText;
    var imageSrc = imageElement.src;
    
    var cartItems = document.querySelectorAll('[data-side-panel="cart"] .panel-item');
    var itemAlreadyInCart = false;
    cartItems.forEach(function (cartItem) {
        var cartTitle = cartItem.querySelector('.item-title').innerText;
        if (cartTitle === title) {
            itemAlreadyInCart = true;
            var confirmed = window.confirm('This item is already in your cart. Do you want to add it again?');
            if (confirmed) {
                var inputElement = cartItem.querySelector('.item-value');
                var quantity = parseInt(inputElement.value) + 1;
                inputElement.value = quantity;
                cartItem.querySelector('.item-price').innerText = 'R.s ' + totalPrice.toFixed(2);
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
    <li class="panel-item">
        <div class="panel-card">
            <figure class="item-banner">
                <img src="${imageSrc}" width="46" height="46" loading="lazy">
            </figure>
            <div>
                <p class="item-title">${title}</p>
                <input type="number" class="item-value" value="1">
            </div>
            <div class="item-value">${pay}</div> 
            <button class="item-close-btn" aria-label="Remove item">
                <ion-icon name="close-outline"></ion-icon>
            </button>
        </div>
    </li>`;

    cartRow.innerHTML = cartRowContent;
    cartItemList.appendChild(cartRow);

    cartRow.querySelector('.item-close-btn').addEventListener('click', removeItemButton);
    updateCart();
}

function addToWishlist(event) {
    var button = event.target;
    var productCard = button.closest('.product-card'); // Find the closest parent with class "product-card"
    var titleElement = productCard.querySelector('.card-title');
    var payElement = productCard.querySelector('.price');
    var imageElement = productCard.querySelector('.card-banner img');
    var title = titleElement.innerText;
    var pay = payElement.innerText;
    var imageSrc = imageElement.src;
    addItemToWishlistPanel(title, pay, imageSrc);
}

function addItemToWishlistPanel(title, pay, imageSrc) {
    var wishRow = document.createElement('li');
    wishRow.classList.add('panel-item');

    var wishItemList = document.querySelector('[data-side-panel="whishlist"] .panel-list');

    var wishRowContent = `
    <li class="panel-item">
        <div class="panel-card">
            <figure class="item-banner">
                <img src="${imageSrc}" width="46" height="46" loading="lazy">
            </figure>
            <div>
                <p class="item-title">${title}</p>
                <span class="item-value">${pay}</span>
                <button class="btn btn-primary">Add to Cart</button>
            </div>
            <button class="item-close-btn" aria-label="Remove item">
                <ion-icon name="close-outline"></ion-icon>
            </button>
        </div>
    </li>`;

    wishRow.innerHTML = wishRowContent;
    wishItemList.appendChild(wishRow);

    wishRow.querySelector('.item-close-btn').addEventListener('click', removeItemButton);

    // Select the "Add to Cart" button within the wishRow and add an event listener
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
                    var inputElement = cartItem.querySelector('.item-value');
                    var quantity = parseInt(inputElement.value) + 1;
                    inputElement.value = quantity;
                    updateCart();
                }
            }
        });

        if (!itemAlreadyInCart) {
            addItemToCart(title, pay, imageSrc);
        }
        wishRow.remove();
        var alertMessage = 'The item "' + title + '" has been added to your cart.';
        alert(alertMessage);
    });
}


function updateCart() {
    var cartRows = document.querySelectorAll('[data-side-panel="cart"] .panel-item');
    var total = 0;

    cartRows.forEach(function (cartRow) {
        var cartPrice = cartRow.querySelector('.item-value');
        var cartQuantity = 1; // Assuming quantity is always 1 for each item in the cart

        var price = parseFloat(cartPrice.innerText.replace('R.s ', '')) || 0; // Handle NaN or null values
        var quantity = cartQuantity;

        total += price * quantity;
    });

    total = Math.round(total * 100) / 100;
    document.querySelector('[data-side-panel="cart"] .subtotal-value').innerText = 'R.s ' + total;
}
