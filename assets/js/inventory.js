// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, addDoc, onSnapshot, doc, deleteDoc, getDoc } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';

// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyB0pGEBA01P1KON0fE1wfKRjejnDj2OCuY",
//     authDomain: "miniproject-8c47c.firebaseapp.com",
//     projectId: "miniproject-8c47c",
//     storageBucket: "miniproject-8c47c.appspot.com",
//     messagingSenderId: "178975701060",
//     appId: "1:178975701060:web:b4a5a45a02c0bdfc2c6411",
//     measurementId: "G-7J80SKPLFV"
//   };

// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const auth = getAuth();
  
// // Event listener for form submission to add items to Firestore
// document.getElementById('addItemForm').addEventListener('submit', async function(event) {
//     event.preventDefault();

//     const itemName = document.querySelector('[name="item_name"]').value;
//     const quantity = parseInt(document.querySelector('[name="quantity"]').value, 10);
//     const price = parseFloat(document.querySelector('[name="price"]').value);

//     try {
//         const docRef = await addDoc(collection(db, "inventory"), {
//             name: itemName,
//             quantity: quantity,
//             price: price
//         });
//         console.log("Document written with ID: ", docRef.id);
//         loadItems(); // Reload the items from Firestore after adding
//     } catch (error) {
//         console.error("Error adding document: ", error);
//     }
// });

// // Function to load items from Firestore and display them in the HTML table
// async function loadItems() {
//     const querySnapshot = await getDocs(collection(db, "inventory"));
//     const tableBody = document.querySelector('table tbody');
//     tableBody.innerHTML = ''; // Clear existing table data

//     querySnapshot.forEach((doc) => {
//         const row = `<tr>
//             <td>${doc.data().name}</td>
//             <td>${doc.data().quantity}</td>
//             <td>$${doc.data().price.toFixed(2)}</td>
//             <td>$${(doc.data().quantity * doc.data().price).toFixed(2)}</td>
//             <td>
//                 <button onclick="editItem('${doc.id}')">Edit</button>
//                 <button onclick="deleteItem('${doc.id}')">Delete</button>
//             </td>
//         </tr>`;
//         tableBody.innerHTML += row;
//     });
// }

// // Delete an item
// async function deleteItem(docId) {
//     try {
//         await deleteDoc(doc(db, "inventory", docId));
//         console.log("Document successfully deleted!");
//         loadItems(); // Reload the items from Firestore after deleting
//     } catch (error) {
//         console.error("Error removing document: ", error);
//     }
// }

document.addEventListener('DOMContentLoaded', () => {
    const inventoryForm = document.querySelector('.add-item form');
    const inventoryTable = document.querySelector('.inventory-list table tbody');
  
    // Function to add an inventory item
    function addInventoryItem(event) {
      event.preventDefault(); // Prevent form submission from reloading the page
  
      const itemName = event.target.item_name.value;
      const quantity = event.target.quantity.value;
      const price = event.target.price.value;
      const totalValue = (parseFloat(quantity) * parseFloat(price)).toFixed(2);
  
      const newRow = `
        <tr>
          <td>${itemName}</td>
          <td>${quantity}</td>
          <td>$${price}</td>
          <td>$${totalValue}</td>
          <td>
            <button onclick="editItem(this)">Edit</button>
            <button onclick="deleteItem(this)">Delete</button>
          </td>
        </tr>
      `;
  
      inventoryTable.innerHTML += newRow;
  
      // Clear form after submission
      inventoryForm.reset();
    }
  
    // Function to delete an item
    function deleteItem(button) {
      const row = button.parentNode.parentNode;
      row.parentNode.removeChild(row);
    }
  
    // Add event listener to the form
    inventoryForm.addEventListener('submit', addInventoryItem);
  
    // Expose functions to global scope for inline handlers
    window.deleteItem = deleteItem;
  
    // Function to edit an item (placeholder)
    function editItem(button) {
      const row = button.parentNode.parentNode;
      const cells = row.querySelectorAll('td');
      alert('Edit functionality not implemented! Displaying current values: ' + Array.from(cells).map(cell => cell.textContent).join(', '));
    }
  
    window.editItem = editItem;
  });
  
