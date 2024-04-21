import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, onSnapshot, doc, deleteDoc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


function changeStatus(selectElement) {
    const row = selectElement.closest('tr'); // Get the row of the select element
    const status = selectElement.value;

    if (status === 'Completed') {
        row.style.backgroundColor = 'lightgrey'; // Change row color to light grey
        row.setAttribute('data-status', 'completed'); // Update data attribute if needed
    } else {
        row.style.backgroundColor = ''; // Reset to default color
        row.setAttribute('data-status', 'pending'); // Update data attribute if needed
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Apply initial color based on status for existing rows when page loads
    const rows = document.querySelectorAll('table tbody tr');
    rows.forEach(row => {
        const select = row.querySelector('select');
        const status = select.value;
        if (status === 'Completed') {
            row.style.backgroundColor = 'lightgrey';
        }
    });
});

//dynamic row handling
function addNewRow(data) {
    const tbody = document.querySelector('table tbody');
    const newRow = `
        <tr data-status="pending">
            <td>${data.date}</td>
            <td>${data.customerDetails}</td>
            <td>${data.description}</td>
            <td>${data.quantity}</td>
            <td>$${data.price}</td>
            <td>$${data.total}</td>
            <td>
                <select onchange="changeStatus(this)">
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>
            </td>
        </tr>
    `;
    tbody.innerHTML += newRow;
}

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
const auth = getAuth();

async function fetchAndDisplayData() {
    const querySnapshot = await getDocs(collection(db, "my-orders"));
    const tableBody = document.querySelector('table tbody');

    querySnapshot.forEach(doc => {
        const data = doc.data();
        const row = `
            <tr>
                <td>${data.date}</td>
                <td>${data.customerDetails}</td>
                <td>${data.description}</td>
                <td>${data.quantity}</td>
                <td>$${data.price}</td>
                <td>$${data.total}</td>
                <td>
                    <select onchange="changeStatus(this)" data-doc-id="${doc.id}">
                        <option value="Pending" ${data.status === 'Pending' ? 'selected' : ''}>Pending</option>
                        <option value="Completed" ${data.status === 'Completed' ? 'selected' : ''}>Completed</option>
                    </select>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}


document.addEventListener('DOMContentLoaded', function() {
    fetchAndDisplayData();
});

