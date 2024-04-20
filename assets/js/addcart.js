import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, onSnapshot } from 'firebase/firestore';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB0pGEBA01P1KON0fE1wfKRjejnDj2OCuY",
    authDomain: "miniproject-8c47c.firebaseapp.com",
    projectId: "miniproject-8c47c",
    storageBucket: "miniproject-8c47c.appspot.com",
    messagingSenderId: "178975701060",
    appId: "1:178975701060:web:b4a5a45a02c0bdfc2c6411",
    measurementId: "G-7J80SKPLFV"
  };

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function getCurrentUserID() {
    const user = auth.currentUser;
    if (user) {
        return user.uid;
    } else {
     
        return null; 
    }
}

document.addEventListener('DOMContentLoaded', function () {

const q = collection(db, 'cart');
onSnapshot(q, (snapshot) => {
    let cart = [];
    snapshot.docs.forEach((doc) => {
        cart.push({...doc.data(), id: doc.id });
    });
    console.log(cart);
    });

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
        removeFromFirestore(parentElement); // Remove from Firestore
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
        saveToFirestore(title, pay, imageSrc); // Save to Firestore
    }
}

function addItemToCart(title, pay, imageSrc) {
    const userID = getCurrentUserID();
    addDoc(collection(db, 'cart'), {
        userId: userID,
        title: title,
        pay: pay,
        quantity: 1,
        subtotal: pay,
        imageSrc: imageSrc
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        updateCart();
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });

    // Adding item to UI
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
}

function addItemToWishlistPanel(title, pay, imageSrc) {
    const userID = getCurrentUserID();
    addDoc(collection(db, 'wishlist'), {
        userId: userID,
        title: title,
        pay: pay,
        imageSrc: imageSrc
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });

    // Adding item to UI
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
        // Handle adding to cart
    });
}

function removeFromFirestore(title) {
    db.collection("cart").where("title", "==", title)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.ref.deleteDoc();
            });
        })
        .catch((error) => {
            console.error("Error removing document: ", error);
        });
}

function saveToFirestore(title, pay, imageSrc, quantity = 1, subtotal = pay) {
    const userID = getCurrentUserID(); // Get the current user's ID
    if (!userID) {
        console.error("User ID not available");
        return;
    }

    addDoc(collection(db, 'cart'), {
        userId: userID, // Store the user's ID with the item
        title: title,
        pay: pay,
        quantity: quantity,
        subtotal: subtotal,
        imageSrc: imageSrc
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}


function updateCart() {
    var cartItems = document.querySelectorAll('[data-side-panel="cart"] .panel-item');
    var itemSubtotal = 0;

    cartItems.forEach(function (cartItem) {
        var priceElement = cartItem.querySelector('.price');
        var quantityElement = cartItem.querySelector('.item-quantity');
        var price = parseFloat(priceElement.textContent);
        var title = cartItem.querySelector('.item-title').innerText;
        var quantity = parseInt(quantityElement.value);
        var imageSrc = cartItem.querySelector('.item-banner img').src;
        itemSubtotal += price * quantity;
    });

    var subtotalElement = document.querySelector('.subtotal');
    if (subtotalElement) {
        subtotalElement.textContent = 'Subtotal      R.s  ' + itemSubtotal.toFixed(2);
    }
}