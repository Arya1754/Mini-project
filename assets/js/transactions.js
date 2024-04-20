document.getElementById('add-transaction').onclick = function() {
    document.getElementById('transaction-modal').style.display = 'block';
}

document.getElementsByClassName('close')[0].onclick = function() {
    document.getElementById('transaction-modal').style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == document.getElementById('transaction-modal')) {
        document.getElementById('transaction-modal').style.display = 'none';
    }
}
