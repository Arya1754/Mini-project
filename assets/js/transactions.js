import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc,setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB0pGEBA01P1KON0fE1wfKRjejnDj2OCuY",
    authDomain: "miniproject-8c47c.firebaseapp.com",
    projectId: "miniproject-8c47c",
    storageBucket: "miniproject-8c47c.appspot.com",
    messagingSenderId: "178975701060",
    appId: "1:178975701060:web:b4a5a45a02c0bdfc2c6411",
    measurementId: "G-7J80SKPLFV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function fetchAndDisplayData() {
    const querySnapshot = await getDocs(collection(db, "my orders"));
    const tableBody = document.querySelector('table tbody');
    tableBody.innerHTML = ''; // Clear existing rows before appending new ones

    querySnapshot.forEach(async (doc) => {
        const data = doc.data();
        const row = `
            <tr>
                <td>${data.date}</td>
                <td>${data.customerDetails}</td>
                <td>${data.title}</td>
                <td>${data.quantity}</td>
                <td>R.s${data.pay}</td>
                <td>R.s${data.subtotal}</td>
                <td>
                    <select onchange="changeStatus(this, '${doc.id}')">
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

function changeStatus(selectElement, docId) {
    const status = selectElement.value;
    // Update the status in Firestore
    const orderRef = doc(db, "my orders", docId);
    setDoc(orderRef, { status }, { merge: true })
        .then(() => console.log("Status updated successfully"))
        .catch((error) => console.error("Error updating status:", error));
}
